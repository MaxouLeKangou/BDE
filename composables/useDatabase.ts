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
		userData.value = await pocketbase.collection('users').update(user?.model?.id, account)
		return 'update'
	} catch (error) {
		return error
	}
}


export const resetPassword = async () => {
	await pocketbase.collection('users').requestPasswordReset(userData.value.email)
	return 'resetpassword'
}


export let bdeData = ref()

async function getBDE() {
	try {
		const response = await pocketbase.collection('users').getFullList({ filter: 'bde != ""', expand:'bde' })
		attachThumbnail(response, 'thumbnail')

		const members = response.sort((a, b) => {
            const rankA = a.expand?.bde.rank;
            const rankB = b.expand?.bde.rank;

            return rankA - rankB;
        });

		localStorage.setItem('bde', JSON.stringify(members));
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

export let nextEvent = ref()

export async function getNextEvent() {
	try {

		const date = getFormattedDate();

		const next = await pocketbase.collection('events').getList(1, 1, { filter: `end_date > "${date}"`, sort: 'end_date', expand: 'people, people.speciality' })
		attachThumbnail(next?.items, 'thumbnail')

		if (next.items.length > 0) {
			const closest = next.items[0]
			attachThumbnail(closest, 'expand')

			closest.convertDate = await convertDate(closest.start_date)

			localStorage.setItem('nextEvent', JSON.stringify(closest));
			await getDataNextEvent()
			return
		}

		const last = await pocketbase.collection('events').getList(1, 1, { filter: `end_date > "${date}"`, sort: '-end_date', expand: 'people, people.speciality' })
		attachThumbnail(last?.items, 'thumbnail')

		if (last.items.length > 0) {
			const closest = last.items[0]
			attachThumbnail(closest, 'expand')

			closest.convertDate = await convertDate(closest.start_date)

			localStorage.setItem('nextEvent', JSON.stringify(closest));
			await getDataNextEvent()
			return
		}

		return null
	}
	catch {}
}
getNextEvent()

export const getDataNextEvent = async () => {
	const data = localStorage.getItem('nextEvent')
	if(data) {
		nextEvent.value = JSON.parse(data)
	} else {
		await getNextEvent()
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


function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export async function convertDate(date: string) {
	const newDate = new Date(date)
	const convert = {
		mounth: newDate
			.toLocaleString("fr-FR", { month: "short", timeZone: "UTC" })
			.toUpperCase()
			.slice(0, 3),
		number: newDate.toLocaleDateString("fr-FR", { day: "numeric", timeZone: "UTC" }),
		hour: newDate.toLocaleTimeString("fr-FR", {
			hour: "2-digit",
			minute: "2-digit",
			timeZone: "UTC"
		}),
	}
	return convert
}