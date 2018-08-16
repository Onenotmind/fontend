<i18n src='../../common/i18n/discover/discover.json'></i18n>
<template>
	<div id="discover">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="free-activity" style="width:90%;" @on-select="selectMenu">
        <MenuGroup :title="$t('current_activity')">
            <MenuItem name="ads-list">
                <!-- <Icon type="document-text"></Icon> -->
                {{ $t("Advertise") }}
            </MenuItem>
        </MenuGroup>
        <MenuGroup :title="$t('Life_Service')">
         <!--  <MenuItem name="call-charge" >
                {{ $t("Charge") }}
            </MenuItem> -->
        </MenuGroup>
        <MenuGroup :title="$t('products_center')">
        	<MenuItem name="current-product-center">
                <!-- <Icon type="email"></Icon> -->
                {{ $t("current_products") }}
            </MenuItem>
          <MenuItem name="next-product-vote">
                <!-- <Icon type="email"></Icon> -->
                {{ $t("next_products") }}
            </MenuItem>
          <MenuItem name="next-product-attr-vote">
                <!-- <Icon type="email"></Icon> -->
                {{ $t("next_products_attr") }}
            </MenuItem>
        </MenuGroup>
    </Menu>
  </Col>
  <!-- 广告 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="currentCard === 'ads-list'">
    <p>
      <!-- 当前暂无广告 -->
      <Row span="24" v-if="!adsProducts || adsProducts.length < 1">
        <Col span="24" class="nomal-padding tip-bg" align="center">
          <Icon type="checkmark-circled" color="red" size="50"></Icon>
          <span class="tip-word">{{ $t("cur_no_ads") }}</span>
        </Col>
      </Row>
      <Row span="24" v-if="adsProducts.length > 0">
        <Col span="24" align="left" class="nomal-padding">
          <!-- <Icon type="ios-film-outline" size="28" class="vertical"></Icon> -->
          <span class="discover-card-title">{{ $t("Advertise") }}</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="20" class="card-margin" offset="2">
        	<Carousel autoplay v-model="adIndex">
		        <CarouselItem v-for="(product, index) in adsProducts" :key="index">
		            <div class="ad-image">
		            	<!-- <a :href="product.link"> -->
		            		<img :src="product[LandModel.src]" class="ad-img" @click="openHref(product[LandModel.proSrc])">
		            	<!-- </a> -->
		          	</div>
		        </CarouselItem>
		        <!-- <CarouselItem>
		            <div class="ad-image">2</div>
		        </CarouselItem>
		        <CarouselItem>
		            <div class="ad-image">3</div>
		        </CarouselItem>
		        <CarouselItem>
		            <div class="ad-image">4</div>
		        </CarouselItem> -->
		    </Carousel>
       </Col>
      </Row>
    </p>
  </Card>
</Col>
<!-- 当前商品中心 -->
<Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="currentCard === 'current-product-center'">
    <p>
      <!-- 当前暂无商品进行中 -->
      <Row span="24" v-if="!curProductsList || curProductsList.length < 1">
        <Col span="24" class="nomal-padding tip-bg" align="center">
          <Icon type="checkmark-circled" color="red" size="50"></Icon>
          <span class="tip-word">{{ $t("cur_no_product") }}</span>
        </Col>
      </Row>
      <Row span="24" v-if="curProductsList.length > 0">
        <Col span="12" align="left" class="nomal-padding">
          <!-- <Icon type="ios-film-outline" size="28" class="vertical"></Icon> -->
          <span class="discover-card-title">{{$t('products_center')}}</span>
        </Col>
        <!-- <Col span="12" align="right" class="nomal-padding">
          <span class="discover-card-title">{{$t("products_catagory")}}</span>
          <Select v-model="soldCata" style="width:120px;margin-left: 40px;">
            <Option v-for="item in proCatagoryList" :value="item.key" :key="item.key">{{ item.label }}</Option>
        </Select>
        </Col> -->
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="card-margin">
        	<Row type="flex">
	    			<Col span="5" offset="1" v-for="(product, index) in curProductsList" class="nomal-padding" style="width:200px" :key="index">
	    				<p class="text-center">
	    					<img :src="product[LandModel.src]" class="productImg" @click="openHref(product[LandModel.proSrc])">
	    				</p>
	    				<p>{{product[LandModel.name]}}</p>
	    				<br>
	    				<span style="float: left">{{product[LandModel.recommender]}}</span>
	    				<span style="float: right">{{$t('price')}}: {{product[LandModel.value]}}</span>
	    				<br>
			    	</Col>
		    </Row>
      	</Col>
      </Row>
    </p>
  </Card>
