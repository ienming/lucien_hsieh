// composables/useProjects.js
//
// useState key 命名規則：'domain:field'
// 任何元件呼叫 useProjects() 都拿到同一份狀態

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
]

export function useProjects() {
  // ─── 共享狀態（useState key 全域唯一）─────────────────
  const projects     = useState('projects:list',         () => PROJECTS)
  const currentIndex = useState('projects:currentIndex', () => 0)

  // ─── Computed ──────────────────────────────────────────
  const currentProject = computed(() => projects.value[currentIndex.value])
  const total          = computed(() => projects.value.length)

  const progressLabel = computed(() => {
    const cur = String(currentIndex.value + 1).padStart(2, '0')
    const tot = String(total.value).padStart(2, '0')
    return `${cur}/${tot}`
  })

  const canGoNext = computed(() => true)
  const canGoPrev = computed(() => true)

  // ─── Actions ───────────────────────────────────────────
  function goTo(index) {
    const len = total.value
    currentIndex.value = ((index % len) + len) % len
  }

  function goNext() { goTo(currentIndex.value + 1) }
  function goPrev() { goTo(currentIndex.value - 1) }

  return {
    projects,
    currentIndex,
    currentProject,
    total,
    progressLabel,
    canGoNext,
    canGoPrev,
    goTo,
    goNext,
    goPrev,
  }
}