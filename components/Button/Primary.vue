<template>
	<div class="text-sm font-poppins_semibold">
		<button v-if="props.variante" class="py-1.5 px-3 border border-white-200 rounded-md ">JE PARS</button>
		<button v-else class="generic-dropshadow py-1.5 px-3 bg-primary-100 rounded-md">JE VIENS</button>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	variante: boolean,
}>()
</script>