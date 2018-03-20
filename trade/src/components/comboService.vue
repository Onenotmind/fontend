<template>
	<div id="comboService">
		<combo v-show="currentView === 'combo'" />
	</div>
</template>
<style>
	
</style>
<script>
import combo from './ethcombo/combo.vue'
export default {
	data () {
		return {
			currentView: 'combo'
		}
	},
	methods: {
		
	},
	components: {
		combo
	}
}
</script>