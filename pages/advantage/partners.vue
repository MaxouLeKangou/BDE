<template>
    <Header link="/" title="nos partenaires" />

    <main>
        <SearchBar v-model="search" />

        <div class="flex flex-col gap-5 py-5">
            <nuxt-link
				to="/"
                v-for="(partner, index) of filteredPartners"
                :key="partner.id"
                class="flex justify-between items-center">
                <div class="flex gap-3 items-center">
                    <img
                        :src="filteredThumbnails[index]"
                        alt=""
                        class="rounded-full w-14 h-14 object-cover"/>
                    <div>
                        <h2 class="text-lg font-poppins_semibold">
                            {{ partner.name }}
                        </h2>
                        <p class="font-poppins_light text-white-200">
                            <span
                                class="font-poppins_extrabold text-primary-200">
								{{ partner.reduction }}%
							</span>
                            de réduction
                        </p>
                    </div>
                </div>
                <IconsBack class="rotate-180" />
            </nuxt-link>
        </div>
    </main>
</template>

<script setup lang="ts">
const search = ref('');

const partners = ref(await getPartners());
const thumbnails = ref(await getThumbnail(partners.value));

async function getThumbnail(data: any) {
    let pictures = [];
    for (let i = 0; i < data.length; i++) {
        const response = await getPicture(data[i].id, "partners");
        pictures.push(response);
    }
    return pictures;
}

const filteredPartners = computed(() => {
    return partners.value.filter((partner) =>
        partner.name.toLowerCase().includes(search.value.toLowerCase())
    );
});

const filteredThumbnails = computed(() => {
    const filteredIndexes = partners.value
        .map((partner, index) => ({ partner, index }))
        .filter((item) =>
            item.partner.name.toLowerCase().includes(search.value.toLowerCase())
        )
        .map((item) => item.index);

    return filteredIndexes.map((index) => thumbnails.value[index]);
});
</script>