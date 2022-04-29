<template lang="pug">
.notification-message
	.nm-userlist
		template(v-for="user in receiverList")
			.nm-individual(@click="viewMessage(user.userId)" :class="{'active': currentMessageUserId === user.userId}")
				c-avatar(:firstName="user.firstName" :lastName="user.lastName" size="small")
				.nm-individual-info
					p.info-name {{ user.firstName }} {{ user.lastName }}
					p.info-message {{ user.lastMessage }}
				.nm-individual-day
					p.nm-new-notify(v-if="user.newMessage") New
					p.nm-date {{ user.last_on }}
	.nm-messagebox
		.nm-messagebox-content
			.nm-messagebox-message(v-for="message in messageList")
				c-avatar(:firstName="message.firstName" :lastName="message.lastName")
				.nm-message-info
					p.info-name {{ message.firstName }} {{ message.lastName }}
					p.info-message(v-html="message.message")
					p.info-file(v-if="message.file")
						icon(name="document")
						.info-file-main
							p {{ message.file.name }}
							a(:href="message.file.link") Download
						icon.info-file-more(name="more")
				.nm-message-day
					p.nm-date {{ message.date }}
		.mm-messagebox-input
			Editor.field-body(v-model="newMessage" :init="{ height: 200, plugins: [ 'advlist autolink lists link image charmap print preview anchor' ], toolbar: 'bullist numlist outdent indent | removeformat | help'}")
			c-button.send-button(title="Send" type="primary" @click="send()")
</template>


<script>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
import cUpload from "~/components/Inputs/cUpload.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
import useProfile from "~/store/Profile.js";
import { formatDate } from "~/core/utils";

const receiverList = ref([
	{
		"firstName": "Andrew",
		"lastName": "Gomez",
		"lastMessage": "Hey John, Lorem ipsum ...",
		"last_on": "10:00 AM",
		"userId": 1
	}, {
		"firstName": "John",
		"lastName": "Smith",
		"lastMessage": "I don't believe this is ...",
		"last_on": "2 days ago",
		"userId": 2
	}, {
		"firstName": "Manuel1",
		"lastName": "Test3",
		"lastMessage": "Hey John, thought I'd ...",
		"last_on": "10 days ago",
		"userId": "622b3a70707898214ac277a8"
	}, {
		"firstName": "Manuel",
		"lastName": "Online 6",
		"lastMessage": "Hey John, thought I'd ...",
		"last_on": "10 days ago",
		"userId": "6253a3f8c84dff21a809acbc"
	}
]);
const messageList = ref([
	{
		"firstName": "Hahn",
		"lastName": "Nguyen",
		"message": "<p>Hey John,</p><br/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
		"date": "10 days ago",
		"file": {
			"name": "document.pdf",
			"link": "...."
		}
	}, {
		"firstName": "Andrew",
		"lastName": "Gomez",
		"message": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
		"date": "10 days ago"
	}, {
		"firstName": "Hahn",
		"lastName": "Nguyen",
		"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
		"file": {
			"name": "document.pdf",
			"link": "...."
		},
		"date": "10 days ago"
	}
]);
export default {
	"components": { cBanner, cModal, cUpload, cAvatar },
	setup () {
		const newMessage = ref( "" );
		const { profile } = useProfile();
		let websocket;
		const currentMessageUserId = ref( "" );
		const WS_URI = import.meta.env.VITE_WS;
		const scrollToBottom = ( behavior = "auto" ) => {
			nextTick( () => {
				const container = document.getElementsByClassName( "nm-messagebox-content" )[0];
				container.scrollTo({ "top": container.scrollHeight, behavior });
			});
		};
		const connect = () => {
			websocket = new WebSocket( WS_URI );
			websocket.onclose = ({ wasClean, code, reason }) => {
				console.debug( `onclose:   ${JSON.stringify({ wasClean, code, reason })}` );
			};
			websocket.onerror = error => {
				console.debug( error );
			};
			websocket.onmessage = ({ data }) => {
				if ( JSON.parse( data ).type === "ping" ) return;
				const messageData = JSON.parse( data ).message;
				if ( messageData && messageData.receiver_id === profile.value._id ) {
					if ( messageData.sender_id === currentMessageUserId.value ) {
						messageList.value.push( messageData );
						scrollToBottom( "smooth" );
					} else {
						const receiverUser = receiverList.value.find( user => user.userId === messageData.sender_id );
						receiverUser.newMessage = true;
						receiverUser.lastMessage = `${messageData.message.slice( 0, 15 )}...`;
					}
				}
			};
			websocket.onopen = () => {
				websocket.send( JSON.stringify({
					"command": "subscribe",
					"identifier": "{\"channel\": \"MessageChannel\"}"
				}) );
			};
		};
		const send = () => {
			const data = {
				"sender_id": profile.value._id,
				"receiver_id": currentMessageUserId.value,
				"firstName": profile.value.firstName,
				"lastName": profile.value.lastName,
				"message": newMessage.value,
				"action": "my_method",
				"date": "1:44 PM"
			};
			messageList.value.push( data );
			websocket.send( JSON.stringify({
				"command": "message",
				"identifier": "{\"channel\": \"MessageChannel\"}",
				"data": JSON.stringify( data )
			}) );
			newMessage.value = "";

			scrollToBottom( "smooth" );
		};
		const disconnect = () => {
			websocket.close();
		};

		const viewMessage = id => {
			currentMessageUserId.value = id;
			receiverList.value.find( user => user.userId === id ).newMessage = false;
			newMessage.value = "";
			scrollToBottom( "smooth" );
		};
		onMounted( () => connect() );
		onUnmounted( () => disconnect() );

		return {
			newMessage,
			send,
			receiverList,
			messageList,
			viewMessage,
			formatDate,
			currentMessageUserId
		};
	}
};
</script>


