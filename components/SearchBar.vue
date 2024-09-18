<template>
	<div class="relative">
		<input type="search" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" placeholder="Chercher un partenaire" class="rounded-md border-none bg-white-100/10 pl-12">
		<IconsSearch class="absolute left-5 top-1/2 -translate-y-1/2"/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	modelValue: string;
}>();
</script>