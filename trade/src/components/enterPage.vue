<i18n src='../common/i18n/enterPage.json'></i18n>
<template>
	<div id="fontPage">
	<!-- 	<div class="enter-bg">
			<img src="../images/land/ethIcon.png" class="ethup1">
		</div> -->
		<div class="eth-logo">
			{{ $t("welcome") }}{{ showAddr }}{{ $t("enter_wunoland") }}
		</div>
		<!-- 注册 地址注册-->
		<Input v-model="ethAddr" class="enter-btn" :placeholder="$t('please_enter_eth_add')" v-show="enterPageState === 'addrSet'" @keyup.enter.native="checkAddr">
			<Button slot="append" @click="checkAddr">
				<Icon type="android-more-horizontal" size="14"></Icon>
			</Button>
		</Input>
		<a href="http://www.qukuaiwang.com.cn/news/3171.html" style="top:calc(48% + 10px); left: calc(50% + 240px);position: absolute;" v-show="enterPageState === 'addrSet'">{{ $t("no_eth_addr") }}</a>
		<!-- 登陆 -->
		<div class="login-enter" v-show="enterPageState === 'addrLog'|| enterPageState === 'pwdLog' ">
			<Input v-model="loginAddr" v-show="enterPageState === 'addrLog' " style="width:400px;" :placeholder="$t('please_enter_wunoland_add')">
			</Input>
			<br>
			<br v-show="enterPageState === 'addrLog' ">
			<Input v-model="loginPwd" type="password" style="width:400px;" :placeholder="$t('please_enter_wunoland_pwd')" @keyup.enter.native="userLogin">
			</Input>
			<br>
			<br>
			<Button type="primary" style="width: 400px;" @click="userLogin">{{ $t("go_wunoland") }}</Button>
			<br>
			<span style="width:80px;float: left;margin-left: 10px;" @click="toRigister">{{ $t("register") }}</span>
			<span style="width:180px;text-align:right;float: right;margin-right: 30px;" @click="toResetPass">{{ $t("forget_pwd") }}</span>
		</div>
		<!-- 重置密码 -->
		<div class="reset-pass" v-show="enterPageState === 'reset-pass'">
			<Input v-model="resetEthCode" class="code-input" :placeholder="$t('code')">
			</Input>
			<Button type="info" style="width: 176px" @click="getCodeWhenChangePwd">{{ $t("get_code") }}</Button>
			<br>
			<br>
			<Input v-model="resetEthPwd" class="pwd-btn" type="password" :placeholder="$t('please_enter_wunoland_pwd')">
			</Input>
			<br>
			<br>
			<Button type="success" style="width: 400px" @click="resetPass">{{ $t("reset_pwd") }}</Button>
		</div>
		<!-- 邮箱注册 -->
		<div class="info-set" v-show="enterPageState === 'reg' || enterPageState === 'emailReg'">
			<Input v-model="ethPwd" class="pwd-btn" type="password" :placeholder="$t('please_enter_wunoland_pwd')">
			</Input>
			<br>
			<a @click="showEmailModal">
				<Icon type="arrow-down-b" size="18" color="#fff" style="cursor: pointer;" ></Icon>
			</a>
			<br>
			<Input v-model="ethEmail" class="pwd-btn" type="password" :placeholder="$t('please_enter_email')" v-show="enterPageState === 'emailReg'">
			</Input>
			<br>
			<br v-show="enterPageState === 'emailReg'">
			<Input v-model="ethCode" class="code-input" :placeholder="$t('code')" v-show="enterPageState === 'emailReg'">
			</Input>
			<Button type="info" style="width: 176px" v-show="enterPageState === 'emailReg'" @click="getCode(ethEmail)">{{ $t("get_code") }}</Button>
			<br v-show="enterPageState === 'emailReg'">
			<br v-show="enterPageState === 'emailReg'">
			<Button type="primary" style="width: 400px" @click="landRegister">{{ $t("go_wunoland") }}</Button>
		</div>
		<img :src="langFlagImg" class="lang-pos" @click="changeLang">
	</div>
