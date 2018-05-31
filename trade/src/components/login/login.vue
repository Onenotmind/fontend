<i18n src='../../common/i18n/login/login.json'></i18n>
<template>
	<div id="login">
	<Card :bordered="false">
		<p  class="text-center login-header">
			<img src="../../images/ethereum.png" style="vertical-align:middle;">
			<span class="login-word">EthLand</span>
		</p>
		<!-- <p>message: {{ $t("message.hello") }}</p> -->
		<p class="text-center login-content">
			<Input v-model="email" icon="email" type="email" :placeholder='$t("placeholder_email")' style="width: 300px;"></Input>
			<br>
			<Input v-model="pass" icon="android-lock" type="password" :placeholder='$t("placeholder_pass")' style="width: 300px;margin-top: 20px;"></Input>
			<br><br>
			<Button type="success" style="width: 300px;" @click="handleLogin">{{ $t("login") }}</Button>
		</p>
		<div class="register">
			<span style="float:left;cursor: pointer;" @click="toRigister">{{ $t("register") }}</span>
			<span style="float:right;cursor: pointer;" @click="toResetPass">{{ $t("forgot_pass") }}</span>
		</div>
		</Card>
	</div>
</template>
<style scoped>
.text-center {
	text-align: center;
}
#login {
	height: 400px;
	width: 556px;
	margin-top: 80px;
	background-color: #fff;
	margin-left: -278px;
	position: relative;
	left: 50%;
}
.login-header {
	height: 80px;
	font-size: 26px;
	line-height: 26px;
	padding-top: 25px;
}
.login-word {
	/*font-family: FZCuYuan-M03S;*/
	font-size: 35px;
	line-height: 35px;
	vertical-align: middle;
}
.login-content {
	height: 200px;
	padding-top: 60px;
}
.register {
	font-size: 15px;
	height: 80px;
	width: 300px;
	position: relative;
	left: 50%;
	margin-left: -150px;
}
/*@font-face {
  font-family: FZCuYuan-M03S;
  src: url(../../images/font/FZCuYuan-M03S.ttf);
}*/
</style>
<script>
import serverRequest from '../../libs/serverRequest.js'
import { LoginCodes, CommonCodes } from '../../libs/MsgCodes/LoginCodes.js'
export default {
	data () {
		return {
			email: '',
			pass: ''
		}
	},
	methods: {
		handleLogin () {
			if (this.email !== '' && this.pass !== '') {
				serverRequest.userLogin(this.email, this.pass)
				.then(v => {
					let succCb = () => {
						this.$emit('login-succ')
					}
					let errCb = () => {
						this.alertErrInfo(v.data)
					}
					serverRequest.handleRequestRes(v.data, succCb, errCb)
				})
				.catch (e => {
					console.log(e)
				})
			} else {
				this.$Message.error(CommonCodes.Register_Data_Null)
			}
		},
		toRigister () {
			this.$emit('show-register')
		},
		toResetPass () {
			this.$emit('show-resetPass')
		},
		alertSuccInfo (msg) {
      this.$Message.success({
        top: 200,
        content: msg
        // content: data.res.msg
      })
    },
    alertErrInfo (data) {
      let errMsg = ''
      if (data.msg) {
        errMsg = data.msg
      } else if (data.res && data.res.msg) {
        errMsg = data.res.msg
      } else {}
      this.$Message.error({
        top: 200,
        content: errMsg
      })
    }
	}
}
</script>