<template>
	<button type="button" @click="redirect()" class="bg-white-100/5 w-10 h-10 rounded-full flex justify-center items-center">
		<iconsBack/>
	</button>
</template>

<script setup lang="ts">
const props = defineProps<{
  link?: string
}>()

const redirect = () => {
	if (props.link) {
		if (props.link !== 'none') {
  			useRouter().push(props.link)
		}
	} else {
		useRouter().back()
	}
}
</script>