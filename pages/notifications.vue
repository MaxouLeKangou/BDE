<template>
	<Header link="/" title="Notifications" />

	<section class="flex gap-1">
		<ul v-for="filter of filters">
			<li class="px-4 py-1" @click="select = filter.id" :class="{ 'outline outline-white-100/50 rounded-full': select == filter.id }">{{ filter.title }}</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
const select = ref('all')

const filters = [
	{
		id: 'all',
		title: 'toutes',
	},
	{
		id: 'events',
		title: 'événements',
	},
]
</script>