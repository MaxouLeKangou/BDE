<template>
	<Header link="/" title="ton bde" />
	<main class="flex flex-col gap-14">
		<section class="flex flex-col gap-3">
			<h3 class="text-lg font-poppins_semibold">C'EST QUOI, LE BDE ?</h3>
			<p class="text-white-200">
				Le BDE, c’est une équipe de folie prête à sacrifier des nuits (enfin, ça dépend pour qui) afin de vous proposer des soirées et des activités tout au long de l’année.<br /><br />
				Mais le BDE change ! Des élections sont prévues pour organiser une passation digne de ce nom et faire perdurer cette petite communauté afin que nous puissions continuer à nous amuser.<br /><br />
				Vous pouvez discuter avec des membres du BDE pour comprendre leurs rôles au sein de l’équipe. D’ailleurs, en parlant d’équipe, voici ses membres !
			</p>
		</section>

		<section class="flex flex-col gap-3">
			<h3 class="text-lg font-poppins_semibold">L’ÉQUIPE DES BEAUVAIS (AHHHH)</h3>

			<div v-for="role in filteredRoles" :key="role.id">
				<div v-for="member in membersByRole(role.id)" :key="member.id">
					<div class="flex gap-3 items-center">
						<img :src="member.thumbnail" alt="" class="rounded-full w-12 h-12 object-cover"/>
						<div>
							<p class="text-lg font-poppins_semibold">{{ member.first_name }} {{ member.last_name }}</p>
							<span class="text-white-200 font-poppins_light">{{ role.name }}</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
const members = ref(await getBDE());
const roles = ref(await getBDEroles());

const thumbnails = ref(await getThumbnails(members.value));

async function getThumbnails(members: any[]) {
  let pictures = [];
  for (let i = 0; i < members.length; i++) {
    const response = await getPicture(members[i].id, 'users');
    pictures.push(response);
  }
  return pictures;
}

function membersByRole(id: string) {
  const filteredMembers = members.value.filter(member => member.bde === id);
  
  filteredMembers.forEach((member) => {
    member.thumbnail = thumbnails.value[members.value.findIndex(m => m.id === member.id)];
  });

  return filteredMembers;
}

const filteredRoles = computed(() => {
  return roles.value.filter(role => membersByRole(role.id).length > 0);
});
</script>
