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

			<div v-if="bdeData" v-for="member of bdeData" :key="member.id">
				<div class="flex gap-3 items-center">
					<img :src="member.thumbnail_url" alt="" class="rounded-full w-12 h-12 object-cover"/>
					<div>
						<p class="text-lg font-poppins_semibold">{{ member.first_name }} <span class="uppercase">{{ member.last_name }}</span></p>
						<span class="text-white-200 font-poppins_light">{{ member.role.name }}</span>
					</div>
				</div>
			</div>

			<Loader v-else/>
		</section>
	</main>
</template>

<script setup lang="ts">
</script>
