<template>
	<div id="marketService">
		<mainMarket v-show="currentView === 'mainMarket'" />
	</div>
</template>
<style>
	
</style>
<script>
import mainMarket from './market/mainMarket.vue'
export default {
	data () {
		return {
			currentView: 'mainMarket'
		}
	},
	methods: {
		
	},
	components: {
		mainMarket
	}
}
</script>