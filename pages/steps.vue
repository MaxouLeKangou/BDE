<template>
	<section class="h-screen pb-10 flex flex-col justify-end">
		<template v-if="currentStep === 1">
			<img src="../assets/img/steps/step_1.png" alt="" class="h-full w-full object-contain my-10">
			<div class="flex flex-col gap-5">
				<h1 class="text-3xl font-poppins_extrabold">LES ÉVÉNEMENTS</h1>
				<p class="text-lg">Sur l’application du BDE, vous recevrez les notifications des différents événements organisés. Vous pourrez vous ajouter à la liste et découvrir les autres têtes de la soirée !</p>
			</div>
		</template>
		<template v-if="currentStep === 2">
			<img src="../assets/img/steps/step_2.png" alt="" class="h-full w-full object-contain my-10">
			<div class="flex flex-col gap-5">
				<h1 class="text-3xl font-poppins_extrabold">DÉFIS D’INTÉGRATIONS</h1>
				<p class="text-lg">Retrouvez tous les défis d’intégration des premières années. Accomplissez ces défis pour obtenir un maximum de points et remporter des récompenses !</p>
			</div>
		</template>
		<template v-if="currentStep === 3">
			<img src="../assets/img/steps/step_3.png" alt="" class="h-full w-full object-contain my-10">
			<div class="flex flex-col gap-5">
				<h1 class="text-3xl font-poppins_extrabold">LA CARTE BDE</h1>
				<p class="text-lg">En adhérant au BDE, vous avez l’opportunité d’obtenir des réductions chez nos partenaires et de bénéficier de tarifs réduits sur les événements payants !</p>
			</div>
		</template>

		<div>
			<div class="flex justify-center gap-5 mb-5 mt-10">
				<button @click="currentStep = step" v-for="step of maxStep" class="h-2.5 w-2.5 rounded-full" :class="currentStep === step ? 'bg-primary-100' : 'bg-white-200'"></button>
			</div>

			<div class="flex justify-between items-center">
				<p class="text-lg font-poppins_semibold">
					<NuxtLink to="connection">Passer</NuxtLink>
				</p>

				<button @click="switchStep()" class="h-12 w-12 rounded-full bg-primary-100 flex justify-center items-center">
					<p class="sr-only">Suivant</p>
					<IconsArrow/>
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const currentStep = ref(1)
const maxStep = 3

const switchStep = () => {
	if (currentStep.value < maxStep) {
		currentStep.value++
	} else {
		navigateTo('/connection')
	}
}
</script>