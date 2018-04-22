<i18n src='../../common/i18n/market/mainMarket.json'></i18n>
<template>
	<div id="mainMarket">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="all-panda" style="width:160px;" @on-select="selectMenu">
        <MenuGroup title="熊猫市场">
            <MenuItem name="all-panda">
                <Icon type="document-text"></Icon>
                全部熊猫
            </MenuItem>
            <MenuItem name="low-level-panda">
                <Icon type="chatbubbles"></Icon>
                G10 ~ G6
            </MenuItem>
            <MenuItem name="high-level-panda">
                <Icon type="chatbubbles"></Icon>
                G5 ~ G0
            </MenuItem>
            <MenuItem name="special-panda">
                <Icon type="chatbubbles"></Icon>
                特殊熊猫
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="商品市场">
            <MenuItem name="all-product">
                <Icon type="heart"></Icon>
                全部商品
            </MenuItem>
            <MenuItem name="product-water">
                <Icon type="heart-broken"></Icon>
                圣水
            </MenuItem>
            <MenuItem name="product-bag">
                <Icon type="heart-broken"></Icon>
                背包
            </MenuItem>
        </MenuGroup>
    </Menu>
  </Col>
  <Col span="20">
  	<Row class="nomal-padding">
  		<Col span="4">
  			<span class="total-panda">共 3560 熊猫</span>
  		</Col>
  		<Col span="20" align="right">
  			<Select v-model="sortType" style="width:120px" align="center">
	        <Option v-for="item in sortTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    	</Select>
	    	<Select v-model="sortWay" style="width:100px;margin-left: 20px;" align="center">
	        <Option v-for="item in sortWayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    	</Select>
  		</Col>
  	</Row>
    <Row type="flex">
    	<Col span="5" offset="1" v-for="(panda, index) in showPanda" class="nomal-padding" style="width:200px">
    		<Card style="width: 100%;cursor:pointer;" :shadow="true"  >
    			<p>
            <Icon type="ios-film-outline"></Icon>
            <Icon type="ios-film-outline"></Icon>
	        </p>
	        <a href="#" slot="extra" @click="buyPanda" :pandaIndex="index">
	            <Icon type="ios-loop-strong"></Icon>
	            10000
	        </a>
    			<div class="text-center nomal-padding" >
            <canvas :id=" 'cvs' + index" width="200" height="200" class="nomal-padding"></canvas>
    				<!-- <img src="../../images/charactor/figure/testdog1.png" class="nomal-padding" @click="buyPanda" :pandaIndex="index"> -->
    				<Row type="flex" justify="space-between">
              <Col v-for="(attr, index) in showAttr(panda)">
              <img :src="attrIconObj[attr]" class="img-vertical" >
            </Col>
    				</Row>
    			</div>
    		</Card>
    	</Col>
    </Row>
    <Modal v-model="pandaBuy">
      <p align="left" style="margin-top: 15px;">
        <Row>
          <Col span="24" align="center" style="margin-bottom: 15px;">
            <img src="../../images/charactor/figure/testdog1.png" class="nomal-padding">
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
              {{initPandaBuyInfo.price}}
          </a>
          </Col>
        </Row>
        <br>
        <Row type="flex" justify="center" >
          <Col span="4"><img :src="attrIconObj['speed']" class="img-vertical" >{{initPandaBuyInfo.speed}}</Col>
          <Col span="4"><img :src="attrIconObj['hungry']" class="img-vertical" >{{initPandaBuyInfo.hungry}}</Col>
          <Col span="4"><img :src="attrIconObj['metal']" class="img-vertical" >{{initPandaBuyInfo.goldCatch}}</Col>
          <Col span="4"><img :src="attrIconObj['water']" class="img-vertical" >{{initPandaBuyInfo.waterCatch}}</Col>
        </Row>
        <br>
        <Row type="flex" justify="center">
          <Col span="4"><img :src="attrIconObj['wood']" class="img-vertical" >{{initPandaBuyInfo.woodCatch}}</Col>
          <Col span="4"><img :src="attrIconObj['fire']" class="img-vertical" > {{initPandaBuyInfo.fireCatch}}</Col>
          <Col span="4"><img :src="attrIconObj['earth']" class="img-vertical" >{{initPandaBuyInfo.earthCatch}}</Col>
          <Col span="4"><img :src="attrIconObj['super']" class="img-vertical" >{{initPandaBuyInfo.special}} </Col>
      </Row>
       <br>
      </p>
      <div slot="footer" align="center">
          <Button type="success" @click="onSureBuy">购买</Button>
          <Button offset="2" @click="onCancelBuy">取消</Button>
      </div>
  </Modal>
    <Page :total="100" :page-size="pageSize" class="nomal-padding" @on-page-size-change="onPageSizeChange" @on-change="pageChange" show-sizer></Page>
  </Col>
    </Row>
	</div>
