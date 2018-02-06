<template>
	<div id="login">
		<p class="text-center login-header">
			<img src="">
			<span>EthLand</span>
		</p>
		<p class="text-center login-content">
			<Input v-model="email" icon="email" placeholder="账号" style="width: 300px;"></Input>
			<br>
			<Input v-model="pass" icon="android-lock" placeholder="密码" style="width: 300px;margin-top: 20px;"></Input>
			<br><br>
			<Button type="success" style="width: 300px;">登陆</Button>
		</p>
		<div class="register">
			<span style="float:left;">注册</span>
			<span style="float:right;">忘记密码</span>
		</div>
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
	padding-top: 55px;
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
			pass: ''
		}
	}
}
</script>