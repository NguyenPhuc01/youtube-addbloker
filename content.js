// Cache và performance optimization
let adPlayerCache = new WeakSet()
let lastCheckTime = 0
const CHECK_INTERVAL = 300 // ms

// Hàm chặn quảng cáo YouTube - tối ưu hóa
const hideYouTubeAds = () => {
  const now = Date.now()
  if (now - lastCheckTime < CHECK_INTERVAL) {
    return // Tránh check quá thường xuyên
  }
  lastCheckTime = now

  // Sử dụng selector hiệu quả hơn
  const adPlayer =
    document.querySelector('.html5-video-player[class*="ad-"]') ||
    document.querySelector('.html5-video-player.ad-showing') ||
    document.querySelector('.html5-video-player.ad-interrupting') ||
    document.querySelector('.html5-video-player.ad-created')

  if (!adPlayer || adPlayerCache.has(adPlayer)) {
    return // Đã xử lý hoặc không phải ad
  }

  // Thêm vào cache để tránh xử lý lại
  adPlayerCache.add(adPlayer)
  console.log('YouTube ad detected')

  // Xử lý video quảng cáo
  const adVideos = adPlayer.querySelectorAll('video')
  adVideos.forEach((video) => {
    if (video?.duration && video.duration > 0 && video.duration <= 60) {
      video.currentTime = video.duration
      video.muted = true
      console.log('Skipped ad video, duration:', video.duration)
    }
  })

  // Click skip button với selector tối ưu
  const skipBtn = adPlayer.querySelector(
    '.ytp-skip-ad-button, [aria-label*="skip"], [aria-label*="bỏ qua"]',
  )
  if (skipBtn) {
    skipBtn.click()
    console.log('Clicked skip ad button')
  }

  // Ẩn overlay quảng cáo
  const overlays = adPlayer.querySelectorAll(
    '.ytp-ad-player-overlay, .ytp-ad-overlay-container',
  )
  overlays.forEach((el) => (el.style.display = 'none'))

  // Cleanup cache sau 5 giây
  setTimeout(() => {
    adPlayerCache.delete(adPlayer)
  }, 5000)
}

// Hàm chặn quảng cáo Facebook
const hideFacebookAds = () => {
  console.log('Checking for Facebook ads...')

  // Chặn quảng cáo video trong feed
  const videoAds = document.querySelectorAll('[data-testid="video-ad"]')
  videoAds.forEach((ad) => {
    console.log('Facebook video ad detected, hiding...')
    ad.style.display = 'none'
  })

  // Chặn quảng cáo trong feed (sponsored posts)
  const sponsoredPosts = document.querySelectorAll(
    '[data-testid="post-container"]',
  )
  sponsoredPosts.forEach((post) => {
    const sponsoredText = post.querySelector('span[dir="auto"]')
    if (
      sponsoredText &&
      sponsoredText.textContent.toLowerCase().includes('sponsored')
    ) {
      console.log('Facebook sponsored post detected, hiding...')
      post.style.display = 'none'
    }
  })

  // Chặn quảng cáo trong sidebar
  const sidebarAds = document.querySelectorAll(
    '[data-testid="pagelet_ego_pane"]',
  )
  sidebarAds.forEach((ad) => {
    console.log('Facebook sidebar ad detected, hiding...')
    ad.style.display = 'none'
  })

  // Chặn quảng cáo video player
  const videoPlayerAds = document.querySelectorAll(
    '[data-testid="video-player"]',
  )
  videoPlayerAds.forEach((player) => {
    const adOverlay = player.querySelector('[data-testid="video-ad-overlay"]')
    if (adOverlay) {
      console.log('Facebook video player ad detected, hiding...')
      adOverlay.style.display = 'none'

      // Tua nhanh video quảng cáo
      const video = player.querySelector('video')
      if (video && video.duration) {
        video.currentTime = video.duration
        video.muted = true
      }
    }
  })
}

// Hàm chặn quảng cáo chung
const hideAds = () => {
  const currentUrl = window.location.hostname

  if (currentUrl.includes('youtube.com')) {
    hideYouTubeAds()
  } else if (currentUrl.includes('facebook.com')) {
    hideFacebookAds()
  }
}

let debounceTimeout = null
const debounceHideAds = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(hideAds, 300) // tăng lên 300ms để giảm spam
}

window.addEventListener('load', () => {
  hideAds() // chạy lần đầu

  // Theo dõi thay đổi DOM và gọi debounce
  new MutationObserver(debounceHideAds).observe(document.body, {
    childList: true,
    subtree: true,
  })
})

// Chạy ngay khi DOM sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideAds)
} else {
  hideAds()
}
