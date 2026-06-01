export function useCoordinate() {
	const isCoordinateModalOpen = useState('coordinate-modal', () => false);

	return {
		isCoordinateModalOpen,
	}
};
