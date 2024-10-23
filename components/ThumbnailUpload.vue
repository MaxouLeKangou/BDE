<template>
	<div class="flex justify-center">
		<label v-if="!thumbnail" for="thumbnail" class="flex justify-center items-center min-w-20 max-w-20 h-20 border border-white-300 rounded-full">
			<input
				@change="handleThumbnail($event?.target?.files[0])"
				id="thumbnail"
				type="file"
				class="hidden">
			<IconsUpload/>
		</label>
		<div v-else @click="resetThumbnail" class="min-w-20 max-w-20 h-20">
			<img :src="thumbnail" class="object-cover rounded-full w-full h-full">
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	picture: String
});
const thumbnail = ref();
const emit = defineEmits(['thumbnail']);

if(props.picture) {
	thumbnail.value = props.picture;
}

const resetThumbnail = () => {
	thumbnail.value = null;
	emit('thumbnail', null);
}

const handleThumbnail = (file: File) => {
	const reader = new FileReader();
	reader.onload = () => {
		thumbnail.value = reader.result;
		emit('thumbnail', file)
	};
	reader.readAsDataURL(file);	
}
</script>