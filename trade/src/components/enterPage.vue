<template>
	<div id="fontPage">
		<div class="eth-logo">
			欢迎来到 EthLand.pro！
		</div>
		<Input v-model="ethAddr" class="enter-btn" placeholder="请输入您的ETH地址" v-show="ethAddrModal">
			<Button slot="append" @click="checkAddr">
				<Icon type="android-more-horizontal" size="14"></Icon>
			</Button>
		</Input>
		<div class="info-set" v-show="!ethAddrModal">
			<Input v-model="ethPwd" class="pwd-btn" placeholder="请输入您的EthLand密码">
			</Input>
			<br>
			<a @click="showEmailModal">
				<Icon type="arrow-down-b" size="18" color="#fff" style="cursor: pointer;" ></Icon>
			</a>
			<br>
			<Input v-model="ethEmail" class="pwd-btn" placeholder="请输入您的email地址" v-show="emailModal">
			</Input>
			<br>
			<br v-show="emailModal">
			<Input v-model="ethCode" class="code-input" placeholder="验证码" v-show="emailModal">
			</Input>
			<Button type="info" style="width: 176px" v-show="emailModal">获取验证码</Button>
			<br v-show="emailModal">
			<br v-show="emailModal">
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
import serverRequest from '../libs/serverRequest.js'
import { alertSuccInfo, alertErrInfo, LoginCodes, CommonCodes } from '../libs/statusHandle.js'
export default {
	data () {
		return {
			ethAddr: '',
			ethPwd:'',
			ethEmail: '',
			ethCode: '',
			emailModal: false,
			ethAddrModal: true,
			userAddr: ''
		}
	},
	mounted () {
		this.userAddr = '123'
		this.userLogin()
		.then(v => {

		})
	},
	methods: {
		checkAddr () {
			this.ethAddrModal = false
		},
		showEmailModal () {
			this.emailModal = !this.emailModal
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
				localStorage.setItem('EthlandAddr', data)
				this.$emit('switch-land')
			}
			let errCb = (msg) => {
				alertErrInfo(this, msg)
			}
			serverRequest.handleRequestRes(registerData.data, succCb, errCb)
		},
		async userLogin () {
			const login = await serverRequest.userLogin(this.userAddr, '1234')
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
		}
	}
}
</script>