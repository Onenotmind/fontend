<template>
	<div id="myAssetsService">
		<myAssets v-show="currentView === 'myAssets'" />
	</div>
</template>
<style>
	
</style>
<script>
import myAssets from './myAssets/myAssets.vue'
export default {
	data () {
		return {
			currentView: 'myAssets'
		}
	},
	methods: {
		
	},
	components: {
		myAssets
	}
}
</script>