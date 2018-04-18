<template>
	<div id="discoverService">
		<discover v-show="currentView === 'discover'" />
	</div>
</template>
<style>
	
</style>
<script>
import discover from './discover/discover.vue'
export default {
	data () {
		return {
			currentView: 'discover'
		}
	},
	methods: {
		
	},
	components: {
		discover
	}
}
</script>