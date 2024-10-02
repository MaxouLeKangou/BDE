<template>
    <DialogRoot>
        <DialogTrigger @click="upEvent()" class="h-28 w-full col-span-2 rounded-card bg-background-200 flex gap-3">
            <img :src="thumbnail" alt="" class="h-full aspect-square object-cover rounded-card"/>
            <div class="py-5 pr-4 w-full">
                <h2 class="text-lg font-poppins_semibold line-clamp-1 text-left">
                    {{ event?.name }}
                </h2>
                <div class="flex gap-1 items-center text-sm text-white-200 font-poppins_light pt-1 pb-2">
                    <IconsCalendar class="mb-0.5" />
                    <p>{{ date.number }} {{ date.mounth }} - {{ date.hour }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex space-x-[-.375rem] items-center">
                        <div v-for="(people, index) of event?.expand?.people">
                            <img v-if="index < 2" :src="people.thumbnail_url" alt="" class="h-6 w-6 rounded-full ring-2 ring-background-200"/>
                            <div v-else class="h-6 w-6 rounded-full text-sm font-poppins_semibold flex justify-center items-center text-black ring-2 ring-background-200 bg-secondary">
                                +{{ peopleLength() - 2 }}
                            </div>
                        </div>
                    </div>
                    <IconsBack class="rotate-180"/>
                </div>
            </div>
        </DialogTrigger>

        <DialogPortal>
            <DialogOverlay class="bg-background-100/50 data-[state=open]:animate-overlayShow fixed inset-0 z-30"/>
            <DialogContent class="bg-background-200 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[80vh] max-h-[600px] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-card p-5 pt-14 pb-20 focus:outline-none z-50 flex flex-col">


                <div class="flex gap-3 mb-5">
                    <img :src="thumbnail" alt="" class="h-24 aspect-square object-cover rounded-card"/>
                    
                    <div class="flex flex-col gap-1 pt-3">
                        <DialogTitle class="m-0 text-lg font-poppins_semibold">
                            {{ event?.name }}
                        </DialogTitle>
                        <div class="flex gap-1 items-center text-sm text-white-200 font-poppins_light">
                            <IconsCalendar class="mb-0.5" />
                            <p>{{ date.number }} {{ date.mounth }} - {{ date.hour }}</p>
                        </div>
                        <nuxt-link :to="event?.url_location" class="flex gap-1 items-center text-sm text-white-200 font-poppins_light">
                            <IconsLocation class="mb-0.5" />
                            <p class="underline">{{ event?.name_location }}</p>
                        </nuxt-link>
                    </div>
                </div>

                <DialogDescription class="font-poppins_light">
                    {{ event?.description }}
                </DialogDescription>

                <section class="mt-5 flex-grow overflow-y-auto relative">
                    <div class="sticky top-0 flex justify-between items-center bg-background-200 pb-3">
                        <h3 class="text-lg font-poppins_semibold">LES TÊTES DE LA SOIRÉE</h3>
                        <p class="text-primary-200 font-poppins_light">{{ peopleLength() }}
                            <span v-if="peopleLength() > 1"> Personnes</span>
                            <span v-else> Personne</span>
                        </p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div v-for="(people, index) of event?.expand?.people" class="flex gap-3 items-center">
                            <img :src="people.thumbnail_url" alt="" class="h-12 w-12 rounded-full ring-2 ring-background-200"/>
                            <div>
                                <div class="font-poppins_semibold">
                                    <p>{{ users[index].first_name }} {{ users[index].last_name }}</p>
                                </div>
                                <div class="font-poppins_light text-white-200">
                                    <p>BUT {{ users[index].class }} - {{ specialities.find(speciality => speciality.id === users[index].speciality).name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ButtonPrimary @click="updateEvent(user?.model?.id)" :variante="event?.people?.includes(user?.model?.id)" class="absolute right-5 bottom-7"/>

                <DialogClose class="absolute top-5 right-5" aria-label="Close">
                    <IconsClose/>
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from "radix-vue";

const event = ref(await getEvent());
const thumbnail = await getPicture(event?.value?.id, "events");

function peopleLength() {
    return event?.value?.people?.length;
}

const specialities = ref(await getSpecialities());

const users = ref(event?.value?.expand?.people);

async function upEvent() {
    event.value = await getEvent();
}

async function updateEvent(id: string) {
    let response = await getEvent();
    let newTab: any[] = Array.isArray(response?.people)
        ? [...response.people]
        : [];
    if (newTab.includes(id)) {
        newTab = newTab.filter((person) => person !== id);
    } else {
        newTab = [...response?.people, id];
    }
    await pocketbase.collection('events').update(response?.id, { people: newTab }, { expand: 'people' });
    event.value = await getEvent();
    users.value = event?.value?.expand?.people;
}

const getDate = new Date(event?.value?.start_date);
const date = {
    mounth: getDate
        .toLocaleString("fr-FR", { month: "short" })
        .toUpperCase()
        .slice(0, 3),
    number: getDate.toLocaleDateString("fr-FR", { day: "numeric" }),
    hour: getDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    }),
};
</script>
