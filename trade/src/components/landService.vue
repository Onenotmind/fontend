<template>
	<div id="landService">
		<baseLand v-show="currentView === 'baseLand'" />
	</div>
</template>
<style>
	
</style>
<script>
import baseLand from './land/baseLand.vue'
export default {
	data () {
		return {
			currentView: 'baseLand'
		}
	},
	methods: {
		
	},
	components: {
		baseLand
	}
}
</script>