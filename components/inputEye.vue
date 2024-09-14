<template>
	<button
		type="button"
		class="absolute top-[50%] translate-y-[-50%] right-5 flex items-center"
		>
		<span v-if="isVisible">
			<IconsEye/>
		</span>
		<span v-else>
			<IconsEyeClose/>
		</span>
	</button>
</template>

<script setup lang="ts">
const props = defineProps<{
  isVisible?: boolean
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