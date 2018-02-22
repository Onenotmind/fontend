<i18n src='../../common/i18n/login/resetPass.json'></i18n>
<template>
	<div id="resetPass">
		<Card :bordered="false" style="height: 400px;">
		<p slot="title" class="text-center">
			<img src="">
			<span>EthLand</span>
		</p>
		<p>
		<Steps :current="stepNum" style="margin-left: 80px;">
        <Step :title='$t("check_email")' icon="email"></Step>
        <Step :title='$t("resetPass")' icon="android-lock"></Step>
        <Step :title='$t("resetPassSucc")' icon="person-add"></Step>
    	</Steps>
    </p>
    <p class="text-center section-margin" v-show="stepNum === 0">
    	<Input v-model="email" icon="email" type="email" :placeholder='$t("placeholder_email")' style="width: 300px;"></Input><br>
    	<Input v-model="code"  type="password" style="width: 150px;margin-top: 20px;"></Input>
			<Button type="info" style="width: 150px;margin-top: 20px;" @click="getCode">{{ $t("get_code") }}</Button><br><br>
			<Button type="success" style="width: 300px;" @click="toNextStep">{{ $t("next_step") }}</Button>
    </p>
    <p class="text-center section-margin" v-show="stepNum === 1">
    	<Input v-model="pass" icon="android-lock" type="password" :placeholder='$t("placeholder_pass")' style="width: 300px;margin-top: 20px;"></Input>
			<br>
			<Input v-model="repass" icon="android-lock" type="password" :placeholder='$t("placeholder_pass")' style="width: 300px;margin-top: 20px;"></Input><br><br>
			<Button type="success" style="width: 300px;" @click="resetPass">{{ $t("resetPass") }}</Button>
    </p>
    <p class="text-center section-margin" v-show="stepNum === 2">
     <Alert type="success" show-icon style="width:400px;margin-left: 200px;">{{ $t("resetPassSucc") }}</Alert>
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
import serverRequest from '../../libs/serverRequest.js'
import { LoginCodes, CommonCodes } from '../../libs/MsgCodes/LoginCodes.js'
export default {
	data () {
		return {
			email: '',
			pass: '',
			repass: '',
			code: '',
			stepNum: 0
		}
	},
	methods: {
		getCode () {
			if (this.email !== '') {
				serverRequest.userGeneCode(this.email).then((v) => {
					console.log(v)
					let succCb = () => {}
					let errCb = () => {
						this.alertErrInfo(v.data)
					}
					serverRequest.handleRequestRes(v.data, succCb, errCb)
				}).catch ((e) => {
					console.log(e)
					// this.$Message.error(CommonCodes.Net_Wrong)
				})
			}
		},
		toNextStep () {
			serverRequest.userCheckCode(this.email, this.code).then(v => {
				let succCb = () => {
					this.stepNum = 1
				}
				let errCb = () => {
					this.alertErrInfo(v.data)
				}
				serverRequest.handleRequestRes(v.data, succCb, errCb)
			})
		},
		resetPass () {
			if (this.pass !== '' && this.pass === this.repass) {
				serverRequest.userChangeLoginPass(this.email, this.pass).then(v => {
					let succCb = () => {
						this.stepNum = 2
					}
					let errCb = () => {
						this.alertErrInfo(v.data)
					}
					serverRequest.handleRequestRes(v.data, succCb, errCb)
				})
			}
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