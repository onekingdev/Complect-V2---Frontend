<template lang="pug">
c-chat(:comments="comments")
</template>


<script>
import cChat from "~/components/Misc/cChat.vue";

import { ref, reactive, computed, onMounted } from "vue"
import { randomMongoId, randomBool, randomNumber, randomElement } from "~/_devmode/generator/components/atoms/utils.js";
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
import { randomGenders } from "~/_devmode/generator/components/molecules/randomGenders.js";
import { randomFirstNames, randomLastNames } from "~/_devmode/generator/components/molecules/randomName.js";
import { randomDatesInRange } from "~/_devmode/generator/components/molecules/randomDate.js";
import { randomAvatars } from "~/_devmode/generator/components/molecules/randomAvatars.js";
import { sortArrayByKey } from "~/core/utils"
export default {
	components: { cChat },
	setup() {
		
		const comments = ref([])

		const generateComments = () => {
			const items = []
			for ( let i = 1; i < randomNumber(10,20); i++ ) {
				const date = randomDatesInRange({q: 1, shift: [-50, 0]})[0]
				const gender = randomGenders({ q: 1 })[0];
				items.push({
					"_id": randomMongoId(),
					"date": date,
					"author": {
						"firstName": randomFirstNames({q: 1, gender})[0],
						"lastName": randomLastNames({ q: 1 })[0],
						"avatar": randomAvatars({q: 1, gender})[0]
					},
					"text": randomTitles({w: [3, 30]})[0] + '.',
					"files": []
				});
			}
			sortArrayByKey(items, 'date', true)
			comments.value = items
		}
		
		onMounted(() => generateComments())
		return { comments }
	}
};
</script>


<style lang="stylus" scoped>
</style>