<template>
	<Header link="/" title="Notifications" />

	<ul v-for="filter of filters">
		
	</ul>
</template>

<script setup lang="ts">

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