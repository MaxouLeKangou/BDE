<template>
	<header class="flex justify-between items-center pt-6">
		<nuxt-link to="/" class="flex items-center gap-4">
			<ProfilThumbnail/>
			<p class="text-lg font-poppins_semibold">Salut, <span class="font-poppins_light">{{ data.first_name }}</span></p>
		</nuxt-link>

		<nuxt-link to="/">
			<IconsNotification/>
		</nuxt-link>
	</header>
	<main>
		<section class="flex gap-3 items-end py-10">
			<div class="flex flex-col gap-2 text-secondary">
				<p class="text-lg font-poppins_light leading-[0.625rem]">{{ dataDay.month }}</p>
				<p class="text-2xl font-poppins_semibold leading-[1rem]">{{ dataDay.number }}</p>
			</div>
			<p class="text-xl font-poppins_semibold leading-3">AUJOURD'HUI, {{ dataDay.name }}</p>
		</section>

		<div class="grid grid-cols-2 grid-rows-[112px_136px_136px_144px] gap-4 pb-5">
			<CardEvent class="col-span-2"/>

			<nuxt-link to="/advantage/partners" class="row-span-2 bg-white-100 rounded-card p-3 flex flex-col justify-end gap-3">
				<div class="relative w-full h-full">
					<img src="../assets/img/PARTNERS.png" alt="" class="absolute inset-0 w-full h-full object-contain">
				</div>
				<h3 class="text-background-100 leading-5 text-xl font-poppins_extrabold">NOS PARTENAIRES</h3>
			</nuxt-link>

			<section class="bg-background-200 rounded-card p-3 flex flex-col justify-end gap-3">
				<div class="relative w-full h-full">
					<img src="../assets/img/BDE.png" alt="" class="absolute inset-0 w-full h-full object-contain">
				</div>
				<h3 class="leading-5 text-xl font-poppins_extrabold">TON BDE</h3>
			</section>

			<nuxt-link to="/advantage/card" class="bg-white-100 rounded-card p-3 flex flex-col justify-end gap-3 h-full">
				<div class="relative w-full h-full">
					<img src="../assets/img/DIAMOND.png" alt="" class="absolute inset-0 w-full h-full object-contain">
				</div>
				<h3 class="text-background-100 leading-5 text-xl font-poppins_extrabold">TA CARTE AVANTAGE</h3>
			</nuxt-link>

			<section class="relative col-span-2 bg-integration bg-cover rounded-card">
				<div class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-6 whitespace-nowrap text-xl font-poppins_extrabold py-3 px-5 bg-background-100/50">
					DÉFIS D’INTÉGRATIONS
				</div>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
const data = await getUser(user?.model?.id);


definePageMeta({
	middleware: 'auth',
});
</script>