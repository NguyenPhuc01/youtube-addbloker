const hideAds = () => {
  const adPlayer = document.querySelector(".html5-video-player.ad-showing");

  if (adPlayer) {
    console.log("Ad is showing, hiding...");
    const video = adPlayer.querySelector("video");
    if (video) {
      video.muted = true;
      video.currentTime = video.duration;
      console.log("Skipped ad video");
    }

    // Ẩn các lớp overlay
    const overlays = adPlayer.querySelectorAll(
      ".ytp-ad-player-overlay, .ytp-ad-overlay-container"
    );
    overlays.forEach((el) => (el.style.display = "none"));
  }
};

window.addEventListener("load", () => {
  hideAds();

  new MutationObserver(hideAds).observe(document.body, {
    childList: true,
    subtree: true,
  });
});
