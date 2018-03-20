// const echarts = require('echarts')

class EchartHandle {
	constructor (divid, config) {
		this.myChart = echarts.init(document.getElementById(divid))
		this.config = config
    // this.myChart.on('mapSelect', this.mapClick)
	}
	initChart () {
		this.myChart.setOption(this.config, true)
	}
  mapClick (param) {
    console.log('map:', param)
  }
  resize (width, height, silent) {
  	this.myChart.resize(width, height, silent)
  }
}

export default EchartHandle;