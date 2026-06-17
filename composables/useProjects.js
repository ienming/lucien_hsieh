/*
@isOpen: Determine whether the project is open or draft
*/
const PROJECTS = [
	{
		id: 'shyline',
		no: '002',
		name: 'Shyline',
		medium: 'Web',
		year: '2026',
		type: 'project',
		digitization: 100,
		isOpen: false,
		description: {
			zh: 'Shyline 是一個假想太陽眼鏡品牌，以「落日後的視線」為出發點，打造一系列品牌視覺設計.....',
			en: 'Shyline is a hypothetic sunglasses brand which build a series of visual design based on the \'vision after sunset\'...coming soon',
		},
		coverImage: '/imgs/shyline-cover.jpg',
	},
	{
		id: 'profile',
		no: '000',
		name: 'Profile',
		medium: 'Cell',
		year: '1996',
		type: 'profile',
		isOpen: false,
		description: {
			zh: '我是一名跨領域設計師，關注並設計訊息如何被理解，透過網頁開發與獨立出版，將內容轉化為網頁敘事、創意資料視覺化與文化內容設計。',
			en: 'Lucien Hsieh is a multidisciplinary designer and developer who crafts narratives through web development and independent publishing, designing how message is understood and transforming it into interactive digital narratives. Focused on web storytelling, creative data visualization, and cultural content',
		},
		coverImage: '',
	},
	{
		id: 'iroironairo',
		no: '001',
		name: '色々な色 iroironairo',
		medium: 'Web',
		year: '2023',
		type: 'project',
		digitization: 70,
		isOpen: true,
		link: 'https://ienming.github.io/iroironairo/#/',
		description: {
			zh: '「色々な色 (iroironairo)」意思是「各式各樣的顏色」，以「顏色」為主題呈現在日本生活期間拍下的九百多張照片。',
			en: '「色々な色 (iroironairo)」means "various color", the project telling the stories over 900 photos taken in Japan.',
		},
		coverImage: 'find_colors_p5_riwcxa',
		credits: [
			{
				cate: 'Photos',
				to: 'Lucien Hsieh',
			},
			{
				cate: 'Design',
				to: 'Lucien Hsieh',
			},
			{
				cate: 'Develop',
				to: 'Lucien Hsieh',
			}
		]
	},
	{
		id: 'modern_love',
		no: '003',
		name: 'Modern Love',
		medium: 'Web/Poster',
		year: '2021',
		type: 'project',
		digitization: 50,
		isOpen: false,
		description: {
			zh: '2010~2020 年間 KKbox 排行第一名的歌曲中描述愛情的歌詞資料視覺化。',
			en: 'Modern Love visualizes lyrics in romantic songs from the first ranking song on KKbox from 2010 to 2020',
		},
		coverImage: 'modern_love_macbook_mockup_r0m1jt',
	},
	// {
	// 	id: '29',
	// 	no: '004',
	// 	name: '29',
	// 	medium: 'Zine',
	// 	year: '2026',
	// 	type: 'project',
	// 	isOpen: false,
	// 	description: 'coming soon...',
	// 	coverImage: '/imgs/29-cover.jpg',
	// },
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