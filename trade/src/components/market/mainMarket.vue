<i18n src='../../common/i18n/market/mainMarket.json'></i18n>
<template>
	<div id="mainMarket">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="all-panda" style="width:160px;" @on-select="selectMenu">
        <MenuGroup title="熊猫市场">
            <MenuItem name="all-panda">
                <Icon type="document-text"></Icon>
                {{ $t("All the pandas") }}
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
                {{ $t("special pandas") }}
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="商品市场">
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
        </MenuGroup>
    </Menu>
  </Col>
  <Col span="20">
  	<Row class="nomal-padding">
  		<Col span="4">
  			<span class="total-panda">{{ $t("A total of 3560 pandas") }}</span>
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
    	<Col span="5" offset="1" v-for="(panda, index) in showPanda" class="nomal-padding" >
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
    				<img src="../../images/charactor/figure/testdog1.png" class="nomal-padding" @click="buyPanda" :pandaIndex="index">
    				<Row type="flex" justify="space-between">
    					<Col><img :src="waterImg" class="img-vertical" >{{ panda.speed }}</Col>
    					<Col><img :src="waterImg" class="img-vertical" > {{ panda.hungry }}</Col>
    					<Col><img :src="waterImg" class="img-vertical" > {{ panda.goldCatch }}</Col>
    				</Row>
    				<Row type="flex" justify="space-between">
    					<Col><img :src="waterImg" class="img-vertical" > {{ panda.waterCatch }}</Col>
    					<Col><img :src="waterImg" class="img-vertical" > {{ panda.woodCatch }}</Col>
    					<Col><img :src="waterImg" class="img-vertical" > {{ panda.fireCatch }}</Col>
    				</Row>
    				<Row type="flex" justify="space-between">
    					<Col><img :src="waterImg" class="img-vertical" > {{ panda.earthCatch }}</Col>
    					<Col><img :src="waterImg" class="img-vertical" > {{ panda.special }}</Col>
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
          <Col span="12" offset="12" align="center">
          <a href="#">
              <Icon type="ios-loop-strong"></Icon>
              {{initPandaBuyInfo.price}}
          </a>
          </Col>
        </Row>
        <Row type="flex" justify="center" >
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{initPandaBuyInfo.speed}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{initPandaBuyInfo.hungry}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{initPandaBuyInfo.goldCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{initPandaBuyInfo.waterCatch}}</Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{initPandaBuyInfo.woodCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" > {{initPandaBuyInfo.fireCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{initPandaBuyInfo.earthCatch}}</Col>
          <Col span="4"><img :src="waterImg" class="img-vertical" >{{initPandaBuyInfo.special}} </Col>
      </Row>
       <br>
      </p>
      <div slot="footer" align="center">
          <Button type="success" @click="onSureBuy">{{ $t("Purchase") }}</Button>
          <Button offset="2" @click="onCancelBuy">{{ $t("Cancel") }}</Button>
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
import serverRequest from '../../libs/serverRequest.js'
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
      testAddr: '1234'
		}
	},
  mounted () {
    serverRequest.queryAllPandaSold()
    .then(v => {
      console.log('v',v)
      let succCb = (data) => {
        this.pandas = data
      }
      let errCb = () => {}
      serverRequest.handleRequestRes(v.data, succCb, errCb)
    })
    .catch(e => {})
  },
	methods: {
		pageChange (val) {
			console.log('page',val)
      this.pageIndex = val
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
  }
}
</script>