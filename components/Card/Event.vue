<template>
	<section class="h-28 rounded-card bg-background-200 flex gap-3">
		<img :src="thumbnail" alt="" class="h-full aspect-square object-cover rounded-card">

		<div class="py-5 pr-4 w-full">
			<h2 class="text-lg font-poppins_semibold line-clamp-1">{{ data?.name }}</h2>
			<div class="flex gap-1 items-center text-sm text-white-200 font-poppins_light pt-1 pb-2">
				<IconsCalendar class="mb-0.5"/>
				<p>{{ date.number }} {{ date.mounth }} - {{ date.hour }}</p>
			</div>

			<div class="flex justify-between">
				<div class="flex space-x-[-.375rem] items-center">
					<div v-for="(people, index) of peopleThumbnails">
						<img v-if="index < 2" :src="people" alt="" class="h-6 w-6 rounded-full ring-2 ring-background-200">
						<div v-else class="h-6 w-6 rounded-full text-sm font-poppins_semibold flex justify-center items-center text-black ring-2 ring-background-200 bg-secondary">
							+{{ peopleLength() - 2 }}
						</div>
					</div>
				</div>
				<ButtonPrimary @click="event(user?.model?.id)" :variante="data?.people?.includes(user?.model?.id)"/>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const data = ref(await getEvent());
const thumbnail = await getPicture(data?.value?.id, 'events');
function peopleLength() {
	return data?.value?.people?.length;
}

const peopleThumbnails = ref(await getThumbnail(data?.value?.expand?.people));
async function getThumbnail(data: any) {
	let pictures = [];
	for (let i = 0; i < data.length; i++) {
		const response = await getPicture(data[i].id, 'users');
		pictures.push(response);
	}
	return pictures;
}

async function event(id: string) {
	let response = await getEvent()
	let newTab: any[] = Array.isArray(response?.people) ? [...response.people] : [];
	if(newTab.includes(id)) {
		newTab = newTab.filter(person => person !== id);
	} else  {
		newTab = [...response?.people, id]
	}
	data.value = await pocketbase.collection('events').update(response?.id, {people: newTab}, {expand: 'people'})
	peopleThumbnails.value = await getThumbnail(data?.value?.expand?.people)
}


const getDate = new Date(data?.value?.start_date);
const date = {
	mounth: getDate.toLocaleString('fr-FR', { month: 'short' }).toUpperCase().slice(0, 3),
	number: getDate.toLocaleDateString('fr-FR', { day: 'numeric' }),
	hour: getDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
}
</script>