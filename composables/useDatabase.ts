import pocketBase from 'pocketbase';
export const pocketbase = new pocketBase(useRuntimeConfig().public.DATABASE_URL);

export const user = pocketbase.authStore
export let userData = ref()

async function getUser() {
	try {
		const response = await pocketbase.collection('users').getOne(user?.model?.id)
		attachThumbnail(response, 'thumbnail')

		localStorage.setItem('user', JSON.stringify(response));
		await getDataUser()
	} catch (error) {
		signOut()
	}
}
getUser()

export const getDataUser = async () => {
	const data = localStorage.getItem('user')
	if(data) {
		userData.value = JSON.parse(data)
	} else {
		await getUser()
	}
}


export const updateUser = async (account: object) => {
	try {
		await pocketbase.collection('users').update(user?.model?.id, account)
		return 'update'
	} catch (error) {
		return error
	}
}



export let bdeData = ref()

async function getBDE() {
	try {
		const response = await pocketbase.collection('users').getFullList({ filter: 'bde != ""' })
		attachThumbnail(response, 'thumbnail')

		const roles = await pocketbase.collection('bde').getFullList();
		const roleOrder = roles.map(role => role.id);

		let members = [];

		for (const user of response) {
			user.role = roles.find((role) => role.id === user.bde);
			members.push(user);
		}

		members.sort((a, b) => {
			const roleAIndex = roleOrder.indexOf(a.bde);
			const roleBIndex = roleOrder.indexOf(b.bde);
			
			return roleAIndex - roleBIndex;
		});

		localStorage.setItem('bde', JSON.stringify(response));
		await getDataBDE()
	} catch (error) {
	}
}
getBDE()

export const getDataBDE = async () => {
	const data = localStorage.getItem('bde')
	if(data) {
		bdeData.value = JSON.parse(data)
	} else {
		await getBDE()
	}
}

export const signOut = () => {
	pocketbase.authStore.clear()
	navigateTo('/signin')
}

export const useSignIn = async (account: object) => {
	try {
		const response = await pocketbase.collection('users').authWithPassword(account.email, account.password)
		attachThumbnail(response.record, 'thumbnail')

		localStorage.setItem('user', JSON.stringify(response.record));
		await getUser()
		navigateTo('/')
	} catch (error) {
		console.log(error)
		return error
	}
}

function attachThumbnail(data: any, type: string) {
	switch (type) {
		case 'expand':
			if (data.expand && data.expand.people) {
				for (const people of data.expand.people) {
					people.thumbnail_url = pocketbase.files.getUrl(people, people.thumbnail);
				}
			}
			break;

		case 'thumbnail':
			if (Array.isArray(data)) {
				for (const item of data) {
					item.thumbnail_url = pocketbase.files.getUrl(item, item.thumbnail);
				}
			} else {
				data.thumbnail_url = pocketbase.files.getUrl(data, data.thumbnail);
			}
			break;
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

export async function getEvent() {
    const today = new Date().toISOString();

    const futureEvents = await pocketbase.collection('events').getList(1, 1, {
        filter: `start_date > "${today}"`,
        sort: 'start_date',
        expand: 'people',
    });

	attachThumbnail(futureEvents?.items, 'thumbnail')

    if (futureEvents.items.length > 0) {
        const closestFutureEvent = futureEvents.items[0];
        attachThumbnail(closestFutureEvent, 'expand');
        return closestFutureEvent;
    }

    const pastEvents = await pocketbase.collection('events').getList(1, 1, {
        filter: `end_date < "${today}"`,
        sort: '-start_date',
        expand: 'people',
    });

	attachThumbnail(pastEvents?.items, 'thumbnail')

    if (pastEvents.items.length > 0) {
        const closestPastEvent = pastEvents.items[0];
        attachThumbnail(closestPastEvent, 'expand');
        return closestPastEvent;
    }

    return null;
}



export const getSpecialities = async () => {
	return await pocketbase.collection('user_speciality').getFullList()
}

export let partnersData = ref()

async function getPartners() {
	try {
		const response = await pocketbase.collection('partners').getFullList({sort: 'name'})
		attachThumbnail(response, 'thumbnail')

		localStorage.setItem('partners', JSON.stringify(response));
		await getDataPartners()
	} catch (error) {
	}
}
getPartners()

export const getDataPartners = async () => {
	const data = localStorage.getItem('partners')
	if(data) {
		partnersData.value = JSON.parse(data)
	} else {
		await getPartners()
	}
}

const currentDay = new Date();
export const dataDay = {
	month: currentDay.toLocaleString('fr-FR', { month: 'short' }).toUpperCase().slice(0, 3),
	number: currentDay.toLocaleDateString('fr-FR', { day: '2-digit' }),
	name: currentDay.toLocaleString('fr-FR', { weekday: 'long' }).toUpperCase(),
}