<i18n src='../../common/i18n/market/mainMarket.json'></i18n>
<template>
	<div id="mainMarket">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="all-panda" style="width:160px;">
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
    	<Col span="5" offset="1" v-for="(panda, index) in pandas" class="nomal-padding">
    		<Card style="width: 100%;cursor:pointer;" :shadow="true">
    			<p>
            <Icon type="ios-film-outline"></Icon>
	        </p>
	        <a href="#" slot="extra" @click.prevent="changeLimit">
	            <Icon type="ios-loop-strong"></Icon>
	            10000
	        </a>
    			<div class="text-center nomal-padding">
    				<img src="../../images/charactor/figure/testdog1.png" class="nomal-padding">
    				<Row type="flex">
    					<Col>speed: 30</Col>
    					<Col>hungry: 30</Col>
    					<Col>goldCatch: 30</Col>
    				</Row>
    				<Row type="flex" justify="space-between">
    					<Col>woodCatch: 30</Col>
    					<Col>waterCatch: 30</Col>
    					<Col>fireCatch: 30</Col>
    				</Row>
    				<Row type="flex" justify="space-between">
    					<Col>earthCatch: 30</Col>
    					<Col>special: 30</Col>
    				</Row>
    			</div>
    		</Card>
    	</Col>
    </Row>
    <Page :total="100" show-sizer class="nomal-padding" @on-change="pageChange"></Page>
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
</style>
<script>
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
			sortWay: 'lowFirst',
			pandas: [1,1,1,1,1,1,1]
		}
	},
	methods: {
		pageChange (val) {
			console.log('page',val)
		}
	},
	components: {
		
	}
}
</script>