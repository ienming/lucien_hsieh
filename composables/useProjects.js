import { ref, computed } from 'vue'

// ─── 資料型別說明 ──────────────────────────────────────
// Project {
//   id:          string        唯一識別碼
//   no:          string        展示用編號，e.g. '001'
//   name:        string        專案名稱
//   medium:      string        媒介，e.g. 'Web' | 'Print' | 'Form'
//   year:        string        年份
//   type:        'profile' | 'project'
//   tagline:     string        圖片上的標語（project 才有）
//   taglineSub:  string        副標語（project 才有）
//   description: string        專案描述
//   coverImage:  string        封面圖片路徑
//   link:        string        專案連結（project 才有）
//   images:      Array<{ src, caption }>  詳細頁圖片
// }

const PROJECTS = [
  {
    id: 'profile',
    no: '000',
    name: 'Profile',
    medium: 'Person',
    year: '',
    type: 'profile',
    tagline: '',
    taglineSub: '',
    description: 'Lucien Hsieh is a digital narrator who focus on telling story from paper to web. Based in Taipei, Taiwan, looking for opportunities to do storytelling or creative data visualization.',
    coverImage: '',
    link: '',
    images: [],
  },
  {
    id: 'shyline',
    no: '001',
    name: 'Shyline',
    medium: 'Web',
    year: '2026',
    type: 'project',
    tagline: 'Seen, but never exposed.',
    taglineSub: 'let them look, let them wonder',
    description: 'A data visualization project collecting colors I saw in Japan as an exchange student. The project let viewer explore memories through colors in daily life.',
    coverImage: '/images/shyline-cover.jpg',
    link: 'https://jenning.github.io/iroironairo/#/',
    images: [
      {
        src: '/images/shyline-fig1.jpg',
        caption: 'Saturated(original) and de-saturated picture.',
      },
    ],
  },
  // 之後新增專案繼續往這裡加
]

export function useProjects() {
  const projects = ref(PROJECTS)

  // 當前顯示的 index（第二階段 scroll 邏輯會操作這個）
  const currentIndex = ref(0)

  const currentProject = computed(() => projects.value[currentIndex.value])

  const total = computed(() => projects.value.length)

  // 進度列用：格式化為 '01/07'
  const progressLabel = computed(() => {
    const cur = String(currentIndex.value + 1).padStart(2, '0')
    const tot = String(total.value).padStart(2, '0')
    return `${cur}/${tot}`
  })

  // 第二階段實作切換邏輯時會用到
  function goTo(index) {
    if (index < 0 || index >= total.value) return
    currentIndex.value = index
  }

  function goNext() {
    goTo(currentIndex.value + 1)
  }

  function goPrev() {
    goTo(currentIndex.value - 1)
  }

  const canGoNext = computed(() => currentIndex.value < total.value - 1)
  const canGoPrev = computed(() => currentIndex.value > 0)

  return {
    projects,
    currentIndex,
    currentProject,
    total,
    progressLabel,
    goTo,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
  }
}
