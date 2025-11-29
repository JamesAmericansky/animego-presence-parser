// const getAnimeInfo = () => {
//   let title =
//     document.title
//       .replace(/^Watch\s/, "")
//       .replace(/\sEnglish Sub\/Dub online Free on HiAnime\.to$/i, "")
//       .trim() || "";

//   let image = document.querySelector(".film-poster img")?.src || "";

//   const activeEp = document.querySelector("a.ssl-item.ep-item.active");
//   const epItems = [...document.querySelectorAll("a.ssl-item.ep-item[data-number]")];
//   const episodesAmount = epItems.length > 0 ? epItems.at(-1)?.getAttribute("data-number") || "1" : "1";
//   let episodeNumber = "";
//   let episodeTitle = "";

//   if (activeEp) {
//     episodeNumber = activeEp.getAttribute("data-number") || "";
//     const epNameEl = activeEp.querySelector(".ep-name");
//     if (epNameEl)
//       episodeTitle = epNameEl.title || epNameEl.textContent.trim() || "";
//   }

//   return {
//     anime: title,
//     image: image,
//     episode: episodeNumber,
//     episodeTitle,
//     episodesAmount,
//     link: location.href,
//     source: "hianime",
//   };
// };

// const getPlayerInfo = () => {
//   return {
//     episodeCurrentPosition: document.querySelector(".jw-text.jw-text-elapsed")?.textContent || "00:00",
//     episodeDuration: document.querySelector(".jw-text.jw-text-duration")?.textContent || "00:00",
//     isPlaying: document.querySelector(".jwplayer .jw-state-playing") || false,
//     source: "videoplayer",
//   }
// }

// setInterval(() => {
//   let info = null;

//   const host = location.hostname || "";
//   if (host.includes("hianime.to")) info = getAnimeInfo();
//   if (host.includes("megacloud.blog")) info = getPlayerInfo();

//   try {
//     chrome.runtime.sendMessage({ type: "hianime.info", payload: info });
//   } catch (e) {
//     console.error("sendMessage failed", e);
//   }
// }, 3500);

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

    try {
      chrome.runtime.sendMessage({ type: "animego.me", payload: payload });
    } catch (e) {
      console.error("sendMessage failed", e);
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
    ?.src?.split("/")
    ?.at(-1) ?? null;
  if (!imageID) return null;
  return `https://animego.me/upload/anime/images/${imageID}`;
}
