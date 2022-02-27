<template lang="pug">
card-container
	template(#content)
		h1 Confirm Your Email
		h3 We sent a 6 digit code to {{email}}. Please enter it below.
		icon(name="mail")
		.confirmation-code
			input(v-for="i in 6" :key="i" type="number" :ref="el => { if (el) inputs[i-1] = el }" v-model="numbers[i-1]" required)
		c-button(title="Submit" type="primary" @click="submitCode()" fullwidth)
	template(#footer)
		c-button(title="Send new code" type="link" @click="sendNewCode()")
</template>


<script>
import { ref, computed, onMounted, onUnmounted, onBeforeUpdate } from "vue";
import useAuth from "~/core/auth.js";
export default {
	setup () {
		const { verification, newOtp } = useAuth();
		const email = ref( "" );
		const inputs = ref([]);
		const numbers = ref([]);
		const otp = computed( () => numbers.value.join( "" ) );


		const submitCode = () => verification( email.value, otp.value );
		const sendNewCode = async () => {
			await newOtp( email.value );
			numbers.value = [];
		};

		const keydownHandler = ( e, index ) => {
			if ( e.keyCode === 8 && e.target.value === "" ) inputs.value[index - 1].focus();
		};

		const inputHandler = ( e, index ) => {
			const [first] = e.target.value;
			e.target.value = first ?? "";
			if ( otp.value.length >= 6 ) inputs.value[index].blur();
			if ( index !== inputs.value.length - 1 && first !== undefined ) inputs.value[index + 1].focus();
			// inputs.value[index + 1].dispatchEvent( new Event( "input" ) );
		};


		// add Event Listners to all six number's inputs, for input & remove events
		onMounted( () => {
			if ( sessionStorage.getItem( "email" ) ) email.value = JSON.parse( sessionStorage.getItem( "email" ) );
			inputs.value.forEach( ( input, index ) => {
				input.addEventListener( "keydown", e => {
					keydownHandler( e, index );
				});
				input.addEventListener( "input", e => {
					inputHandler( e, index );
				});
			});
		});

		// remove Event Listners to all six number's inputs
		onUnmounted( () => {
			numbers.value = [];
			inputs.value.forEach( input => {
				input.removeEventListener( "keydown", keydownHandler );
				input.removeEventListener( "input", inputHandler );
			});
		});

		onBeforeUpdate( () => inputs.value = []);

		return {
			email,
			otp,
			inputs,
			numbers,
			submitCode,
			sendNewCode
		};
	}
};
</script>


<style lang="stylus" scoped>
svg.icon
	flex: 1
	display: block
	width: 12em
	height: 8em
	margin: 2em auto
.confirmation-code
	margin: 1em 1em 2em
	display: flex
	gap: 0.5em
	font-size: 1.6em
	input
		flex: 1 1 0
		width: 0
		min-width: 0
		padding: 1em 0
		text-align: center
		border: 1px solid var(--c-border)
		border-radius: var(--v-border-radius)
		&:focus
			border-color: var(--c-selected)
</style>
