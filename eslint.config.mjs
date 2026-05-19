// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
	{
		rules: {
			indent: ['error', 'tab'],
			'vue/multi-word-component-names': 'off',
		},
	},
	eslintConfigPrettier,
);
