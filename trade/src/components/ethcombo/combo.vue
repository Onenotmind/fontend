<i18n src='../../common/i18n/ethcombo/combo.json'></i18n>
<template>
	<div id="combo">
	<Card :bordered="false">
	<!-- <iframe id="myiframe" class="miner_hive" name="miner_ifr" src="https://authedmine.com/media/miner.html?key=PrLp6e0z7pNu8ndGukXHl46Q7Kt7pJH5"></iframe> -->
	<div>
	<p  class="text-center combo-header">
			<!-- <img src="../../images/ethereum.png" style="vertical-align:middle; width: 35px;"> -->
			<span class="combo-word">{{ $t("bamboo_title") }}</span>
		</p>
		<!-- <img src="../../images/webbg/panda-right.png" class="bg-left"> -->
		<!-- <img src="../../images/webbg/panda-left.png" class="bg-right"> -->
		<div class="text-center total-hash" >
			<!-- <Icon type="home" size="25"></Icon> -->
			<img src="../../images/hashrate.png" style="vertical-align:middle;margin-top: -10px">
			<span class="hash-num">{{ totalHash }} HASH</span>
			<p>{{ $t("total_hash") }}</p>
		</div>
		<div class="text-center accept-hash" >
			<!-- <Icon type="home" size="25"></Icon> -->
			<!-- <img src="../../images/hashrate.png" style="vertical-align:middle;margin-top: -10px"> -->
			<span class="hash-num">{{ acceptHash > totalHash ? totalHash: acceptHash  }} HASH</span>
			<p>{{ $t("accept_hash") }}</p>
		</div>
		<div class="text-center hash-speed" >
		<a @click="addSpeed"><Icon type="plus-round" class="add-speed" size="25" color="#009b46" ></Icon></a>
		<a @click="minusSpeed"><Icon type="minus-round" size="25" class="minus-speed" color="#009b46" ></Icon></a>
			<!-- <Icon type="home" size="25"></Icon> -->
			<span class="hash-num">{{ parseInt(hashSpeed) }} HASH/S</span>
			<p>{{ $t("hash_rate") }}</p>
			
		</div>
		<div class="text-center total-bamboo" >
			<!-- <Icon type="home" size="25"></Icon> -->
			<img src="../../images/bamboo.png" style="vertical-align:middle;height:20px;margin-top:-5px;">
			<span class="hash-num">{{ parseInt(minerBamboo /100) }}</span>
			<p>{{ $t("bamboo_get") }}</p>
		</div>
	</div>
	<div class="text-center circle-container para-margin">
		<i-circle class="circle" :size="180" :trail-width="2" :stroke-width="2" :percent="percent" stroke-color="#009b46" >
		<a @click="startMine"><Icon type="ios-play" size="50" style="color:#009b46;cursor:pointer"  v-show="mineState === 'start'" ></Icon></a>
		<a @click="startMine"><Icon type="ios-pause" size="50" style="color:#009b46;cursor:pointer"  v-show="mineState === 'stop'"></Icon></a>
		<img src="../../images/webbg/bamboo.png" v-show="mineState === 'mine'" @click="stopMine" :style="{ 'opacity': 0.5}" >
	  </i-circle>
	</div>
	<p class="tips para-margin">
		{{ $t("tip") }}
	</p>
	</Card>
	</div>
