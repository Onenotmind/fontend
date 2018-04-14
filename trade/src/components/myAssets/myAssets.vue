<i18n src='../../common/i18n/market/mainMarket.json'></i18n>
<template>
	<div id="myAssets">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="my-assets" style="width:160px;" @on-select="selectMenu">
        <MenuGroup title="我的资产">
            <MenuItem name="assets-list">
                <Icon type="document-text"></Icon>
                资产列表
            </MenuItem>
            <MenuItem name="assets-rollout">
                <Icon type="chatbubbles"></Icon>
                提现资产
            </MenuItem>
            <MenuItem name="assets-recharge">
                <Icon type="chatbubbles"></Icon>
                充值资产
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="安全中心">
            <MenuItem name="modify-login-pass">
                <Icon type="heart"></Icon>
                更改密码
            </MenuItem>
            <MenuItem name="modify-trade-pass">
                <Icon type="heart-broken"></Icon>
                更改交易密码
            </MenuItem>
            <MenuItem name="product-bag">
                <Icon type="heart-broken"></Icon>
                切换账户
            </MenuItem>
        </MenuGroup>
    </Menu>
  </Col>
  <Col span="20">
  	<Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'myAssets'">
      <p>
        <Row span="24" type="flex" justify="center" align="middle">
          <Col span="3" align="center" style="min-width: 55px;" >
            <img src="https://best.bi/assets/xx/avatars/avatar.png" class="avatar">
          </Col>
          <Col span="10" style="border-right: 1px solid #E1E2EA">
            <p> 我的地址：{{ userInfo.uaddr || ''}}</p>
            <br>
            <p> 我的邮箱：{{ userInfo.uemail || ''}}</p>
          </Col>
          <Col span="11" style="padding-left: 100px;">
            <img src="https://best.bi/id1.png" style="width: 40px;margin-right: 10px;" class="vertical"> <span class="verify-word">身份验证：</span>
            <br>
            <br>
            <Icon type="checkmark-circled" color="green" size="25" class="vertical" v-show="userInfo.uemail !==''"></Icon>
            <Icon type="close-circled" color="red" size="25" class="vertical" v-show="userInfo.uemail ===''"></Icon>
            <span style="margin-left: 20px;">邮箱认证</span>
            <br>
            <br>
            <Icon type="checkmark-circled" color="green" size="25" class="vertical" v-show="userInfo.utradePass !==''"></Icon>
            <Icon type="close-circled" color="red" size="25" class="vertical" v-show="userInfo.utradePass ===''"></Icon>
            <span style="margin-left: 20px;">交易密码设置</span>
          </Col>
        </Row>
      </p>
    </Card>
  </Col>
  <br>
  <!-- 我的资产模块 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'myAssets'">
    <p slot="title" style="height:30px;">
      <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
      <span class="my-assets-title">我的资产</span>
    </p>
    <a href="#" slot="extra">
      <Icon type="ios-loop-strong"></Icon>
    </a>
    <p>
      <Row span="24" type="flex" justify="center" align="middle">
        <Col span="24">
          <Row span="24" style="margin-bottom: 15px;" v-for="(asset, index) in myAssets">
            <Col span="2" align="center">
              {{ asset.label }}
            </Col>
            <Col span="1" align="center">
              {{ asset.value }}
            </Col>
            <Col span="5" class="line">
              <img :src="lineImg" style="height: 15px;">
            </Col>
            <Col span="2" align="center">
              <Icon type="ios-locked" size="20">
              </Icon>
            </Col>
            <Col span="1" align="center">
              {{ asset.lock }}
            </Col>
            <Col span="5" class="line" style="height: 15px;">
              <img :src="lineImg">
            </Col>
            <Col span="6" align="center">
              <Button type="success">提现</Button>
              <Button type="warning" style="margin-left: 8px;">充值</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </p>
  </Card>
