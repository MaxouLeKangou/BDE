export default defineNuxtRouteMiddleware((to, from) => {
	if (!user.isValid) {
		if(to.path !== '/signin' && to.path !== '/signup') {
			return navigateTo('/signin');
		}
	} else {
		if(to.path === '/signin' || to.path === '/signup') {
			return navigateTo('/');
		}
	}
});