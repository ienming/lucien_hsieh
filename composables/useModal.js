import { useProjects } from './useProjects'

export function useModal() {
	const router = useRouter()
	const route = useRoute()
	const { projects } = useProjects()

	const isOpen = computed(() => !!route.query.project)

	const project = useState('modal:project', () => null)

	watch(
		() => route.query.project,
		(no) => {
			if (no) {
				project.value = projects.value.find((p) => p.no === no) ?? null
			} else {
				setTimeout(() => { project.value = null }, 400)
			}
		},
		{ immediate: true }
	)

	function openModal(pj) {
		router.push({ query: { project: pj.no } })
	}

	function closeModal() {
		router.push({ query: {} })
	}

	return { isOpen, project, openModal, closeModal }
}
