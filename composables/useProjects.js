const PROJECTS = [
	{
		id: 'shyline',
		no: '001',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
		tagline: 'Seen, but never exposed.',
		taglineSub: 'let them look, let them wonder',
		description: 'Sunset glasses project',
		coverImage: '/imgs/shyline-cover.jpg',
		link: 'https://jenning.github.io/iroironairo/#/',
		images: [
			{
				src: '/imgs/shyline-cover.jpg',
				caption: 'Saturated(original) and de-saturated picture.',
			},
		],
	},
	{
		id: 'profile',
		no: '000',
		name: 'Profile',
		medium: 'Person',
		year: '',
		type: 'profile',
		tagline: '',
		taglineSub: '',
		description: 'Lucien Hsieh is a digital narrator who focuses on telling story from paper to web. Based in Taipei, Taiwan, looking for opportunities to do storytelling or creative data visualization.',
		coverImage: '',
		link: '',
		images: [],
	},
	{
		id: 'shyline',
		no: '002',
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
	{
		id: 'shyline',
		no: '003',
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
	{
		id: 'shyline',
		no: '004',
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
	{
		id: 'shyline',
		no: '005',
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
	{
		id: 'shyline',
		no: '006',
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