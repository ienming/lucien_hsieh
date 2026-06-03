<script setup>
import { useFloating } from '@floating-ui/vue';
import { offset } from '@floating-ui/dom';
import { onClickOutside } from '@vueuse/core';
import { LANG_KEY } from '@/composables/useI18n';

defineProps({
	isOpen: { type: Boolean, required: true },
	language: { type: String, required: true },
	isDark: { type: Boolean, required: true },
});

const { togglePanel, closePanel, toggleTheme, toggleLanguage } = useEnvironment();
const { t } = useI18n();
const FLOADING_MARGIN = 10;

const reference = useTemplateRef('reference');
const floating = useTemplateRef('floating');
const { floatingStyles } = useFloating(reference, floating, {
	placement: 'left-start',
	middleware: [offset(FLOADING_MARGIN)],
});
onClickOutside(floating, (_) => closePanel());
</script>

<template>
	<div>
		<button
			ref="reference"
			class="nav-link env-trigger"
			@click="togglePanel"
		>
			{{ t('environment') }}
		</button>
		<Transition name="panel">
			<div
				v-if="isOpen"
				ref="floating"
				class="env-panel"
				:style="floatingStyles"
			>
				<button
					class="panel-close"
					@click="closePanel"
				>
					[-]
				</button>

				<div class="panel-rows">
					<div class="panel-row">
						<span class="row-label">{{ t('translation') }}</span>
						<button
							class="row-toggle"
							@click.stop="toggleLanguage"
						>
							<span :class="{ 'is-active': language === LANG_KEY.zh }">ZH</span>
							<span class="separator">/</span>
							<span :class="{ 'is-active': language === LANG_KEY.en }">EN</span>
						</button>
					</div>

					<div class="panel-row">
						<span class="row-label">{{ t('light') }}</span>
						<button
							class="row-toggle"
							@click.stop="toggleTheme"
						>
							<span :class="{ 'is-active': !isDark }">ON</span>
							<span class="separator">/</span>
							<span :class="{ 'is-active': isDark }">OFF</span>
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
.nav-link {
	font-size: 14px;
	font-family: var(--font-mono);
	font-weight: 500;
	color: var(--color-text-muted);
	text-align: left;
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-text-primary);
	}
}

.env-panel {
	background: var(--color-surface);
	min-width: 150px;
	box-shadow: 0 4px 20px var(--color-card-shadow);
	z-index: var(--z-index-common-fixed);
}

.panel-close {
	width: 100%;
	text-align: right;
	font-size: 12px;
	font-weight: 400;
	transition: color var(--transition-fast);
	padding: var(--spacing-sm);
	padding-bottom: 0;
	color: var(--color-text-muted);

	&:hover {
		color: var(--color-text-primary);
	}
}

.panel-rows {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	margin-top: var(--spacing-md);
	border-top: 1px solid var(--color-border);
}

.panel-row {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-lg);
	padding: var(--spacing-sm);
	border-bottom: 1px solid var(--color-border);
}

.row-label {
	font-size: 12px;
	color: var(--color-text-faint);
}

.row-toggle {
	font-size: 12px;
	color: var(--color-text-muted);
	display: flex;
	align-items: center;
	gap: 2px;
	justify-content: flex-end;
	transition: color var(--transition-fast);

	&:hover {
		color: var(--color-text-primary);
	}

	.is-active {
		color: var(--color-text-primary);
		font-weight: 500;
	}

	.separator {
		color: var(--color-text-faint);
	}
}

.panel-enter-active,
.panel-leave-active {
	transition: opacity var(--transition-base);
}

.panel-enter-from,
.panel-leave-to {
	opacity: 0;
}
</style>
