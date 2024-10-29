<template>
	<nuxt-link to="/settings/member" class="relative h-28 w-full bg-background-200 rounded-card p-3 flex gap-3">
		<div class="h-full aspect-square bg-primary-100/10 rounded-card p-3 flex flex-col justify-center">
			<img src="../../assets/img/DIAMOND.png" alt="" :class="{ 'grayscale opacity-75': !userData?.member }">
		</div>
		<div class="flex flex-col justify-center">
			<h2 class="text-xl font-poppins_semibold">Compte GOAT</h2>
			<p class="text-white-200 font-poppins_light">Abonnement au meilleur BDE</p>
		</div>

		<div class="absolute top-3 right-3 text-sm">
			<p v-if="userData?.member" class="rounded-md bg-green-500/20 text-green-500 py-1 px-3">actif</p>
			<p v-else class="rounded-md bg-red-500/20 text-red-500 py-1 px-3">inactif</p>
		</div>
	</nuxt-link>
</template>

<script setup lang="ts">
</script>