</Col>
<!-- 下期商品投票 -->
<Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="currentCard === 'next-product-vote'">
    <p>
      <Row span="24">
        <Col span="12" align="left" class="nomal-padding">
          <!-- <Icon type="ios-film-outline" size="28" class="vertical"></Icon> -->
          <span class="discover-card-title">{{$t("next_products")}}</span>
          <Select v-model="voteBaseCount" style="width:120px;margin-left: 40px;">
            <Option v-for="item in [100, 1000, 10000, 100000]" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
        <Col span="12" align="right" class="nomal-padding">
          <!-- <Icon type="ios-film-outline" size="28" class="vertical"></Icon> -->
          <span class="discover-card-title">{{$t("products_catagory")}}</span>
          <Select v-model="proCata" style="width:120px;margin-left: 40px;">
            <Option v-for="item in proCatagoryList" :value="item.key" :key="item.key">{{ item.label }}</Option>
        </Select>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="card-margin">
        	<Row type="flex">
	    			<Col span="5" offset="1" v-for="(product, index) in nextProductsList" class="nomal-padding" style="width:200px" :key="index">
	    				<p class="text-center">
                <!-- <a :href="product[LandModel.proSrc]"> -->
	    					  <img :src="product[LandModel.src]" class="productImg" @click="openHref(product[LandModel.proSrc])">
                <!-- </a> -->
	    				</p>
	    				<br>
	    				<span style="float: left">{{$t("total_vote")}}：{{product[LandModel.time]}}</span>
	    				<span style="float: right">{{$t("price")}}:{{product[LandModel.value]}}</span>
	    				<br>
	    				<span style="float: left"> {{product[LandModel.recommender]}}</span>
	    				<br>
	    				<Button type="success" style="width: 200px;" @click="votePro(product[LandModel.productId])" :disabled="!curVoteDisable">{{$t("vote")}}</Button>
			    	</Col>
		    </Row>
      	</Col>
      </Row>
    </p>
  </Card>
</Col>

<!-- 下期商品属性投票 -->
<Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="currentCard === 'next-product-attr-vote'">
    <p>
      <Row span="24" v-show="!curAttrVoteDisable">
        <Col span="24" class="nomal-padding tip-bg" align="center">
          <Icon type="checkmark-circled" color="red" size="50"></Icon>
          <span class="tip-word">{{ $t("vote_not_begin") }}</span>
        </Col>
      </Row>
      <Row span="24" v-show="curAttrVoteDisable">
        <Col span="12" align="left" class="nomal-padding">
          <!-- <Icon type="ios-film-outline" size="28" class="vertical"></Icon> -->
          <span class="discover-card-title">{{$t("next_products")}}</span>
          <Select v-model="voteAttrCount" style="width:120px;margin-left: 40px;">
            <Option v-for="item in [100, 1000, 10000, 100000]" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
        <Col span="12" align="right" class="nomal-padding">
          <!-- <Icon type="ios-film-outline" size="28" class="vertical"></Icon> -->
          <!-- <span class="discover-card-title">{{$t("products_catagory")}}</span>
          <Select v-model="proAttrCata" style="width:120px;margin-left: 40px;">
            <Option v-for="item in proCatagoryList" :value="item.key" :key="item.key">{{ item.label }}</Option>
        </Select> -->
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="card-margin">
          <Row type="flex">
            <Col span="5" offset="1" v-for="(product, index) in nextProductsAttrList" class="nomal-padding" style="width:200px" :key="index">
              <p class="text-center">
                <img :src="product[LandModel.src]" class="productImg" @click="openHref(product[LandModel.proSrc])">
              </p>
              <br>
              <span style="float: left">{{$t("total_vote")}}：{{product[LandModel.time]}}</span>
              <span style="float: right">{{$t("price")}}:{{product[LandModel.value]}}</span>
              <br>
              <span style="float: left"> {{product[LandModel.recommender]}}</span>
              <br>
              <RadioGroup v-model="nextProducts[index]['attr']">
                <Radio label="fire">{{$t("fire")}} {{ calcAttrVote(product, 'fire') }}</Radio>
                <Radio label="water">{{$t("water")}} {{ calcAttrVote(product, 'water') }}</Radio>
                <Radio label="earth">{{$t("earth")}} {{ calcAttrVote(product, 'earth') }}</Radio>
                <Radio label="gold">{{$t("gold")}} {{ calcAttrVote(product, 'gold') }}</Radio>
                <Radio label="wood">{{$t("wood")}} {{ calcAttrVote(product, 'wood') }}</Radio>
            </RadioGroup>
              <Button type="success" style="width: 200px;" @click="voteProAttr(product[LandModel.productId], nextProducts[index]['attr'], product[LandModel.period])">{{$t("vote")}}</Button>
            </Col>
        </Row>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

