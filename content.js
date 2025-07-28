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
  //   const adPlayer = document.querySelector(".html5-video-player.ad-showing");
  const adPlayer = document.querySelector(
    ".html5-video-player.ad-showing.ad-interrupting"
  );

  console.log("Checking for ads...");

  if (adPlayer?.classList.contains("ad-showing")) {
    console.log("Ad detected");

    // Tua nhanh nếu có video quảng cáo
    const video = adPlayer.querySelector("video");
    if (video && video.duration) {
      video.currentTime = video.duration;
      video.muted = true;
      console.log("Skipped ad video");
    }
    // ytp-skip-ad-button ytp-ad-component--clickable
    // Tự động click bỏ qua quảng cáo
    const skipBtn = adPlayer.querySelector(".ytp-skip-ad-button");
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

let debounceTimeout = null;
const debounceHideAds = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(hideAds, 300); // chỉ chạy mỗi 300ms khi có thay đổi
};

window.addEventListener("load", () => {
  hideAds(); // chạy lần đầu

  // Theo dõi thay đổi DOM và gọi debounce
  new MutationObserver(debounceHideAds).observe(document.body, {
    childList: true,
    subtree: true,
  });
});

// html5-video-player ytp-transparent ytp-exp-bottom-control-flexbox ytp-modern-caption ytp-exp-ppp-update ytp-livebadge-color ytp-hide-info-bar ytp-large-width-mode ytp-fine-scrubbing-exp ad-created ad-showing ad-interrupting ytp-fit-cover-video playing-mode ytp-autohide
// ytp-skip-ad-button ytp-ad-component--clickable
