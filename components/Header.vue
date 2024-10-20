<template>
	<header class="flex	gap-5 items-center pb-10 pt-5">
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