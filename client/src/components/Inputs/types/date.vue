<template lang="pug">
input(type="date" :value="date")
</template>


<script>
export default {
	"props": {},
	setup () {
		const unixTime = Date.now();
		const date = new Date( unixTime ).toISOString().split( "T" )[0];
		return { date };
	}
};
</script>
