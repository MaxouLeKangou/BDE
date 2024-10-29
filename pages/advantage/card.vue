<template>
	<Header link="/" title="ta carte avantage"/>
	<main>
		<section
			class="card-container"
			@mousemove="rotateCard"
			@mouseleave="resetCard"
			@touchmove.prevent="rotateCard"
			@touchend="resetCard"
			@mouseup="resetCard"
		>
			<div class="card card-gradient rounded-xl aspect-[16/9]">
				<div class="glare absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none"></div>
				<div class="p-5 flex flex-col justify-between h-full">
					<Logo class="w-8 h-8 text-white" />
					<p class="text-lg font-semibold font-poppins text-white tracking-wide">0104 0911 1412 1706</p>
					<div class="flex justify-between text-white">
						<p class="uppercase">{{ user?.model?.first_name }} {{ user?.model?.last_name }}</p>
						<span>{{ expirationDate }}</span>
					</div>
				</div>
			</div>
		</section>
		
		<p class="text-lg pt-10">Pour utiliser votre carte d’avantage BDE MMI chez nos partenaires, vous devez présenter cette carte, ainsi que votre carte étudiante !</p>
	</main>
</template>

<script setup lang="ts">
const expirationDate = '2024/2025'

const rotateCard = (e) => {
  const card = e.currentTarget.querySelector('.card')
  const rect = card.getBoundingClientRect()

  const x = (e.clientX || e.touches[0].clientX) - rect.left
  const y = (e.clientY || e.touches[0].clientY) - rect.top

  const halfWidth = rect.width / 2
  const halfHeight = rect.height / 2
  const rotateX = (y - halfHeight) / halfHeight * 15
  const rotateY = (x - halfWidth) / halfWidth * 15

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  const glare = card.querySelector('.glare')
  const gX = (x / rect.width) * 100
  const gY = (y / rect.height) * 100
  glare.style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgba(255, 255, 255, 0.2), transparent)`
}

const resetCard = (e) => {
  const card = e.currentTarget.querySelector('.card')
  card.style.transform = 'rotateX(0deg) rotateY(0deg)'
  const glare = card.querySelector('.glare')
  glare.style.background = 'none'
}

definePageMeta({
	middleware: ['auth', 'member'],
});
</script>

<style scoped>
.card-container {
	perspective: 1000px;
}
.card {
	@apply transform transition-transform duration-300 ease-out;
	transform-style: preserve-3d;
}
</style>