import pocketBase from 'pocketbase';
export const pocketbase = new pocketBase(useRuntimeConfig().public.DATABASE_URL);

export const user = pocketbase.authStore

export const signOut = () => {
	pocketbase.authStore.clear()
	navigateTo('/signin')
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

export const getBDE = async () => {
	return await pocketbase.collection('users').getFullList({filter: 'bde != ""'});
}

export const getBDEroles = async () => {
	return await pocketbase.collection('bde').getFullList()
}

export async function getPicture(id: string, collection: string) {
	const data = await pocketbase.collection(collection).getOne(id);
	return pocketbase.files.getUrl(data, data.thumbnail);
}

export async function getEvents() {
    const response = await pocketbase.collection('events').getFullList({
        expand: 'people'
    });

    for (const event of response) {
        if (event.expand && event.expand.people) {
            for (const people of event.expand.people) {
                people.thumbnail_url = pocketbase.files.getUrl(people, people.thumbnail);
            }
        }
    }
    return response;
}

export async function getEvent() {
	const events = await getEvents();
	const today = new Date();

	const futureEvents = events.filter(event => new Date(event.start_date) > today);

	if (futureEvents.length > 0) {
		const closestFutureEvent = futureEvents.reduce((closest, event) => {
		const eventDate = new Date(event.start_date);
		const closestDate = new Date(closest.start_date);
		return eventDate < closestDate ? event : closest;
		});
		return closestFutureEvent;
	}

	const pastEvents = events.filter(event => new Date(event.end_date) < today);

	if (pastEvents.length > 0) {
		const closestPastEvent = pastEvents.reduce((closest, event) => {
		const eventDate = new Date(event.start_date);
		const closestDate = new Date(closest.start_date);
		return eventDate > closestDate ? event : closest;
		});
		return closestPastEvent;
	}

	return null;
}

export const getSpecialities = async () => {
	return await pocketbase.collection('user_speciality').getFullList()
}

export const getPartner = async (id: string) => {
	return await pocketbase.collection('partners').getOne(id)
}

export const getPartners = async () => {
	return await pocketbase.collection('partners').getFullList({sort: 'name'})
}

const currentDay = new Date();
export const dataDay = {
	month: currentDay.toLocaleString('fr-FR', { month: 'short' }).toUpperCase().slice(0, 3),
	number: currentDay.toLocaleDateString('fr-FR', { day: '2-digit' }),
	name: currentDay.toLocaleString('fr-FR', { weekday: 'long' }).toUpperCase(),
}