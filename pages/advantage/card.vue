<template>
	<Header link="/" title="ta carte avantage"/>
	<main>
		<section class="aspect-[16/9] w-full card-gradient rounded-xl p-5 flex flex-col justify-between">
			<Logo class="w-8 h-8 text-white-100"/>
			<p class="text-lg font-poppins_semibold">0104 0911 1412 1706</p>
			<div class="flex justify-between">
				<p class="uppercase">{{ user?.model?.first_name }} {{ user?.model?.last_name }}</p>
				<span>{{ expirationDate }}</span>
			</div>
		</section>
		<p class="text-lg pt-10">Pour utiliser votre carte d’avantage BDE MMI chez nos partenaires, vous devez présenter cette carte, ainsi que votre carte étudiante !</p>
	</main>
</template>

<script setup lang="ts">
const expirationDate = '2024/2025'
</script>