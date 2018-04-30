<template>
	<div id="guideService">
		<guide v-show="currentView === 'guide'" />
	</div>
</template>
<style>
	
</style>
<script>
import guide from './guide/guide.vue'
export default {
	data () {
		return {
			currentView: 'guide'
		}
	},
	methods: {
		
	},
	components: {
		guide
	}
}
</script>