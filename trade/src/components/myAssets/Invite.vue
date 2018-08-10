<i18n src='../../common/i18n/assets/invite.json'></i18n>
<template>
	<!-- 邀请组件 -->
	<div id="invite">
		<Card :shadow="true" v-if="assetState === 'invite'">
			<p>
				<Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="fireball" size="25" class="vertical"></Icon>
          <span class="my-assets-title">{{ $t("invite_name") }}</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin" align="center">
        	<!-- 实际内容 -->
        	<Row span="24">
        		<!-- 邀请文字 -->
        		<Col span="15" offset="1" id="copyText" class="invite-text-container">
        			<p>
        			{{ $t("invite_text_1") }} <br>
        			{{ $t("invite_text_2") }} <br>
        			{{ $t("invite_text_3") }} <br>
        			{{ $t("invite_text_4") }} <br>
        			<a :href="myInviteLink">{{ myInviteLink }}</a>
        		</p>
        		<Button type="primary" shape="circle" class="copy" data-clipboard-target="#copyText">{{ $t("copy") }}</Button>
        		</Col>
        		<!-- 统计 -->
        		<Col span="4" offset="3" class="invite-calculate">
        		<p>
        			{{ $t("get_bamboo")}} <span class="calculate-num"> {{ bambooCount }}</span><br>
        			{{ $t("invite_count")}} <span class="calculate-num"> {{ inviteNum }}</span><br>
        			{{ $t("invite_valid")}} <span class="calculate-num"> {{ inviteValiNum }}</span><br>
        		</p>
        		</Col>
        	</Row>
      	</Col>
      </Row>
			</p>
		</Card>
	</div>
</template>
<style scoped>
/* common css */
.nomal-padding {
	padding-top: 15px;
	padding-bottom: 20px;
}
.vertical {
  vertical-align: middle;
}
.my-assets-title {
  font-size:18px;
  color:green;
  margin-left:8px;
  line-height: 20px;
}
.rollout-card-margin {
  margin-top: 20px;
}
/* invite.vue css */
#invite {
	width: 100%;
	margin-top: 15px;
}
#invite .invite-text-container {
	padding: 18px;
	background: radial-gradient(#1965e3, #7da8ef);
	font-size: 14px;
	color: #333;
	font-weight: 700;
	word-wrap: break-word;
}
#invite .invite-text-container p {
	text-align: left;
	border-radius: 8px;
	background: #fff;
	padding: 18px 20px;
}
#invite .invite-calculate {
	font-size: 15px;
	color: #333;
	text-align: left;
}
#invite .calculate-num {
	font-size: 22px;
	color: #7da8ef;
	font-weight: 700;
	margin-left: 5px;
}
#invite .copy {
	float: right;
	margin-top: -40px;
	margin-right: 15px;
}
</style>
<script>
import Clipboard from 'clipboard'
import { mapActions, mapState, mapGetters } from 'vuex'
import serverRequest from '../../libs/serverRequest.js'
import { alertSuccInfo, alertErrInfo} from '../../libs/statusHandle.js'
import { statusCodes } from '../../libs/statusCodes.js'
const clipboard = new Clipboard('.copy')
	export default {
		data () {
			return {
				inviteValiNum: 0, // 已认证数量
				inviteNum: 0, // 邀请数量
				bambooCount: 0, // 获取竹子数量
				alertToastInfo: {
					en: {
						'copy_text_succ': 'Copy Success',
						'copy_text_fail': 'Copy Fail'
					},
					cn: {
						'copy_text_succ': '复制成功！',
						'copy_text_fail': '复制失败！'
					}
				}
			}
		},
		computed: {
	    ...mapState({
	      userAddr: state => state.login.userAddr,
	      curLang: state => state.login.curLang
	    }),
	    myInviteLink: function () {
	    	return 'http://wunoland?invite=' + this.userAddr
	    }
	  },
		props: {
			assetState: {
				type: String,
				default: ''
			}
		},
		mounted () {
			this.copyTextBind()
			this.queryRegisterByAddr()
		},
		methods: {
			// 复制功能回调绑定
	    copyTextBind () {
	      let self = this
	      clipboard.on('success', function(e) {
	        alertSuccInfo(self, self.alertToastInfo[self.curLang]['copy_text_succ'])
	      })
	      clipboard.on('error', function(e) {
	        alertErrInfo(self, self.alertToastInfo[self.curLang]['copy_text_fail'])
	      })
	    },

	    // 获取用户的邀请下线
	    async queryRegisterByAddr () {
	    	let register = await serverRequest.queryRegisterByAddr(this.userAddr)
				if (!register) {
					alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
					return
				}
				let succCb = (data) => {
					this.inviteNum = data['regCount'] || 0
					this.inviteValiNum = data['authCount'] || 0
				}
				let errCb = (msg) => {
					alertErrInfo(this, statusCodes[this.curLang][msg])
				}
				serverRequest.handleRequestRes(register.data, succCb, errCb)
	    }
		}
	}
</script>