</template>
<style scoped>
.enter-bg {
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	z-index: -1;
}
span {
	display: inline-block;
	font-size: 16px;
	color: #eee;
	cursor: pointer;
}
.lang-pos {
	position: fixed;
	right: 50px;
	top: 30px;
	cursor: pointer;
}
#fontPage {
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    /*background: linear-gradient(#13194b,#4372b4);*/
    background: #18252E;
    background-position: 50% 50%;
}
.enter-btn {
	width: 460px;
	position: absolute;
	top:48%;
	left: 50%;
	margin-left: -230px;
}
.info-set {
	width: 460px;
	position: absolute;
	top:48%;
	left: 50%;
	margin-left: -230px;
	text-align: center;
}
.login-enter {
	width: 460px;
	position: absolute;
	top:48%;
	left: 50%;
	margin-left: -230px;
	text-align: center;
}
.pwd-btn {
	width: 400px;
}
.code-input {
	width: 220px;
}
.eth-logo{
	width: 600px;
	position: absolute;
	font-size: 30px;
	line-height: 30px;
	top: 35%;
	left: 50%;
	margin-left: -300px;
	text-align: center;
	/*font-family: FZCuYuan-M03S;*/
	color: #fff;
}
.reset-pass {
	width: 460px;
	position: absolute;
	top:48%;
	left: 50%;
	margin-left: -230px;
	text-align: center;
}
.ethup1 {
	-webkit-animation:ethup 5s ease-in infinite;
}
@-webkit-keyframes ethup {
  0%   { transform: translateY(0) }
  100% { transform: translateY(1080); }
}
/*@font-face {
  font-family: FZCuYuan-M03S;
  src: url(../images/font/FZCuYuan-M03S.ttf);
}*/
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import serverRequest from '../libs/serverRequest.js'
import anime from 'animejs'
import { UserModel } from '../libs/ClientModel.js'
import { alertSuccInfo, alertErrInfo, LoginCodes, CommonCodes } from '../libs/statusHandle.js'
import beginWave from '../libs/wave.js'
import ethIcon1 from '../images/land/ethIcon.png'
import { statusCodes } from '../libs/statusCodes.js'
import chinaFlag from '../images/flag_china.png'
import usaFlag from '../images/flag_usa.png'
export default {
	data () {
		return {
			animateArr: [], // 背景动画icon数组
			ethIcon1: ethIcon1, // 背景动画图标
			ethAddr: '',
			ethPwd:'',
			ethEmail: '',
			ethCode: '',
			ethAddrModal: true,
			userAddr: '',
			loginModal: false,
			loginPwd: '',
			loginAddr: '',
			resetEthPwd: '', // 重置密码模块新密码
			resetEthCode:'', // 重置密码邮件验证码
			enterPageState: 'addrSet', // { 'addrSet', 'reg', 'emailReg', 'addrLog', 'pwdLog'}
			langFlag: 'china',
			langFlagImgObj: {
				'china': chinaFlag,
				'usa': usaFlag
			}
		}
	},
	components: {

	},
	computed: {
		...mapState({
      curLang: state => state.login.curLang
    }),
    langFlagImg: function () {
    	return this.langFlagImgObj[this.langFlag]
    },
		showAddr: function () {
			if (!this.loginAddr) return ''
			if (this.loginAddr.length > 38) {
				return this.loginAddr.slice(0, 6) + '****' + this.loginAddr.slice(38)
			} else {
				return ''
			}
		}
	},
	mounted () {
		if (localStorage.getItem('EthlandAddr') !== '') {
			this.enterPageState = 'addrLog'
			this.loginAddr = localStorage.getItem('EthlandAddr')
		} else {
			this.enterPageState = 'addrSet'
		}
		this.$nextTick(() => {
			beginWave()
			// this.createEnterBg()
		})
	},
	methods: {
		...mapActions([
			'changeUserAddr'
		]),

		changeLang () {
			if (this.langFlag === 'china') {
				console.log('china')
				this.langFlag = 'usa'
				this.$emit('lang-click', 'english')
			} else if (this.langFlag === 'usa') {
				console.log('usa')
				this.langFlag = 'china'
				this.$emit('lang-click', 'chinese')
			} else {}
		},
		checkAddr () {
			if (this.ethAddr === '') {
				alertErrInfo(this, statusCodes[this.curLang]['JoiCodes_Addr_Illegal'])
				return
			}
			this.enterPageState = 'reg'
		},
		showEmailModal () {
			if (this.enterPageState === 'reg') {
				this.enterPageState = 'emailReg'
			} else if (this.enterPageState === 'emailReg') {
				this.enterPageState = 'reg'
			} else {}
		},
		async landRegister () {
			if (this.ethAddr === '' || this.ethPwd === '') {
				alertErrInfo(this, statusCodes[this.curLang]['LoginCodes_Login_IllegalData'])
				return
			}
			if (this.ethEmail !== '' && this.ethCode === '') {
				alertErrInfo(this, statusCodes[this.curLang]['LoginCodes_Code_Error'])
				return
			}
			const registerData = await serverRequest.userRegister(this.ethAddr, this.ethEmail, this.ethPwd, this.ethCode)
			console.log('registerData', registerData)
			if (!registerData) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, statusCodes[this.curLang]['LoginCodes_Register_Succ'])

				localStorage.setItem('EthlandAddr', this.ethAddr)
				this.changeUserAddr({ addr: this.ethAddr })
				serverRequest.setHeader('token', data)
				this.$emit('switch-land')
			}
			let errCb = (msg) => {
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(registerData.data, succCb, errCb)
		},
		async userLogin () {
			// if (this.userAddr === '') {
			// 	alertErrInfo(this, CommonCodes.Login_Addr_Fail)
			// 	this.enterPageState = 'addrLog'
			// 	return
			// }
			if (this.loginPwd === '' || this.loginAddr === '') {
				alertErrInfo(this, statusCodes[this.curLang]['LoginCodes_Login_IllegalData'])
				return
			}
			const login = await serverRequest.userLogin(this.loginAddr, this.loginPwd)
			if (!login) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, statusCodes[this.curLang]['LoginCodes_Login_Succ'])
				localStorage.setItem('EthlandAddr', this.loginAddr)
				this.changeUserAddr({ addr: this.loginAddr })
				serverRequest.setHeader('token', data)
				this.$emit('switch-land')
			}
			let errCb = (msg) => {
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(login.data, succCb, errCb)
		},
		async getCode (email) {
			const sendEmail = await serverRequest.userGeneCode(email)
			if (!sendEmail) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, statusCodes[this.curLang]['LoginCodes_Mail_Send_Succ'])
			}
			let errCb = (msg) => {
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(sendEmail.data, succCb, errCb)
		},
		changeEnterState (state) {
			this.enterPageState = state
		},
		// 重置密码
		async resetPass () {
			if (!this.resetEthCode) {
				alertErrInfo(this, statusCodes[this.curLang]['LoginCodes_Code_Error'])
				return 
			}
			if (!this.resetEthPwd) {
				alertErrInfo(this, statusCodes[this.curLang]['JoiCodes_Pwd_Illegal'])
				return
			}
			const setpass = await serverRequest.changePwdWhenForget(this.loginAddr, this.resetEthPwd, this.resetEthCode)
			if (!setpass) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, statusCodes[this.curLang]['LoginCodes_Change_Login_Pwd_Succ'])
				this.enterPageState = 'addrLog'
			}
			let errCb = (msg) => {
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(setpass.data, succCb, errCb)
		},

		// 忘记密码时获取验证码
		async getCodeWhenChangePwd () {
			const email = await serverRequest.queryUserEmail(this.loginAddr)
			if (!email) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let succCb = async (data) => {
				if (data.length > 0 && data[0][UserModel.email]) {
					await this.getCode(data[0][UserModel.email])
				} else {
					alertErrInfo(this, statusCodes[this.curLang]['LoginCodes_User_Not_Bind_Email'])
				}
			}
			let errCb = (msg) => {
				alertErrInfo(this, statusCodes[this.curLang][msg])
			}
			serverRequest.handleRequestRes(email.data, succCb, errCb)

		},

		// 切换到注册模块
		toRigister () {
			this.enterPageState = 'addrSet'
		},
		// 切换到重置密码
		toResetPass () {
			this.enterPageState = 'reset-pass'
		},
		// 背景动画
		createEnterBg () {
			let fragment = document.createDocumentFragment();
			let maxElements = 20;
		  for (let i = 0; i < maxElements; i++) {
		    let el = document.createElement('img');
		    el.style.position = 'fixed'
		    el.src = ethIcon1
		    let rate = i % 2 === 0 ? 1 : -1
		    el.style.left = 960 + rate* Math.random() * 960 + 'px' 
		    el.style.top = 540 + rate* Math.random() * 540 + 'px'
		    el.style.width = '28px'
		    el.style.height = '28px'
		    el.style.zIndex = -1
		    this.animateArr.push(el);
		    fragment.appendChild(el);
		  }
		  document.body.appendChild(fragment)
		  for(let el of this.animateArr) {
				anime({
		    targets: el,
		    translateY: parseInt(el.style.top) - 1080,
		    duration: 10000,
		    easing: 'linear',
  			// direction: 'alternate',
		    loop: true
		  })
			}
		}
	}
}
</script>