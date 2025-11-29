import "dotenv/config";

import RPC from "discord-rpc";
import { WebSocketServer } from "ws";

import resizeImage from "../utils/imageResizeUtil.js";

const CLIENT_ID = process.env.CLIENT_ID;
if (!CLIENT_ID) throw new Error("CLIENT_ID .env variable is undefined.");

// --- Constants and Globals ---

const AFK_TIMEOUT_MS = 90 * 1000;
const IMAGE_CACHE = new Map();

// --- Initializations ---

const client = new RPC.Client({ transport: "ipc" });
client.login({ clientId: CLIENT_ID });

const wsServer = new WebSocketServer({ port: 3000 });

// --- Main code ---

let lastAnimeTitle = null;

let animeData = {},
  kodikData = {};

wsServer.on("connection", (ws) => {
  console.log("Client connected!");

  ws.on("message", (msg) => {
    let data;
    try {
      data = JSON.parse(msg.toString());
    } catch {
      console.error("Invalid JSON: JSON.parse() failed.");
      return;
    }

    switch (data.source) {
      case "animego":
        animeData = data;
        break;
      case "kodik":
        kodikData = data;
        break;
    }

    const mergedData = { ...animeData, ...kodikData, source: "merged" };

    if (mergedData.title) {
      updateRPC(client, mergedData);
    } else {
      client.clearActivity();
    }
  });

  ws.on("close", () => {
    client.clearActivity();
  });
});

async function updateRPC(client, mergedData) {
  try {
    if (!mergedData) return;

    let {
      title,
      imageLink,
      episode,
      episodesAmount,
      isPlaying,
      episodeCurrentPosition,
      episodeLength,
    } = mergedData;

    if (
      title !== lastAnimeTitle &&
      episodeCurrentPosition &&
      episodeCurrentPosition !== "00:00"
    ) {
      episodeCurrentPosition = "00:00";
    }
    lastAnimeTitle = title;

    const resizedURL = imageLink
      ? await getOrCacheImageLink(imageLink)
      : null;

    checkAFK(client, isPlaying); // Resets user's activity if videoplayer is paused for a long time
    if (isAFK) return;

    client.setActivity({
      details: title || "Ничего",
      state:
        episode && episodesAmount && episodeCurrentPosition && episodeLength
          ? `Серия ${episode}/${episodesAmount} — (${episodeCurrentPosition}/${episodeLength})`
          : "  ", // Discord doesn't let us have state length less than 2 chars
      largeImageKey: resizedURL || "main-icon",
      largeImageText: "Смотрю аниме",
      smallImageKey: isPlaying ? "play" : "pause",
      smallImageText: isPlaying ? "Смотрю" : "Пауза",
    });
  } catch (e) {
    console.log(e);
  }
}

let AFKTimer = null;
let isAFK = false;

async function getOrCacheImageLink(imageLink) {
  let resizedURL = IMAGE_CACHE.get(imageLink);
  if (!resizedURL && imageLink) {
    resizedURL = await resizeImage(imageLink, 750, 1050);
    if (resizedURL) {
      IMAGE_CACHE.set(imageLink, resizedURL);
      return resizedURL;
    } else {
      IMAGE_CACHE.set(imageLink, "main-icon");
      return null;
    }
  }
  return resizedURL;
}

function checkAFK(client, isPlaying) {
  if (!isPlaying) {
    if (!AFKTimer) {
      AFKTimer = setTimeout(() => {
        isAFK = true;
        client.clearActivity();
        AFKTimer = null;
      }, AFK_TIMEOUT_MS);
    }
  } else {
    isAFK = false;
    if (AFKTimer) {
      clearTimeout(AFKTimer);
      AFKTimer = null;
    }
  }
}
