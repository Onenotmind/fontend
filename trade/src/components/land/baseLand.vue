<i18n src='../../common/i18n/ethcombo/combo.json'></i18n>
<template>
	<div id="baseLand">
		<div class="baseLand-bg">
			
		</div>
		<div id="container" :class="{ 'landScaleLarger': scale==='larger', 'landScaleSmall': scale==='small'}" @click="changeScale" @blur="mapBlur" tabindex="0"></div>
		<Row id="pandas" type="flex" justify="center">
			<Col v-for="(panda, index) in pandasImgArr" :key="index" :span="24 / pandasImgArr.length" align="center">
			<Poptip placement="right" width="80">
				<Tooltip content="主人, 让我再休息会~" placement="top">
					<img :src="testPandaImg" @click="showPandaPanel">
				</Tooltip>
				<div class="api" slot="content">
					<p align="center">喂养</p>
					<p align="center" @click="startOut">外出</p>
				</div>
			</Poptip>
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
        		<Col span="24" align="center">
        			<img :src="testPandaImg">
        		</Col>
        	</Row>
        	<Row>
        		<Col span="6" align="right">
        			携带物品：
        		</Col>
		        <Col span="9" align="center">
		        	<img src="../../images/land/water.png" style="vertical-align:middle;">
		        	<Input v-model="bambooCount" placeholder="" style="width:40px;"></Input>
		        </Col>
		        <Col span="9" align="left">
		        	<img src="../../images/land/water.png" style="vertical-align:middle;">
		        	<Input v-model="waterCount" placeholder="" style="width:40px;"></Input>
		        </Col>
		    </Row>
		     <br>
		    <Row>
		    	<Col span="6" align="right">
		    		选择方向：
		    	</Col>
		    	<Col span="18">
		    		<Button offset="2">Default</Button>
		    		<Button offset="2">Default</Button>
		    		<Button offset="2">Default</Button>
		    		<Button offset="2">Default</Button>
		    	</Col>
		    </Row>
		     <br>
		    <Row>
		    	<Col span="18" offset="6">
		    		<Button offset="2">Default</Button>
		    		<Button offset="2">Default</Button>
		    		<Button offset="2">Default</Button>
		    		<Button offset="2">Default</Button>
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
        					带回来的宝贝：
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
        					扔掉的宝贝：
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
        					远方的宝贝：
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
</style>
<script>
import EchartHandle from '../../libs/map/EchartHandle.js'
import {getMapConfig} from '../../libs/map/mapConfig.js'
import testPandaImg from '../../images/charactor/figure/testdog1.png'
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
			echartHandle: null,
			scale: 'small',
			pandasImgArr: [1, 2],
			testPandaImg: testPandaImg,
			outModel: true,
			bambooCount: 0,
			waterCount: 0,
			backModel: false
		}
	},
	mounted () {
		this.echartHandle = new EchartHandle('container')
		this.echartHandle.setOption(getMapConfig(testFinalData))
		setTimeout(() => {
			this.echartHandle.setOption(getMapConfig(testFinalData1))
		}, 5000)
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
		showPandaPanel () {

		},
		startOut () {
			this.outModel = true
		},
		onSureOut () {
			this.outModel = false
		},
		onCancelOut () {
			this.outModel = false
		},
		onSureBack () {
			this.backModel = false
		},
		onCancelBack () {
			this.backModel = false
		}
	},
	components: {
		
	}
}
</script>