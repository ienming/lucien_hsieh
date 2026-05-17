export function useModal() {
  const isOpen  = useState('modal:isOpen',  () => false)
  const project = useState('modal:project', () => null)

  function openModal(p) {
    project.value = p
    isOpen.value  = true
  }

  function closeModal() {
    isOpen.value = false
    setTimeout(() => { project.value = null }, 400)
  }

  return { isOpen, project, openModal, closeModal }
}
