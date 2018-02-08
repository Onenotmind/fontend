<!-- <i18n src='./common/locales.json'></i18n> -->
<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界！"
  }
}
</i18n>
<template>
	<div id="login">
	<Card :bordered="false">
		<p slot="title" class="text-center login-header">
			<img src="">
			<span>EthLand</span>
		</p>
		<p>message: {{ $t("message.hello") }}</p>
		<p class="text-center login-content">
			<Input v-model="email" icon="email" type="email" placeholder="账号" style="width: 300px;"></Input>
			<br>
			<Input v-model="pass" icon="android-lock" type="password" placeholder="密码" style="width: 300px;margin-top: 20px;"></Input>
			<br><br>
			<Button type="success" style="width: 300px;">登陆</Button>
		</p>
		<div class="register">
			<span style="float:left;">注册</span>
			<span style="float:right;">忘记密码</span>
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

export default {
	data () {
		return {
			email: '',
			pass: '',
			locale: 'en'
		}
	}
}
</script>