<template lang="pug">
.page.grid-6
  card-container.col-4(title="Risk Heatmap")
    template(#content)
      .risks-heatmap
        .risks-heatmap-impact Impact
        .risks-heatmap-box-row
          .risks-heatmap-box-name High
          .risks-heatmap-box.medium 0
          .risks-heatmap-box.high 0
          .risks-heatmap-box.high 0
        .risks-heatmap-box-row
          .risks-heatmap-box-name Medium
          .risks-heatmap-box.low 0
          .risks-heatmap-box.high 0
          .risks-heatmap-box.high 0
        .risks-heatmap-box-row
          .risks-heatmap-box-name Low
          .risks-heatmap-box.medium 0
          .risks-heatmap-box.high 0
          .risks-heatmap-box.high 0
        .risks-heatmap-box-row
          .risks-heatmap-box-name
          .risks-heatmap-box.normal Low
          .risks-heatmap-box.normal Medium
          .risks-heatmap-box.normal High
      .risks-heatmap-likelihood Likelihood
  card-container.col-2(title="Risk Summary")
    template(#content)
      c-table.risk-summary(v-bind="{columns, documents}")
</template>


<script>
export default {
	setup () {
		const columns = [
			{
				"title": "Risk Level",
				"key": "risk-level",
				"cell": "CellRiskWarningLevel"
			}, {
				"title": "Count",
				"key": "count",
				"cell": "CellDefault"
			}, {
				"title": "%",
				"key": "percent",
				"cell": "CellDefault"
			}
		];

		const documents = [
			{
				"risk-level": "high",
				"count": 0,
				"percent": "0%"
			}, {
				"risk-level": "medium",
				"count": 0,
				"percent": "0%"
			}, {
				"risk-level": "low",
				"count": 0,
				"percent": "0%"
			}, {
				"risk-level": "total",
				"count": 0,
				"percent": "0%"
			}
		];

		return { columns, documents };
	}
};
</script>


<style lang="stylus" scoped>
.risks-heatmap
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2.25em;
  padding-left: 2em;
  width: 100%;
  height: 100%;
  &-impact
    display: block;
    position: absolute;
    font-weight: 600;
    font-size: 1em;
    top: 36%;
    left: 10%;
    transform: rotate(-90deg) translateY(-40%);
  &-box-row
    width: 100%;
    display: flex;
    .risks-heatmap-box-name
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 25%;
      font-size: 1em;
      margin-right: 15px;
  &-likelihood
    position: relative
    top: -5em;
    left: 2em;
    font-weight: bold;
    text-align: center;
.risks-heatmap-box
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5em;
  font-size: 1em;
  font-weight: 700;
  width: 17%;
  height: 6em;
  color: #fff;
  &.medium
    background-color: var(--c-gold);
  &.high
    background-color: var(--c-red);
  &.low
    background-color: var(--c-success);
  &.normal
    font-weight: normal;
    color: var(--c-text);
    position: relative;
    top: -2em;
.risk-summary
  :deep(tr:last-child)
    border-bottom: none;
    font-weight: bold;
  :deep(tr td:not(:first-child))
    .cell-default
      justify-content: flex-end;
  :deep(tr th:not(:first-child))
    .cell
      justify-content: flex-end;
</style>
