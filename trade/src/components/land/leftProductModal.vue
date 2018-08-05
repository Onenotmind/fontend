<i18n src='../../common/i18n/land/leftProductModal.json'></i18n>
<template>
	<div id="leftProductModal">
		<Modal v-model="leftProductModal" >
			<p style="margin-top: 15px;">
				<Row type="flex" justify="center" align="middle">
        		<Col span="24">
        			<Row>
        				<Col v-show="backAssets && backAssets.length > 0" class="modal-title">
        					{{ $t("left_treasure") }}
        				</Col>
        			</Row>
        			<Row>
        				<Col v-for="(backAsset, index) in backAssets" :key="index" span="6" align="center">
        					<img :src="backAsset[LandModel.src]" style="vertical-align:middle;" class="backAssetImg">
        					<br>
        					<p class="calculate-num">
        					 {{ backAsset[LandModel.leftCount]}}
        					 
        					</p>
        				</Col>
        			</Row>
        			<br>
        		</Col>
        	</Row>
			</p>
			<div slot="footer" align="center">
          <Button offset="2" @click="close">{{ $t("close") }}</Button>
      </div>
		</Modal>
	</div>
</template>
<style scoped>
/* common css */
/* leftProductModal.vue */
#leftProductModal {

}
.modal-title {
	font-size: 18px;
	font-weight: 700;
	color: #333;
	text-align: center;
	margin-bottom: 20px;
}
.calculate-num {
	font-size: 22px;
	color: #7da8ef;
	font-weight: 700;
	text-align: center;
}
.backAssetImg {
	margin-left: 10%;
	height: 80px;
	width: 71px;
}
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { LandModel, PandaModel, AssetsModel, UserModel } from '../../libs/ClientModel.js'
import { alertSuccInfo, alertErrInfo } from '../../libs/statusHandle.js'
import serverRequest from '../../libs/serverRequest.js'
import { statusCodes } from '../../libs/statusCodes.js'
export default {
	data () {
		return {
			LandModel,
			backAssets: [], // 当前活动剩余的商品
			leftProductModal: false,
			curToastInfo: {
				'en': {
					'no_left_product_in_activity': 'No left goods in current activity!'
				},
				'cn': {
					'no_left_product_in_activity': '当前活动没有剩余的商品了!'
				}
			}
		}
	},
	props:{
		leftProductModal: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		...mapState({
			userAddr: state => state.login.userAddr,
			curLang: state => state.login.curLang
		})
	},
	mounted () {
		this.getLeftProductInCurActivity()
	},
	methods: {
		showModal () {
			if (this.backAssets && this.backAssets.length > 0) {
				this.leftProductModal = true
			} else {
				alertErrInfo(this, this.curToastInfo[this.curLang]['no_left_product_in_activity'])
			}
		},
		close () {
			this.leftProductModal = false
		},

		// 获取当前活动剩余的商品列表
		async getLeftProductInCurActivity () {
			let leftPro = await serverRequest.getLeftProductInCurActivity()
			if (!leftPro) {
				alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
				return
			}
			let succCb = (data) => {
				this.backAssets = data.slice(0)
			}
			let errCb = () => {
				alertErrInfo(this, this.curToastInfo[this.curLang]['no_left_product_in_activity'])
			}
			serverRequest.handleRequestRes(leftPro.data, succCb, errCb)
		}
	}
}
</script>