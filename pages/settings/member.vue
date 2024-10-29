<template>
	<Header link="/settings" title="carte avantage"/>
	<main>
		<section class="rounded-card px-5 py-8 bg-background-200">
			<div class="border-b-[1px] border-white-300">
				<div class="h-12 aspect-square bg-primary-100/10 rounded-md p-2 flex flex-col justify-center">
					<img src="../../assets/img/DIAMOND.png" alt="">
				</div>

				<div class="my-5">
					<div class="flex flex-col mb-2">
						<h2 class="text-xl font-poppins_extrabold">Compte GOAT</h2>
						<p class="text-[2.875rem] font-poppins_extrabold">7.50€ <span class="text-lg font-poppins">/an</span></p>
					</div>
					<p >Pour un max d'avantages en tout genre</p>
				</div>
			</div>

			<ul class="flex flex-col gap-3 my-5 text-lg">
				<li class="flex items-center gap-2">
					<IconsSettingsCheck class="text-primary-200"/>
					<p>Accès à la carte BDE MMI</p>
				</li>
				<li class="flex items-center gap-2">
					<IconsSettingsCheck class="text-primary-200"/>
					<p>Remise chez nos partenaires</p>
				</li>
				<li class="flex items-center gap-2">
					<IconsSettingsCheck class="text-primary-200"/>
					<p>Remise lors des soirées privées</p>
				</li>
				<li class="flex items-center gap-2">
					<IconsSettingsCheck class="text-primary-200"/>
					<p>Remise de 5€ sur les hoodies</p>
				</li>
				<li class="flex items-center gap-2">
					<IconsSettingsCheck class="text-primary-200"/>
					<p>Et pleins d'autres...</p>
				</li>
			</ul>

			<div class="mt-10">
				<div v-if="userData?.member" class="flex gap-2 items-center justify-center rounded-full py-4 px-12 text-lg font-poppins_semibold border border-white-300">
					<IconsSettingsCheck class="text-green-500"/>
					<p>Déjà un GOAT</p>
				</div>
				<nuxt-link v-else to="" class="generic-button block w-full">
					Obtenir la carte
				</nuxt-link>
			</div>
		</section>
		
		<section class="flex flex-col gap-2 my-10">
			<h2 class="text-xl font-poppins_semibold">En savoir plus</h2>
			<p>Si vous souhaitez payer en liquide, n'hésitez pas à contacter les membres du BDE via Discord ou sur le compte Instagram du BDE !</p>
		</section>
	</main>
</template>