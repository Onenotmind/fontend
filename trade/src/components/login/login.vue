<i18n src='../../common/i18n/login/login.json'></i18n>
<template>
	<div id="login">
	<Card :bordered="false">
		<p slot="title" class="text-center login-header">
			<img src="">
			<span>EthLand</span>
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
			<span style="float:left;">{{ $t("register") }}</span>
			<span style="float:right;">{{ $t("forgot_pass") }}</span>
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
</style>
<script>
import serverRequest from '../../libs/serverRequest.js'
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
				serverRequest.userLogin(this.email, this.pass).then((response) => {
					let info = ''
					if (response.status === 0) { // 正常返回
						if (response.res.status === 0) {
							info = '登录成功'
							console.log('登录成功')
							this.$Message.success({
								top: 200,
								content: info
							})
						} else {

						}
					}
				})
			}
		}
	}
}
</script>