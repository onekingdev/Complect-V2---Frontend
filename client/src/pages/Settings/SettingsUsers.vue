<template lang="pug">
c-card(title="Users")
	template(#content)
		horizontal-tabs
			template(#tabs)
				router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}} ({{ usersCount[tab.title] }})
			template(#content)
				router-view
</template>


<script>
import HorizontalTabs from "~/components/Containers/HorizontalTabs.vue";
import { computed, onMounted, onUnmounted } from "vue";

// temp Random Users
import { randomBool, randomNumber, randomElement } from "~/_devmode/generator/components/atoms/utils.js";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers.js";
import { randomDatesInRange } from "~/_devmode/generator/components/molecules/randomDate.js";

import useData from "~/store/Data.js";
export default {
	"components": { HorizontalTabs },
	setup () {
		const tabs = [
			{
				"title": "Directory",
				"routeName": "SettingsUsersDirectory"
			}, {
				"title": "Disabled",
				"routeName": "SettingsUsersDisabled"
			}
		];


		// start _devMode
		// temp Random Users
		const { _devmode_pushToStore, clearStore } = useData( "users" );
		const usersRecords = computed( () => {
			const users = [];
			for ( let i = 1; i < randomNumber( 10, 20 ); i++ ) {
				const { first_name, last_name, email, avatar } = randomUsers({ "q": 1 })[0];
				const role = randomElement([
					"admin", "trusted", "basic", ""
				]);
				const disabled = randomBool( 30 );
				const start_date = randomDatesInRange({
					"q": 1,
					"shift": [
						-1000, -30
					]
				})[0];
				const user = {
					"user": {
						first_name,
						last_name,
						email,
						avatar
					},
					role,
					"access_person": role === "admin" ? randomBool( 40 ) : false,
					disabled,
					"reason": disabled ? randomElement([
						"termination", "resignation", "temporary", "other"
					]) : "",
					start_date,
					"disabled_date": disabled ? start_date + randomNumber( -1e2, 0 ) : ""
				};
				users.push( user );
			}
			return users;
		});

		const usersCount = computed( () => ({
			"Total": usersRecords.value.length,
			"Directory": usersRecords.value.filter( user => !user.disabled ).length,
			"Disabled": usersRecords.value.filter( user => user.disabled ).length
		}) );

		onMounted( async () => await _devmode_pushToStore( usersRecords.value ) );
		onUnmounted( () => clearStore() );
		// end _devMode -------------------------------------------


		return {
			tabs,
			usersCount
		};
	}
};
</script>
