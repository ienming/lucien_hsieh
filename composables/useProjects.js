const PROJECTS = [
	{
		id: 'shyline',
		no: '002',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
		isOpen: true,
		description: 'Sunset glasses project',
		coverImage: '/imgs/shyline-cover.jpg',
	},
	{
		id: 'profile',
		no: '000',
		name: 'Profile',
		medium: 'Person',
		year: '',
		type: 'profile',
		isOpen: false,
		description: 'Lucien Hsieh is a digital narrator who focuses on telling story from paper to web. Based in Taipei, Taiwan, looking for opportunities to do storytelling or creative data visualization.',
		coverImage: '',
	},
	{
		id: 'iroironairo',
		no: '001',
		name: '色々な色 iroironairo',
		medium: 'Web',
		year: '2024',
		type: 'project',
		isOpen: true,
		description: '「色々な色 (iroironairo)」意思是「各式各樣的顏色」，以「顏色」為主題呈現在日本交換期間拍下的九百多張照片。',
		coverImage: 'macbook_mockup_zhwgnz',
	},
	{
		id: 'modern_love',
		no: '003',
		name: 'Modern Love',
		medium: 'Web/Poster',
		year: '2021',
		type: 'project',
		isOpen: true,
		description: 'Modern love represents public culture that...',
		coverImage: 'modern_love_macbook_mockup_r0m1jt',
	},
	{
		id: '29',
		no: '004',
		name: '29',
		medium: 'Zine',
		year: '2026',
		type: 'project',
		isOpen: false,
		description: 'coming soon...',
		coverImage: '/imgs/29-cover.jpg',
	},
]

const _scrollToCard = shallowRef(null)

export function useProjects() {
	const projects = useState('projects:list', () => PROJECTS)
	const currentIndex = useState('projects:currentIndex', () => 0)

	const currentProject = computed(() => projects.value[currentIndex.value])
	const total = computed(() => projects.value.length)
	const progressLabel = computed(() => {
		const curr = String(currentIndex.value + 1).padStart(2, '0')
		const normalizedTotal = String(total.value).padStart(2, '0')
		return `${curr}/${normalizedTotal}`
	})

	function goTo(index) {
		const len = total.value
		const newIndex = ((index % len) + len) % len
		currentIndex.value = newIndex
		_scrollToCard.value?.(newIndex)
	}

	function registerScrollToCard(fn) {
		_scrollToCard.value = fn
	}

	return {
		projects,
		currentIndex,
		currentProject,
		total,
		progressLabel,
		goTo,
		registerScrollToCard,
	}
}