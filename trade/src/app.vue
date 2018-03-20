<i18n src='./common/i18n/app.json'></i18n>
<template>
<div id="tradeContainer">
<!--  头部导航栏 -->
	<layout>
		<Header>
			<Menu mode="horizontal" theme="dark" active-name="1" @on-select="selectMenu">
				<div class="layout-logo" style="background: #495060;top:5px;width:150px;">
					<img src="./images/ethland.png" style="vertical-align:middle;">
					<span class="logo-word">EthLand.pro</span>
				</div>
				<div class="layout-nav" style="width: 650px;">
					<MenuItem name="app_announce">
						<Icon type="ios-keypad"></Icon>
						{{ $t("app_announce") }}
					</MenuItem>
					<MenuItem name="app_guide">
						<Icon type="ios-navigate"></Icon>
						{{ $t("app_guide") }}
					</MenuItem>
					<MenuItem name="app_activity">
					<Icon type="fireball"></Icon>
						{{ $t("app_activity") }}
					</MenuItem>
					<MenuItem name="menu_person" v-show="false">
						<Icon type="person"></Icon>
						{{ $t("app_login") }}
					</MenuItem>
					<MenuItem name="app_person">
					<Dropdown trigger="click" style="margin-left: 20px" @on-click="menuAccontClick">
						{{ $t("app_person") }}
					<Icon type="arrow-down-b" style="margin-left: 10px"></Icon>
	        <DropdownMenu slot="list">
            <DropdownItem name="app_assets">
            <Icon type="arrow-graph-up-right"></Icon>
            	{{ $t("app_assets") }}
            </DropdownItem>
            <DropdownItem name="app_Account_Safe">
            <Icon type="cloud"></Icon>
            	{{ $t("app_Account_Safe") }}
            </DropdownItem>
            <DropdownItem>
            <Icon type="log-out"></Icon>
            {{ $t("app_Log_Out") }}
            </DropdownItem>
	        </DropdownMenu>
    			</Dropdown>	
					</MenuItem>
					<MenuItem name="menu_lang">
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
  </Layout>
  <!--  面包屑提示 -->
	<Layout :style="{padding: '0 100px 100px'}" v-if="false">
    <Breadcrumb :style="{margin: '24px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>{{ $t(menu) }}</BreadcrumbItem>
        <BreadcrumbItem>{{ $t(submenu) }}</BreadcrumbItem>
    </Breadcrumb>
    <!-- 主体内容 -->
    <Content :style="{padding: '24px', minHeight: '280px',background: '#fff'}">
        Content
    </Content>
  </Layout>
  <!--  登陆模块 -->
  <layout>
		<Content :style="{ padding: '0 50px' }" v-if="true">
			<loginService  v-if="currentView === 'loginService'" @login-succ="loginSucc" />
			<comboService v-if="currentView === 'comboService'" />
			<landService v-if="currentView === 'landService'" />
		</Content>
		<Footer class="layout-footer-center" :style="{position: 'fixed', width: '100%', bottom: '0'}">ethLand.best@2017-2018 All Right Resolved.</Footer>
</layout>
</div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}
* {
  -webkit-tap-highlight-color: rgba(0,0,0,0)
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
.logo-word {
	font-family: FZCuYuan-M03S;
	font-size: 18px;
	line-height: 18px;
	vertical-align: middle;
	color: #f0f0f0;
}
@font-face {
  font-family: FZCuYuan-M03S;
  src: url(./images/font/FZCuYuan-M03S.ttf);
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
import loginService from './components/loginService.vue'
import comboService from './components/comboService.vue'
import landService from './components/landService.vue'
import i18n from "./index.js"
export default {
	data () {
		return {
			currentView: 'landService',
			menu: 'app_person',
			submenu: 'app_assets'
		}
	},
	methods: {
		menuAccontClick (name) {
			console.log('menuAccontClick:', name)
			// i18n.locale = 'en'
			this.submenu = name
		},
		selectMenu (name) {
			this.menu = name
		},
		loginSucc () {

		}
	},
	components: {
		loginService,
		comboService,
		landService
	}
}

</script>
