<template lang="pug">
.c-plans
	.plan-card.card-style(v-for="(plan, index) in plans" :key="index" :class="[plan.key]")

		template(v-if="modelValue === plan.key")
			c-button(title="Current Plan" type="primary")
		template(v-else)
			c-button(title="Select Plan" type="plan" @click="selectPlan(plan.key)")

		.header
			.title {{plan.title}}
			.intro {{plan.intro}}
		.price
			template(v-if="plan.price[0]")
				template(v-if="annually")
					template(v-if="type == 'specialist'")
						.per-year-big ${{plan.price[0]}}/year
					template(v-else)
						.per-month
							.actual-price ${{plan.price[0]}}/mo
							.old-price ${{plan.price[1]}}/mo
						.per-year ${{plan.price[0] * 12}}/year
					.users(v-if="plan.users") {{plan.users[0]}}
				template(v-else)
					.per-month
						.actual-price ${{plan.price[1]}}/mo
					.users(v-if="plan.users") {{plan.users[1]}}
			template(v-else)
				.per-month FREE
				.users(v-if="plan.users") {{plan.users[0]}}

		.benefits
			.benefit(v-for="(benefit, index) in plan.benefits" :key="index")
				icon(name="success")
				.desctiption(v-html="benefit")
</template>


<script>
export default {
	"props": {
		"type": {
			"type": String,
			"required": true
		},
		"plans": {
			"type": Array,
			"required": true
		},
		"modelValue": {
			"type": String,
			"default": ""
		},
		"annually": Boolean
	},
	"emits": [
		"update:modelValue", "checkout"
	],
	setup ( props, context ) {
		const selectPlan = plan => {
			context.emit( "update:modelValue", plan );
			context.emit( "checkout" );
		};
		return { selectPlan };
	}
};
</script>


<style lang="stylus" scoped>
.c-plans
	display: flex
	justify-content: center
	flex-wrap: wrap
	gap: 2em
	.plan-card
		flex: 1
		display: flex
		flex-direction: column
		align-items: flex-start
		gap: 1.5em
		min-width: 18em
		max-width: 24em
		padding: 2em 2em 4em
		.title
			font-size: 1.3em
			font-weight: bold
		.intro
			line-height: 1.3
		.price
			.per-month, .per-year, .per-year-big
				font-weight: bold
				line-height: 1.5
			.per-month
				display: flex
				align-items: baseline
				font-size: 1.6em
				.old-price
					margin-left: 0.4em
					text-decoration: line-through
					font-size: 0.6em
			.per-year-big
				font-size: 1.6em
			.per-year
				font-size: 1em
				color: var(--c-green)
			.users
				font-size: 0.9em
				color: #797b7e
		.benefits
			border-top: 1px solid var(--c-border)
			.benefit
				display: flex
				gap: 0.7em
				align-items: flex-start
				line-height: 1.3
				margin-top: 1em
				svg.icon
					width: 1.2em
					height: 1.2em
					margin-top: 0.05em
					flex-shrink: 0
		&.standard
			box-shadow: 0 -0.3em 0 0 #dcdee4
		&.starter
			box-shadow: 0 -0.3em 0 0 var(--c-green)
		&.team
			box-shadow: 0 -0.3em 0 0 #0479ff
		&.business, &.full-access
			box-shadow: 0 -0.3em 0 0 var(--c-primary)
</style>
