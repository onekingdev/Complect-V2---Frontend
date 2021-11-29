<template lang="pug">
c-card
	template(#content)
		h1 Confirm Your Email
		h3 We sent a 6 digit code to {{email}}. Please enter it below.
		icon(name="mail")
		.confirmation-code
			input(v-for="i in 6" type="number" :ref="el => { if (el) inputs[i-1] = el }" v-model="numbers[i-1]" required)
		c-button(title="Submit" type="primary" @click="submitCode()" fullwidth)
	template(#footer)
		c-button(title="Send new code" type="link" @click="sendNewCode()")
</template>


<script>
import { ref, reactive, computed, onMounted, onUnmounted, onBeforeUpdate } from "vue"
export default {
	setup() {
		const email = ref("hello@gololobov.me");
		const inputs = ref([])
		const numbers = reactive([])
		const code = computed(() => numbers.join(''))

		const submitCode = () => console.log(`Submit code: ${code.value}`);
		const sendNewCode = () => console.log(`Send new code to: ${email.value}`);



		const keydownHandler = (e, index) => {
			if(e.keyCode === 8 && e.target.value === '') {
				inputs.value[index-1].focus()
			}
		}

		const inputHandler = (e, index) => {
			const [first,...rest] = e.target.value
			e.target.value = first ?? ''
			if (code.value.length >= 6) inputs.value[index].blur()
			if (index !== inputs.value.length-1 && first !== undefined) {
				inputs.value[index+1].focus()
				inputs.value[index+1].dispatchEvent(new Event('input'))
			}
		}

		
		
		// Add Event Listners to all six number's inputs, for input & remove events
		onMounted(() => {
			inputs.value.forEach((input, index) => {
				input.addEventListener('keydown', (e) => {keydownHandler(e, index)})
				input.addEventListener('input', (e) => {inputHandler(e, index)})
			})
		})

		// Remove Event Listners to all six number's inputs
		onUnmounted(() => {
			inputs.value.forEach(input => {
				input.removeEventListener('keydown', keydownHandler)
				input.removeEventListener('input', inputHandler)
			})
		})

		onBeforeUpdate(() => inputs.value = [])

		return { email, code, inputs, numbers, submitCode, sendNewCode }
	}
};
</script>


<style lang="stylus" scoped>
svg.icon
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
		flex: 1
		min-width: 0
		padding: 1em 0
		text-align: center
		border: 1px solid var(--c-border)
		border-radius: var(--v-border-radius)
		&:focus
			border-color: var(--c-selected)
</style>