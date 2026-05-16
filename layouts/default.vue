<template>
	<div>
		<AppHeader />
		<main>
			<slot />
		</main>
		<AppSidebar :projects="projects" :current-index="currentIndex" :progress-label="progressLabel" @go-to="goTo"
			@toggle-environment="env.togglePanel" />
		<EnvironmentPanel :is-open="env.isOpen.value" :language="env.language.value" :is-dark="env.isDark.value"
			@close="env.closePanel" @toggle-language="env.toggleLanguage" @toggle-theme="env.toggleTheme" />
	</div>
</template>

<script setup>
import AppHeader from "./partials/AppHeader";
import AppSidebar from "./partials/AppSidebar";
import EnvironmentPanel from "./partials/EnvironmentPanel";

const { projects, currentIndex, currentProject, progressLabel, goTo } =
	useProjects();

const env = useEnvironment();
</script>
