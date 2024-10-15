<template>
	<div class="fixed top-20 left-4 right-4">
		<div v-if="data === 'update'" class="rounded-md bg-green-600/25 border border-green-600/50">
			<p class="py-2 px-5">Vos informations ont été mise à jours !</p>
		</div>
		<div v-else class="rounded-md bg-red-600/25 border border-red-600/50">
			<p class="py-2 px-5">Une erreur est survenue ! Veuillez réessayer plus tard.</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	data: String
});
</script>