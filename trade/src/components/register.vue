<template>
	<div id="register">
	<Card :bordered="false" style="height: 400px;">
		<p slot="title" class="text-center login-header">
			<img src="">
			<span>EthLand</span>
		</p>
		<p class="text-center login-content">
			<Input v-model="email" icon="email" type="email" placeholder="账号" style="width: 300px;"></Input>
			<br>
			<Input v-model="pass" icon="android-lock" type="password" placeholder="密码" style="width: 300px;margin-top: 20px;"></Input>
			<br>
			<Input v-model="repass" icon="android-lock" type="password" placeholder="密码" style="width: 300px;margin-top: 20px;"></Input><br>
			<Input v-model="code"  type="password" placeholder="验证码" style="width: 150px;margin-top: 20px;"></Input>
			<Button type="info" style="width: 150px;margin-top: 20px;">获取验证码</Button><br><br>
			<Button type="success" style="width: 300px;">注册</Button>
		</p>
		</Card>
	</div>
</template>
<style scoped>
.text-center {
	text-align: center;
}
#register {
	width: 556px;
	margin-top: 80px;
	background-color: #fff;
	margin-left: -278px;
	position: relative;
	left: 50%;
}
.login-header {
	height: 40px;
	font-size: 26px;
	line-height: 26px;
	padding-top: 5px;
}
.login-content {
	height: 200px;
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