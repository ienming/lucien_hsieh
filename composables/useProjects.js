const PROJECTS = [
	{
		id: 'shyline',
		no: '002',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
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
		description: '「色々な色 (iroironairo)」意指「各式各樣的顏色」，以「顏色」為主題呈現在日本交換期間拍下的九百多張照片。',
		coverImage: 'macbook_mockup_zhwgnz',
	},
	{
		id: 'shyline',
		no: '003',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
		description: 'A data visualization project collecting colors I saw in Japan as an exchange student. The project let viewer explore memories through colors in daily life.',
		coverImage: '/imgs/shyline-cover.jpg',
	},
	{
		id: 'shyline',
		no: '004',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
		description: 'A data visualization project collecting colors I saw in Japan as an exchange student. The project let viewer explore memories through colors in daily life.',
		coverImage: '/imgs/shyline-cover.jpg',
	},
	{
		id: 'shyline',
		no: '005',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
		description: 'A data visualization project collecting colors I saw in Japan as an exchange student. The project let viewer explore memories through colors in daily life.',
		coverImage: '/imgs/shyline-cover.jpg',
	},
	{
		id: 'shyline',
		no: '006',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
		description: 'A data visualization project collecting colors I saw in Japan as an exchange student. The project let viewer explore memories through colors in daily life.',
		coverImage: '/imgs/shyline-cover.jpg',
	},
]

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
		currentIndex.value = ((index % len) + len) % len
	}

	return {
		projects,
		currentIndex,
		currentProject,
		total,
		progressLabel,
		goTo,
	}
}