<template>
	<img v-if="thumbnail" :src="thumbnail" alt="" class="w-10 h-10 rounded-full object-cover outline outline-white-200 outline-offset-4">
	<div v-else class="loading-pulse w-10 h-10 rounded-full outline outline-white-200 outline-offset-4"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
	thumbnail: string;
}>();
</script>