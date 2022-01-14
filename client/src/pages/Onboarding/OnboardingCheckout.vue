<template lang="pug">
.page-checkout
	main
		c-button(title="Back" @click="goBack()")
		header
			.title Time to power up
			.intro Review and confirm your subsctiption
		section
			.title Plan
			.content
				.plan
					.plan-name {{plan.name}}
					.plan-description {{plan.description}}
				.plan-price ${{plan.price}}/year

		section
			.content
				.plan
					.plan-name Payment Method
				c-button(title="Add Bank Account")
			c-field(placeholder="Card number")
			c-button.add-button(title="Add" type="primary")


	c-card.summary(title="Purchase Summary")
		template(#sub-header)
			c-field.col-5(label="Promo Code")
			c-button.col-1.apply-promo(title="Apply" type="primary")
		template(#content)
			.item
				.title {{plan.name}} plan
				.price ${{plan.price}}/year
			.total
				.title Total
				.price ${{plan.price}}
			c-button.purchase-button(title="Complete Purchase" type="plan" @click="onBoard()")
</template>


<script>
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";
import useForm from "~/store/Form.js";
import useAuth from "~/core/auth.js";
export default {
	setup () {
		const { profile } = useProfile();
		const { form, resetForm } = useForm( "onboarding" );
		const { onboarding } = useAuth();
		const plan = {
			"name": "All Access Membership",
			"description": "Full access to all features and resources",
			"price": 400,
			"annually": true
		};
		const router = useRouter();
		const goBack = () => router.go( -1 );
		const onBoard = async () => {
			try {
				await onboarding( form.value );
				profile.value.new = false;
				await resetForm();
				router.push({ "name": "Dashboard" });
			} catch ( error ) {
				console.error( error );
			}
		};

		return { plan, goBack, profile, form, onBoard };
	}
};
</script>


<style lang="stylus" scoped>
.page-checkout
	display: flex
	align-items: center
	gap: 2em
	overflow: scroll
	min-height: 100%
	main
		flex: 3 0 auto
		background: var(--c-bg-z2)
		align-self: stretch
		padding: 2em
		border-right: 1px solid var(--c-border)
		.title
			font-size: 1.6em
		header
			line-height: 1.3
			margin: 2.5em 0
		section
			.content
				margin-top: 1em
				padding: 1.5em 0
				display: flex
				gap: 2em
				align-items: baseline
				justify-content: space-between
				border-top: 1px solid var(--c-border)
			.plan-name, .plan-price
				font-weight: bold
				font-size: 1.3em
				line-height: 1.2
			.plan-description
				margin-top: 0.5em
				color: #797b7e
				font-size: 0.9em
				line-height: 1.3
		.item
			.title
				font-weight: bold
				font-size: 1.3em

		.add-button
			margin-top: 2em
			margin-left: auto


	.summary
		margin-right: 2em
		flex: 1 3 20em
		min-width: 20em
		// max-width: 28em
		.apply-promo
			align-self: end
		.item
			border-bottom: 1px solid var(--c-border)
			padding-bottom: 2em
			line-height: 1.3
		.item, .total
			display: flex
			gap: 1em
			justify-content: space-between
		.price, .total
			font-weight: bold
		.total
			font-size: 1.3em
		.purchase-button
			margin-top: 2em

</style>
