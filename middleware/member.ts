export default defineNuxtRouteMiddleware((to, from) => {
	if (!userData?.value?.member) {
		if(to.path == '/advantage/card' || to.path == '/advantage/partners') {
			return navigateTo('/');
		}
	}
});