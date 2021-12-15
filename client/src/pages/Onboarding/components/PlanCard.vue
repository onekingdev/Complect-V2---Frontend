<template lang="pug">
.plan-container(:class="[type]")
  c-button(title="Select Plan")
  div.infor
    h3.plan-name {{ plan.name }}
    div.description {{ plan.shortIntroduce }}
    div.costText
      | {{ plan.costText }}
      span.discount(v-if="plan.discountText") {{ plan.discountText }}
    div.yearCostText(v-if="plan.yearCostText") {{ plan.yearCostText }}
    div.userNumberText(v-if="plan.userNumberText") {{ plan.userNumberText }}
  div.divider
  div.benefit-list
    div.benefit-list-item.grid-6(v-for="(item, index) in plan.benefits" :index="index")
      icon.col-1(name="success")
      span.col-5(v-html="item")
</template>


<script>
export default {
	"props": {
		"plan": {
			"type": Object,
			"required": true,
			"default": () => []
		},
		"type": {
			"type": String,
			"required": true,
			"default": ""
		}
	}
};
</script>
<style lang="stylus" scoped>
.plan-container
  position: relative
  padding: 2em 2em
  flex-direction: column
  min-width: 0
  word-wrap: break-word
  background-color: var(--c-bg-z2)
  background-clip: border-box
  box-shadow: 0 -5px 0
  border-radius: 4px
  &.primary
    box-shadow: 0 -5px 0 var(--c-success)
  &.medium
    box-shadow: 0 -5px 0 var(--c-link)
  &.standard
    box-shadow: 0 -5px 0 var(--c-border)
  .divider
    margin: 1.5em auto
  .infor
    min-height: 12em
  .plan-name
    font-weight: bold
    margin: 0.8em 0 0.5em 0
  .costText
    font-weight: bold
    font-size: 1.5em
    margin-top: 0.7em
    .discount
      font-weight: 600
      font-size: 0.7em
      text-decoration: line-through
      margin-left: 0.2em
  .userNumberText
    font-size: 0.9em
    color: var(--c-dimmed)
  .yearCostText
    font-size: 0.9em
    font-weight: bold
    color: var(--c-text-green)
    margin-bottom: 0.2em
    vertical-align: text-bottom
  .benefit-list
    &-item
      margin: 0.5em 0
      gap: 0 !important
      grid-auto-flow: column
      grid-template-columns: minmax(20px, auto) 1fr 1fr
      span
        position: relative
        top: -0.3em
        left: 0.5em
</style>
