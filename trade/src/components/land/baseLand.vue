<i18n src='../../common/i18n/ethcombo/combo.json'></i18n>
<template>
	<div id="baseLand">
		<div id="container" :class="{ 'landScaleLarger': scale==='larger', 'landScaleSmall': scale==='small'}" @click="changeScale" @blur="mapBlur" tabindex="0"></div>
	</div>
</template>
<style scoped>
#container {
  position: absolute;
  z-index: 5000;
  border: 1px solid #999;
}
.landScaleLarger {
	height: 600px;
  width: 1080px;
  left: 50%;
  top: 75px;
  margin-left: -540px;
}
.landScaleSmall {
	height: 100px;
	width: 150px;
	left: 40px;
	top: 70%;
}
.dragable {
	pointer-events:none;
}
</style>
<script>
import EchartHandle from '../../libs/map/EchartHandle.js'
import {mapConfig} from '../../libs/map/mapConfig.js'

	export default {
	data () {
		return {
			echartHandle: null,
			scale: 'small'
		}
	},
	mounted () {
		this.echartHandle = new EchartHandle('container', mapConfig)
		this.echartHandle.initChart()
	},
	methods: {
		changeScale () {
			this.scale = 'larger'
			setTimeout(() => {
				this.resize(1080, 600, false)
			}, 100)
		},
		mapBlur () {
			this.scale = 'small'
			setTimeout(() => {
				this.resize(150, 100, false)
			}, 50)
		},
		resize(width, height, silent) {
			this.echartHandle.resize(width, height, silent)
		}
	},
	components: {
		
	}
}
</script>