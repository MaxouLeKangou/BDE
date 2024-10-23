<template>
	<img v-if="thumbnail" :src="thumbnail" alt="" class="w-10 h-10 rounded-full object-cover outline outline-white-200 outline-offset-4">
	<img v-else src="../assets/img/thumbnail/default.webp" class="w-10 h-10 rounded-full object-cover outline outline-white-200 outline-offset-4"></img>
</template>

<script setup lang="ts">
const props = defineProps<{
	thumbnail: string;
}>();
</script>