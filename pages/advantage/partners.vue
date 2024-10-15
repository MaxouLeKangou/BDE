<template>
    <Header link="/" title="nos partenaires" />

    <main>
        <SearchBar v-model="search" />
        <div class="flex flex-col gap-5 py-5">
            <DialogRoot v-if="partnersData" v-for="partner of filteredPartners">
                <DialogTrigger class="flex justify-between items-center">
                    <div class="flex gap-3 items-center text-left">
                        <div class="w-14 h-14">
                            <img v-if="partner.thumbnail_url" :src="partner.thumbnail_url" alt="" class="h-full w-full object-cover rounded-full"/>
                            <div v-else class="loading-pulse w-full h-full rounded-full"></div>
                        </div>
                        <div class="flex flex-col gap-1">
                            <h2 class="text-lg font-poppins_semibold">
                                {{ partner.name }}
                            </h2>
                            <p class="font-poppins_light text-white-200">
                                <span class="font-poppins_extrabold text-primary-200">
                                    {{ partner.reduction }}%
                                </span>
                                de réduction
                            </p>
                        </div>
                    </div>
                    <IconsBack class="rotate-180" />
                </DialogTrigger>

                <DialogPortal>
                    <DialogOverlay class="bg-background-100/50 data-[state=open]:animate-overlayShow fixed inset-0 z-30"/>
                    <DialogContent class="bg-background-200 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[80vh] max-h-[600px] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-card p-5 pt-14 pb-20 focus:outline-none z-50 flex flex-col">
                        <div class="flex gap-3 mb-5">
                            <img :src="partner.thumbnail_url" alt="" class="h-24 aspect-square object-cover rounded-full"/>
            
                            <div class="flex flex-col gap-1 pt-3">
                                <DialogTitle class="m-0 text-lg font-poppins_semibold">
                                    {{ partner?.name }}
                                </DialogTitle>
                                <p class="text_sm font-poppins_light text-white-200">
                                    <span class="font-poppins_extrabold text-primary-200">
                                        {{ partner.reduction }}%
                                    </span>
                                    de réduction
                                </p>
                                <nuxt-link :to="partner?.url_location" class="flex gap-1 items-center text-sm text-white-200 font-poppins_light">
                                    <IconsLocation class="mb-0.5" />
                                    <p class="underline">{{ partner?.name_location }}</p>
                                </nuxt-link>
                            </div>
                        </div>
                        <DialogDescription class="font-poppins_light">
                            {{ partner?.description }}
                        </DialogDescription>
                        <DialogClose class="absolute top-5 right-5" aria-label="Close">
                            <IconsClose/>
                        </DialogClose>
                    </DialogContent>
                </DialogPortal>
            </DialogRoot>

            <Loader v-else/>
        </div>
    </main>
</template>

<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from "radix-vue";

const search = ref('');

const filteredPartners = computed(() => {
    return partnersData?.value?.filter((partner) =>
        partner.name.toLowerCase().includes(search.value.toLowerCase())
    );
});

definePageMeta({
	middleware: ['auth', 'member'],
});
</script>