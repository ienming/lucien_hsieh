// composables/useCardScroll.js
//
// 負責監聽 wheel / touch 事件，轉換成卡片切換指令
// 設計原則：
//   - 一次 scroll 動作只切換一張，切換動畫完成前鎖定輸入
//   - wheel 用 deltaY 方向判斷，加節流防止連發
//   - touch 用 deltaY 門檻判斷，避免誤觸

export function useCardScroll({ onNext, onPrev, isLocked }) {
  // ─── 節流旗標 ───────────────────────────────────────────
  // isLocked 由外部（CardStack）傳入，切換動畫進行中時為 true
  // 這裡另外加一個 wheel 防抖，避免觸控板一次送出太多事件
  const wheelCooldown = ref(false)
  const WHEEL_COOLDOWN_MS = 800  // 每次切換後的冷卻時間

  // ─── Wheel（桌面）──────────────────────────────────────
  function onWheel(event) {
    event.preventDefault()

    if (isLocked.value || wheelCooldown.value) return

    // deltaY > 0 = 往下滾（看下一張）
    // deltaY < 0 = 往上滾（看上一張）
    if (event.deltaY > 0) {
      onNext()
    } else if (event.deltaY < 0) {
      onPrev()
    }

    // 觸發冷卻
    wheelCooldown.value = true
    setTimeout(() => {
      wheelCooldown.value = false
    }, WHEEL_COOLDOWN_MS)
  }

  // ─── Touch（手機）──────────────────────────────────────
  const touchStartY = ref(0)
  const SWIPE_THRESHOLD = 50  // 最小 swipe 距離（px）

  function onTouchStart(event) {
    touchStartY.value = event.touches[0].clientY
  }

  function onTouchEnd(event) {
    if (isLocked.value) return

    const deltaY = touchStartY.value - event.changedTouches[0].clientY

    // 絕對值未達門檻，忽略（防誤觸）
    if (Math.abs(deltaY) < SWIPE_THRESHOLD) return

    // 往上 swipe（deltaY > 0）= 看下一張
    // 往下 swipe（deltaY < 0）= 看上一張
    if (deltaY > 0) {
      onNext()
    } else {
      onPrev()
    }
  }

  // ─── 掛載 / 卸載事件監聽 ───────────────────────────────
  // target 是要監聽的 DOM 元素，通常是 CardStack 的根元素
  function attach(target) {
    // wheel 必須 passive: false 才能 preventDefault
    target.addEventListener('wheel', onWheel, { passive: false })
    target.addEventListener('touchstart', onTouchStart, { passive: true })
    target.addEventListener('touchend', onTouchEnd, { passive: true })
  }

  function detach(target) {
    target.removeEventListener('wheel', onWheel)
    target.removeEventListener('touchstart', onTouchStart)
    target.removeEventListener('touchend', onTouchEnd)
  }

  return { attach, detach }
}