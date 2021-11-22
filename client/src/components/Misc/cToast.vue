<template lang="pug">
.c-toast(:class="type")
	icon.status(:name="type")
	.content
		.title {{ title || type }}
		.message(v-if="message") {{ message }}
	c-button(type="icon" icon="close" @click="deleteNotification(id)")
</template>


<script>
import { onMounted, ref } from "vue";
import useNotifications from "~/store/Notifications.js";
export default {
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"type": {
			"type": String,
			"default": "info"
		},
		"title": {
			"type": String,
			"default": ""
		},
		"message": {
			"type": String,
			"default": ""
		},
		"autoClose": {
			"type": Boolean,
			"default": true
		},
		"duration": {
			"type": Number,
			"default": 5
		}
	},
	setup ( props ) {
		const { deleteNotification } = useNotifications();
		const timer = ref( -1 );
		const startedAt = ref( 0 );
		const delay = ref( 0 );

		const close = () => deleteNotification( props.id );

		onMounted( () => {
			if ( props.autoClose ) {
				startedAt.value = Date.now();
				delay.value = props.duration * 1000;
				timer.value = setTimeout( close, delay.value );
			}
		});

		return { deleteNotification };
	}
};
</script>

<style lang="stylus" scoped>
.c-toast
	z-index: 10
	top: 0.4em
	right: 0.4em
	padding: 0.7em 1em
	background: #303132
	border-left: 0.4em solid transparent
	color: #fff
	display: flex
	align-items: center
	gap: 1em
	width: 22em
	svg.icon
		flex-shrink: 0
		&.status
			width: 1.5em
			height: 1.5em
	.c-button
		flex-shrink: 0
		align-self: flex-start
		:deep(svg.icon)
			fill: #fff !important
	.content
		flex: 1 1 auto
		.title
			font-weight: bold
			text-transform: capitalize
			line-height: 1.3
		.message
			font-size: 0.9em
			line-height: 1.4
		.title + .message
			margin-top: 0.2em
	&.info
		border-color: var(--c-info)
	&.success
		border-color: var(--c-success)
	&.warning
		border-color: var(--c-warning)
	&.error
		border-color: var(--c-error)
</style>