</Col>
<!-- 资产提现模块 -->
<Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'assets-rollout'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="my-assets-title">资产提现</span>
          <Select v-model="assetsRollOutType" style="width:120px;margin-left: 40px;">
            <Option v-for="item in assetsTypeArr" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
          <span class="rollout-card-word">钱包地址：</span>
        </Col>
        <Col span="18">
          <Input v-model="rollOutAddr" placeholder="" style="width: 300px"></Input>
        </Col>
          </Row>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
          <span class="rollout-card-word">提现数量：</span>
        </Col>
        <Col span="18">
          <Input v-model="rollOutCount" placeholder="" style="width: 300px"></Input>
        </Col>
          </Row>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
              <span class="rollout-card-word">交易密码：</span>
            </Col>
            <Col span="18">
              <Input v-model="rollOutPass" placeholder="" style="width: 300px"></Input>
            </Col>
          </Row>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
              <span class="rollout-card-word">验证码：</span>
            </Col>
            <Col span="18">
              <Input v-model="rollOutCode" placeholder="" style="width: 150px"></Input>
              <Button type="info" style="width: 150px;" @click="getCode">获取验证码</Button>
            </Col>
          </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;" @click="AssetsRollOut">提现资产</Button>
        </Col>
      </Row>
      <Col span="24" class="rollout-card-margin">
        <Table :columns="rollOutColumns" :data="rollOutData"></Table>
      </Col>
    </p>
    </Card>
  </Col>

  <!-- 资产充值模块 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'assets-rollin'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="my-assets-title">资产充值</span>
          <Select v-model="assetsRollOutType" style="width:120px;margin-left: 40px;">
            <Option v-for="item in assetsTypeArr" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin" align="center">
          <img :src="getaddrqrImg">
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
          <Button type="success" style="width: 80px;margin-right: 15px;" @click="copyAddr">复制地址</Button>
          <Input value="0xF455C2dae83e65F67E7938B1aFAE6A269455B194" placeholder="" style="width: 350px;pointer-events:none;height: 30px;"></Input>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Table :columns="rollOutColumns" :data="rollOutData"></Table>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

  <!-- 更改登陆密码 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'modify-login-pass'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="my-assets-title">更改登陆密码</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">旧登陆密码：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="oldLoginPass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">新登陆密码：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newLoginPass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">新密码确认：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newLoginPassRepeat" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;" @click="resetLoginPass">确认修改</Button>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

<!-- 更改交易密码 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'modify-trade-pass'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="my-assets-title">更改交易密码</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">旧交易密码：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="oldTradePass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">新交易密码：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newTradePass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">新密码确认：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newTradePassRepeat" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
      </Col>
        <Col span="24" class="rollout-card-margin">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">验证码：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="modifyTradePassCode" placeholder="" style="width: 150px"></Input>
            <Button type="info" style="width: 150px;" @click="getTradeCode">获取验证码</Button>
          </Col>
        </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;" @click="resetTradePass">确认修改</Button>
        </Col>
      </Row>
    </p>
  </Card>
</Col>
    </Row>
	</div>
