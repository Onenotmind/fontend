<i18n src='../../common/i18n/discover/discover.json'></i18n>
<template>
	<div id="discover">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="free-activity" style="width:160px;" @on-select="selectMenu">
        <MenuGroup title="当前活动">
            <MenuItem name="ads-list">
                <Icon type="document-text"></Icon>
                广告活动
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="生活服务">
          <MenuItem name="call-charge">
                <Icon type="email"></Icon>
                充值话费
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="商品中心">
        	<MenuItem name="current-product-center">
                <Icon type="email"></Icon>
                当前商品
            </MenuItem>
          <MenuItem name="next-product-vote">
                <Icon type="email"></Icon>
                下期商品投票
            </MenuItem>
        </MenuGroup>
    </Menu>
  </Col>
  <!-- 广告 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="currentCard === 'ads-list'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="discover-card-title">广告中心</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="20" class="card-margin" offset="2">
        	<Carousel autoplay v-model="adIndex">
		        <CarouselItem v-for="(product, index) in curProducts" :key="index">
		            <div class="ad-image">
		            	<!-- <a :href="product.link"> -->
		            		<img :src="product.imgSrc" class="ad-img">
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
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="discover-card-title">当前商品中心</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="card-margin">
        	<Row type="flex">
	    			<Col span="5" offset="1" v-for="(product, index) in curProducts" class="nomal-padding" style="width:200px" :key="index">
	    				<p class="text-center">
	    					<img :src="product.imgSrc" class="productImg">
	    				</p>
	    				<p>{{product.name}}</p>
	    				<br>
	    				<span style="float: left">{{product.recommender}}</span>
	    				<span style="float: right">市价：{{product.value}}</span>
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
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="discover-card-title">下期商品投票</span>
          <Select v-model="voteBaseCount" style="width:120px;margin-left: 40px;">
            <Option v-for="item in [100, 1000, 10000, 100000]" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="card-margin">
        	<Row type="flex">
	    			<Col span="5" offset="1" v-for="(product, index) in nextProducts" class="nomal-padding" style="width:200px" :key="index">
	    				<p class="text-center">
	    					<img :src="product.imgSrc" class="productImg">
	    				</p>
	    				<br>
	    				<span style="float: left">总票数：{{product.time}}</span>
	    				<span style="float: right">市价：{{product.value}}</span>
	    				<br>
	    				<span style="float: left"> {{product.recommender}}</span>
	    				<br>
	    				<Button type="success" style="width: 200px;" @click="votePro(product.productId)">投票</Button>
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
</style>
<script>
import serverRequest from '../../libs/serverRequest.js'
import { alertSuccInfo, LandProductCodes, alertErrInfo, LoginCodes, CommonCodes } from '../../libs/statusHandle.js'
const testImg = 'https://best.bi/assets/xx/avatars/avatar.png'
export default {
	data () {
		return {
			currentCard: 'ads-list', // 当前卡片内容
			curProducts: [], // 当前商品列表
			nextProducts: [], // 下期商品列表
			currentAds: [], // 轮播的图片与链接
			voteBaseCount: 100, //投票数量
			voteNum: 0, // 商品投票的票数
			adIndex: 0 // 广告轮播index
		}
	},
	mounted () {
		this.$nextTick(async () => {
			const curProductsArr = await serverRequest.getCurrentProduct()
			if (!curProductsArr) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
			let succCb = (data) => {
        // alertSuccInfo(this, LandProductCodes.Current_Product_Null)
        console.log('discoverdata', data)
        this.curProducts = data.slice(0)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(curProductsArr.data, succCb, errCb)
			// let nextPros = document.getElementsByClassName('nextProImg')
			// for (let item of nextPros) {
			// 	this.$nextTick(() => {
			// 		item.setAttribute('src', 'https://best.bi/assets/xx/avatars/avatar.png')
			// 	})
			// }
		})
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
        default:
          break
      }
		},

		// 获取当前投票中的商品
		async getCurrentVotedProduct () {
			const curProductsArr = await serverRequest.getCurrentVotedProduct()
			if (!curProductsArr) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
			let succCb = (data) => {
        // alertSuccInfo(this, LandProductCodes.Current_Product_Null)
        this.nextProducts = data.slice(0)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(curProductsArr.data, succCb, errCb)
		},

		// 给商品投票
		async votePro (productId) {
			const vote = await serverRequest.voteProduct(productId, this.voteBaseCount)
			if (!vote) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
			let succCb = (data) => {
        alertSuccInfo(this, LandProductCodes.Vote_Product_Succ)
        this.getCurrentVotedProduct()
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(vote.data, succCb, errCb)
		}
	}
}
</script>