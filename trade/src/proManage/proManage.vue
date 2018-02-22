<template>
<div id="proManage">
<!--  头部导航栏 -->
	<layout>
		<Header>
			<Menu mode="horizontal" theme="dark" active-name="1">
				<div class="layout-logo" style="background: #495060;top:5px;width:150px;">
					<img src="../images/ethland.png" style="vertical-align:middle;">
					<span class="logo-word">EthLand.pro</span>
				</div>
				<div class="layout-nav" style="width: 650px;">
					<MenuItem name="app_announce" >
					<Dropdown trigger="click" @on-click="assetsClick">
						<Icon type="ios-keypad"></Icon>
						资产管理
						<DropdownMenu slot="list">
	            <DropdownItem name="all_assets">资产清单</DropdownItem>
	            <DropdownItem name="transation_in">资产转入</DropdownItem>
	            <DropdownItem name="transation_out">资产转出</DropdownItem>
		        </DropdownMenu>
		        </Dropdown>
					</MenuItem>
					<MenuItem name="app_guide">
						<Icon type="ios-navigate"></Icon>
						用户管理
					</MenuItem>
					<MenuItem name="app_activity">
					<Icon type="fireball"></Icon>
					活动管理
					</MenuItem>
				</div>
			</Menu>
		</Header>
  </Layout>
	<Layout :style="{padding: '0 100px 100px'}">
    <!-- 主体内容 -->
    <Content :style="{padding: '24px', minHeight: '280px',background: '#fff', marginTop: '50px'}">
      <!-- <Table stripe :columns="titles" :data="assetsData"></Table> -->
      <assets v-if="assetsFlag === 'assets'" />
      <assetsRollIn v-if="assetsFlag === 'assetsRollIn'" />
      <assetsRollOut v-if="assetsFlag === 'assetsRollOut'" />
    </Content>
  </Layout>
</div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}
#proManage {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.logo-word {
	font-family: FZCuYuan-M03S;
	font-size: 18px;
	line-height: 18px;
	vertical-align: middle;
	color: #f0f0f0;
}
@font-face {
  font-family: FZCuYuan-M03S;
  src: url(../images/font/FZCuYuan-M03S.ttf);
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>

<script>
import assets from './assets.vue'
import assetsRollIn from './assetsRollIn.vue'
import assetsRollOut from './assetsRollOut.vue'

export default {
	data () {
		return {
			assetsFlag: 'assetsRollOut'
		}
	},
	methods: {
		assetsClick (name) {
			console.log(name)
			if (name === 'all_assets') {
				this.assetsFlag = 'assets'
			} else if (name === 'transation_in') {
				this.assetsFlag = 'assetsRollIn'
			} else if (name === 'transation_out') {
				this.assetsFlag = 'assetsRollOut'
			} else {}
		}
	},
	components: {
		assets,
		assetsRollIn,
		assetsRollOut
	}
}

</script>
