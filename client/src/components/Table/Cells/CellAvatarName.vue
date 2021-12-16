<template lang="pug">
div.float-left.avatar
  c-avatar(:firstName="firstName" :lastName="lastName" )
div.float-right.fullName
  div.name {{ firstName }} {{ lastName }}
  div.email {{ email }}
</template>
<script>
import { toRefs } from "vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": { cAvatar },
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	},
	setup ( props ) {
		const { firstName, lastName, avatarUrl, email } = toRefs( props.data );

		return {
			firstName,
			lastName,
			avatarUrl,
			email
		};
	}
};
</script>

<style lang="stylus" scoped>
.avatar
  width: 40px
.fullName
  width: calc(100% - 50px)
  .email
    color: var(--c-grey)
</style>
