<template>
	<main class="heightfix flex flex-col">
		<header class="flex justify-center py-14">
			<Logo class="h-24 w-24 text-primary-100"/>
		</header>

		<div class="flex flex-grow flex-col justify-between">
			<section class="mb-10">
				<h2 class="font-poppins_semibold text-3xl">Connexion au compte</h2>
				<p class="text-white-200">Connectez-vous en un éclair ! Entrez simplement votre email et votre mot de passe !</p>
			</section>

			<div class="h-full flex flex-grow flex-col">
				<form action="/app/app.vue" method="post" @submit.prevent="signIn()">
					<fieldset class="flex flex-col gap-3 mb-3">
						<div>
							<label for="email" class="sr-only">Votre adresse mail</label>
							<input
								oninput="this.value = this.value.toLowerCase()"
								id="email"
								type="email"
								required aria-required="true"
								placeholder="Adresse mail"
								v-model="account.email"
								class="focus:outline-none focus:border-white/75">
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
					</fieldset>
					<p class="text-white-200 text-right">
						<nuxt-link to="/">mot de passe oublié ?</nuxt-link>
					</p>
					<p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
					<button type="submit" class="generic-button w-full mt-10">CONNEXION</button>
				</form>
			</div>

		</div>
		<p class="absolute bottom-10 left-0 right-0 flex justify-center text-center"><nuxt-link to="/signup" class="underline">vous n'avez pas de compte ?</nuxt-link></p>
	</main>
</template>

<script setup lang="ts">
const account = ref({
	email: '',
	password: ''
})

const error = ref(null as any)
const signIn = async () => {
	const request = await useSignIn(account.value)
	if(request) {
		if (JSON.stringify(request).includes('Please verify your account first')) {
			error.value = 'Votre compte est en cours de vérification !'
		} else {
			error.value = 'Informations incorrect'
		}
		account.value.password = ''
	}
}

const isPasswordVisible = ref(false)

definePageMeta({
	middleware: 'auth',
})
</script>