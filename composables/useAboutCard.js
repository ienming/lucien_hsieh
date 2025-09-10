export function useAboutCard() {
	const isAboutCardOpen = useState('about-card', () => false);

	return {
		isAboutCardOpen,
	}
};
