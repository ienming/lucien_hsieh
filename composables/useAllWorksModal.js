export function useAllWorksModal() {
	const isAllWorksOpen = useState('all-works', () => false);

	return {
		isAllWorksOpen,
	}
};
