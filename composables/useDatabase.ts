import pocketBase from 'pocketbase';
export const pocketbase = new pocketBase(useRuntimeConfig().public.DATABASE_URL);

// const clear = pocketbase.authStore.clear()

export const user = pocketbase.authStore
console.log('User login : ' + user.isValid)
// export const redirect = () => {
// 	if (user.isValid) {
// 		useRouter().push('/')
// 	}
// }

export const authMethods = async () => {
	return (await pocketbase.collection('users').listAuthMethods()).authProviders
}

export const useSignIn = async (account: object) => {
	try {
		await pocketbase.collection('users').authWithPassword(account.email, account.password)
		navigateTo('/')
	} catch (error) {
		return error
	}
}

export const useSignUp = async (account: object) => {
	if(account.password === account.passwordConfirm) {
		if(account.password.length > 7) {
			try {
				await pocketbase.collection('users').create(account)
				await pocketbase.collection('users').requestVerification(account.email);

				const data = useState('account', () => account)
				navigateTo('/signup/verify')
			} catch (error) {
				console.log(error)
				return 'Erreur lors de la création du compte'
			}
		} else {
			return 'Votre mot de passe doit contenir au moins 8 caractères'
		}
	} else {
		return 'Les mots de passe ne correspondent pas'
	}
}

export const oAuth = async (provider: string) => {
	await pocketbase.collection('users').authWithOAuth2({ provider: provider }).then(async (response) => {
		const user = await getUser(response.record.id)
		if (user.pseudo !== response.meta?.name) {
			const avatar = await fetch(response.meta?.avatarUrl)
			const thumbnail = await avatar.blob()

			await pocketbase.collection('users').update(response.record.id, {
				pseudo: response.meta?.name,
				thumbnail: thumbnail
			})
			navigateTo('/')
		}
	})
}

export const getUser = async (id: string) => {
	return await pocketbase.collection('users').getOne(id)
}

// thumbnail
// const formData = new FormData()
// const thumbnail = await (await fetch(response.meta?.avatarUrl)).blob()
// formData.append('thumbnail', thumbnail)