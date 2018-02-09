<i18n src='../../common/i18n/login/register.json'></i18n>
<template>
	<div id="register">
	<Card :bordered="false" style="height: 400px;">
		<p slot="title" class="text-center login-header">
			<img src="">
			<span>EthLand</span>
		</p>
		<p class="text-center login-content">
			<Input v-model="email" icon="email" type="email" :placeholder='$t("placeholder_email")' style="width: 300px;"></Input>
			<br>
			<Input v-model="pass" icon="android-lock" type="password" :placeholder='$t("placeholder_pass")' style="width: 300px;margin-top: 20px;"></Input>
			<br>
			<Input v-model="repass" icon="android-lock" type="password" :placeholder='$t("placeholder_pass")' style="width: 300px;margin-top: 20px;"></Input><br>
			<Input v-model="code"  type="password" style="width: 150px;margin-top: 20px;"></Input>
			<Button type="info" style="width: 150px;margin-top: 20px;">{{ $t("get_code") }}</Button><br><br>
			<Button type="success" style="width: 300px;">{{ $t("register") }}</Button>
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
			pass: '',
			repass: '',
			code: ''
		}
	}
}
</script>