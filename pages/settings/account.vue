<template>
	<Header link="/settings" title="Compte"/>
	<form v-if="userData" action="/app/pages/settings/account.vue" method="post" @submit.prevent="update">
		<fieldset class="flex flex-col gap-5">
			<ThumbnailUpload @thumbnail="thumbnail" :picture="userData.thumbnail_url"/>

			<div class="flex flex-col gap-2">
				<label for="first_name" class="text-white-200 text-lg">Votre prénom</label>
				<input
					oninput="this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase()"
					id="first_name"
					type="text"
					required aria-required="true"
					placeholder="Prénom"
					v-model="userData.first_name">
			</div>

			<div class="flex flex-col gap-2">
				<label for="last_name" class="text-white-200 text-lg">Votre nom</label>
				<input
					oninput="this.value = this.value.toUpperCase()"
					id="last_name"
					type="text"
					required aria-required="true"
					placeholder="Nom"
					v-model="userData.last_name"
					class="uppercase">
			</div>

			<!-- <div class="flex flex-col gap-2">
				<label for="email" class="text-white-200 text-lg">Votre adresse mail</label>
				<input
					oninput="this.value = this.value.toLowerCase()"
					id="email"
					type="email"
					required aria-required="true" 
					placeholder="Adresse mail"
					v-model="userData.email">
			</div> -->

			<div class="flex flex-col gap-2 w-full">
				<label for="class" class="text-white-200 text-lg">Votre année de BUT</label>
				<select 
					id="class"
					required aria-required="true" 
					v-model="userData.class"
					class="bg-background-100">
					<option value="1">BUT I</option>
					<option value="2">BUT II</option>
					<option value="3">BUT III</option>
				</select>
			</div>

			<div class="flex flex-col gap-2 w-full">
				<label for="speciality" class="text-white-200 text-lg">Votre spécialité de BUT</label>
				<select 
					id="speciality"
					required aria-required="true" 
					v-model="userData.speciality"
					class="bg-background-100"
					>
					<option v-for="speciality of specialities" :value=speciality.id>{{ speciality.name }}</option>
				</select>
			</div>
		</fieldset>

		<button type="submit" class="generic-button w-full my-10">SAUVEGARDER</button>
	</form>

	<CardPopup v-if="data" :data="data"/>
</template>

<script setup lang="ts">
const specialities = ref(await getSpecialities());

const data = ref();

const update = async () => {
	data.value = await updateUser(userData.value);
	setTimeout(() => {
		data.value = null;
	}, 3000);
}

const thumbnail = (file: File) => {
	userData.value.thumbnail = file;
};
</script>