</template>
<style scoped>
.text-center {
	text-align: center;
}
.para-margin {
	margin-top: 40px;
	margin-bottom: 15px;
}
#combo {
	height: 600px;
	width: 100%;
	margin-top: 80px;
	background-color: #fff;
	position: relative;
}
.combo-header {
	height: 80px;
	font-size: 26px;
	line-height: 26px;
	padding-top: 25px;
}
/*@font-face {
  font-family: FZCuYuan-M03S;
  src: url(../../images/font/FZCuYuan-M03S.ttf);
}*/
.combo-word {
	/*font-family: FZCuYuan-M03S;*/
	font-size: 30px;
	line-height: 30px;
	vertical-align: middle;
}
.bg-left {
	position: absolute;
	left: 40px;
	top: 15%;
}
.bg-right {
	position: absolute;
	right: 40px;
	top: 15%;
}
.add-speed {
	position: absolute;
	left: 200px;
	cursor: pointer;
}
.minus-speed {
	position: absolute;
	right: 200px;
	cursor: pointer;
}
.total-hash {
	position: absolute;
	top: 120px;
	left: 40px;
	width: 200px;
	height: 40px;
	float: left;
}
.accept-hash {
	position: absolute;
	top: 120px;
	left: 360px;
	width: 200px;
	height: 40px;
	float: left;
}
.hash-num {
	line-height: 15px;
	font-size: 20px;
	margin-left: 8px;
}
.hash-speed {
	position: absolute;
	top: 120px;
	right: 360px;
	width: 200px;
	height: 40px;
	margin-left: -100px;
	float: right;
}
.total-bamboo {
	position: absolute;
	top: 120px;
	right: 40px;
	width: 200px;
	height: 40px;
	float: right;
}
.circle-container {
	margin-top: 150px;
}
.circle {

}
.tips {
	width: 100%;
	padding-left: 5%;
	padding-right: 5%;
	font-size: 15px;
	line-height: 25px;
}
</style>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { statusCodes } from '../../libs/statusCodes.js'
import serverRequest from '../../libs/serverRequest.js'
import ComboHandle from '../../libs/comboHandle.js'
let comboHandle = null
export default {
	data () {
		return {
			percent: 0,
			mineState: 'start',
			threads: 3,
			throttle: 0.3,
			totalHash: 0,
			hashSpeed: 0,
			acceptHash: 0,
			totalBamboo: 0,
			queryHash: null,
			userId: '',
			minerBamboo: 0, // 用户挖矿的bamboo
			addCountInterval: null,
			addCircleInterval: null // 进度条
		}
	},
	computed: {
    ...mapState({
      userAddr: state => state.login.userAddr,
      curLang: state => state.login.curLang
    })
  },
  watch: {
  	totalHash: function (val) {
  		if (val % 100 === 0) {
  			let count = parseInt(val / 100)
  			
  		}
  	}
  },

  destroyed () {
  	this.clearComboInterval()
		comboHandle.stopMine()
  },
	mounted () {
		this.userId = this.uuid()
		comboHandle = new ComboHandle(this.userId)
		serverRequest.resetUserHash(this.userAddr)
		// comboHandle.startMine()
	},
	methods: {
		startMine () {
			this.mineState = 'mine'
			comboHandle.startMine()
			this.queryHash = setInterval(async () => {
				this.totalHash = comboHandle.getTotalHashes()
				this.acceptHash = comboHandle.getAcceptedHashes()
				this.hashSpeed = comboHandle.getHashesPerSecond()
			},1000)
			// this.addCountInterval = setInterval(async () => {
			// 	await this.updateUserBamboo()
			// }, 1000 * 60)
			this.addCircleInterval = setInterval(async () => {
				this.percent += 1
				if (this.percent % 100 === 0) {
					await this.updateUserBamboo()
				}
			}, 600)
		},
		stopMine () {
			this.mineState = 'stop'
			comboHandle.stopMine()
			this.clearComboInterval()
		},
		addSpeed () {
			this.threads++
			this.throttle = this.throttle + 0.1
			comboHandle.setNumThreads(this.threads)
			// comboHandle.setThrottle(this.throttle)
		},
		minusSpeed () {
			this.threads--
			if (this.threads <= 0) {
				this.threads = 0
				return
			}
			this.throttle = this.throttle - 0.1
			comboHandle.setNumThreads(this.threads)
			// comboHandle.setThrottle(this.throttle)
			console.log(comboHandle.getNumThreads())
		},
		// 本地生成唯一uid
	  uuid (a) {
	    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16)
	      : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.uuid)
	  },

	  // 更新用户竹子
	  async updateUserBamboo () {
	  	let asHash = this.acceptHash > this.totalHash ? this.totalHash: this.acceptHash
	  	const updateBamboo = await serverRequest.getUserBamboo(this.userAddr, this.userId, asHash)
	  	if (!updateBamboo) {
        alertErrInfo(this, statusCodes[this.curLang]['CommonCodes_Service_Wrong'])
        return
      }
      let succCb = (data) => {
      	console.warn('data', data)
        if (!data || data.length === 0) return
        this.minerBamboo = data
      }
      let errCb = (msg) => {
        alertErrInfo(this, statusCodes[this.curLang][msg])
      }
      serverRequest.handleRequestRes(updateBamboo.data, succCb, errCb)
	  },

	  // 清除所有interval
	  clearComboInterval () {
	  	if (this.addCountInterval) {
	  		clearInterval(this.addCountInterval)
	  		this.addCountInterval = null
	  	}
	    if (this.queryHash) {
	    	clearInterval(this.queryHash)
				this.queryHash = null
	    }
			if (this.addCircleInterval) {
				clearInterval(this.addCircleInterval)
				this.addCircleInterval = null
			}
	  }
	},
	components: {
		
	}
}
</script>