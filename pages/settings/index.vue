<template>
	<Header link="/" title="paramètres"/>
	<main class="flex flex-col gap-8">
		<CardMember/>
		<section>
			<h2 class="text-xl font-poppins_semibold pb-4">Paramètres du compte</h2>
			<div class="flex flex-col gap-3 text-lg">
				<nuxt-link :to="'/settings/' + setting.id" class="flex justify-between items-center py-1.5" v-for="setting of settingsAccount">
					<div class="flex gap-3">
						<component :is="setting.icon"/>
						<h3>{{ setting.title }}</h3>
					</div>
					<IconsBack class="rotate-180"/>
				</nuxt-link>
			</div>
		</section>

		<section>
			<h2 class="text-xl font-poppins_semibold pb-4">À propos</h2>
			<div class="flex flex-col gap-3 text-lg">
				<nuxt-link :to="'/settings/' + setting.id" class="flex justify-between items-center py-1.5" v-for="setting of settingsAbout">
					<div class="flex gap-3">
						<component :is="setting.icon"/>
						<h3>{{ setting.title }}</h3>
					</div>
					<IconsBack class="rotate-180"/>
				</nuxt-link>
			</div>
		</section>

		<section class="py-10">
			<button @click="signOut()" class="py-4 text-red-500 border border-red-500/50 bg-red-500/20 w-full rounded-md">SE DÉCONNECTER</button>
		</section>
	</main>
</template>

<script setup lang="ts">
import account from '~/components/icons/Settings/Account.vue'
import security from '~/components/icons/Settings/Security.vue'
import notifications from '~/components/icons/Settings/Notifications.vue'
import updates from '~/components/icons/Settings/Updates.vue'
import confidentiality from '~/components/icons/Settings/Confidentiality.vue';
import termsuse from '~/components/icons/Settings/TermsUse.vue';
import bug from '~/components/icons/Settings/Bug.vue';

const settingsAccount = [
	{
		id: 'account',
		title: 'Compte',
		icon: account,
	},
	{
		id: 'security',
		title: 'Mot de passe & Sécurité',
		icon: security,
	},
	{
		id: 'notifications',
		title: 'Notifications',
		icon: notifications,
	},
]

const settingsAbout = [
	{
		id: 'updates',
		title: 'Version & Mise à jours',
		icon: updates,
	},
	{
		id: 'confidentiality',
		title: 'Politique de confidentialité',
		icon: confidentiality,
	},
	{
		id: 'termsuse',
		title: 'Conditions d’utilisation',
		icon: termsuse,
	},
	{
		id: 'bug',
		title: 'Signaler un bug',
		icon: bug,
	},
]

definePageMeta({
	middleware: 'auth',
});
</script>