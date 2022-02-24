<template lang="pug">
card-container(title="Payments")
	template(#content)
		.payments
			.payments-item
				p.title This month (Feb 2022)
				h3.amount $0
			.payments-item
				p.title Upcoming (Next 30 Days)
				h3.amount $0
			.payments-item
				p.title YTD
				h3.amount $0
			.payments-item
				p.title Total (All Time)
				h3.amount $0
card-container.budget(title="Annual Budget")
	template(#controls)
		.dropdowns-container
			c-dropdown(title="Edit" wide type="primary")
				.container
					c-field(type="number" placeholder="Annual budget")
				.container.butotns-container
					c-button(title="Save" type="primary")
	template(#content)
		vue-apex-charts(width="100%" height="250px" type="bar" :options="options" :series="series")
</template>


<script>
import VueApexCharts from "vue3-apexcharts";
import cDropdown from "~/components/Inputs/cDropdown.vue";

export default {
	"components": { cDropdown, VueApexCharts },
	setup () {
		const options = {
			"chart": {
				"id": "anual-chart",
				"toolbar": { "show": false }
			},
			"xaxis": {
				"categories": [
					"Spent", "Annual Budget"
				],
				"labels": {
					"style": {
						"fontSize": "12px",
						"fontFamily": "Public Sans, sans-serif",
						"fontWeight": "600",
						"colors": [
							"#A2A3A9", "#A2A3A9"
						],
						"cssClass": "apexcharts-xaxis-label"
					}
				}
			},
			"yaxis": {
				"labels": {
					"formatter" ( number ) {
						const SI_SYMBOL = [
							"",
							"k",
							"M",
							"G",
							"T",
							"P",
							"E"
						];
						/* eslint no-bitwise: ["error", { "int32Hint": true }] */
						const tier = Math.log10( Math.abs( number ) ) / 3 | 0;
						if ( tier === 0 ) return number;
						const suffix = SI_SYMBOL[tier];
						const scale = 10 ** ( tier * 3 );
						const scaled = number / scale;
						return `${scaled.toFixed( 1 )}${suffix}`;
					},
					"style": {
						"fontSize": "12px",
						"fontFamily": "Public Sans, sans-serif",
						"fontWeight": "600",
						"colors": ["#A2A3A9"],
						"cssClass": "apexcharts-yaxis-label"
					}
				}
			},
			"plotOptions": {
				"bar": {
					"horizontal": false,
					"columnWidth": "40px",
					"endingShape": "rounded"
				}
			},
			"dataLabels": { "enabled": false },
			"colors": [
				"#1AB27F", "#1F7055"
			]
		};

		const series = [{
			"name": "",
			"data": [
				30, 4000
			]
		}];

		return { options, series };
	}
};
</script>

<style lang="stylus" scoped>
.payments
	display: flex
	&-item
		border-right: 1px solid #dcdee4
		width: 25%;
		&:not(:first-child)
			padding: 0 1.5em
		&:last-child
			border-right: none
		.title
			font-size: 0.7em
			color: var(--c-grey)
		.amount
			font-weight: bold
.budget
	margin: 1.5em 0
.container
	display: flex;
	justify-content: space-between;
	gap: 1em;
	padding: 0.5em 1em;
</style>
