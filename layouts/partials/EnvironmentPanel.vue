<script setup>
import { useFloating } from '@floating-ui/vue';
import { offset } from '@floating-ui/dom';
import { onClickOutside } from '@vueuse/core';
import { LANG_KEY } from '@/composables/useI18n';

const { isEnvOpen, isDark, isEn, isZh, togglePanel, closePanel, toggleTheme, setLanguage } =
	useEnvironment();
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
				v-if="isEnvOpen"
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
							@click.stop="setLanguage(LANG_KEY.zh)"
						>
							[
							<span v-show="isZh">⦿</span>
							<span v-show="!isZh">&nbsp;</span>
							]
							{{ LANG_KEY.zh }}
						</button>
						<button
							class="row-toggle"
							@click.stop="setLanguage(LANG_KEY.en)"
						>
							[
							<span v-show="isEn">⦿</span>
							<span v-show="!isEn">&nbsp;</span>
							]
							{{ LANG_KEY.en }}
						</button>
					</div>
					<div class="panel-row">
						<span class="row-label">{{ t('light') }}</span>
						<button
							class="row-toggle"
							@click.stop="toggleTheme"
						>
							[
							<span v-show="!isDark">⦿</span>
							<span v-show="isDark">&nbsp;</span>
							] ON
						</button>
						<button
							class="row-toggle"
							@click.stop="toggleTheme"
						>
							[
							<span v-show="isDark">⦿</span>
							<span v-show="!isDark">&nbsp;</span>
							] OFF
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>
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
	gap: var(--spacing-xs);
	padding: var(--spacing-sm);
	border-bottom: 1px solid var(--color-border);
}

.row-label {
	font-size: 12px;
	color: var(--color-text-faint);
	margin-bottom: var(--spacing-md);
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
