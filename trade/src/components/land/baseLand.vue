<i18n src='../../common/i18n/land/baseLand.json'></i18n>
<template>
	<div id="baseLand">
		<!-- <div class="baseLand-bg"></div> -->
		<landBg />
		<div id="container" :class="{ 'landScaleLarger': scale==='larger', 'landScaleSmall': scale==='small'}" @click="changeScale" @blur="mapBlur" tabindex="0"></div>
		<Row id="pandas" type="flex" justify="center">
			<Col v-for="(panda, index) in pandasArr" :key="index" :span="24 / pandasArr.length" align="center" :class="'panda' + index ">
				<!-- <Tooltip content="主人, 让我再休息会~" placement="top"> -->
					<img v-show="panda[PandaModel.state] === 'egg'" :src="woodEgg" :class="'pandaImg' + index " @click="showPandaPanel(index)" :pandaIndex="index"  
					:gen="panda[PandaModel.gen]" >
					<canvas v-show="panda[PandaModel.state] === 'home'" :id=" 'homecvs' + index" width="200" height="200" class="nomal-padding" tabindex="0" @click="showPandaPanel(index)" @blur="pandaBlur"></canvas>
				<!-- </Tooltip> -->
				<img :src="optionsIcon.feedIcon" class="panda-options" @click="feedWuno">
				<img :src="optionsIcon.beginOutIcon" class="panda-options" @click="startOut">
				<img :src="optionsIcon.sellIcon" class="panda-options" @click="soldPanda">
				<img :src="optionsIcon.dropIcon" class="panda-options" @click="dropPanda">
			</Col>
		</Row>
    <Modal v-model="outModel">
	    <p align="left" style="margin-top: 15px;">
	    	<Row>
	    		<Col span="24" align="center">
	    			<canvas id="cvsout" width="200" height="200"></canvas>
	    		</Col>
	    	</Row>
	    	<Row>
	    		<Col span="6" align="right" style="font-size: 14px;">
	    			{{ $t("carry") }}:
	    		</Col>
	        <Col span="5" align="right">
	        	<img src="../../images/bamboo.png" style="vertical-align:middle;">
	        	<Input v-model="bambooCount" placeholder="" style="width:40px;margin-left:10px;"></Input>
	        </Col>
	        <!-- <Col span="5" offset="1" align="left">
	        	<img src="../../images/land/water.png" style="vertical-align:middle;">
	        	<Input v-model="waterCount" placeholder="" style="width:40px;"></Input>
	        </Col> -->
	    </Row>
	     <br>
	    <Row>
	    	<Col span="6" align="right" style="font-size: 14px;">
	    		{{ $t("director") }}：
	    	</Col>
	    	<Col span="18">
	    	<RadioGroup v-model="direction" type="button">
	        <Radio label='east' class="btn-wid btn-offset">{{ $t("east") }}</Radio>
	        <Radio label='west' class="btn-wid btn-offset">{{ $t("west") }}</Radio>
	        <Radio label='south' class="btn-wid btn-offset">{{ $t("south") }}</Radio>
	        <Radio label='north' class="btn-wid btn-offset">{{ $t("north") }}</Radio>
	        <br>
	        <Radio label='southeast' class="btn-wid btn-offset">{{ $t("southeast") }}</Radio>
	        <Radio label='southwest' class="btn-wid btn-offset">{{ $t("southwest") }}</Radio>
	        <Radio label='northeast' class="btn-wid btn-offset">{{ $t("northeast") }}</Radio>
	        <Radio label='northwest' class="btn-wid btn-offset">{{ $t("northwest") }}</Radio>
	    	</RadioGroup>
	    	</Col>
	    </Row>
	    <br>
	    <Row>
	    	<Col span="6" align="right" style="font-size: 14px;">
	    		{{ $t("category") }}：
	    	</Col>
	    	<Col span="18">
	    	<CheckboxGroup v-model="proCatagory">
	        <Checkbox  label='product' class="btn-wid btn-offset">{{ $t("digital") }}</Checkbox>
	        <Checkbox  label='clothing' class="btn-wid btn-offset">{{ $t("clothing") }}</Checkbox>
	        <Checkbox  label='cosmetic' class="btn-wid btn-offset">{{ $t("cosmetic") }}</Checkbox>
	        <Checkbox  label='food' class="btn-wid btn-offset">{{ $t("food") }}</Checkbox>
	    	</CheckboxGroup>
	    	</Col>
	    </Row>
	    <br>
	    </p>
	    <div slot="footer" align="center">
	        <Button type="success" @click="onSureOut">{{ $t("confirm") }}</Button>
	        <Button offset="2" @click="onCancelOut">{{ $t("cancel") }}</Button>
	    </div>
	</Modal>
	<Modal
        v-model="backModel" >
        <p style="margin-top: 15px;">
        	<Row type="flex" justify="center" align="middle">
        		<Col span="11" align="center" style="min-width: 210px;">
        			<!-- <img v-for="(panda, index) in outBackPandas" :key="index" :src="testPandaImg" :style="{'width': 111 / (index + 1) + 'px'}"> -->
        			<canvas  v-for="(panda, index) in outBackPandas" :id=" 'backcvs' + index" :width="111 / (index + 1)" :height="111 / (index + 1)"></canvas>
        		</Col>
        		<Col span="13">
        			<Row>
        				<Col v-show="backAssets['carry'].length > 0">
        					{{ $t("carry_back_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col v-for="(backAsset, index) in backAssets['carry']" :key="index" span="5">
        					<img :src="backAsset[LandModel.src]" style="vertical-align:middle;" class="backAssetImg">
        					<!-- <img :src="waterImg" style="vertical-align:middle;"> -->
        					<br>
        					<p style="text-align: center">
        						<Icon type="plus-round"></Icon> {{ backAsset[LandModel.value]}}
        					</p>
        				</Col>
        			</Row>
        			<br>
        			<Row>
        				<Col v-show="backAssets['drop'].length > 0">
        					{{ $t("drop_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col v-for="(dropAsset, index) in backAssets['drop']" :key="index" span="5">
        					<img :src="dropAsset[LandModel.src]" style="vertical-align:middle;" class="backAssetImg">
        					<br>
        					<p style="text-align: center">
        						<Icon type="plus-round"></Icon> {{ dropAsset[LandModel.value]}}
        					</p>
        				</Col>
        			</Row>
        			<br>
        			<!-- <Row>
        				<Col>
        					{{ $t("far_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col>
        					<img src="../../images/land/water.png" style="vertical-align:middle;">
        				</Col>
        			</Row> -->
        		</Col>
        	</Row>
        </p>
        <div slot="footer" align="center">
            <Button type="success" @click="onSureBack">{{ $t("confirm") }}</Button>
            <Button offset="2" @click="onCancelBack">{{ $t("cancel") }}</Button>
        </div>
    </Modal>
    <Modal v-model="sellPanda">
      <p align="left" style="margin-top: 15px;">
        <Row>
          <Col span="24" align="center">
            <!-- <img :src="testPandaImg" class="nomal-padding"> -->
            <canvas id="cvssell" width="200" height="200"></canvas>
          </Col>
        </Row>
        <Row span="24">
          <!-- <Col span="12" align="center">
            <Icon type="social-yen"></Icon>
              {{sellPandaInfo[PandaModel.price]}}
          </Col> -->
          <Col span="12" align="center">
          <a href="#">
              G{{ 10 - parseInt(sellPandaInfo[PandaModel.integral] / 100)}}
          </a>
          </Col>
        </Row>
        <br>
        <Row type="flex" justify="center" >
          <Col span="5"><img :src="attrIconObj['speed']" class="img-vertical" >{{sellPandaInfo[PandaModel.speed]}}</Col>
          <Col span="5"><img :src="attrIconObj['hungry']" class="img-vertical" >{{sellPandaInfo[PandaModel.hungry]}}</Col>
          <Col span="5"><img :src="attrIconObj['metal']" class="img-vertical" >{{sellPandaInfo[PandaModel.goldCatch]}}</Col>
          <Col span="5"><img :src="attrIconObj['water']" class="img-vertical" >{{sellPandaInfo[PandaModel.waterCatch]}}</Col>
        </Row>
        <br>
        <Row type="flex" justify="center">
          <Col span="5"><img :src="attrIconObj['wood']" class="img-vertical" >{{sellPandaInfo[PandaModel.woodCatch]}}</Col>
          <Col span="5"><img :src="attrIconObj['fire']" class="img-vertical" > {{sellPandaInfo[PandaModel.fireCatch]}}</Col>
          <Col span="5"><img :src="attrIconObj['earth']" class="img-vertical" >{{sellPandaInfo[PandaModel.earthCatch]}}</Col>
          <Col span="5"><img v-if="sellPandaInfo[PandaModel.special]" :src="attrIconObj['super']" class="img-vertical" >{{sellPandaInfo[PandaModel.special]}} </Col>
      </Row>
       <br>
       <Row type="flex" justify="center">
       	<Col span="12" align="right" style="font-size: 16px;">{{ $t("sell_price") }}：</Col>
       	<Col span="12" align="left"> <Input v-model="sellPandaPrice" placeholder="" style="width: 50px;height: 20px;"></Input></Col>
       </Row>
      </p>
      <div slot="footer" align="center">
          <Button type="success" @click="onSureSold">{{ $t("confirm") }}</Button>
          <Button offset="2" @click="onCancelSold">{{ $t("cancel") }}</Button>
      </div>
  </Modal>
  <Modal v-model="dropPandaModal">
      <p align="center" style="margin-top: 15px;">
        {{ $t("drop_panda_tips") }}
      </p>
      <div slot="footer" align="center">
          <Button type="success" @click="onSureDrop">{{ $t("confirm") }}</Button>
          <Button offset="2" @click="onCancelDrop">{{ $t("cancel") }}</Button>
      </div>
  </Modal>
	</div>
</template>
<style scoped>
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  outline: none
}
#container {
  position: absolute;
  z-index: 5000;
  border: 1px solid #999;
}
.baseLand-bg {
	position: absolute;
	left: 0;
	top: 64px;
	width: 100%;
	height: 100%;
	background: url(../../images/webbg/home-bg.jpg) no-repeat;
	background-size: 100% 100%;
}
.img-vertical {
	vertical-align: middle;
	margin-right: 3px;
}
.landScaleLarger {
	height: 600px;
  width: 1080px;
  max-width: 90%;
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
#pandas{
	position: fixed;
	width: 750px;
	height: 400px;
	left: 50%;
	top: 60%;
	margin-left: -300px;
	min-width: 700px;
}
img {
	cursor: pointer;
}
.backImg {
	width: 25%;
	height: 100%;
	min-height: 70px;
	text-align: center;
	vertical-align: middle;
	float: left;
}
.backPro {
	width: 70%;
	height: auto;
	float: right;
}
.dragable {
	pointer-events:none;
}
.panda-options {
	position: absolute;
	margin-left: -100px;
	margin-top: 100px;
	opacity: 0;
}
.btn-wid {
	text-align: center;
}
.btn-offset {
	margin-left: 8px;
	margin-bottom: 10px;
}
.backAssetImg {
	margin-left: 10%;
	height: 30px;
}
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { statusCodes } from '../../libs/statusCodes.js'
import { LandModel, PandaModel, AssetsModel, UserModel } from '../../libs/ClientModel.js'
import BaseCanvas from '../../libs/charactor/BaseCanvas.js'
import CanvasImgTypes from '../../libs/charactor/CanvasImgTypes.js'
import landBg from './landBg.vue'
import anime from 'animejs'
import serverRequest from '../../libs/serverRequest.js'
import EchartHandle from '../../libs/map/EchartHandle.js'
import {getMapConfig} from '../../libs/map/mapConfig.js'
// import testPandaImg from '../../images/charactor/figure/testdog1.png'
// import waterImg from '../../images/land/water.png'
import ethIconImg from '../../images/land/ethIcon.png'
import woodEgg from '../../images/wood-egg.png'
import feedEnIcon from '../../images/feed-en.png'
import feedIcon from '../../images/feed.png'
import beginOutIcon from '../../images/begin-out.png'
import beginOutEnIcon from '../../images/begin-out-en.png'
import sellIcon from '../../images/sell.png'
import sellEnIcon from '../../images/sell-en.png'
import dropIcon from '../../images/drop.png'
import dropEnIcon from '../../images/drop-en.png'

import waterImg from '../../images/land/water.png'
import bambooImg from '../../images/bamboo.png'
import earthIcon from '../../images/earth-icon.png'
import fireIcon from '../../images/fire-icon.png'
import woodIcon from '../../images/wood-icon.png'
import metalIcon from '../../images/metal-icon.png'
import waterIcon from '../../images/water-icon.png'
import superIcon from '../../images/super-icon.png'
import speedIcon from '../../images/speed-icon.png'
import hungryIcon from '../../images/hungry-icon.png'
import earthEnIcon from '../../images/earth-icon-en.png'
import fireEnIcon from '../../images/fire-icon-en.png'
import woodEnIcon from '../../images/wood-icon-en.png'
import metalEnIcon from '../../images/metal-icon-en.png'
import waterEnIcon from '../../images/water-icon-en.png'
import superEnIcon from '../../images/super-icon-en.png'
import speedEnIcon from '../../images/speed-icon-en.png'
import hungryEnIcon from '../../images/hungry-icon-en.png'
import { alertSuccInfo, alertErrInfo, LandProductCodes, LoginCodes, CommonCodes } from '../../libs/statusHandle.js'

let testFinalData = [
  { value : [42.5, 1.5, 20] },
  { value : [-21.2333, 41.5, 40] },
  { value : [-92.5, 132.5, 30] },
  { value : [-142.5, 21.5, 60] },
  { value : [242.5, -41.5, 70] }
]
let testFinalData1 = [
  { value : [42.5, 13.5, 20] },
  { value : [21.2333, 141.5, 40] },
  { value : [-92.5, 12.5, 30] },
  { value : [-142.5, 1.5, 60] },
  { value : [22.5, -41.5, 70] }
]
export default {
	data () {
		return {
			echartHandle: null, // echarts对接
			scale: 'small', // 大小地图标识参数
			pandasArr: [],  // 展示的panda数组
			pandaIndex: 0, // 当前操作的panda index
			// testPandaImg: testPandaImg, // 测试图片
			waterImg: waterImg, // 测试图片
			bambooImg: bambooImg,
			woodEgg: woodEgg,
			ethIconImg: ethIconImg, // 测试图片
			outModel: false,
			bambooCount: 0, // 外出竹子数量
			waterCount: 0,
			backModel: false,
			direction: '', // 外出方向变量
			proCatagory: [], // 外出的tag选择
			pandaGen: '',
			ownerAddr: '123', // 主人的地址
			outBackPandas: [2,3],
			backAssetsType: null, // ethland assets 类型
			backAssets: { // 带回来的assets
				'carry': [],
				'drop': []
			},
			sellPanda: false,
			dropPandaModal: false, 
			toAnimate: [], // 熊猫孵化动画
			starPointArr: [], // 商品产生点数组
			starPointGeneTime: 1000 * 1000 * 24,
			sellPandaPrice: '',
			canvasArr: [], // 在家时的形象画布渲染数组
			sellCanvas: null, // 出售熊猫的画布
			outCanvas: null, // 熊猫外出时的画布
			backCanvasArr: [], // 外出回来时画布渲染数组
			leftProductObj: {}, // 剩余的商品对象
			queryPandaBackInterval: null, // 定时查询熊猫回归定时器
			// 服务端对接字段
      PandaModel: PandaModel,
      LandModel: LandModel
		}
	},
	components: {
		landBg
	},
	async mounted () {
		this.backAssetsType = {
			WATER: this.waterImg,
			ETH: this.ethIconImg
		}
		this.ownerAddr = this.userAddr
		console.log('userAddr', this.userAddr)
		this.getCurrentLeftProduct() // 测试
		// this.ownerAddr = localStorage.getItem('EthlandAddr')
		// 第一次注册赠送熊猫蛋
		const genePanda = await serverRequest.genePandaRandom(this.ownerAddr)
		if (!genePanda) {
			alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
			return
		}
		// 查询熊猫是否外出且带回物品
		await this.pandaBackHome()
		// 地图初始化
		this.echartHandle = new EchartHandle('container')
		this.geneStarPoint()
		setInterval(() => {
			this.geneStarPoint()
		}, this.starPointGeneTime)
		this.queryPandaBackInterval = setInterval(async () => {
			await this.pandaBackHome()
		}, 1000 * 60)
	},
	destroyed () {
			if (this.queryPandaBackInterval) {
				clearInterval(this.queryPandaBackInterval)
				this.queryPandaBackInterval = null
			}
	},
	methods: {
		// 渲染在家时的熊猫画布
		async updateHomeCharactor (showPanda) {
      if (this.canvasArr.length > 0) {
        for (let cvs of this.canvasArr) {
          await cvs.clearCanvas()
        }
      }
      this.canvasArr = []
      if (showPanda.length === 0) return
      for (const [index, panda] of showPanda.entries()) {
        // console.log(index, panda)
        let cvs = new BaseCanvas('homecvs' + index)
        this.canvasArr.push(cvs)
      }
      for (const [index, cvs] of this.canvasArr.entries()) {
      	const CanvasImgTypesArr = this.getImgArrByPandaGen(showPanda[index][PandaModel.gen])
        await this.canvasArr[index].drawCharactor(CanvasImgTypesArr)
      }
      // const canvasDraw3 = await baseCanvas3.drawCharactor()
    },

    // 渲染外出回家时的熊猫画布
		async updateBackHomeCharactor (showPanda) {
      if (this.backCanvasArr.length > 0) {
        for (let cvs of this.backCanvasArr) {
          await cvs.clearCanvas()
        }
      }
      this.backCanvasArr = []
      if (showPanda.length === 0) return
      for (const [index, panda] of showPanda.entries()) {
        // console.log(index, panda)
        let wh = document.getElementById('backcvs' + index).getAttribute('width')
        let cvs = new BaseCanvas('backcvs' + index, parseInt(wh))
        this.backCanvasArr.push(cvs)
      }
      // for (let cvs of this.backCanvasArr) {
      //   await cvs.drawCharactor(CanvasImgTypesArr)
      // }
      for (const [index, cvs] of this.backCanvasArr.entries()) {
      	const CanvasImgTypesArr = this.getImgArrByPandaGen(showPanda[index])
        await this.backCanvasArr[index].drawCharactor(CanvasImgTypesArr)
      }
      // const canvasDraw3 = await baseCanvas3.drawCharactor()
    },

		// 地图操作 放大地图
		changeScale () {
			this.scale = 'larger'
			setTimeout(() => {
				this.resize(1080, 600, false)
			}, 100)
		},

		// 地图操作 地图失去焦点后缩小
		mapBlur () {
			this.scale = 'small'
			setTimeout(() => {
				this.resize(150, 100, false)
			}, 50)
		},

		// 地图操作 改变地图尺寸
		resize(width, height, silent) {
			this.echartHandle.resize(width, height, silent)
		},

		// 查询熊猫是否外出且带回物品
		async pandaBackHome () {
			let assets = await serverRequest.getPandaBackAssets()
			if (!assets) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let backAssetsSuccCb = async (data) => {
				if (!data) {
					alertErrInfo(this, statusCodes[this.curLang]['PandaLandCodes_Back_Assets_Carry_Empty'])
				}
				if (data.backPandas.length > 0) {
					console.log('data', data)
					this.outBackPandas = data.backPandas.slice(0)
					this.backAssets['carry'] = data.resProducts.slice(0)
					this.backAssets['drop'] = data.dropProducts.slice(0)
					this.$nextTick(() => { // 熊猫图形渲染
						this.updateBackHomeCharactor(this.outBackPandas)
						this.backModel = true
					})
				}
			}
			let backAssetsErrCb = async () => {
			}
			serverRequest.handleRequestRes(assets.data, backAssetsSuccCb, backAssetsErrCb)
			// 查询当前地址下所有熊猫
			this.$nextTick(async () => {
				await this.getAllPandasByCurrentAddr()
			})
		},

		// 获取当前剩余的商品详细信息
		async getCurrentLeftProduct () {
			const products = await serverRequest.getCurrentLeftProduct()
      if (!products) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = (data) => {
        this.leftProductObj = data
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(products.data, succCb, errCb)
		},

		// 获取当前地址下的所有熊猫
		async getAllPandasByCurrentAddr () {
			const allPanda = await serverRequest.queryAllPandaByAddr(this.ownerAddr)
			console.log('allPanda', allPanda)
			if (!allPanda) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let succCb = async (data) => {
				this.pandasArr = data.filter(panda => panda[PandaModel.state] !== 'out')
				this.$nextTick(() => { // 熊猫图形渲染
					this.updateHomeCharactor(this.pandasArr)
				})
			}
			let errCb = (msg) => {
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(allPanda.data, succCb, errCb)
		},

		// 更新商品中心
		async geneStarPoint () {
			const starPoint = await serverRequest.getCurrentStarPoint()
			console.log('starPoint', starPoint)
			if (!starPoint) {
				alertErrInfo(this, statusCodes[this.curLang]['LandProductCodes_Get_Star_Point_Fail'])
				return
			}
			let starSuccCb = (data) => {
				this.starPointArr = []
				for (let item of data) {
					this.starPointArr.push({ value: item })
				}
				this.echartHandle.setOption(getMapConfig(this.starPointArr, this.location))
			}
			let starErrCb = () => {
			}
			serverRequest.handleRequestRes(starPoint.data, starSuccCb, starErrCb)
		},

		// 根据熊猫基因返回熊猫的canvasImgArr
		getImgArrByPandaGen (gen) {
			return [
				CanvasImgTypes.body[parseInt(gen.substr(0, 3))],
				CanvasImgTypes.collar[parseInt(gen.substr(3, 3))],
				CanvasImgTypes.ear[parseInt(gen.substr(0, 3))][parseInt(gen.substr(6, 3))],
				CanvasImgTypes.eye[parseInt(gen.substr(9, 3))],
				CanvasImgTypes.head[parseInt(gen.substr(12, 3))],
				CanvasImgTypes.mouth[parseInt(gen.substr(15, 3))],
				CanvasImgTypes.tail[parseInt(gen.substr(0, 3))][parseInt(gen.substr(18, 3))],
				CanvasImgTypes.pattern[parseInt(gen.substr(21, 3))],
				CanvasImgTypes.tattoos[parseInt(gen.substr(24, 3))]
			]
		},

		// 熊猫操作 点击熊猫
		async showPandaPanel (index) {
			this.pandaIndex = index
			if (this.pandasArr[this.pandaIndex][this.PandaModel.state] === 'egg') { // 熊猫蛋点击
				this.hatchPanda('.pandaImg' + this.pandaIndex)
				const sirePanda = await serverRequest.sirePanda(this.pandasArr[this.pandaIndex][this.PandaModel.gen])
				let succCb = (data) => {
				}
				let errCb = (msg) => {
					alertErrInfo(this, statusCodes[this.curLang][msg])
				}
				serverRequest.handleRequestRes(sirePanda.data, succCb, errCb)
				return
			}
			// 点击熊猫
			this.pandaGen = this.pandasArr[this.pandaIndex][this.PandaModel.gen]
			let pandaClass = 'panda' + this.pandaIndex
			let pandaOpt = 4
			let optOps = [
			{
				x: -160,
				y: -25
			},
			{
				x: -130,
				y: -120
			},
			{
				x: 70,
				y: -120
			},
			{
				x: 90,
				y: -25
			}
			]
			// 选项出场动画
			for (let i = 0; i < pandaOpt; i++) {
				let optDiv = document.getElementsByClassName(pandaClass)[0].getElementsByClassName('panda-options')[i]
				optDiv.style.opacity = 1
				anime({
					targets: optDiv,
					translateX: optOps[i].x,
					translateY: optOps[i].y,
					duration: 2000,
					easing: 'easeOutSine'
				})
			}
		},
		// 熊猫失去焦点 选项消失
		pandaBlur (e) {
			let pandaClass = 'panda' + this.pandaIndex
			let pandaDiv = document.getElementsByClassName(pandaClass)[0]
			setTimeout(() => {
				let eleAttr = pandaDiv.getElementsByClassName('panda-options')
				for (let item of eleAttr) {
					anime({
					targets: item,
					translateX: 0,
					translateY: 0,
					opacity: 0,
					duration: 2000,
					easing: 'easeOutSine'
				})
				}
			}, 500)
		},

		// 熊猫操作 孵化熊猫
		hatchPanda (className) {
			anime({
				targets: className,
				scale: 0,
				opacity: 0,
				duration: 2000,
				easing: 'easeOutSine'
			})
			let pandaShow = () => {
				setTimeout(() => {
					let index = parseInt(className.split('pandaImg')[1])
					this.pandasArr[index][this.PandaModel.state] = 'home'
					anime({
						targets: className,
						scale: 1,
						opacity: 1,
						duration: 4000,
						easing: 'easeOutSine'
					})
					this.createAniEle()
					for(let i in this.toAnimate) {
						this.eggAnimate(this.toAnimate[i], i)
					}
				},2100)
			}
			pandaShow()
		},
		// 熊猫孵化
		createAniEle () {
			let fragment = document.createDocumentFragment();
			let maxElements = 250;
			let colors = ['#f2df0f', '#1be625', '#8a36e9', '#2bdde8', '#f1a00f'];
		  for (let i = 0; i < maxElements; i++) {
		    let el = document.createElement('div');
		    // el.setAttribute('class','particule');
		    el.style.position = 'fixed'
		    // el.style.left ='50%'
		    // el.style.top = '60%'
		    let rate = i % 2 === 0 ? 1 : -1
		    el.style.left = 50 + rate* Math.random() * 10 + '%' 
		    el.style.top = 60 + rate* Math.random() * 15 + '%'
		    // el.style.backgroundColor = 'rgb(0, 155, 70)'
		    el.style.backgroundColor = colors[anime.random(0, 4)];
		    el.style.width = '0.5rem'
		    el.style.height = '0.5rem'
		    el.style.borderRadius = '1rem'
		    el.style.marginLeft = '-0.25rem'
		    el.style.marginTop = '-0.25rem'
		    // el.style.zIndex = 2000
		    this.toAnimate.push(el);
		    fragment.appendChild(el);
		  }
		  document.body.appendChild(fragment);
		},
		eggAnimate (el, i) {
			let angle = Math.random() * Math.PI * 2;
			let maxElements = 250;
			let duration = 1500;
			let radius = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
			let distance = radius / 4 <= 150 ? 150 : radius / 4; 
		  anime({
		    targets: el,
		    translateX: [0, Math.cos(angle) * distance],
		    translateY: [0, Math.sin(angle) * distance],
		    scale: [
		      {value: [0, 1], duration: 400, easing: 'easeOutBack'},
		      {value: 0, duration: 400, delay: duration - 800, easing: 'easeInBack'}
		    ],
		    offset: (duration / maxElements) * i,
		    duration: duration,
		    easing: 'easeOutSine',
		    // loop: true
		  });
		},

		// 喂养熊猫
		async feedWuno () {
			const account = parseInt(Math.random() * 50)
			const feedPanda = await serverRequest.feedPanda(this.pandaGen, account)
			if (!feedPanda) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
			}
			let succCb = async (data) => {
				alertSuccInfo(this, 'i love you...emmm....')
			}
			let errCb = (msg) => {
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(feedPanda.data, succCb, errCb)
		},

		// 售卖熊猫
		async soldPanda () {
			this.sellPanda = true
			// sellPandaInfo 出售熊猫的信息
			if (this.sellCanvas) {
        await this.sellCanvas.clearCanvas()
      } else {
        this.sellCanvas = new BaseCanvas('cvssell')
      }
      const CanvasImgTypesArr = this.getImgArrByPandaGen(this.sellPandaInfo[PandaModel.gen])
      await this.sellCanvas.drawCharactor(CanvasImgTypesArr)
      // await this.sellCanvas.drawCharactor(CanvasImgTypesArr)
		},

		// 确认出售熊猫
		async onSureSold () {
			if (parseInt(this.sellPandaPrice) <= 0) return
			console.log('onSureSold')
			const sellPanda = await serverRequest.sellPanda(this.pandaGen, parseInt(this.sellPandaPrice))
			if (!sellPanda) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
			}
			console.log('sellPanda', sellPanda)
			let succCb = async (data) => {
				// this.pandasArr.splice(this.pandaIndex, 1)
				this.getAllPandasByCurrentAddr()
				this.sellPanda = false
				this.pandaIndex = this.pandaIndex - 1
			}
			let errCb = (msg) => {
				this.sellPanda = false
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(sellPanda.data, succCb, errCb)
		},

		// 取消售卖熊猫
		onCancelSold () {
			this.sellPanda = false
		},

		// 熊猫外出模板展示
		async startOut () {
			console.log('startOut')
			this.outModel = true
			if (this.outCanvas) {
        await this.outCanvas.clearCanvas()
      } else {
        this.outCanvas = new BaseCanvas('cvsout')
      }
      const CanvasImgTypesArr = this.getImgArrByPandaGen(this.pandaGen)
      await this.outCanvas.drawCharactor(CanvasImgTypesArr)
		},
		// 熊猫外出
		onSureOut () {
			// this.pandasArr.splice(this.pandaIndex, 1)
			if (parseInt(this.bambooCount) < 50) {
				alertErrInfo(this, statusCodes[this.curLang]['At_Least_50_Bamboo_For_Out'])
				return
			}
			if (this.proCatagory.length !== 3) {
				alertErrInfo(this, statusCodes[this.curLang]['Only_Choose_3_Tag'])
				return
			}
			serverRequest.getEthlandProduct(this.pandaGen, this.bambooCount, this.direction,this.proCatagory.join())
			.then((v) => {
				this.outModel = false
				let succCb = async (data) => {
					// this.pandasArr.splice(this.pandaIndex, 1)
					await this.getAllPandasByCurrentAddr()
				}
				let errCb = (msg) => {
					alertErrInfo(this, statusCodes[this.curLang][msg])
				}
				serverRequest.handleRequestRes(v.data, succCb, errCb)
			})
			.catch(() => {

			})
		},
		// 取消熊猫外出
		onCancelOut () {
			this.outModel = false
		},
		// 熊猫回归
		onSureBack () {
			this.backModel = false
		},
		// 熊猫回归
		onCancelBack () {
			this.backModel = false
		},
		// 丢弃熊猫
		dropPanda (e) {
			if (parseInt(e.target.style.opacity) === 1) {
				this.dropPandaModal = true
			}
		},

		// 确认丢弃熊猫
		async onSureDrop () {
			const dropPanda = await serverRequest.delPandaByGen(this.pandaGen)
			if (!dropPanda) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
			}
			let succCb = async (data) => {
				this.dropPandaModal = false
				await this.getAllPandasByCurrentAddr()
			}
			let errCb = (msg) => {
				this.dropPandaModal = false
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(dropPanda.data, succCb, errCb)
		},

		// 取消丢弃熊猫
		onCancelDrop () {
			this.dropPandaModal = false
		}
	},
	computed: {
		...mapState({
			userAddr: state => state.login.userAddr,
			curLang: state => state.login.curLang,
			location: state => state.login.location
		}),
		sellPandaInfo () {
			if (this.pandasArr.length === 0 || !this.pandasArr[this.pandaIndex]) {
				return { // 初始化熊猫数据
	        price: 0,
	        speed: 0,
	        hungry: 0,
	        goldCatch: 0,
	        waterCatch: 0,
	        woodCatch: 0,
	        earthCatch: 0,
	        fireCatch: 0,
	        special: 0
	      }
			} else {
				return this.pandasArr[this.pandaIndex]
			}
		},
		optionsIcon () {
			if (this.curLang === 'en') {
				return {
					feedIcon: feedEnIcon,
					beginOutIcon: beginOutEnIcon,
					sellIcon: sellEnIcon,
					dropIcon: dropEnIcon
				}
			} else {
				return {
					feedIcon: feedIcon,
					beginOutIcon: beginOutIcon,
					sellIcon: sellIcon,
					dropIcon: dropIcon
				}
			}
		},
		attrIconObj () {
			if (this.curLang === 'en') {
				return {
	        'water': waterEnIcon,
	        'fire': fireEnIcon,
	        'earth': earthEnIcon,
	        'metal': metalEnIcon,
	        'wood': woodEnIcon,
	        'super': superEnIcon,
	        'speed': speedEnIcon,
	        'hungry': hungryEnIcon
	      }
			} else {
				return {
	        'water': waterIcon,
	        'fire': fireIcon,
	        'earth': earthIcon,
	        'metal': metalIcon,
	        'wood': woodIcon,
	        'super': superIcon,
	        'speed': speedIcon,
	        'hungry': hungryIcon
	      }
			}
		}
	}
}

</script>