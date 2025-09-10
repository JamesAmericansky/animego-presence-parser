// ==UserScript==
// @name         AnimeGO Client Parser
// @match        https://animego.me/*
// @match        https://kodik.info/*
// @run-at       document-end
// ==/UserScript==

(function () {
  const socket = new WebSocket("ws://127.0.0.1:3000");

  socket.addEventListener("open", () => {
    console.debug("WebSocket opened");
  });

  socket.addEventListener("close", () => {
    console.debug("Websocket closed");
  });

  socket.addEventListener("error", (err) => {
    console.error("WebSocket Exception:", err);
  });

  setInterval(() => {
    let payload = null;
    if (location.hostname.includes("animego.me")) {
      payload = fetchAnime();
    } else if (location.hostname.includes("kodik.info")) {
      payload = fetchKodik();
    }

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
    }
  }, 5000);
})();

function fetchAnime() {
  return {
    title: document.querySelector(".anime-title h1")?.textContent || null,
    link: window.location.href,
    imageLink: getImageLink(),
    episode: document.querySelector(".video-player__active")?.textContent || 0,
    episodesAmount: getEpisodesAmount() || 0,
    source: "animego",
  };
}

function fetchKodik() {
  return {
    isPlaying: document.querySelector(".player-is-playing") ? true : false,
    episodeCurrentPosition:
      document.querySelector(".fp-elapsed")?.textContent || "00:00",
    episodeLength:
      document.querySelector(".fp-duration")?.textContent || "00:00",
    source: "kodik",
  };
}

function parseDescription() {
  let dtList = document.querySelectorAll("dl dt");
  let description = {};

  dtList.forEach((dt) => {
    let key = dt.textContent.trim();
    let value = dt.nextElementSibling.textContent.trim();

    description[key] = value;
  });

  return description;
}

function getEpisodesAmount() {
  let description = parseDescription();
  return description["Эпизоды"];
}

function getImageLink() {
  let imageID = document
    .querySelector(".anime-poster img")
    .src.split("/")
    .at(-1);
  return `https://animego.me/upload/anime/images/${imageID}`;
}
