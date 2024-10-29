<template>
	<header class="heightfix sticky top-0 z-50 flex gap-5 items-center w-full pb-3 mb-7 bg-background-100">
		<ButtonBack :link="props.link"/>
		<h1 class="text-xl font-poppins_semibold uppercase">{{ props.title }}</h1>
	</header>
</template>

<script setup lang="ts">
const props = defineProps<{
	link: string;
	title: string
}>();
</script>