<template>
	<div id="myAssetsService">
		<myAssets ref="myAssets" v-show="currentView === 'myAssets'" />
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
		// 改变当前选中列表模块
    changeCurrentListItem (item) {
      this.$refs.myAssets.changeCurrentListItem(item)
    }
		
	},
	components: {
		myAssets
	}
}
</script>