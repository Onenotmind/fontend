<template>
<div id="nextProductCenter">
	<div>
 <!--  <Input v-model="addr" icon="ios-clock-outline" placeholder="Enter address" style="width: 200px"></Input> -->
 <Button type="success" @click="addNextProduct">新增商品中心</Button>
  <Button type="success" style="margin-left: 100px;" @click="search">search</Button>
  <Button type="error" style="float: right;"  @click="voteOver">投票结束计算</Button>
  <Button type="success" style="float: right;"  @click="refreshData">刷新</Button>
</div>
  <Table stripe border :columns="titles" :data="nextProductsData" ></Table>
  <Modal v-model="addProModel">
  	<p>
  		商品id: <Input v-model="proId" placeholder="" style="width: 300px"></Input>
  		<br>
  		商品类型: <Input v-model="proType" placeholder="" style="width: 300px"></Input>
  		<br>
  		商品period: <Input v-model="proPeriod" placeholder="" style="width: 300px"></Input>
  		<br>
  		商品imgSrc: <Input v-model="proImgSrc" placeholder="" style="width: 300px"></Input>
  		<br>
  		商品name: <Input v-model="proName" placeholder="" style="width: 300px"></Input>
  		<br>
  		商品nameEn: <Input v-model="proNameEn" placeholder="" style="width: 300px"></Input>
  		<br>
  		商品value: <Input v-model="proValue" placeholder="" style="width: 300px"></Input>
  		<br>
  		商品src: <Input v-model="proSrc" placeholder="" style="width: 300px"></Input>
  		<br>
  	</p>
  	<div slot="footer" align="center">
      <Button type="success" @click="onSureAdd">确认</Button>
      <Button offset="2" @click="onCancelAdd">取消</Button>
    </div>
  </Modal>
</div>
</template>

<style scoped>
[v-cloak] {
  display: none;
}

</style>

<script>
import serverRequest from '../libs/serverRequest.js'
import { statusCodes } from '../libs/statusCodes.js'
import { alertSuccInfo, LandProductCodes, alertErrInfo, LoginCodes, CommonCodes } from '../libs/statusHandle.js'

export default {
	data () {
		return {
			addProModel: false,
			isEdit: false, // 判断是添加还是修改
			nextProductsData: [],
			proId: '',
			proType: '',
			proSrc: '',
			proValue:'',
			proPeriod:'',
			proName: '',
			proNameEn:'',
			proImgSrc: '',
			 titles: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'proId',
            key: 'uk_productId',
            width: 120
          },
          {
            title: 'type',
            key: 'idx_type',
            width: 80
          },
          {
            title: 'proType',
            key: 'idx_productType',
            width: 100
          },
          {
            title: 'state',
            key: 'state',
            sortable: true,
            width: 100
          },
          {
            title: 'perod',
            key: 'idx_period',
            sortable: true,
            width: 80
          },
          {
            title: 'imgSrc',
            key: 'imgSrc',
            width: 230
          },
          {
            title: 'name',
            key: 'name',
            width: 150
          },
          {
            title: 'nameEn',
            key: 'nameEn',
            width: 150
          },
          {
            title: 'value',
            key: 'value',
            sortable: true,
            width: 80
          },
          {
            title: 'Action',
            key: 'action',
            render: (h, params) => {
              return h('div', [
              	h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                          this.linkToWeb(this.nextProductsData[params.index])
                        }
                    }
                }, 'link'),
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                          this.edit(this.nextProductsData[params.index])
                        }
                    }
                }, 'edit'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                          this.deletePro(this.nextProductsData[params.index])
                        }
                    }
                }, 'del')
              ]);
            }
          }
        ]
		}
	},
	async mounted () {
		await this.getCurrentVotedProduct()
	},
	methods: {
		search () {

		},
		async refreshData () {
			await this.getCurrentVotedProduct()
		},
		linkToWeb (info) {
			window.open(info.productSrc)
		},
		edit (curInfo) {
			this.isEdit = true
			this.addProModel = true
			this.proId = curInfo.uk_productId
			this.proType = curInfo.idx_productType
			this.proPeriod = curInfo.idx_period
			this.proImgSrc = curInfo.imgSrc
			this.proName = curInfo.name
			this.proNameEn = curInfo.nameEn
			this.proValue = curInfo.value
			this.proSrc = curInfo.productSrc
		},
		async deletePro (proInfo) {
			const delpro = await serverRequest.deleteProduct(proInfo.uk_productId)
			if (!delpro) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
			let succCb = async (data) => {
        alertSuccInfo(this, '删除下期商品中心成功！')
        await this.getCurrentVotedProduct()
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(delpro.data, succCb, errCb)
		},

		// 添加投票的商品
		addNextProduct () {
			this.addProModel = true
			this.isEdit = false
		},

		// 确认添加
		async onSureAdd () {
			const proInfo = {
				productId: this.proId,
				productType: this.proType,
				period: this.proPeriod,
				imgSrc: this.proImgSrc,
				name: this.proName,
				nameEn: this.proNameEn,
				value: this.proValue,
				productSrc: this.proSrc,
				authPwd: 'chenye1234'
			}
			let clearInput = () => {
				this.proId = ''
				this.proType = ''
				this.proPeriod = ''
				this.proImgSrc = ''
				this.proName = ''
				this.proNameEn = ''
				this.proValue = ''
				this.proSrc = ''
				this.addProModel = false
			}
			const addPro = await serverRequest.addVoteProduct(proInfo)
			if (!addPro) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
			let succCb = async (data) => {
        alertSuccInfo(this, '新增下期商品中心成功！')
        clearInput()
        await this.getCurrentVotedProduct()
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
        clearInput()
      }
      serverRequest.handleRequestRes(addPro.data, succCb, errCb)
		},

		// 取消添加
		onCancelAdd () {
			this.addProModel = false
		},

		// 获取当前投票中的商品
		async getCurrentVotedProduct () {
			const curProductsArr = await serverRequest.getCurrentVotedProduct()
			if (!curProductsArr) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
			let succCb = (data) => {
        // alertSuccInfo(this, LandProductCodes.Current_Product_Null)
        this.nextProductsData = data.slice(0)
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(curProductsArr.data, succCb, errCb)
		},

		// 投票结束计算
		async voteOver () {
			const vote = await serverRequest.productVotedOver()
			if (!vote) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
			let succCb = async (data) => {
        alertSuccInfo(this, '投票结束计算成功！')
        await this.getCurrentVotedProduct()
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(vote.data, succCb, errCb)
		}
	},
	components: {

	}
}

</script>