</template>
<style scoped>
.text-center {
	text-align: center;
}
.nomal-padding {
	padding-top: 15px;
	padding-bottom: 20px;
}
.total-panda {
	font-size: 16px;
	line-height: 20px;
}
.img-vertical {
  vertical-align: middle;
}
</style>
<script>
import waterImg from '../../images/land/water.png'
import earthIcon from '../../images/earth-icon.png'
import fireIcon from '../../images/fire-icon.png'
import woodIcon from '../../images/wood-icon.png'
import metalIcon from '../../images/metal-icon.png'
import waterIcon from '../../images/water-icon.png'
import superIcon from '../../images/super-icon.png'
import speedIcon from '../../images/speed-icon.png'
import hungryIcon from '../../images/hungry-icon.png'
import serverRequest from '../../libs/serverRequest.js'
import BaseCanvas from '../../libs/charactor/BaseCanvas.js'
import CanvasImgTypesArr from '../../libs/charactor/CanvasImgTypes.js'
export default {
	data () {
		return {
			sortTypeList:[
			{
				value: 'speed',
				label: '速度'
			},
			{
				value: 'hungry',
				label: '抗饥饿能力'
			}
			],
			sortType: 'speed',
			sortWayList: [
			{
				value: 'lowFirst',
				label: '由低到高'
			},
			{
				value: 'highFirst',
				label: '由高到低'
			}
			],
      pageSize: 10, // 每一页展示数量
      pageIndex: 1, // 当前是哪一页
      filterIntegral: '', // 代数筛选
      waterImg: waterImg,
			sortWay: 'lowFirst',
			pandas: [],
      pandaBuy: false, // 购买熊猫的面板
      buyPandaIndex : -1, // 购买的熊猫index
      initPandaBuyInfo: { // 初始化熊猫数据
        price: 0,
        speed: 0,
        hungry: 0,
        goldCatch: 0,
        waterCatch: 0,
        woodCatch: 0,
        earthCatch: 0,
        fireCatch: 0,
        special: 0
      },
      testAddr: '1234',
      attrIconObj: { // 属性icon对象
        'water': waterIcon,
        'fire': fireIcon,
        'earth': earthIcon,
        'metal': metalIcon,
        'wood': woodIcon,
        'super': superIcon,
        'speed': speedIcon,
        'hungry': hungryIcon
      },
      canvasArr: [] // 画布数组
		}
	},
  mounted () {
    serverRequest.queryAllPandaSold()
    .then(v => {
      console.log('v',v)
      let succCb = (data) => {
        this.pandas = data
        this.$nextTick(() => {
          this.updateMarketCharactor(this.showPanda)
        })
      }
      let errCb = () => {}
      serverRequest.handleRequestRes(v.data, succCb, errCb)
    })
    .catch(e => {})
  },
	methods: {
    async updateMarketCharactor (showPanda) {
      if (this.canvasArr.length > 0) {
        for (let cvs of this.canvasArr) {
          await cvs.clearCanvas()
        }
      }
      this.canvasArr = []
      if (showPanda.length === 0) return
      for (const [index, panda] of showPanda.entries()) {
        // console.log(index, panda)
        let cvs = new BaseCanvas('cvs' + index)
        this.canvasArr.push(cvs)
      }
      for (let cvs of this.canvasArr) {
        await cvs.drawCharactor(CanvasImgTypesArr)
      }
      // const canvasDraw3 = await baseCanvas3.drawCharactor()
    },

    // 通过基因绘画熊猫形象
    drawCharactorByGeni (gen) {

    },
		pageChange (val) {
			console.log('page',val)
      this.pageIndex = val
		},
    showAttr (panda) {
      let baseAttiArr = []
      baseAttiArr.push({ type: 'metal', val: panda.goldCatch })
      baseAttiArr.push({ type: 'water', val: panda.waterCatch })
      baseAttiArr.push({ type: 'fire', val:panda.fireCatch })
      baseAttiArr.push({ type: 'wood', val: panda.woodCatch })
      baseAttiArr.push({ type: 'earth', val: panda.earthCatch })
      baseAttiArr.sort(function(a, b) {
        return b.val - a.val;
      })
      if (panda.special) {
        return ['super', baseAttiArr[0].type, baseAttiArr[1].type]
      } else {
        return [baseAttiArr[0].type, baseAttiArr[1].type, baseAttiArr[2].type]
      }
    },
    onPageSizeChange (val) {
      console.log('pageSize', val)
      this.pageSize = val
    },
    selectMenu (name) {
      console.log(name)
      switch(name) {
        case 'low-level-panda': 
          this.filterIntegral = 'lowFilter'
          break
        case 'high-level-panda':
          this.filterIntegral = 'highFilter'
          break
        default:
          break
      }
    },
    buyPanda (e) {
      this.buyPandaIndex = parseInt(e.target.getAttribute('pandaIndex'))
      this.pandaBuy = true
      this.initPandaBuyInfo = this.showPanda[this.buyPandaIndex]
    },
    onSureBuy () {
      let price = this.showPanda[this.buyPandaIndex].price
      let pandaGen = this.showPanda[this.buyPandaIndex].pandaGen
      serverRequest.buyPanda(this.testAddr, pandaGen, price)
      .then(v => {
        let succCb = (data) => {
          console.log('lll', data)
        }
        let errCb = () => {

        }
        serverRequest.handleRequestRes(v.data, succCb, errCb)
      })
      .catch(e => {})
    },
    onCancelBuy () {

    }
	},
	components: {
		
	},
  computed: {
    showPanda () {
      let pandasFilterArr = []
      if (this.filterIntegral === 'lowFilter') {
        pandasFilterArr = this.pandas.filter(panda => panda.integral <= 500)
      } else if (this.filterIntegral === 'highFilter') {
        pandasFilterArr = this.pandas.filter(panda => panda.integral > 500)
      } else {
        pandasFilterArr = this.pandas
      }
      let pandasCountArr = pandasFilterArr.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
      let finalArr = pandasCountArr.sort((a, b) => {
        let aVal = a[this.sortType]
        let bVal = b[this.sortType]
        return aVal - bVal
      })
     console.log('finalArr', finalArr)
     if (this.sortWay === 'highFirst') {
      return finalArr.reverse()
     } else {
      return finalArr
     }
    }
  },
  watch: {
    showPanda: {
      handler: function (pandaArr, oldVal) {
        this.$nextTick(() => {
          this.updateMarketCharactor(pandaArr)
        })
      },
      deep: true
    }
  }
}
</script>