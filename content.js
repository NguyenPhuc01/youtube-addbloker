// const hideAds = () => {
//   const adPlayer = document.querySelector(".html5-video-player.ad-showing");

//   if (adPlayer) {
//     console.log("Ad is showing, hiding...");
//     const video = adPlayer.querySelector("video");
//     if (video) {
//       video.muted = true;
//       video.currentTime = video.duration;
//       console.log("Skipped ad video");
//     }

//     // Ẩn các lớp overlay
//     const overlays = adPlayer.querySelectorAll(
//       ".ytp-ad-player-overlay, .ytp-ad-overlay-container"
//     );
//     overlays.forEach((el) => (el.style.display = "none"));
//   }
// };

const hideAds = () => {
  const adPlayer = document.querySelector(".html5-video-player.ad-showing");
  console.log("Checking for ads...");

  if (adPlayer) {
    console.log("Ad detected");

    // Tua nhanh nếu có video quảng cáo
    const video = adPlayer.querySelector("video");
    if (video && video.duration) {
      video.currentTime = video.duration;
      video.muted = true;
      console.log("Skipped ad video");
    }

    // Tự động click bỏ qua quảng cáo
    const skipBtn = adPlayer.querySelector(".ytp-ad-skip-button");
    if (skipBtn) {
      skipBtn.click();
      console.log("Clicked skip ad button");
    }

    // Ẩn overlay quảng cáo
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
