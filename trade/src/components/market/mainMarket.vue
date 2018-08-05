<i18n src='../../common/i18n/market/mainMarket.json'></i18n>
<template>
	<div id="mainMarket">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="all-panda" style="width:90%;" @on-select="selectMenu">
        <MenuGroup :title="$t('wuno_market')">
            <MenuItem name="all-panda">
                <!-- <Icon type="grid"></Icon> -->
                {{ $t("All_the_pandas") }}
            </MenuItem>
            <MenuItem name="low-level-panda">
                G10 ~ G6
            </MenuItem>
            <MenuItem name="high-level-panda">
                G5 ~ G0
            </MenuItem>
            <!-- <MenuItem name="special-panda">
                {{ $t("special_pandas") }}
            </MenuItem> -->
        </MenuGroup>
        <MenuGroup :title="$t('my_market')">
          <MenuItem name="my-sell">
              <!-- <Icon type="heart"></Icon> -->
              {{ $t("my_sell") }}
          </MenuItem>
        </MenuGroup>
        <!-- <MenuGroup title="商品市场">
            <MenuItem name="all-product">
                <Icon type="heart"></Icon>
                {{ $t("All the goods") }}
            </MenuItem>
            <MenuItem name="product-water">
                <Icon type="heart-broken"></Icon>
                {{ $t("Holy water") }}
            </MenuItem>
            <MenuItem name="product-bag">
                <Icon type="heart-broken"></Icon>
                {{ $t("backpack") }}
            </MenuItem>
        </MenuGroup> -->
    </Menu>
  </Col>

  <!-- 熊猫市场主UI -->
  <Col span="20" v-show="filterIntegral !== 'mySell'">
  	<Row class="nomal-padding">
  		<!-- <Col span="4">
  			<span class="total-panda">{{ $t("A total of 3560 pandas") }}</span>
  		</Col> -->
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
      <Col span="24" class="nomal-padding tip-bg" align="center" v-if="showPanda.length === 0">
        <Icon type="checkmark-circled" color="red" size="50"></Icon>
        <span class="tip-word">{{ $t("no_wuno_by_filter") }}</span>
      </Col>
    	<Col span="5" offset="1" v-for="(panda, index) in showPanda" class="nomal-padding" style="width:200px" :key="index">
    		<Card style="width: 100%;cursor:pointer;" :shadow="true">
    			<p>
            <a href="#" @click="buyPanda(panda)" :pandaIndex="index">
              <Icon type="social-yen"></Icon>
              {{panda[PandaModel.price]}}
            </a>
	        </p>
          <a href="#" slot="extra">
            G{{ 10 - parseInt(panda[PandaModel.integral] / 100)}}
          </a>
    			<div class="text-center nomal-padding">
            <canvas :id=" 'cvs' + index" width="200" height="200" class="nomal-padding" @click="buyPanda(panda)"></canvas>
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
          <canvas id="cvsbuy" width="200" height="200"></canvas>
            <!-- <img src="../../images/charactor/figure/testdog1.png" class="nomal-padding"> -->
          </Col>
        </Row>
        <Row span="24">
          <Col span="12" align="center">
          <a href="#">
              <!-- <Icon type="social-yen"></Icon> -->
              <img src="../../images/bamboo.png" style="vertical-align:middle;height: 20px;">
              {{initPandaBuyInfo[PandaModel.price]}}
          </a>
          </Col>
          <Col span="12" align="center">
            G{{ 10 - parseInt(initPandaBuyInfo[PandaModel.integral] / 100)}}
          </Col>
        </Row>
        <br>
        <Row type="flex" justify="center" >
          <Col span="5"><img :src="attrIconObj['speed']" class="img-vertical" >{{initPandaBuyInfo[PandaModel.speed]}}</Col>
          <Col span="5"><img :src="attrIconObj['hungry']" class="img-vertical" >{{initPandaBuyInfo[PandaModel.hungry]}}</Col>
          <Col span="5"><img :src="attrIconObj['metal']" class="img-vertical" >{{initPandaBuyInfo[PandaModel.goldCatch]}}</Col>
          <Col span="5"><img :src="attrIconObj['water']" class="img-vertical" >{{initPandaBuyInfo[PandaModel.waterCatch]}}</Col>
        </Row>
        <br>
        <Row type="flex" justify="center">
          <Col span="5"><img :src="attrIconObj['wood']" class="img-vertical" >{{initPandaBuyInfo[PandaModel.woodCatch]}}</Col>
          <Col span="5"><img :src="attrIconObj['fire']" class="img-vertical" > {{initPandaBuyInfo[PandaModel.fireCatch]}}</Col>
          <Col span="5"><img :src="attrIconObj['earth']" class="img-vertical" >{{initPandaBuyInfo[PandaModel.earthCatch]}}</Col>
          <Col span="5"><img v-if="initPandaBuyInfo[PandaModel.special]" :src="attrIconObj['super']" class="img-vertical" >{{initPandaBuyInfo[PandaModel.special]}} </Col>
      </Row>
       <br>
      </p>
      <div slot="footer" align="center">
          <Button type="success" @click="onSureBuy">{{ $t("Purchase") }}</Button>
          <Button offset="2" @click="onCancelBuy">{{ $t("Cancel") }}</Button>
      </div>
  </Modal>
    <Page :total="totalPandas" :page-size="pageSize" class="nomal-padding" @on-page-size-change="onPageSizeChange" @on-change="pageChange" v-if="showPanda.length !== 0"></Page>
  </Col>

  <!-- 我的市场 -->
  <Col span="20" v-show="filterIntegral === 'mySell'">
  <Row type="flex">
    <Col span="24" class="nomal-padding tip-bg" align="center" v-if="mySoldPanda.length === 0">
      <Icon type="checkmark-circled" color="red" size="50"></Icon>
      <span class="tip-word">{{ $t("no_sold_wuno") }}</span>
    </Col>
      <Col span="5" offset="1" v-for="(panda, index) in mySoldPanda" class="nomal-padding" style="width:200px" :key="index">
        <Card style="width: 100%;cursor:pointer;" :shadow="true">
          <p>
            <a href="#" :pandaIndex="index">
              <Icon type="social-yen"></Icon>
              {{panda[PandaModel.price]}}
            </a>
          </p>
          <a href="#" slot="extra">
            G{{ 10 - parseInt(panda[PandaModel.integral] / 100)}}
          </a>
          <div class="text-center nomal-padding">
            <canvas :id=" 'soldcvs' + index" width="200" height="200" class="nomal-padding"></canvas>
            <Row type="flex" justify="space-between">
              <Col v-for="(attr, index) in showAttr(panda)">
              <img :src="attrIconObj[attr]" class="img-vertical" >
            </Col>
            </Row>
            <br>
            <Button type="success" style="width: 100%;" @click="cancelSoldPanda(panda[PandaModel.gen])">取消出售</Button>
          </div>
        </Card>
      </Col>
    </Row>
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
  margin-right: 3px;
}
.tip-bg {
  margin-top: 100px;
}
.tip-word {
  margin-left: 15px;
  font-size: 28px;
  margin-top: -30px;
  line-height: 40px;
  display: inline-block;
  vertical-align: middle;
}
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { statusCodes } from '../../libs/statusCodes.js'
import { alertSuccInfo, LandProductCodes, alertErrInfo, LoginCodes, CommonCodes } from '../../libs/statusHandle.js'
import { LandModel, PandaModel, AssetsModel, UserModel } from '../../libs/ClientModel.js'
import waterImg from '../../images/land/water.png'
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
import serverRequest from '../../libs/serverRequest.js'
import BaseCanvas from '../../libs/charactor/BaseCanvas.js'
import CanvasImgTypes from '../../libs/charactor/CanvasImgTypes.js'
export default {
	data () {
		return {
			sortType: 'speed',
      pageSize: 12, // 每一页展示数量
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
      canvasArr: [], // 画布数组
      cvsBuyModal: null, // 购买面板的画布
      mySoldCanvasArr: [], // 我的售卖中的熊猫画布数组
      // 服务端对接字段
      PandaModel: PandaModel
		}
	},
  mounted () {
    this.queryAllPandaSold()
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
      for (const [index, cvs] of this.canvasArr.entries()) {
        const CanvasImgTypesArr = this.getImgArrByPandaGen(showPanda[index][PandaModel.gen])
        console.log('CanvasImgTypesArr', CanvasImgTypesArr)
        await this.canvasArr[index].drawCharactor(CanvasImgTypesArr)
      }
      // for (let cvs of this.canvasArr) {
      //   await cvs.drawCharactor(CanvasImgTypesArr)
      // }
      // const canvasDraw3 = await baseCanvas3.drawCharactor()
    },

    // 查询所有出售中的熊猫
    async queryAllPandaSold () {
      const pandas = await serverRequest.queryAllPandaSold()
      if (!pandas) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = (data) => {
        this.pandas = data
        this.$nextTick(() => {
          this.updateMarketCharactor(this.showPanda)
        })
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(pandas.data, succCb, errCb)
    },

    // 更新我出售中的熊猫形象
    async updateMySoldCharactor (showPanda) {
      if (this.mySoldCanvasArr.length > 0) {
        for (let cvs of this.mySoldCanvasArr) {
          await cvs.clearCanvas()
        }
      }
      this.mySoldCanvasArr = []
      if (showPanda.length === 0) return
      for (const [index, panda] of showPanda.entries()) {
        // console.log(index, panda)
        let cvs = new BaseCanvas('soldcvs' + index)
        this.mySoldCanvasArr.push(cvs)
      }
      for (const [index, cvs] of showPanda.entries()) {
        const CanvasImgTypesArr = this.getImgArrByPandaGen(showPanda[index][PandaModel.gen])
        await this.mySoldCanvasArr[index].drawCharactor(CanvasImgTypesArr)
      }
      // for (let cvs of this.mySoldCanvasArr) {
      //   await cvs.drawCharactor(CanvasImgTypesArr)
      // }
    },

    // 取消出售熊猫
    async cancelSoldPanda (gen) {
      const unSoldPanda = await serverRequest.unSoldPanda(gen, this.userAddr)
      if (!unSoldPanda) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = (data) => {
        alertSuccInfo(this, statusCodes[this.curLang]['PandaLandCodes_Unsell_Panda_Succ'])
        this.queryAllPandaSold()
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(unSoldPanda.data, succCb, errCb)
    },

    // 通过基因绘画熊猫形象
    drawCharactorByGeni (gen) {

    },

    // 根据熊猫基因返回熊猫的canvasImgArr
    getImgArrByPandaGen (gen) {
      console.log('gen', gen)
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

		pageChange (val) {
			console.log('page',val)
      this.pageIndex = val
		},
    showAttr (panda) {
      let baseAttiArr = []
      baseAttiArr.push({ type: 'metal', val: panda[this.PandaModel.goldCatch] })
      baseAttiArr.push({ type: 'water', val: panda[this.PandaModel.waterCatch] })
      baseAttiArr.push({ type: 'fire', val:panda[this.PandaModel.fireCatch] })
      baseAttiArr.push({ type: 'wood', val: panda[this.PandaModel.woodCatch] })
      baseAttiArr.push({ type: 'earth', val: panda[this.PandaModel.earthCatch]})
      baseAttiArr.sort(function(a, b) {
        return b.val - a.val;
      })
      if (panda[this.PandaModel.special]) {
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
        case 'all-panda':
          this.filterIntegral = 'allPanda'
          break
        case 'low-level-panda': 
          this.filterIntegral = 'lowFilter'
          break
        case 'high-level-panda':
          this.filterIntegral = 'highFilter'
          break
        case 'special-panda':
          this.filterIntegral = 'specialPanda'
          break
        case 'my-sell':
          this.filterIntegral = 'mySell'
          this.$nextTick(() => {
            this.updateMySoldCharactor(this.mySoldPanda)
          })
          break
        default:
          break
      }
    },
    async buyPanda (panda) {
      // this.buyPandaIndex = parseInt(e.target.getAttribute('pandaIndex'))
      this.pandaBuy = true
      this.initPandaBuyInfo = panda
      if (this.cvsBuyModal) {
        await this.cvsBuyModal.clearCanvas()
      } else {
        this.cvsBuyModal = new BaseCanvas('cvsbuy')
      }
      const CanvasImgTypesArr = this.getImgArrByPandaGen(panda[PandaModel.gen])
      await this.cvsBuyModal.drawCharactor(CanvasImgTypesArr)
    },
    onSureBuy () {
      let price = this.initPandaBuyInfo[this.PandaModel.price]
      let pandaGen = this.initPandaBuyInfo[this.PandaModel.gen]
      serverRequest.buyPanda(this.userAddr, pandaGen, price)
      .then(v => {
        let succCb = (data) => {
          this.pandaBuy = false
          this.queryAllPandaSold()
        }
        let errCb = (msg) => {
          this.pandaBuy = false
          alertErrInfo(this, statusCodes[this.curLang][msg])
        }
        serverRequest.handleRequestRes(v.data, succCb, errCb)
      })
      .catch(e => {})
    },
    onCancelBuy () {
      this.pandaBuy = false
    },
    testCvsClick () {
      console.log('cvscvs')
    }
	},
	components: {
		
	},
  computed: {
    ...mapState({
      userAddr: state => state.login.userAddr,
      curLang: state => state.login.curLang,
      userBamboo: state => state.login.userBamboo
    }),
    sortTypeList () {
      if (this.curLang === 'en') {
        return [
          {
            value: 'speed',
            label: 'speed'
          },
          {
            value: 'hungry',
            label: 'hungry'
          },
          {
            value: 'goldCatch',
            label: 'gold'
          },
          {
            value: 'waterCatch',
            label: 'water'
          },
          {
            value: 'earthCatch',
            label: 'earth'
          },
          {
            value: 'woodCatch',
            label: 'wood'
          },
          {
            value: 'fireCatch',
            label: 'fire'
          }
        ]
      } else {
        return [
          {
            value: 'speed',
            label: '速度'
          },
          {
            value: 'hungry',
            label: '抗饥饿能力'
          },
          {
            value: 'goldCatch',
            label: '金'
          },
          {
            value: 'waterCatch',
            label: '水'
          },
          {
            value: 'earthCatch',
            label: '土'
          },
          {
            value: 'woodCatch',
            label: '木'
          },
          {
            value: 'fireCatch',
            label: '火'
          }
        ]
      }
    },
    sortWayList () {
      if (this.curLang === 'en') {
        return [
          {
            value: 'lowFirst',
            label: 'low to high'
          },
          {
            value: 'highFirst',
            label: 'hign to low'
          }
        ]
      } else {
        return [
          {
            value: 'lowFirst',
            label: '由低到高'
          },
          {
            value: 'highFirst',
            label: '由高到低'
          }
        ]
      }
    },
    showPanda () {
      let pandasFilterArr = []
      if (this.filterIntegral === 'lowFilter') {
        pandasFilterArr = this.pandas.filter(panda => panda[this.PandaModel.integral] <= 500)
      } else if (this.filterIntegral === 'highFilter') {
        pandasFilterArr = this.pandas.filter(panda => panda[this.PandaModel.integral] > 500)
      } else {
        pandasFilterArr = this.pandas
      }
      let pandasCountArr = pandasFilterArr.sort((a, b) => {
        let aVal = a[this.sortType]
        let bVal = b[this.sortType]
        return aVal - bVal
      })
      let finalArr = pandasFilterArr.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
     if (this.sortWay === 'highFirst') {
      return finalArr.reverse()
     } else {
      return finalArr
     }
    },
    mySoldPanda () {
      return this.showPanda.filter(panda => panda[PandaModel.addr] === this.userAddr)
    },
    totalPandas () {
      return this.pandas.length
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