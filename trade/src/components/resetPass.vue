<template>
	<div id="resetPass">
		<Card :bordered="false" style="height: 400px;">
		<p slot="title" class="text-center">
			<img src="">
			<span>EthLand</span>
		</p>
		<p>
			<Steps :current="1" style="margin-left: 80px;">
        <Step title="验证邮箱" icon="email"></Step>
        <Step title="重置密码" icon="android-lock"></Step>
        <Step title="成功" icon="person-add"></Step>
    	</Steps>
    </p>
    <p class="text-center section-margin" v-show="false">
    	<Input v-model="email" icon="email" type="email" placeholder="请输入你的邮箱" style="width: 300px;"></Input><br>
    	<Input v-model="code"  type="password" placeholder="验证码" style="width: 150px;margin-top: 20px;"></Input>
			<Button type="info" style="width: 150px;margin-top: 20px;">获取验证码</Button><br><br>
			<Button type="success" style="width: 300px;">下一步</Button>
    </p>
    <p class="text-center section-margin" v-show="false">
    	<Input v-model="pass" icon="android-lock" type="password" placeholder="密码" style="width: 300px;margin-top: 20px;"></Input>
			<br>
			<Input v-model="repass" icon="android-lock" type="password" placeholder="密码" style="width: 300px;margin-top: 20px;"></Input><br><br>
			<Button type="success" style="width: 300px;">重置密码</Button>
    </p>
    <p class="text-center section-margin">
     <Alert type="success" show-icon style="width:400px;margin-left: 200px;">重置密码成功！</Alert>
    </p>
		</Card>
	</div>
</template>
<style scoped>
.text-center {
	text-align: center;
}
.section-margin {
	margin-top: 40px;
}
#resetPass {
	width: 800px;
	margin-top: 80px;
	background-color: #fff;
	margin-left: -400px;
	position: relative;
	left: 50%;
}
</style>
<script>

export default {
	data () {
		return {
		}
	}
}
</script>