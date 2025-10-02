<template>
	<h1
		ref="logo"
		class="logo"
		@mouseenter="stretchText"
		@mouseleave="releaseText">LÜUÜUÜUÜCIEN</h1>
</template>

<script setup>
import gsap from 'gsap';

const logoRef = useTemplateRef('logo');

function stretchText() {
	if (!logoRef.value) return;

	gsap.to(logoRef.value, {
		letterSpacing: '0.1rem',
		autoRound: false,
		ease: 'elastic.out(1,0.3)',
		duration: 1,
	});
}

function releaseText() {
	if (!logoRef.value) return;

	gsap.to(logoRef.value, {
		letterSpacing: '-0.08rem',
		autoRound: false,
		duration: .2,
		ease: 'elastic.out(1,0.3)',
		duration: 1,
	});
}
</script>