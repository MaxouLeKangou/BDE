<template>
    <DialogRoot>
        <DialogTrigger @click="getNextEvent()" class="h-28 w-full col-span-2 rounded-card bg-background-200 flex gap-3">
            <div class="h-full aspect-square">
                <img v-if="nextEvent?.thumbnail_url" :src="nextEvent?.thumbnail_url" alt="" class="h-full w-full object-cover rounded-card"/>
                <div v-else class="loading-pulse w-full h-full rounded-card"></div>
            </div>
            <div class="py-4 pr-4 h-full w-full flex flex-col justify-between">
                <div class="flex flex-col gap-1">
                    <h2 class="text-lg font-poppins_semibold line-clamp-1 text-left" :class="{ 'loading-pulse h-5 rounded-md': !nextEvent }">
                        {{ nextEvent?.name }}
                    </h2>
                    <div class="flex gap-1 items-center text-sm text-white-200 font-poppins_light" :class="{ 'loading-pulse h-3 w-1/2 rounded-md': !nextEvent?.convertDate }">
                        <IconsCalendar v-if="nextEvent?.convertDate" class="mb-0.5" />
                        <p v-if="nextEvent?.convertDate">{{ nextEvent?.convertDate?.number }} {{ nextEvent?.convertDate?.mounth }} - {{ nextEvent?.convertDate?.hour }}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-[-0.375rem]">
                        <div v-for="person of nextEvent?.expand?.people.slice(0, 2)" :key="person.id">
                            <img v-if="person.thumbnail_url" :src="person.thumbnail_url" alt="" class="h-6 w-6 rounded-full ring-2 ring-background-200"/>
                            <img v-else src="../../assets/img/thumbnail/default.webp" alt="" class="h-6 w-6 rounded-full ring-2 ring-background-200"/>
                        </div>
                        <div v-if="nextEvent?.expand?.people?.length > 2" class="h-6 w-6 rounded-full text-sm font-poppins_semibold flex justify-center items-center text-black ring-2 ring-background-200 bg-secondary ml-1">
                            +{{ nextEvent.expand.people.length - 2 }}
                        </div>
                    </div>
                    <IconsBack class="rotate-180"/>
                </div>
            </div>
        </DialogTrigger>

        <DialogPortal>
            <DialogOverlay class="bg-background-100/50 data-[state=open]:animate-overlayShow fixed inset-0 z-30"/>
            <DialogContent class="bg-background-200 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[80vh] max-h-[600px] overflow-auto w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-card p-5 pt-11 pb-16 focus:outline-none z-50 flex flex-col">

                <div class="flex gap-3 mb-5">
                    <img :src="nextEvent?.thumbnail_url" alt="" class="h-24 aspect-square object-cover rounded-card"/>
                    
                    <div class="flex flex-col gap-1 pt-3">
                        <DialogTitle class="m-0 text-lg font-poppins_semibold">
                            {{ nextEvent?.name }}
                        </DialogTitle>
                        <div class="flex gap-1 items-center text-sm text-white-200 font-poppins_light">
                            <IconsCalendar class="mb-0.5" />
                            <p v-if="nextEvent?.convertDate">{{ nextEvent?.convertDate?.number }} {{ nextEvent?.convertDate?.mounth }} - {{ nextEvent?.convertDate?.hour }}</p>
                        </div>
                        <nuxt-link :to="nextEvent?.url_location" class="flex gap-1 items-center text-sm text-white-200 font-poppins_light">
                            <IconsLocation class="mb-0.5" />
                            <p class="underline">{{ nextEvent?.name_location }}</p>
                        </nuxt-link>
                    </div>
                </div>

                <DialogDescription>
                    <p class="font-poppins_light whitespace-pre-wrap line-clamp-[8]">{{ nextEvent.description }}</p>
                </DialogDescription>

                <section v-if="nextEvent?.expand?.people.length > 0" class="mt-5 flex-grow overflow-y-auto relative">
                    <div class="sticky top-0 flex justify-between items-center bg-background-200 pb-2">
                        <h3 class="text-lg font-poppins_semibold">LES TÊTES DE LA SOIRÉE</h3>
                        <p class="text-primary-200 font-poppins_light">{{ nextEvent?.expand?.people?.length }}
                            <span v-if="nextEvent?.expand?.people?.length > 1"> Personnes</span>
                            <span v-else> Personne</span>
                        </p>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div v-for="people of nextEvent?.expand?.people" class="flex gap-3 items-center">
                            <img v-if="people?.thumbnail_url" :src="people.thumbnail_url" alt="" class="h-12 w-12 rounded-full"/>
                            <img v-else src="../../assets/img/thumbnail/default.webp" alt="" class="h-12 w-12 rounded-full"/>
                            <div>
                                <div class="font-poppins_semibold">
                                    <p>{{ people?.first_name }} <span class="uppercase">{{ people?.last_name }}</span></p>
                                </div>
                                <div class="font-poppins_light text-white-200">
                                    <p>BUT {{ people?.class }} - {{ people?.expand?.speciality?.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ButtonPrimary @click="update()" :variante="nextEvent?.people?.includes(user?.model?.id)" class="absolute right-5 bottom-7"/>

                <DialogClose class="absolute top-5 right-5" aria-label="Close">
                    <IconsClose/>
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from "radix-vue";

const open = ref(false);

async function update() {
    if(nextEvent?.value?.people?.includes(user?.model?.id)) {
        await pocketbase.collection('events').update(nextEvent?.value?.id, { 'people-': user?.model?.id });
    } else {
        await pocketbase.collection('events').update(nextEvent?.value?.id, { 'people+': user?.model?.id });
    }
    await getNextEvent();
}
</script>