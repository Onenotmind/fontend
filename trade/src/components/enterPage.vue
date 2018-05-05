<template>
	<div id="fontPage">
		<div class="eth-logo">
			欢迎{{ loginAddr }}来到 EthLand.pro！
		</div>
		<!-- 注册 地址注册-->
		<Input v-model="ethAddr" class="enter-btn" placeholder="请输入您的ETH地址" v-show="enterPageState === 'addrSet'">
			<Button slot="append" @click="checkAddr">
				<Icon type="android-more-horizontal" size="14"></Icon>
			</Button>
		</Input>
		<!-- 登陆 -->
		<div class="login-enter" v-show="enterPageState === 'addrLog'|| enterPageState === 'pwdLog' ">
			<Input v-model="loginAddr" v-show="enterPageState === 'addrLog' " style="width:400px;" placeholder="请输入您的EthLand地址">
			</Input>
			<br>
			<br v-show="enterPageState === 'addrLog' ">
			<Input v-model="loginPwd" style="width:400px;" placeholder="请输入您的EthLand密码">
			</Input>
			<br>
			<br>
			<Button type="success" style="width: 400px;" @click="userLogin">进入Ethland</Button>
			<br>
			<span style="width:80px;float: left;margin-left: 10px;" @click="toRigister">注册</span>
			<span style="width:80px;float: right;margin-right: 30px;" @click="toResetPass">忘记密码</span>
		</div>
		<!-- 重置密码 -->
		<div class="reset-pass" v-show="enterPageState === 'reset-pass'">
			<Input v-model="resetEthCode" class="code-input" placeholder="验证码">
			</Input>
			<Button type="info" style="width: 176px" @click="getCodeWhenChangePwd">获取验证码</Button>
			<br>
			<br>
			<Input v-model="resetEthPwd" class="pwd-btn" placeholder="请输入您的新EthLand密码">
			</Input>
			<br>
			<br>
			<Button type="success" style="width: 400px" @click="resetPass">重置密码</Button>
		</div>
		<!-- 邮箱注册 -->
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
			<Button type="info" style="width: 176px" v-show="enterPageState === 'emailReg'" @click="getCode(ethEmail)">获取验证码</Button>
			<br v-show="enterPageState === 'emailReg'">
			<br v-show="enterPageState === 'emailReg'">
			<Button type="success" style="width: 400px" @click="landRegister">进入Ethland</Button>
		</div>
	</div>
</template>
<style scoped>
span {
	display: inline-block;
	font-size: 16px;
	color: #eee;
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
    background: linear-gradient(#13194b,#4372b4);
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
	font-family: FZCuYuan-M03S;
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
@font-face {
  font-family: FZCuYuan-M03S;
  src: url(../images/font/FZCuYuan-M03S.ttf);
}
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import serverRequest from '../libs/serverRequest.js'
import { alertSuccInfo, alertErrInfo, LoginCodes, CommonCodes } from '../libs/statusHandle.js'
import beginWave from '../libs/wave.js'
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
			resetEthPwd: '', // 重置密码模块新密码
			resetEthCode:'', // 重置密码邮件验证码
			enterPageState: 'addrSet' // { 'addrSet', 'reg', 'emailReg', 'addrLog', 'pwdLog'}
		}
	},
	components: {
	},
	mounted () {
		if (localStorage.getItem('EthlandAddr') !== '') {
			this.enterPageState = 'addrLog'
			this.loginAddr = localStorage.getItem('EthlandAddr')
		} else {
			this.enterPageState = 'addrSet'
		}
		this.$nextTick(() => {
			// beginWave()
		})
	},
	methods: {
		...mapActions([
			'changeUserAddr'
		]),
		checkAddr () {
			if (this.ethAddr === '') {
				alertErrInfo(this, LoginCodes.Register_Data_Null)
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
			// if (this.userAddr === '') {
			// 	alertErrInfo(this, CommonCodes.Login_Addr_Fail)
			// 	this.enterPageState = 'addrLog'
			// 	return
			// }
			if (this.loginPwd === '' || this.loginAddr === '') {
				alertErrInfo(this, CommonCodes.Register_Data_Null)
				return
			}
			const login = await serverRequest.userLogin(this.loginAddr, this.loginPwd)
			if (!login) {
				alertErrInfo(this, CommonCodes.Service_Wrong)
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, LoginCodes.Login_Succ)
				localStorage.setItem('EthlandAddr', this.loginAddr)
				this.changeUserAddr({ addr: this.loginAddr })
				serverRequest.setHeader('token', data)
				this.$emit('switch-land')
			}
			let errCb = (msg) => {
				alertErrInfo(this, msg)
			}
			serverRequest.handleRequestRes(login.data, succCb, errCb)
		},
		async getCode (email) {
			const sendEmail = await serverRequest.userGeneCode(email)
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
		},
		// 重置密码
		async resetPass () {
			if (!this.resetEthCode) {
				alertErrInfo(this, LoginCodes.Code_Not_Null)
				return 
			}
			if (!this.resetEthPwd) {
				alertErrInfo(this, LoginCodes.Password_Not_Null)
				return
			}
			const setpass = await serverRequest.changePwdWhenForget(this.loginAddr, this.resetEthPwd, this.resetEthCode)
			if (!setpass) {
				alertErrInfo(this, CommonCodes.Service_Wrong)
				return
			}
			let succCb = (data) => {
				alertSuccInfo(this, LoginCodes.Set_New_Pwd_Succ)
				this.enterPageState = 'addrLog'
			}
			let errCb = (msg) => {
				alertErrInfo(this, msg)
			}
			serverRequest.handleRequestRes(setpass.data, succCb, errCb)
		},

		// 忘记密码时获取验证码
		async getCodeWhenChangePwd () {
			const email = await serverRequest.queryUserEmail(this.loginAddr)
			if (!email) {
				alertErrInfo(this, CommonCodes.Service_Wrong)
				return
			}
			let succCb = async (data) => {
				if (data.length > 0) {
					await this.getCode(data[0].uemail)
				} else {
					alertErrInfo(this, LoginCodes.Can_Not_Change_Pwd_Because_Not_Email)
				}
			}
			let errCb = (msg) => {
				alertErrInfo(this, msg)
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
		}
	}
}
</script>