<template>
	<img :src="thumbnail" alt="" class="w-10 h-10 rounded-full object-cover outline outline-white-200 outline-offset-4">
</template>

<script setup lang="ts">
const thumbnail = await getPicture(user?.model?.id, 'users');
</script>