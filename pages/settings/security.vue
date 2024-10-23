<template>
	<Header link="/settings" title="Mot de passe & Sécurité"/>
	<main class="content">
		<h2>Introduction</h2>
		<p>La sécurité de votre compte et la protection de vos informations personnelles sont notre priorité. Nous mettons en place des mesures robustes pour assurer que vos données sont sécurisées contre tout accès non autorisé. Cette section détaille les bonnes pratiques de sécurité et comment nous vous aidons à protéger vos informations sensibles.</p>

		<h2>Gestion du mot de passe</h2>
		<p>Pour garantir la sécurité de votre compte, il est important de choisir un mot de passe complexe et unique. Nous vous recommandons de :</p>
		<ul>
			<li>Utiliser au moins 8 caractères, incluant des majuscules, minuscules, chiffres et symboles.</li>
			<li>Ne jamais réutiliser un mot de passe utilisé pour un autre service.</li>
			<li>Changer régulièrement votre mot de passe, surtout en cas de suspicion de compromission.</li>
		</ul>

		<!-- <h2>Authentification à deux facteurs (2FA)</h2>
		<p>Pour renforcer la sécurité de votre compte, nous vous encourageons à activer l'authentification à deux facteurs (2FA). Cela ajoute une couche de protection supplémentaire en exigeant un second code de vérification lors de la connexion, en plus de votre mot de passe.</p> -->

		<h2>Mesures de sécurité mises en place</h2>
		<p>Nous avons mis en place des protocoles de sécurité modernes pour protéger vos informations, notamment :</p>
		<ul>
			<li>Chiffrement des mots de passe et des données sensibles.</li>
			<li>Mises à jour régulières des systèmes pour prévenir les vulnérabilités.</li>
		</ul>

		<h2>Conseils pour sécuriser votre compte</h2>
		<p>Voici quelques recommandations pour maintenir votre compte sécurisé :</p>
		<ul>
			<li>Ne partagez jamais votre mot de passe avec qui que ce soit.</li>
			<li>Utilisez un gestionnaire de mots de passe pour générer et stocker des mots de passe sécurisés.</li>
			<li>Activez les notifications de sécurité afin d’être informé immédiatement en cas d’activité suspecte.</li>
		</ul>

		<p>Si vous pensez que la sécurité de votre compte a été compromise, n'hésitez pas à changer votre mot de passe immédiatement et à nous contacter pour obtenir de l'aide.</p>
	</main>
	<form action="/app/pages/settings/security.vue" method="post" @submit.prevent="reset">
		<button type="submit" class="generic-button w-full my-10">RÉINITIALISER MOT DE PASSE</button>
	</form>

	<CardPopup v-if="data" :data="data"/>
</template>

<script setup lang="ts">
const data = ref();

const reset = async () => {
	data.value = await resetPassword();
	setTimeout(() => {
		data.value = null;
	}, 3000);
}

// async function reset() {
// 	await pocketbase.collection('users').requestPasswordReset('maxime.legrand@bessarion.fr')	
// }
</script>