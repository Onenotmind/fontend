import Vue from 'vue'
import App from './app.vue'
import proManage from './proManage/proManage.vue'
// import router from './router'
import iView from 'iView'
import VueI18n from 'vue-i18n'
import en from 'iview/dist/locale/en-US'
import zh from 'iview/dist/locale/zh-CN'
import 'iview/dist/styles/iview.css'
import BaseCanvas from './libs/charactor/BaseCanvas.js'
import MapHandle from './libs/map/MapHandle.js'
import EchartHandle from './libs/map/EchartHandle.js'

import testMap from './images/map/maptest.jpg'
import { mapConfig } from './libs/map/mapConfig.js'

// let baseCanvas = new BaseCanvas('cvs')
Vue.use(VueI18n)
Vue.locale = () => {}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'cn', // set locale
})

Vue.use(iView)

new Vue({
  el: '#app',
  // router,
  i18n: i18n,
  template: '<App/>',
  components: { App }
})

export default i18n

/* charactor canvas */
// baseCanvas.drawCharactor()
//自定义类型
// const types = {
//   land: 0,
//   ocean: 1
// };
// //自定义阈值
// const threshold = {
//   land: {
//     r: [23, 43],
//     g: [48, 68],
//     b: [88, 108],
//     a: [0, 255],
//   },
//   ocean: {
//     r: [52, 82],
//     g: [119, 159],
//     b: [160, 200],
//     a: [0, 255],
//   }
// };
// async function gridMap () {
// 	await baseCanvas.drawCharactorPart(testMap, 0, 0)
// 	let ctx = baseCanvas.getCanvasData()
// 	let data = ctx.getImageData(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight).data;

//   let typesFromPicture = new MapHandle(ctx.canvas, types, threshold);
//   console.log('data', typesFromPicture)
//   let types_data = typesFromPicture.calTypesFromPixels(data);

//   //坐标化成100*100
//   let result = typesFromPicture.gridFromTypes(types_data, 100, 100);

//   console.log(JSON.stringify(result));
//   ctx.scale(0.5, 0.5)
// }

// gridMap()

/* echarts 地图尝试 */
// let echartsMap = new EchartHandle('app', mapConfig)
// echartsMap.initChart()