<style lang="stylus" scoped>
.notification-message
	border: 1px solid var(--c-border)
	border-radius: 5px
	display: flex
	flex-direction: row
	.nm-userlist
		width: 25%
		border-right: 1px solid var(--c-border)
		.nm-individual
			cursor: pointer
			border-bottom: 1px solid var(--c-border)
			display: flex
			flex-direction: row
			gap: 0.6em
			padding: 0.6em
			align-items: center
			&.active
				background: var(--c-grey-100)
			.nm-individual-info
				.info-name
					font-size: 1em
					font-weight: 700
				.info-message
					font-size: 0.875em
					color: var(--c-grey-500)
			.nm-individual-day
				margin-left: auto;
				text-align: right;
				.nm-date
					font-size: 0.875em
					color: var(--c-grey-500)
				.nm-new-notify
					font-size: 0.875em
					padding: 0.25em 0.75em
					background: var(--c-yellow-100)
					color: var(--c-yellow-700)
					display: inline-block
	.nm-messagebox
		width: 75%
		height: 48em
		.nm-messagebox-content
			border-bottom: 1px solid var(--c-border)
			height: 30em
			padding: 0em 1em 0.5em 1em
			overflow: auto
			.nm-messagebox-message
				border-bottom: 1px solid var(--c-border)
				padding: 1.25em 0
				display: flex
				flex-direction: row
				gap: 0.6em
				.nm-message-info
					.info-name
						font-size: 1em
						font-weight: 700
					.info-message
						font-size: 0.875em
						color: var(--c-grey-900)
					.info-file
						display: flex
						flex-direction: row
						gap: 1em
						padding: 0.6em
						border: 1px solid var(--c-border)
						border-radius: 5px
						background: var(--c-blue-100)
						max-width: 15em
						.info-file-more
							margin-left: auto
				.nm-message-day
					margin-left: auto;
					.nm-date
						font-size: 0.875em
						color: var(--c-grey-500)
		.mm-messagebox-input
			padding: 1em
			height: 18em
			.send-button
				margin-left: auto;
				margin-top: 1.5em

</style>
