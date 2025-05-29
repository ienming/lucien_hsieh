// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	{
		rules: {
			indent: ['error', 'tab'],
			'vue/multi-word-component-names': 'off',
		},
	},
);
