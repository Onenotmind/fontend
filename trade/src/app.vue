<template>
<div id="tradeContainer">
	<layout>
		<Header>
			<Menu mode="horizontal" theme="dark" active-name="1">
				<div class="layout-logo"></div>
				<div class="layout-nav" style="width: 620px;">
					<MenuItem name="1">
						<Icon type="ios-keypad"></Icon>
						公告中心
					</MenuItem>
					<MenuItem name="2">
						<Icon type="ios-navigate"></Icon>
						新手引导
					</MenuItem>
					<MenuItem name="3">
					<Icon type="fireball"></Icon>
						活动中心
					</MenuItem>
					<MenuItem name="4">
						<Icon type="person"></Icon>
						登陆
					</MenuItem>
					<MenuItem name="5">
					<Dropdown trigger="click" style="margin-left: 20px">
	        简体中文
          <Icon type="arrow-down-b" style="margin-left: 10px"></Icon>
	        <DropdownMenu slot="list">
            <DropdownItem>English</DropdownItem>
            <DropdownItem>Korean</DropdownItem>
	        </DropdownMenu>
    			</Dropdown>	
					</MenuItem>
				</div>
			</Menu>
		</Header>
		<Content :style="{ padding: '0 50px' }">
			<!-- <Breadcrumb :style="{ margin: '20px 0'}">
				<BreadcrumbItem>Home</BreadcrumbItem>
				<BreadcrumbItem>Components</BreadcrumbItem>
				<BreadcrumbItem>Layout</BreadcrumbItem>
				<BreadcrumbItem>content</BreadcrumbItem>
			</Breadcrumb>
			<Card>
				<div style="min-height: 200px;">
					content.
				</div>
			</Card> -->
			<component :is="currentView" />
		</Content>
		<Footer class="layout-footer-center">ethLand.best@2017-2018 All Right Resolved.</Footer>
	</layout>
</div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}
#tradeContainer {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
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
.layout-footer-center{
    text-align: center;
}
</style>

<script>
import login from './components/login.vue'
import register from './components/register.vue'
import resetPass from './components/resetPass.vue'
export default {
	data () {
		return {
			currentView: resetPass
		}
	}
}

</script>
