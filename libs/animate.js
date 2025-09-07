import { gsap } from 'gsap';
import SplitText from 'gsap/SplitText';

export function showSplitTextOnHover(targets, config, parentSelector) {
	let elements = [];

	// 判斷傳入類型
	if (typeof targets === 'string') {
		elements = Array.from(document.querySelectorAll(targets));
	} else if (targets instanceof HTMLElement) {
		elements = [targets];
	} else if (Array.isArray(targets)) {
		elements = targets.filter(el => el instanceof HTMLElement);
	}

	if (!elements.length) {
		console.error('No valid target elements found');
		return () => {};
	}

	const cleanUps = [];

	elements.forEach(target => {
		let triggerTarget = target;

		if (parentSelector && typeof parentSelector === 'string') {
			const parent = target.closest(parentSelector);
			if (!parent) {
				console.error('No triggerTarget found for parentSelector', parentSelector);
				return;
			}
			triggerTarget = parent;
		}

		const split = SplitText.create(target, {
			type: 'chars, lines',
			mask: 'lines',
		});

		const tl = gsap.timeline();
		tl.fromTo(
			split.chars,
			{ yPercent: (config && config.fromY) || 100 },
			{ yPercent: (config && config.toY) || 0, stagger: (config && config.stagger) || 0.01 }
		);

		const animateFn = () => {
			if (tl.isActive()) return;
			tl.restart();
		};

		triggerTarget.addEventListener('mouseenter', animateFn);

		const cleanUp = () => {
			triggerTarget.removeEventListener('mouseenter', animateFn);
			tl.kill();
		};

		cleanUps.push(cleanUp);
	});

	return () => {
		cleanUps.forEach(fn => fn());
	};
}