</Row>
	</div>
</template>
</template>
<style scoped>
img {
  cursor: pointer;
}
.text-center {
	text-align: center;
}
.nomal-padding {
	padding-top: 15px;
	padding-bottom: 20px;
}
.card-margin {
	margin-top: 35px;
}
.ad-image {
	width: 100%;
	height: 300px;
	text-align: center;
	background: #000;
	color: #fff;
}
.ad-img {
	width: 50%;
	height: 100%;
}
.discover-card-title {
  font-size:18px;
  color:green;
  margin-left:8px;
  line-height: 20px;
}
.productImg {
  width: 120px;
  height: 120px;
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
import serverRequest from '../../libs/serverRequest.js'
import { statusCodes } from '../../libs/statusCodes.js'
import { LandModel, PandaModel, AssetsModel } from '../../libs/ClientModel.js'
import { alertSuccInfo, LandProductCodes, alertErrInfo, LoginCodes, CommonCodes } from '../../libs/statusHandle.js'
const testImg = 'https://best.bi/assets/xx/avatars/avatar.png'
export default {
	data () {
		return {
			currentCard: 'ads-list', // 当前卡片内容
			curProducts: [], // 当前商品列表
			nextProducts: [], // 下期商品列表
      nextProductsAttr: [], // 下期商品属性投票
			currentAds: [], // 轮播的图片与链接
			voteBaseCount: 100, //投票数量
      voteAttrCount: 100, // 商品属性投票
			voteNum: 0, // 商品投票的票数
			adIndex: 0, // 广告轮播index
      // 服务端对接字段
      LandModel,
      proCatagory: [], // 商品类别
      soldCata: 'product', // 当前售卖商品中默认分类
      proCata: 'clothing', // 商品投票默认分类
      proAttrCata: 'clothing', // 商品属性投票默认分类
      currentServerTime: 0, // 当前服务端时间
      nextVoteStartTime: 0, // 下期商品投票时间
      serverTimeInterval: null, // 当前服务端时间更新interval
      allAttrVote: [] // 所以的商品属性投票 
		}
	},
	mounted () {
		this.$nextTick(async () => {
      await this.getNextVoteStartTime()
      await this.getCurServerTime()
      const serverTimeInterval = setInterval(async () => {
        await this.getCurServerTime()
      }, 60 * 1000)
			const curProductsArr = await serverRequest.getCurrentProduct()
			if (!curProductsArr) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
			let succCb = (data) => {
        // alertSuccInfo(this, LandProductCodes.Current_Product_Null)
        console.log('discoverdata', data)
        this.curProducts = data.slice(0)
        // this.curProducts = data.filter(pro => pro[LandModel.productType] === 'product')
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(curProductsArr.data, succCb, errCb)
      await this.getCurrentVotedProduct()
			// let nextPros = document.getElementsByClassName('nextProImg')
			// for (let item of nextPros) {
			// 	this.$nextTick(() => {
			// 		item.setAttribute('src', 'https://best.bi/assets/xx/avatars/avatar.png')
			// 	})
			// }
		})
	},
  destroyed () {
    if (this.serverTimeInterval) {
      clearInteval(this.serverTimeInterval)
      this.serverTimeInterval = null
    }
  },
  computed: {
    ...mapState({
      userAddr: state => state.login.userAddr,
      curLang: state => state.login.curLang,
      userBamboo: state => state.login.userBamboo
    }),
    
    curVoteDisable: function () {
      if ((parseInt(this.nextVoteStartTime) < parseInt(this.currentServerTime)) && (parseInt(this.nextVoteStartTime) + 36 * 3600 > parseInt(this.currentServerTime))) {
        return true
      } else {
        return false
      }
    },
    curAttrVoteDisable: function () {
      if ((this.nextVoteStartTime + 36 * 3600 < this.currentServerTime) && (this.nextVoteStartTime + 48 * 3600 > this.currentServerTime)) {
        return true
      } else {
        return false
      }
    },
    curProductsList: function () {
      return this.curProducts
    },
    nextProductsList: function () {
      return this.nextProducts.filter(pro => pro[LandModel.productType] === this.proCata)
    },
    nextProductsAttrList: function () {
      return this.nextProducts.sort((a, b) => {
        return b.time - a.time
      }).slice(0, 10)
    },
    adsProducts: function () {
      if (this.curProductsList && this.curProductsList.length > 0) {
        return this.curProductsList
      }
      if (this.nextProductsAttrList && this.nextProductsAttrList.length > 0) {
        return this.nextProductsAttrList
      }
      return []
    },
    proCatagoryList: function () {
      if (this.curLang === 'cn') {
        return [
          {
            key: 'clothing',
            label: '衣服'
          },
          {
            key: 'food',
            label: '食品'
          },
          {
            key: 'digital',
            label: '电子产品'
          },
          {
            key: 'cosmetic',
            label: '美妆'
          },
          {
            key: 'other',
            label: '其他'
          }
        ]
      } else if (this.curLang === 'en') {
        return [
          {
            key: 'clothing',
            label: 'clothing'
          },
          {
            key: 'food',
            label: 'food'
          },
          {
            key: 'digital',
            label: 'digital'
          },
          {
            key: 'cosmetic',
            label: 'cosmetic'
          },
          {
            key: 'other',
            label: 'other'
          }
        ]
      } else {
        return []
      }
    }
  },
	methods: {
		selectMenu(name) {
			switch(name) {
        case 'ads-list': 
          this.currentCard = 'ads-list'
          break
        case 'current-product-center':
        	this.currentCard = 'current-product-center'
        	break
        case 'next-product-vote':
        	this.currentCard = 'next-product-vote'
        	this.getCurrentVotedProduct()
        	break
        case 'next-product-attr-vote':
          this.currentCard = 'next-product-attr-vote'
          this.queryCountOfProductId()
          break
        default:
          break
      }
		},

    // 获取服务器当前时间
    async getCurServerTime () {
      const curtime = await serverRequest.serverTime()
      if (!curtime) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = (data) => {
        this.currentServerTime = parseInt(data)
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(curtime.data, succCb, errCb)
    },

    // 获取下期投票开始时间
    async getNextVoteStartTime () {
      const curtime = await serverRequest.getNextVoteStartTime()
      if (!curtime) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = (data) => {
        this.nextVoteStartTime = parseInt(data)
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(curtime.data, succCb, errCb)
    },

		// 获取当前投票中的商品
		async getCurrentVotedProduct () {
			const curProductsArr = await serverRequest.getCurrentVotedProduct()
			if (!curProductsArr) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
			let succCb = (data) => {
        // alertSuccInfo(this, LandProductCodes.Current_Product_Null)
        this.nextProducts = data.slice(0)
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(curProductsArr.data, succCb, errCb)
		},

		// 给商品投票
		async votePro (productId) {
      if (!this.curVoteDisable) {
        alertErrInfo(this, statusCodes[this.curLang]['Vote_Experied'])
        return 
      }
      // if (this.voteBaseCount > this.userBamboo) {
      //   alertErrInfo(this, statusCodes[this.curLang]['Insufficient_Bamboo_Balance'])
      //   return
      // }
			const vote = await serverRequest.voteProduct(productId, this.voteBaseCount)
			if (!vote) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
			let succCb = (data) => {
        alertSuccInfo(this, statusCodes[this.curLang]['LandProductCodes_Vote_Product_Succ'])
        this.getCurrentVotedProduct()
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(vote.data, succCb, errCb)
		},

    // 商品属性投票
    async voteProAttr (productId, attr, period) {
      if (!this.curAttrVoteDisable) {
        alertErrInfo(this, statusCodes[this.curLang]['Vote_Experied'])
        return 
      }
      const vote = await serverRequest.voteProductAttr(productId, attr, period, this.voteAttrCount)
      if (!vote) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = async (data) => {
        alertSuccInfo(this, statusCodes[this.curLang]['LandProductCodes_Vote_Product_Succ'])
        await this.queryCountOfProductId()
        // TODO
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(vote.data, succCb, errCb)
    },

    // 获取商品的属性值投票值
    async queryCountOfProductId () {
      const vote = await serverRequest.queryCountOfProductId()
      if (!vote) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = (data) => {
        this.allAttrVote = data.slice(0)
        // TODO
      }
      let errCb = (msg) => {
        // alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(vote.data, succCb, errCb)
    },

    // 计算商品属性值票数
    calcAttrVote (product, attr) {
      if (this.allAttrVote.length === 0) return 0
      const productId = product[LandModel.productId]
      const voteArr = this.allAttrVote.filter(pro => (pro[LandModel.idx_productId] === productId) && (pro[LandModel.attr] === attr))
      let count = 0
      voteArr.forEach(vote => {
        count += parseInt(vote[LandModel.amount])
      })
      return count
    },

    // 点击图片打开图片链接
    openHref (href) {
      window.open(href)
    }
	}
}
</script>