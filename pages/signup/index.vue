<template>
	<header>
		<ButtonBack v-if="currentStep === 1" link="/signin"/>
		<ButtonBack v-else @click="currentStep--" link="none"/>
	</header>
	<main>
		<section class="my-10">
			<h2 class="font-poppins_semibold text-3xl">Création du compte</h2>
			<p class="text-white-200">Créez votre compte en un tour de magie ! Prénom, email, mot de passe, ... et hop ! </p>
		</section>

		<form action="/app/app.vue" method="post" @submit.prevent="signUp()">
			<fieldset v-if="currentStep === 1" class="flex flex-col gap-10">
				<ThumbnailUpload @thumbnail="thumbnail"/>

				<div class="flex flex-col gap-5">
					<label for="first_name" class="sr-only">Votre prénom</label>
					<input
						oninput="this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase()"
						id="first_name"
						type="text"
						required aria-required="true"
						placeholder="Prénom"
						v-model="account.first_name">
					<label for="last_name" class="sr-only">Votre nom</label>
					<input
						oninput="this.value = this.value.toUpperCase()"
						id="last_name"
						type="text"
						required aria-required="true"
						placeholder="Nom"
						v-model="account.last_name"
						class="uppercase">
				</div>

			</fieldset>

			<section v-if="currentStep === 2" class="flex flex-col gap-10">
				<fieldset class="flex flex-col items-center gap-5">
					<div class="flex flex-col gap-2 w-full">
						<label for="class" class="text-lg font-poppins_semibold">Votre année de BUT</label>
						<select 
							id="class"
							required aria-required="true" 
							v-model="account.class"
							class="bg-background-100"
							>
							<option value="1">BUT I</option>
							<option value="2">BUT II</option>
							<option value="3">BUT III</option>
						</select>
					</div>

					<div class="flex flex-col gap-2 w-full">
						<label for="speciality" class="text-lg font-poppins_semibold">Votre spécialité de BUT</label>
						<select 
							id="speciality"
							required aria-required="true" 
							v-model="account.speciality"
							class="bg-background-100"
							>
							<option v-for="speciality of specialities" :value=speciality.id>{{ speciality.name }}</option>
						</select>
					</div>
				</fieldset>
			</section>

			<fieldset v-if="currentStep === 3" class="flex flex-col gap-5">
				<div>
					<label for="email" class="sr-only">Votre adresse mail</label>
					<input
						oninput="this.value = this.value.toLowerCase()" 
						id="email"
						type="email"
						required aria-required="true" 
						placeholder="Adresse mail"
						v-model="account.email">
				</div>

				<div class="relative">
					<label for="password" class="sr-only">Votre mot de passe</label>
					<input
						id="password"
						:type="isPasswordVisible ? 'text' : 'password'"
						required aria-required="true"
						placeholder="Mot de passe"
						v-model="account.password"
						class="input-password">
					<inputEye @click="isPasswordVisible = !isPasswordVisible" :isVisible="isPasswordVisible"/>
				</div>

				<div class="relative">
					<label for="confirmPassword" class="sr-only">Confirmation de votre mot de passe</label>
					<input
						id="confirmPassword"
						:type="isPasswordVisible ? 'text' : 'password'"
						required aria-required="true"
						placeholder="Confirmation mot de passe"
						v-model="account.passwordConfirm"
						class="input-password">
					<inputEye @click="isPasswordVisible = !isPasswordVisible" :isVisible="isPasswordVisible"/>
				</div>
			</fieldset>

			<p v-if="error" class="text-red-500 mt-3">{{ error }}</p>

			<button v-if="currentStep !== maxStep" @pointerdown="currentStep = (currentStep + 1)" type="button" class="generic-button w-full mt-10">SUIVANT</button>
			<button v-else type="submit" class="generic-button w-full mt-10">INSCRIPTION</button>
		</form>
	</main>
</template>

<script setup lang="ts">
const account = ref({
	username: null,
	email: '',
	thumbnail: null as File | null,
	first_name: '',
	last_name: '',
	class: null,
	speciality: '',
	member: false,
	bde: null,
	password: '',
	passwordConfirm: ''
})

const specialities = await getSpecialities();

const error = ref(null as any)
const signUp = async () => {
	const request = await useSignUp(account.value)
	error.value = request
	account.value.password = ''
	account.value.passwordConfirm = ''
}

const thumbnail = (file: File) => {
	account.value.thumbnail = file;
}

const currentStep = ref(1)
const maxStep = 3

const isPasswordVisible = ref(false)

definePageMeta({
	middleware: 'auth',
})
</script>