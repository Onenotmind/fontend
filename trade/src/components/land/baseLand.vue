<i18n src='../../common/i18n/land/baseLand.json'></i18n>
<template>
	<div id="baseLand">
		<div class="baseLand-bg"></div>
		<div id="container" :class="{ 'landScaleLarger': scale==='larger', 'landScaleSmall': scale==='small'}" @click="changeScale" @blur="mapBlur" tabindex="0"></div>
		<Row id="pandas" type="flex" justify="center">
			<Col v-for="(panda, index) in pandasArr" :key="index" :span="24 / pandasArr.length" align="center" :class="'panda' + index ">
				<Tooltip content="主人, 让我再休息会~" placement="top">
					<img :src="panda.state === 'home' ? testPandaImg: eggImg" tabindex="0" :class="'pandaImg' + index " @click="showPandaPanel" :pandaIndex="index" @blur="pandaBlur" 
					:gen="panda.pandaGen" >
				</Tooltip>
				<img :src="waterImg" class="panda-options">
				<img :src="waterImg" class="panda-options" @click="startOut">
				<img :src="waterImg" class="panda-options" @click="soldPanda">
				<img :src="waterImg" class="panda-options" @click="dropPanda">
			</Col>
		</Row>
    <Modal v-model="outModel">
	    <p align="left" style="margin-top: 15px;">
	    	<Row>
	    		<Col span="24" align="center" style="margin-bottom: 15px;">
	    			<img :src="testPandaImg">
	    		</Col>
	    	</Row>
	    	<Row>
	    		<Col span="6" align="right" style="font-size: 14px;">
	    			{{ $t("carry") }}:
	    		</Col>
	        <Col span="5" align="right">
	        	<img src="../../images/land/water.png" style="vertical-align:middle;">
	        	<Input v-model="bambooCount" placeholder="" style="width:40px;"></Input>
	        </Col>
	        <Col span="5" offset="1" align="left">
	        	<img src="../../images/land/water.png" style="vertical-align:middle;">
	        	<Input v-model="waterCount" placeholder="" style="width:40px;"></Input>
	        </Col>
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
	    </p>
	    <div slot="footer" align="center">
	        <Button type="success" @click="onSureOut">确认</Button>
	        <Button offset="2" @click="onCancelOut">取消</Button>
	    </div>
	</Modal>
	<Modal
        v-model="backModel" >
        <p style="margin-top: 15px;">
        	<Row type="flex" justify="center" align="middle">
        		<Col span="11" align="center" style="min-width: 210px;">
        			<img v-for="(panda, index) in outBackPandas" :key="index" :src="testPandaImg" :style="{'width': 111 / (index + 1) + 'px'}">
        		</Col>
        		<Col span="13">
        			<Row>
        				<Col>
        					{{ $t("carry_back_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col v-for="(backAsset, index) in backAssets['carry']" :key="index" span="5">
        					<img :src="backAssetsType[backAsset.split('/')[1]]" style="vertical-align:middle;">
        					<!-- <img :src="waterImg" style="vertical-align:middle;"> -->
        					<br>
        					0.115
        				</Col>
        			</Row>
        			<br>
        			<Row>
        				<Col>
        					{{ $t("drop_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col v-for="(dropAsset, index) in backAssets['drop']" :key="index" span="5">
        					<img src="../../images/land/water.png" style="vertical-align:middle;">
        					<br>
        					0.1115
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
            <Button type="success" @click="onSureBack">确认</Button>
            <Button offset="2" @click="onCancelBack">取消</Button>
        </div>
    </Modal>
    <Modal v-model="sellPanda">
      <p align="left" style="margin-top: 15px;">
        <Row>
          <Col span="24" align="center" style="margin-bottom: 15px;">
            <img :src="testPandaImg" class="nomal-padding">
          </Col>
        </Row>
        <Row span="24">
          <Col span="12" align="center">
            <Icon type="ios-film-outline"></Icon>
            <Icon type="ios-film-outline"></Icon>
          </Col>
          <Col span="12" align="center">
          <a href="#">
              <Icon type="ios-loop-strong"></Icon>
              {{sellPandaInfo.price}}
          </a>
          </Col>
        </Row>
        <Row type="flex" justify="center" >
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{sellPandaInfo.speed}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{sellPandaInfo.hungry}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{sellPandaInfo.goldCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{sellPandaInfo.waterCatch}}</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{sellPandaInfo.woodCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" > {{sellPandaInfo.fireCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{sellPandaInfo.earthCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{sellPandaInfo.special}} </Col>
      </Row>
       <br>
       <Row type="flex" justify="center">
       	<Col span="12" align="right" style="font-size: 16px;">售价：</Col>
       	<Col span="12" align="left"> <Input v-model="sellPandaPrice" placeholder="" style="width: 50px;height: 20px;"></Input></Col>
       </Row>
      </p>
      <div slot="footer" align="center">
          <Button type="success" @click="onSureSold">出售</Button>
          <Button offset="2" @click="onCancelSold">取消</Button>
      </div>
  </Modal>
  <Modal v-model="dropPandaModal">
      <p align="center" style="margin-top: 15px;">
        确定要丢弃萌萌哒的熊猫吗？
      </p>
      <div slot="footer" align="center">
          <Button type="success" @click="onSureDrop">确认丢弃</Button>
          <Button offset="2" @click="onCancelDrop">取消</Button>
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
#pandas{
	position: absolute;
	width: 600px;
	height: 400px;
	left: 50%;
	top: 40%;
	margin-left: -300px;
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
	margin-left: -71.5px;
	margin-top: 43.5px;
	opacity: 0;
}
.btn-wid {
	width: 60px;
	text-align: center;
}
.btn-offset {
	margin-left: 8px;
	margin-bottom: 10px;
}
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import anime from 'animejs'
import serverRequest from '../../libs/serverRequest.js'
import EchartHandle from '../../libs/map/EchartHandle.js'
import {getMapConfig} from '../../libs/map/mapConfig.js'
import testPandaImg from '../../images/charactor/figure/testdog1.png'
import waterImg from '../../images/land/water.png'
import ethIconImg from '../../images/land/ethIcon.png'
import eggImg from '../../images/charactor/figure/egg.png'
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
			pandaIndex: -1, // 当前操作的panda index
			testPandaImg: testPandaImg, // 测试图片
			waterImg: waterImg, // 测试图片
			eggImg: eggImg, // 测试图片
			ethIconImg: ethIconImg, // 测试图片
			outModel: false,
			bambooCount: 0, // 外出竹子数量
			waterCount: 0,
			backModel: false,
			direction: '', // 外出方向变量
			pandaGen: '',
			ownerAddr: '123', // 主人的地址
			outBackPandas: [],
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
			sellPandaPrice: ''
		}
	},
	async mounted () {
		this.backAssetsType = {
			WATER: this.waterImg,
			ETH: this.ethIconImg
		}
		this.ownerAddr = this.userAddr
		console.log('userAddr', this.userAddr)
		// this.ownerAddr = localStorage.getItem('EthlandAddr')
		// 第一次注册赠送熊猫蛋
		const genePanda = await serverRequest.genePandaRandom(this.ownerAddr)
		if (!genePanda) {
			alertErrInfo(this, CommonCodes.Service_Wrong)
			return
		}
		// 查询当前地址下所有熊猫
		const allPanda = await serverRequest.queryAllPandaByAddr(this.ownerAddr)
		if (!allPanda) {
			alertErrInfo(this, CommonCodes.Service_Wrong)
			return
		}
		let succCb = async (data) => {
			for (let panda of data) {
				this.pandaIndex = 0
				if (panda.state === 'out') { // 判断当前在家熊猫数量
					const t = await serverRequest.serverTime()
					if (t.data.res.data > panda.price) {
						this.outBackPandas.push(panda)
						this.pandasArr.push(panda)
					} else {}
				} else {
					this.pandasArr.push(panda)
				}
			}
			console.log('outBackPandas', this.outBackPandas)
			// 查询熊猫是否外出且带回物品
			if (this.outBackPandas.length > 0) {
				for (let backPanda of this.outBackPandas) {
					let assets = await serverRequest.getPandaBackAssets(backPanda.pandaGen)
					console.log('assets', assets)
					if (assets.data && assets.data.res && assets.data.res.data) {
						let pandaAssets = assets.data.res.data[0].backAssets.split('|')
						for (let asset of pandaAssets) {
							this.backAssets['carry'].push(asset)
						}
						let pandaDropAsets = assets.data.res.data[0].dropAssets.split('|')
						for (let dropasset of pandaDropAsets) {
							this.backAssets['drop'].push(dropasset)
						}
					}
				}
				console.log(this.backAssets)
				this.backModel = true
			}
		}
		let errCb = (msg) => {
			alertErrInfo(this, msg)
		}
		serverRequest.handleRequestRes(allPanda.data, succCb, errCb)
		this.echartHandle = new EchartHandle('container')
		this.geneStarPoint()
		setInterval(() => {
			this.geneStarPoint()
		}, this.starPointGeneTime)
	},
	methods: {

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

		// 更新商品中心
		async geneStarPoint () {
			const starPoint = await serverRequest.getCurrentStarPoint()
			console.log('starPoint', starPoint)
			if (!starPoint) {
				alertErrInfo(this, LandProductCodes.Get_Star_Point_Fail)
				return
			}
			let starSuccCb = (data) => {
				this.starPointArr = []
				for (let item of data) {
					this.starPointArr.push({ value: item })
				}
				this.echartHandle.setOption(getMapConfig(this.starPointArr))
			}
			let starErrCb = () => {
			}
			serverRequest.handleRequestRes(starPoint.data, starSuccCb, starErrCb)
		},

		// 熊猫操作 点击熊猫
		async showPandaPanel (e) {
			this.pandaIndex = parseInt(e.target.getAttribute('pandaIndex'))
			if (this.pandasArr[this.pandaIndex].state === 'egg') { // 熊猫蛋点击
				this.hatchPanda('.pandaImg' + this.pandaIndex)
				const sirePanda = await serverRequest.sirePanda(this.pandasArr[this.pandaIndex].pandaGen)
				let succCb = (data) => {
				}
				let errCb = (msg) => {
					alertErrInfo(this, msg)
				}
				serverRequest.handleRequestRes(sirePanda.data, succCb, errCb)
				return
			}
			// 点击熊猫
			this.pandaGen = e.target.getAttribute('gen')
			let pandaClass = 'panda' + this.pandaIndex
			let pandaOpt = 4
			let optOps = [
			{
				x: -100,
				y: -25
			},
			{
				x: -75,
				y: -75
			},
			{
				x: 75,
				y: -75
			},
			{
				x: 100,
				y: -25
			}
			]
			// 选项出场动画
			for (let i = 0; i < pandaOpt; i++) {
				let optDiv = document.getElementsByClassName(pandaClass)[0].getElementsByClassName('panda-options')[i]
				anime({
					targets: optDiv,
					translateX: optOps[i].x,
					translateY: optOps[i].y,
					duration: 2000,
					opacity: 1,
					easing: 'easeOutSine'
				})
			}
		},
		// 熊猫失去焦点 选项消失
		pandaBlur (e) {
			let pandaClass = 'panda' + this.pandaIndex
			let pandaDiv = document.getElementsByClassName(pandaClass)[0]
			// setTimeout(() => {
			// 	let eleAttr = pandaDiv.getElementsByClassName('panda-options')
			// 	for (let item in eleAttr) {
			// 		// eleAttr[item].setAttribute('class', 'panda-options')
			// 		eleAttr[item].style.opacity = '0'
			// 		eleAttr[item].style.transform = ''
			// 	}
			// }, 500)
				
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
					this.pandasArr[index].state = 'home'
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
			let colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
		  for (let i = 0; i < maxElements; i++) {
		    let el = document.createElement('div');
		    // el.setAttribute('class','particule');
		    el.style.position = 'absolute'
		    el.style.left = '50%'
		    el.style.top = '50%'
		    // el.style.backgroundColor = 'rgb(0, 155, 70)'
		    el.style.backgroundColor = colors[anime.random(0, 3)];
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

		// 售卖熊猫
		soldPanda () {
			this.sellPanda = true
		},

		// 确认出售熊猫
		async onSureSold () {
			if (parseInt(this.sellPandaPrice) <= 0) return
			console.log('onSureSold')
			const sellPanda = await serverRequest.sellPanda(this.pandaGen, parseInt(this.sellPandaPrice))
			console.log('sellPanda', sellPanda)
			if (!sellPanda) {
				alertErrInfo(CommonCodes.Net_Wrong)
			}
			let succCb = (data) => {
				this.sellPanda = false
			}
			let errCb = () => { this.sellPanda = false }
			serverRequest.handleRequestRes(sellPanda.data, succCb, errCb)
		},

		// 取消售卖熊猫
		onCancelSold () {
			this.sellPanda = false
		},

		// 熊猫外出模板展示
		startOut () {
			console.log('startOut')
			this.outModel = true
		},
		// 熊猫外出
		onSureOut () {
			// this.pandasArr.splice(this.pandaIndex, 1)
			serverRequest.getEthlandProduct(this.pandaGen, this.bambooCount, this.direction)
			.then((v) => {
				this.outModel = false
				let succCb = (data) => {
					this.pandasArr.splice(this.pandaIndex, 1)
					console.log('pandadata', data)
				}
				let errCb = () => {}
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
		dropPanda () {
			this.dropPandaModal = true

		},

		// 确认丢弃熊猫
		async onSureDrop () {
			const dropPanda = await serverRequest.delPandaByGen(this.pandaGen)
			if (!dropPanda) {
				alertErrInfo(CommonCodes.Net_Wrong)
			}
			let succCb = (data) => {
				this.dropPandaModal = false
			}
			let errCb = () => { this.dropPandaModal = false }
			serverRequest.handleRequestRes(dropPanda.data, succCb, errCb)
		},

		// 取消丢弃熊猫
		onCancelDrop () {
			this.dropPandaModal = false
		}
	},
	computed: {
		...mapState({
			userAddr: state => state.login.userAddr
		}),
		sellPandaInfo () {
			if (this.pandasArr.length === 0) {
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
		}
	}
}

</script>