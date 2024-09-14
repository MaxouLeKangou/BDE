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
				await pocketbase.collection('users').create({
					username: null,
					email: account.email,
					thumbnail: account.thumbnail,
					first_name: account.first_name,
					last_name: account.last_name.toUpperCase(),
					class: account.class,
					speciality: account.speciality,
					member: account.member,
					bde: account.bde,
					password: account.password,
					passwordConfirm: account.passwordConfirm,
				})

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

export const getUser = async (id: string) => {
	return await pocketbase.collection('users').getOne(id)
}



export const getSpecialities = async () => {
	return await pocketbase.collection('user_speciality').getFullList()
}