<i18n src='../../common/i18n/land/baseLand.json'></i18n>
<template>
	<div id="baseLand">
		<div class="baseLand-bg">
			
		</div>
		<!-- <img class="baseLand-egg" :src="eggImg" v-show="landState === 'pandaEgg'" @click="hatchPanda"> {panda.state === 'home' ? testPandaImg: eggImg}-->
		<div id="container" :class="{ 'landScaleLarger': scale==='larger', 'landScaleSmall': scale==='small'}" @click="changeScale" @blur="mapBlur" tabindex="0"></div>
		<Row id="pandas" type="flex" justify="center" v-show="landState === 'pandaHome'">
			<Col v-for="(panda, index) in pandasImgArr" :key="index" :span="24 / pandasImgArr.length" align="center" :class="'panda' + index ">
			<!-- <Poptip placement="right" width="80"> -->
				<Tooltip content="主人, 让我再休息会~" placement="top">
					<img :src="panda.state === 'home' ? testPandaImg: eggImg" tabindex="0" :class="'pandaImg' + index " @click="showPandaPanel" :pandaIndex="index" @blur="pandaBlur" 
					:gen="panda.pandaGen" >
				</Tooltip>
				<img :src="waterImg" class="panda-options">
				<img :src="waterImg" class="panda-options" @click="startOut">
				<img :src="waterImg" class="panda-options">
				<img :src="waterImg" class="panda-options">
				<!-- <img :src="waterImg" class="panda-options opt1" @click="startOut">
				<img :src="waterImg" class="panda-options opt2">
				<img :src="waterImg" class="panda-options opt3"> -->
				<!-- <Button type="ghost" shape="circle" class="panda-options"> {{ $t("feed") }}</Button>
				<Button type="ghost" shape="circle" class="panda-options"> {{ $t("out") }}</Button>
				<Button type="ghost" shape="circle" class="panda-options"> {{ $t("drop") }}</Button>
				<Button type="ghost" shape="circle" class="panda-options"> 待定</Button> -->
				<!-- <div class="api" slot="content" >
					<p align="center">{{ $t("feed") }}</p>
					<p align="center" @click="startOut">{{ $t("out") }}</p>
					<p align="center" @click="dropPanda">{{ $t("drop") }}</p>
				</div> -->
			<!-- </Poptip> -->
			</Col>
		</Row>
    <Modal
        v-model="outModel"
        ok-text="确认"
        cancel-text="取消"
        @on-ok="onSureOut"
        @on-cancel="onCancelOut">
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
		        <Radio :label='$t("east")' class="btn-wid btn-offset"></Radio>
		        <Radio :label='$t("west")' class="btn-wid btn-offset"></Radio>
		        <Radio :label='$t("south")' class="btn-wid btn-offset"></Radio>
		        <Radio :label='$t("north")' class="btn-wid btn-offset"></Radio>
		        <br>
		        <Radio :label='$t("southeast")' class="btn-wid btn-offset"></Radio>
		        <Radio :label='$t("southwest")' class="btn-wid btn-offset"></Radio>
		        <Radio :label='$t("northeast")' class="btn-wid btn-offset"></Radio>
		        <Radio :label='$t("northwest")' class="btn-wid btn-offset"></Radio>
		    	</RadioGroup>
		    	</Col>
		    </Row>
        </p>
        <div slot="footer" align="center">
            <Button type="success">确认</Button>
            <Button offset="2">取消</Button>
        </div>
    </Modal>
    <Modal
        v-model="backModel"
        ok-text="确认"
        cancel-text="取消"
        @on-ok="onSureBack"
        @on-cancel="onCancelBack">
        <p style="margin-top: 15px;">
        	<Row type="flex" justify="center" align="middle">
        		<Col span="10">
        			<img :src="testPandaImg">
        		</Col>
        		<Col span="14">
        			<Row>
        				<Col>
        					{{ $t("carry_back_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col>
        					<img src="../../images/land/water.png" style="vertical-align:middle;">
        				</Col>
        			</Row>
        			<br>
        			<Row>
        				<Col>
        					{{ $t("drop_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col>
        					<img src="../../images/land/water.png" style="vertical-align:middle;">
        				</Col>
        			</Row>
        			<br>
        			<Row>
        				<Col>
        					{{ $t("far_treasure") }}:
        				</Col>
        			</Row>
        			<Row>
        				<Col>
        					<img src="../../images/land/water.png" style="vertical-align:middle;">
        				</Col>
        			</Row>
        		</Col>
        	</Row>
        </p>
        <div slot="footer" align="center">
            <Button type="success">确认</Button>
            <Button offset="2">取消</Button>
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
.baseLand-egg{
	position: absolute;;
	left: 50%;
	top:50%;
	width: 160px;
	height: 200px;
	margin-left: -80px;
	margin-top: -100px;
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
#pandas img {
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
/**
	margin-left: -55.5px;
	margin-top: 59.5;
*/
.opt0 {
	margin-left: -70px;
	margin-top: 30px;
	/*opacity: 1;*/
}
.opt1 {
	margin-left: -150px;
	margin-top: 60px;
}
.opt2 {
	margin-left: 150px;
	margin-top: 60px;
}
.opt3 {
	margin-left: 180px;
	margin-top: 30px;
}
.pandaHide {
	/*opacity: 0;
	transform: scale(0);*/
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
import anime from 'animejs'
import serverRequest from '../../libs/serverRequest.js'
import EchartHandle from '../../libs/map/EchartHandle.js'
import {getMapConfig} from '../../libs/map/mapConfig.js'
import testPandaImg from '../../images/charactor/figure/testdog1.png'
import waterImg from '../../images/land/water.png'
import eggImg from '../../images/charactor/figure/egg.png'
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
let testAddr = '0xF455C2dae83e6511'
let maxElements = 250;
let duration = 1500;
let toAnimate = [];
let radius = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
let distance = radius / 4 <= 150 ? 150 : radius / 4; 
let colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
export default {
	data () {
		return {
			echartHandle: null,
			scale: 'small',
			pandasImgArr: [],
			testPandaImg: testPandaImg,
			waterImg: waterImg,
			eggImg: eggImg,
			outModel: false,
			bambooCount: 0,
			waterCount: 0,
			backModel: false,
			landState: 'pandaHome',
			direction: '',
			pandaGen: '',
			outBackPandas: []
		}
	},
	mounted () {
		serverRequest.queryAllPandaByAddr(testAddr)
		.then(v => {
			let succCb = (data) => {
				for (let panda of data) {
					if (panda.state === 'out') {
						serverRequest.serverTime
						.then(t => {
							if (t > panda.price) {
								this.outBackPandas.push(panda)
								this.pandasImgArr.push(panda)
							} else {}
						})
					} else {
						this.pandasImgArr.push(panda)
					}
				}
			}
			let errCb = () => { }
			serverRequest.handleRequestRes(v.data, succCb, errCb)
		})
		.catch(e => {

		})
			// let eggCb = () => {
			// 	this.landState = 'pandaEgg'
			// }
			// let homeCb = (data) => {
			// 	this.pandasImgArr = data.slice(0)
			// 	for (let panda of this.pandasImgArr) {
			// 		if (panda.state === 'out') {
			// 			serverRequest.serverTime()
			// 			.then(t => {
			// 				if (panda.price < t) {

			// 				}
			// 			})
			// 		}
			// 	}
			// 	this.landState = 'pandaHome'
			// }
			// this.queryPandaByAddr(testAddr, eggCb, homeCb)

		// setTimeout(() => {
		// 	this.echartHandle = new EchartHandle('container')
		// 	this.echartHandle.setOption(getMapConfig(testFinalData))
		// }, 2000)
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
		},
		showPandaPanel (e) {
			let pandaIndex = parseInt(e.target.getAttribute('pandaIndex'))
			console.log(pandaIndex)
			console.log(this.pandasImgArr[pandaIndex])
			if (this.pandasImgArr[pandaIndex].state === 'egg') {
				this.hatchPanda('.pandaImg' + pandaIndex)
				return
			}
			this.pandaGen = e.target.getAttribute('gen')
			let pandaClass = 'panda' + pandaIndex
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
			for (let i = 0; i < pandaOpt; i++) {
				// let optClass = 'panda-options opt' + i +' optionsShow' + i
				// document.getElementsByClassName(pandaClass)[0].getElementsByClassName('panda-options')[i].setAttribute('class', optClass)
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
		startOut () {
			console.log('startOut')
			this.outModel = true
		},
		onSureOut () {
			console.log('onSureOut')
			serverRequest.getEthlandProduct(this.pandaGen, this.bambooCount)
			.then(() => {
				this.outModel = false
			})
			.catch(() => {

			})
		},
		onCancelOut () {
			this.outModel = false
		},
		onSureBack () {
			this.backModel = false
		},
		onCancelBack () {
			this.backModel = false
		},
		dropPanda () {

		},
		pandaBlur () {
			return
			setTimeout(() => {
				let eleAttr = document.getElementsByClassName('panda-options')
				for (let item in eleAttr) {
					// eleAttr[item].setAttribute('class', 'panda-options')
					eleAttr[item].style.opacity = '0'
					eleAttr[item].style.transform = ''
				}
			}, 1000)
				
		},
		hatchPanda (className) {
			// this.landState = 'pandaHome'
			console.log(className)
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
					this.pandasImgArr[index].state = 'home'
					anime({
						targets: className,
						scale: 1,
						opacity: 1,
						duration: 4000,
						easing: 'easeOutSine'
					})
					this.createAniEle()
					for(let i in toAnimate) {
						this.eggAnimate(toAnimate[i], i)
					}
				},1000)
			}
			pandaShow()
			// const pandaIns = await serverRequest.genePandaRandom(testAddr)
			// console.log(pandaIns)
			// if (pandaIns.data.status === 0 && pandaIns.data.res.status === 0) {
			// 	let homeCb = (data) => {
			// 		console.log(data)
			// 		this.pandasImgArr = data.slice(0)
			// 		document.getElementsByClassName('panda').setAttribute('class', 'panda pandaHide')
			// 		// this.landState = 'pandaHome'
			// 		pandaShow()
			// 	}
			// 	this.queryPandaByAddr(testAddr, null, homeCb)
			// }	
		},

		queryPandaByAddr (addr, eggCb, homeCb) {
			serverRequest.queryAllPandaByAddr(addr)
			.then(v => {
				if (v.data && v.data.res) {
					let succCb = (data) => {
						if (data.length === 0) {
							if (eggCb) {
								eggCb() 
							}
						} else if (data.length > 0){
							if (homeCb) {
								homeCb(data) 
							}
						} else {}
					}
					let errCb = () => {
						// this.alertErrInfo(v.data)
					}
					serverRequest.handleRequestRes(v.data, succCb, errCb)
				}
			})
			.catch(e => {

			})
		},
		createAniEle () {
			let fragment = document.createDocumentFragment();
		  for (let i = 0; i < maxElements; i++) {
		    let el = document.createElement('div');
		    // el.setAttribute('class','particule');
		    el.style.position = 'absolute'
		    el.style.left = '50%'
		    el.style.top = '50%'
		    el.style.backgroundColor = 'rgb(0, 155, 70)'
		    // el.style.backgroundColor = colors[anime.random(0, 3)];
		    el.style.width = '0.5rem'
		    el.style.height = '0.5rem'
		    el.style.borderRadius = '1rem'
		    el.style.marginLeft = '-0.25rem'
		    el.style.marginTop = '-0.25rem'
		    // el.style.zIndex = 2000
		    toAnimate.push(el);
		    fragment.appendChild(el);
		  }
		  document.body.appendChild(fragment);
		},
		eggAnimate (el, i) {
			let angle = Math.random() * Math.PI * 2;
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
		}
	},
	components: {
		
	}
}
</script>