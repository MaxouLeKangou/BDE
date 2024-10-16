<template>
	<header class="flex justify-between items-center">
		<nuxt-link to="/settings" class="flex items-center gap-4">
			<ProfilThumbnail :thumbnail="userData?.thumbnail_url"/>
			<div>
				<p v-if="userData" class="text-lg font-poppins_semibold">Salut, <span class="font-poppins_light">{{ userData?.first_name }}</span></p>
				<div v-else class="loading-pulse h-5 w-36 rounded-md"></div>
			</div>
		</nuxt-link>

		<nuxt-link to="/notifications">
			<IconsNotification/>
		</nuxt-link>
	</header>

	<main>
		<section class="flex gap-3 items-end pt-8 pb-6">
			<div class="flex flex-col gap-2 text-secondary">
				<p class="font-poppins_light leading-[0.625rem]">{{ dataDay.month }}</p>
				<p class="text-2xl font-poppins_semibold leading-[1rem]">{{ dataDay.number }}</p>
			</div>
			<p class="text-xl font-poppins_semibold leading-3">AUJOURD'HUI, {{ dataDay.name }}</p>
		</section>

		<div class="grid grid-cols-2 grid-rows-[112px_136px_136px_144px] gap-4 pb-5">
			<CardEvent/>

			<nuxt-link to="/bde" class="bg-background-200 rounded-card p-3 flex flex-col justify-end gap-3">
				<div class="relative w-full h-full">
					<img src="../assets/img/BDE.png" alt="" class="absolute inset-0 w-full h-full object-contain">
				</div>
				<h3 class="leading-5 text-xl font-poppins_extrabold">TON BDE</h3>
			</nuxt-link>

			<nuxt-link to="/advantage/card" class="row-span-2 bg-white-100 rounded-card p-3 flex flex-col justify-end gap-3" :class="{ 'grayscale opacity-75': !userData?.member }">
				<div class="relative w-full h-full">
					<img src="../assets/img/DIAMOND.png" alt="" class="absolute inset-0 w-full h-full object-contain">
				</div>
				<h3 class="text-background-100 leading-5 text-xl font-poppins_extrabold">TA CARTE AVANTAGE</h3>
			</nuxt-link>

			<nuxt-link to="/advantage/partners" class="bg-white-100 rounded-card p-3 flex flex-col justify-end gap-3 h-full" :class="{ 'grayscale opacity-75': !userData?.member }">
				<div class="relative w-full h-full">
					<img src="../assets/img/PARTNERS.png" alt="" class="absolute inset-0 w-full h-full object-contain">
				</div>
				<h3 class="text-background-100 leading-5 text-xl font-poppins_extrabold">NOS PARTENAIRES</h3>
			</nuxt-link>

			<nuxt-link to="https://photos.google.com/share/AF1QipOX9fYUwJz0gm4uQ9vbTZhd5wzSauOEralu8tBb_ZErfgnjRQ0-MuFIiTGFbAw4Pw?pli=1&key=WVlMWmZqeUVvcnFKQUxILTJDQ2g4SjdNX0dZTnhR" class="relative col-span-2 bg-integration bg-cover rounded-card">
				<div class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-6 whitespace-nowrap text-xl font-poppins_extrabold py-3 px-5 bg-background-100/50">
					LA GALERIE MMI
				</div>
			</nuxt-link>
		</div>
	</main>

</template>

<script setup lang="ts">
definePageMeta({
	middleware: 'auth',
});
</script>