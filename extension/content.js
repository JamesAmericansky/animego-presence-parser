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
    if (!chrome.runtime?.id) {
      console.warn("Extension context is unavailable. Reload the page (Ctrl+F5).");
      return;
  }
    
    let payload = null;

    if (location.hostname.includes("animego.me") && !(location.pathname.startsWith("/cdn-iframe/"))) {
      payload = fetchAnime();
    } else if (location.hostname.includes("kodik.info")) {
      payload = fetchKodik();
    } else if (location.hostname.includes("player.cdnvideohub.com")) {
      payload = fetchCVH();
    }

    try {
      chrome.runtime.sendMessage({ type: "animepresence", payload: payload });
    } catch (e) {
      console.error("sendMessage failed", e);
    }
  }, 5000);
})();

function fetchAnime() {
  return {
    title: document.querySelector(".entity__title h1")?.textContent || null,
    link: window.location.href,
    imageLink: getImageLink(),
    episode: getCurrentEpisode(),
    episodesAmount: getEpisodesAmount() || 0,
    type: "website",
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
    type: "videoplayer",
    source: "kodik",
  };
}

function fetchCVH() {
  let shadowRoot = document.querySelector(".shadow-root-container").shadowRoot
  return {
    isPlaying: !!(shadowRoot.querySelector(".video-container.s-c[data-is-playing]")?.getAttribute("data-is-playing") === "true"),
    episodeCurrentPosition:
      shadowRoot.querySelector(".current.s-22")?.textContent || "00:00",
    episodeLength:
      shadowRoot.querySelector(".duration.s-22")?.textContent || "00:00",
    type: "videoplayer",
    source: "cvh",
  };
}

// Legacy code, might be useful later for more detailed parsing of anime description

// function parseDescription() {
//   let dtList = document.querySelectorAll("dl dt");
//   let description = {};

//   dtList.forEach((dt) => {
//     let key = dt.textContent.trim();
//     let value = dt.nextElementSibling.textContent.trim();

//     description[key] = value;
//   });

//   return description;
// }

function getEpisodesAmount() {
  let elements = document.querySelectorAll(".g-col-7.g-col-sm-12.g-col-md-8.g-col-lg-9.g-col-xl-9.text-break");
  return elements[1]?.textContent?.trim() || 0;
}

function getCurrentEpisode() {
  let episodeElements = Array.from(document.querySelectorAll(".player-video-bar__item.active .player-video-bar__number span"));
  return episodeElements
  .find(episode => episode.textContent !== "")?.textContent || "0";
}

function getImageLink() {
  let imageID = document
    .querySelector("img.image__img.rounded")
    ?.src?.split("/")
    ?.slice(-2)
    .join("/") ?? null;
  if (!imageID) return null;
  return `https://img.cdngos.com/anime/${imageID}`;
}
