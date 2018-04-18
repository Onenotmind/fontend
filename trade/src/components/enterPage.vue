<template>
	<div id="fontPage">
		<div class="eth-logo">
			欢迎来到 EthLand.pro！
		</div>
		<Input v-model="ethAddr" class="enter-btn" placeholder="请输入您的ETH地址" v-show="enterPageState === 'addrSet'">
			<Button slot="append" @click="checkAddr">
				<Icon type="android-more-horizontal" size="14"></Icon>
			</Button>
		</Input>
		<div class="login-enter" v-show="enterPageState === 'addrLog'|| enterPageState === 'pwdLog' ">
			<Input v-model="loginAddr" v-show="enterPageState === 'addrLog' " style="width:400px;" placeholder="请输入您的EthLand地址">
			</Input>
			<br>
			<br v-show="enterPageState === 'addrLog' ">
			<Input v-model="loginPwd" style="width:400px;" placeholder="请输入您的EthLand密码">
			</Input>
			<br>
			<br>
			<Button type="success" style="width: 400px" @click="userLogin">进入Ethland</Button>
		</div>
		<div class="info-set" v-show="enterPageState === 'reg' || enterPageState === 'emailReg'">
			<Input v-model="ethPwd" class="pwd-btn" placeholder="请输入您的EthLand密码">
			</Input>
			<br>
			<a @click="showEmailModal">
				<Icon type="arrow-down-b" size="18" color="#fff" style="cursor: pointer;" ></Icon>
			</a>
			<br>
			<Input v-model="ethEmail" class="pwd-btn" placeholder="请输入您的email地址" v-show="enterPageState === 'emailReg'">
			</Input>
			<br>
			<br v-show="enterPageState === 'emailReg'">
			<Input v-model="ethCode" class="code-input" placeholder="验证码" v-show="enterPageState === 'emailReg'">
			</Input>
			<Button type="info" style="width: 176px" v-show="enterPageState === 'emailReg'" @click="getCode">获取验证码</Button>
			<br v-show="enterPageState === 'emailReg'">
			<br v-show="enterPageState === 'emailReg'">
			<Button type="success" style="width: 400px" @click="landRegister">进入Ethland</Button>
		</div>
	</div>
</template>
<style scoped>
#fontPage {
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;
	left: 0;
	background: url(../images/webbg/home-bg.jpg) no-repeat;
	background-size: 100% 100%;
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
	font-family: FZCuYuan-M03S;
	color: #fff;
}
@font-face {
  font-family: FZCuYuan-M03S;
  src: url(../images/font/FZCuYuan-M03S.ttf);
}
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import serverRequest from '../libs/serverRequest.js'
import { alertSuccInfo, alertErrInfo, LoginCodes, CommonCodes } from '../libs/statusHandle.js'
export default {
	data () {
		return {
			ethAddr: '',
			ethPwd:'',
			ethEmail: '',
			ethCode: '',
			ethAddrModal: true,
			userAddr: '',
			loginModal: false,
			loginPwd: '',
			loginAddr: '',
			enterPageState: 'addrSet' // { 'addrSet', 'reg', 'emailReg', 'addrLog', 'pwdLog'}
		}
	},
	mounted () {
		// this.userAddr = '123'
		this.enterPageState = 'addrSet'
		// this.userLogin()
	},
	methods: {
		...mapActions([
			'changeUserAddr'
		]),
		checkAddr () {
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
				alertErrInfo(this, LoginCodes.Register_Data_Null)
				return
			}
			if (this.ethEmail !== '' && this.ethCode === '') {
				alertErrInfo(this, LoginCodes.Code_Not_Null)
				return
			}
			const registerData = await serverRequest.userRegister(this.ethAddr, this.ethEmail, this.ethPwd, this.ethCode)
			console.log('registerData', registerData)
			if (!registerData) {
				alertErrInfo(this, CommonCodes.Service_Wrong)
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, LoginCodes.Register_Succ)
				localStorage.setItem('EthlandAddr', this.ethAddr)
				this.changeUserAddr({ addr: this.ethAddr })
				serverRequest.setHeader('token', data)
				this.$emit('switch-land')
			}
			let errCb = (msg) => {
				alertErrInfo(this, msg)
			}
			serverRequest.handleRequestRes(registerData.data, succCb, errCb)
		},
		async userLogin () {
			if (this.userAddr === '') {
				alertErrInfo(this, CommonCodes.Login_Addr_Fail)
				this.enterPageState = 'addrLog'
				return
			}
			if (this.loginPwd === '') {
				alertErrInfo(this, CommonCodes.Password_Not_Null)
				return
			}
			const login = await serverRequest.userLogin(this.userAddr, this.loginPwd)
			if (!login) {
				alertErrInfo(this, CommonCodes.Service_Wrong)
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, LoginCodes.Login_Succ)
				serverRequest.setHeader('token', data)
				this.$emit('switch-land')
			}
			let errCb = (msg) => {
				alertErrInfo(this, msg)
			}
			serverRequest.handleRequestRes(login.data, succCb, errCb)
		},
		async getCode () {
			const sendEmail = await serverRequest.userGeneCode(this.ethEmail)
			if (!sendEmail) {
				alertErrInfo(this, CommonCodes.Service_Wrong)
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, LoginCodes.Send_Email_Succ)
			}
			let errCb = (msg) => {
				alertErrInfo(this, msg)
			}
			serverRequest.handleRequestRes(sendEmail.data, succCb, errCb)
		},
		changeEnterState (state) {
			this.enterPageState = state
		}
	}
}
</script>