</template>
<style scoped>
.text-center {
	text-align: center;
}
.nomal-padding {
	padding-top: 15px;
	padding-bottom: 20px;
}
.vertical {
  vertical-align: middle;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.verify-word {
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.1em;
}
.my-assets-title {
  font-size:18px;
  color:green;
  margin-left:8px;
  line-height: 20px;
}
.line {
  background: url('../../images/line.png') center center no-repeat;
}
.rollout-card-word {
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.1em;
}
.rollout-card-margin {
  margin-top: 35px;
}
</style>
<script>
import lineImg from '../../images/line.png'
import getaddrqrImg from '../../images/webbg/getaddrqr.png'
import serverRequest from '../../libs/serverRequest.js'
import { alertSuccInfo, alertErrInfo, LoginCodes, CommonCodes } from '../../libs/statusHandle.js'
export default {
	data () {
		return {
      assetState: 'modify-login-pass',
      userAddr: '',
      userInfo: {
        uemail: '',
        utradePass: ''
      },
      myTotalAssets: [],
      assetsTypeArr: ['ETH', 'EOS', 'BAMBOO'],
      assetsRollOutType: 'ETH',
      lineImg: lineImg,
      getaddrqrImg: getaddrqrImg,
      rollOutAddr: '',
      rollOutCount: '',
      rollOutCode: '',
      rollOutPass: '',
      rollOutColumns: [
        {
          title: '流水号',
          key: 'seriesNum'
        },
        {
          title: '币种',
          key: 'type'
        },
        {
          title: '地址',
          key: 'rollOutAddr'
        },
        {
          title: '提现数量',
          key: 'rollOutCount'
        },
        {
          title: '申请时间',
          key: 'serveTime'
        },
        {
          title: '当前状态',
          key: 'state'
        }
      ],
      rollOutData: [],
      oldLoginPass: '', // 旧登陆密码
      newLoginPass: '', // 新登陆密码
      newLoginPassRepeat: '', // 新登陆密码重复
      oldTradePass: '', // 旧交易密码
      newTradePass: '', // 新交易密码
      newTradePassRepeat: '', // 新交易密码重复
      modifyTradePassCode: '' // 修改交易密码时验证码
    }
	},
  mounted () {
    // this.userAddr = localStorage.getItem('EthlandAddr')
    this.userAddr = '123'
    this.getUserInfo()
  },
	methods: {
    selectMenu (name) {
      console.log(name)
      switch(name) {
        case 'assets-list': 
          this.assetState = 'myAssets'
          break
        case 'assets-rollout':
          this.assetState = 'assets-rollout'
          break
        case 'assets-recharge':
          this.assetState = 'assets-rollin'
          break
        case 'modify-login-pass':
          this.assetState = 'modify-login-pass'
          break
        case 'modify-trade-pass':
          this.assetState = 'modify-trade-pass'
          break
        default:
          break
      }
    },
    async getUserInfo() {
      const userInfo = await serverRequest.getUserInfoAndAssetsByAddr(this.userAddr)
      console.log('userInfo', userInfo)
      if (!userInfo) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        alertSuccInfo(this, LoginCodes.Register_Succ)
        this.userInfo = data
        this.myTotalAssets = data
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(userInfo.data, succCb, errCb)
    },
    getCode () {

    },
    AssetsRollOut () {

    },
    async resetLoginPass () {
      if (this.oldLoginPass !== '' || this.newLoginPass !== '') {
        alertErrInfo(this, LoginCodes.Password_Not_Null)
        return
      }
      if (this.newLoginPass !== this.newLoginPassRepeat) {
        alertErrInfo(this, LoginCodes.Password_Not_Repeat)
        return
      }
      const loginPassChange = await serverRequest.userChangeLoginPass(this.userAddr, this.newLoginPass)
      if (!loginPassChange) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        alertSuccInfo(this, LoginCodes.Set_New_Pwd_Succ)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(loginPassChange.data, succCb, errCb)
    },
    resetTradePass () {
      if (this.oldTradePass !== '' || this.newTradePass !== '') {
        alertErrInfo(this, LoginCodes.Password_Not_Null)
        return
      }
      if (this.newTradePass !== this.newTradePassRepeat) {
        alertErrInfo(this, LoginCodes.Password_Not_Repeat)
        return
      }
      const loginPassChange = await serverRequest.userChangeLoginPass(this.userAddr, this.newTradePass)
      if (!loginPassChange) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        alertSuccInfo(this, LoginCodes.Set_New_Pwd_Succ)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(loginPassChange.data, succCb, errCb)
    },
    getTradeCode () {

    }
	},
	components: {
		
	},
  computed: {
    myAssets () {
      if (!this.myTotalAssets) {
        return [
          {
            label: 'ETH',
            value: 0,
            lock: 0
          },
          {
            label: 'EOS',
            value: 0,
            lock: 0
          },
          {
            label: 'BAMBOO',
            value: 0,
            lock: 0
          }
        ]
      } else {
        return [
          {
            label: 'ETH',
            value: this.myTotalAssets.eth || 0,
            lock: this.myTotalAssets.ethLock || 0
          },
          {
            label: 'EOS',
            value: this.myTotalAssets.eos || 0,
            lock: this.myTotalAssets.eosLock || 0
          },
          {
            label: 'BAMBOO',
            value: this.myTotalAssets.bamboo || 0,
            lock: this.myTotalAssets.bambooLock || 0
          }
        ]
      }
    }
  }
}
</script>