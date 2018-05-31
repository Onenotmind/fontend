<i18n src='../../common/i18n/assets/landAssets.json'></i18n>
<template>
	<div id="myAssets">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="my-assets" style="width:90%;" @on-select="selectMenu">
        <MenuGroup :title="$t('my_assets')">
            <MenuItem name="assets-list">
                <Icon type="document-text"></Icon>
                {{ $t("assets_list") }}
            </MenuItem>
            <MenuItem name="assets-rollout">
               <Icon type="forward"></Icon>
                {{ $t("assets_withdraw") }}
            </MenuItem>
            <MenuItem name="assets-recharge">
                <Icon type="reply"></Icon>
                {{ $t("assets_recharge") }}
            </MenuItem>
            <MenuItem name="product-exchange">
                <Icon type="navigate"></Icon>
                {{ $t("product_exchange")}}
            </MenuItem>
        </MenuGroup>
        <MenuGroup :title="$t('security_center')">
          <MenuItem name="modify-bind-email">
                <Icon type="email"></Icon>
                {{ $t( "assets_bind") }}
            </MenuItem>
            <MenuItem name="modify-login-pass">
                <Icon type="locked"></Icon>
                {{ $t("password") }}
            </MenuItem>
            <MenuItem name="modify-trade-pass">
                <Icon type="connection-bars"></Icon>
                {{ $t("transaction_password") }}
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
            <p> {{ $t("my_address") }}：{{ userInfo[UserModel.addr] || ''}}</p>
            <br>
            <p> {{ $t("my_email") }}：{{ userInfo[UserModel.email] || ''}}</p>
          </Col>
          <Col span="11" style="padding-left: 100px;">
            <img src="https://best.bi/id1.png" style="width: 40px;margin-right: 10px;" class="vertical"> <span class="verify-word">{{ $t("authentication") }}：</span>
            <br>
            <br>
            <Icon type="checkmark-circled" color="green" size="25" class="vertical" v-show="userInfo[UserModel.email]"></Icon>
            <Icon type="close-circled" color="red" size="25" class="vertical" v-show="!userInfo[UserModel.email]"></Icon>
            <span style="margin-left: 20px;">{{ $t("email_authentication") }}</span>
            <br>
            <br>
            <Icon type="checkmark-circled" color="green" size="25" class="vertical" v-show="userInfo[UserModel.tradePwd] !==''"></Icon>
            <Icon type="close-circled" color="red" size="25" class="vertical" v-show="userInfo[UserModel.tradePwd] ===''"></Icon>
            <span style="margin-left: 20px;">{{ $t("transaction_password_setting") }}</span>
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
      <Icon type="document-text" size="25" class="vertical"></Icon>
      <span class="my-assets-title">{{ $t("my_assets") }}</span>
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
            <Col span="3" class="line" style="height: 15px;">
              <img :src="lineImg">
            </Col>
            <Col span="9" align="center">
              <Button type="success" @click="assetsRollOut(asset.label)">{{ $t("withdraw") }}</Button>
              <Button type="warning" style="margin-left: 8px;" @click="assetsRollIn(asset.label)">{{ $t("recharge") }}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </p>
    <br>
    <br>
  </Card>
</Col>

<!-- 我的商品 -->
 <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'myAssets'">
    <p slot="title" style="height:30px;">
      <Icon type="ios-film-outline" size="25" class="vertical"></Icon>
      <span class="my-assets-title">{{ $t("my_products") }}</span>
    </p>
    <a href="#" slot="extra">
      <Icon type="ios-loop-strong"></Icon>
    </a>
    <p>
      <Row span="24" type="flex" justify="center" align="middle">
        <Col span="24">
          <Row span="24" style="margin-bottom: 15px;" v-for="(asset, index) in myProducts">
            <Col span="15" align="left">
              {{ asset[LandModel.name] }}
            </Col>
            <Col span="4" class="line">
              <img :src="asset[LandModel.src]" style="height: 25px;">
            </Col>
            <Col span="1" align="center">
              {{ asset[LandModel.value] }}
            </Col>
            <Col span="3" align="center" v-show="asset[LandModel.value] > 2">
              <Button type="success" @click="exchangeProductClick">{{ $t("withdraw") }}</Button>
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
          <Icon type="forward" size="25" class="vertical"></Icon>
          <span class="my-assets-title">{{ $t("assets_withdraw") }}</span>
          <Select v-model="assetsRollOutType" style="width:120px;margin-left: 40px;">
            <Option v-for="item in assetsTypeArr" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
          <span class="rollout-card-word">{{ $t("wallet_address") }}：</span>
        </Col>
        <Col span="18">
          <Input v-model="rollOutAddr" placeholder="" style="width: 300px"></Input>
        </Col>
          </Row>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
          <span class="rollout-card-word">{{ $t("withdrawal_amount") }}：</span>
        </Col>
        <Col span="18">
          <Input v-model="rollOutCount" placeholder="" style="width: 300px"></Input>
        </Col>
          </Row>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
              <span class="rollout-card-word">{{ $t("trade_password") }}：</span>
            </Col>
            <Col span="18">
              <Input v-model="rollOutPass" placeholder="" style="width: 300px"></Input>
            </Col>
          </Row>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
              <span class="rollout-card-word">{{ $t("verification_code") }}：</span>
            </Col>
            <Col span="18">
              <Input v-model="rollOutCode" placeholder="" style="width: 150px"></Input>
              <Button type="info" style="width: 150px;" @click="getCode(userInfo[UserModel.email] || '')">{{ $t("Get_verification_code") }}</Button>
            </Col>
          </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;" @click="AssetsRollOut">{{ $t("assets_withdraw") }}</Button>
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
          <Icon type="reply" size="25" class="vertical"></Icon>
          <span class="my-assets-title">{{ $t("assets_recharge") }}</span>
          <Select v-model="assetsRollInType" style="width:120px;margin-left: 40px;">
            <Option v-for="item in assetsTypeArr" :value="item" :key="item">{{ item }}</Option>
        </Select>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin" align="center" id="qrImg">
          <!-- <img :src="getaddrqrImg"> -->
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
          <Button type="success" class="copy-btn" style="width: 80px;margin-right: 15px;"  data-clipboard-target="#copyInput">{{ $t("Copy_the_address") }}</Button>
          <Input :value="userInfo[UserModel.account]" placeholder="" style="width: 350px;pointer-events:none;height: 30px;" id="copyInput"></Input>
        </Col>
        <Col span="24" class="rollout-card-margin">
          <Table :columns="rollOutColumns" :data="rollOutData"></Table>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

<!-- 商品兑换 -->
<Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'product-exchange'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="navigate" size="25" class="vertical"></Icon>
          <span class="my-assets-title">{{ $t("product_exchange") }}</span>
          <Select v-model="productExchangeType" style="width:420px;margin-left: 40px;">
            <Option v-for="item in productsTypeArr" :value="item[LandModel.productId]" :key="item[LandModel.productId]">{{ item[LandModel.name] }}</Option>
        </Select>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <!-- 收货人 -->
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
          <span class="rollout-card-word">{{ $t("receiver") }}：</span>
        </Col>
        <Col span="18">
          <Input v-model="exchangeName" placeholder="" style="width: 300px"></Input>
        </Col>
          </Row>
        </Col>
        <!-- 收货人电话 -->
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
          <span class="rollout-card-word">{{ $t("telephone") }}:</span>
        </Col>
        <Col span="18">
          <Input v-model="exchangePhone" placeholder="" style="width: 300px"></Input>
        </Col>
          </Row>
        </Col>
        <!-- 收货人地址 -->
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
          <span class="rollout-card-word">{{ $t("address") }}:</span>
        </Col>
        <Col span="18">
          <Input v-model="exchangeAddr" placeholder="" style="width: 300px"></Input>
        </Col>
          </Row>
        </Col>
        <!-- 交易密码 -->
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
              <span class="rollout-card-word">{{ $t("trade_password") }}:</span>
            </Col>
            <Col span="18">
              <Input v-model="exchangePass" placeholder="" style="width: 300px"></Input>
            </Col>
          </Row>
        </Col>
        <!-- 邮箱验证 -->
        <Col span="24" class="rollout-card-margin">
          <Row>
            <Col span="6"  align="right">
              <span class="rollout-card-word">{{ $t("verification_code") }}：</span>
            </Col>
            <Col span="18">
              <Input v-model="exchangeCode" placeholder="" style="width: 150px"></Input>
              <Button type="info" style="width: 150px;" @click="getCode(userInfo[UserModel.email] || '')">{{ $t("Get_verification_code") }}</Button>
            </Col>
          </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;" @click="confirmExchange">{{ $t("confirm_order") }}</Button>
        </Col>
      </Row>
      <Col span="24" class="rollout-card-margin">
        <Table :columns="exchangeColumns" :data="exchangeData"></Table>
      </Col>
    </p>
    </Card>
  </Col>

  <!-- 绑定邮箱 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'modify-bind-email'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="email" size="25" class="vertical"></Icon>
          <span class="my-assets-title">{{ $t("assets_bind") }}</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <!-- 邮箱已经绑定 -->
        <Col span="24" class="rollout-card-margin" align="center" v-show="userInfo[UserModel.email]">
          <Icon type="checkmark-circled" color="green" size="50"></Icon>
          <span class="email-bind-word">{{ $t("email_bind_succ") }}</span>
        </Col>
        <!-- 邮箱未绑定 -->
        <Col span="24" class="rollout-card-margin" align="center" v-show="!userInfo[UserModel.email]">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("email_address") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="emailBind" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center" v-show="!userInfo[UserModel.email]">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("verification_code") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="emailBindCode" placeholder="" style="width: 150px"></Input>
            <Button type="info" style="width: 150px;" @click="getEmailCode">{{ $t("Get_verification_code") }}</Button>
          </Col>
        </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4" v-show="userInfo[UserModel.email]">
          <Button type="success" style="width: 400px;" @click="bindEmail">{{ $t("submit") }}</Button>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

  <!-- 更改登陆密码 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-if="assetState === 'modify-login-pass'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="locked" size="25" class="vertical"></Icon>
          <span class="my-assets-title">{{ $t("Change_login_password") }}</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("Old_login_password") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="oldLoginPass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("New_login_password") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newLoginPass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("Verify_code") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newLoginPassRepeat" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;" @click="resetLoginPass">{{ $t("Confirm_the_change") }}</Button>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

<!-- 更改交易密码 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-if="assetState === 'modify-trade-pass'">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="connection-bars" size="25" class="vertical"></Icon>
          <span class="my-assets-title">{{ $t("Change_transaction_password") }}</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>
        <!-- <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("Old_trade_password") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="oldTradePass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col> -->
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("New_trade_password") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newTradePass" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
        </Col>
        <Col span="24" class="rollout-card-margin" align="center">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("Verify_code") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="newTradePassRepeat" placeholder="" style="width: 300px"></Input>
          </Col>
        </Row>
      </Col>
        <Col span="24" class="rollout-card-margin">
        <Row>
          <Col span="6"  align="right">
            <span class="rollout-card-word">{{ $t("verification_code") }}：</span>
          </Col>
          <Col span="18" align="left">
            <Input v-model="modifyTradePassCode" placeholder="" style="width: 150px"></Input>
            <Button type="info" style="width: 150px;" @click="getTradeCode">{{ $t("Get_verification_code") }}</Button>
          </Col>
        </Row>
        </Col>
        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;" @click="resetTradePass">{{ $t("Confirm_the_change")}}</Button>
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
.email-bind-word {
  margin-left: 15px;
  font-size: 28px;
  margin-top: -30px;
  line-height: 40px;
  display: inline-block;
  vertical-align: middle;
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
import { mapActions, mapState, mapGetters } from 'vuex'
import Clipboard from 'clipboard'
import { LandModel, PandaModel, AssetsModel, UserModel } from '../../libs/ClientModel.js'
import lineImg from '../../images/line.png'
// import getaddrqrImg from '../../images/webbg/getaddrqr.png'
import serverRequest from '../../libs/serverRequest.js'
import { alertSuccInfo, LandProductCodes, alertErrInfo, LoginCodes, CommonCodes } from '../../libs/statusHandle.js'
const qrCode = require('qrcode-npm')
const clipboard = new Clipboard('.copy-btn')
export default {
	data () {
		return {
      assetState: 'modify-login-pass',
      userInfo: {
        uemail: '',
        utradePass: ''
      },
      myTotalAssets: [],
      assetsTypeArr: ['ETH', 'EOS', 'BAMBOO'],
      assetsRollOutType: 'ETH',
      assetsRollInType: 'ETH',
      lineImg: lineImg,
      getaddrqrImg: '',
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
      // oldTradePass: '', // 旧交易密码
      newTradePass: '', // 新交易密码
      newTradePassRepeat: '', // 新交易密码重复
      modifyTradePassCode: '', // 修改交易密码时验证码
      emailBind: '', //邮箱绑定模块邮箱
      emailBindCode: '', // 邮箱绑定模块验证码
      /** 商品兑换参数 */
      myProducts: [ // 可兑换商品列表
      // {
      //   'label': 'nike OPPO A3 超视野全面屏拍照 nike OPPO A3 超视野全面屏拍照',
      //   'value': 1.3
      // },
      // {
      //   'label': '诺基亚 7 (Nokia 7) 4GB+64GB 黑色 全网通 双卡双待 移',
      //   'value': 1.3
      // },
      // {
      //   'label': 'nike 2018款新球鞋',
      //   'value': 1.3
      // }
      ],
      productExchangeType: '', // 商品兑换选中项
      exchangeName: '', // 商品兑换联系人
      exchangePhone: '', // 商品兑换联系人电话
      exchangeAddr:'', // 商品兑换联系人地址
      exchangePass: '', // 商品兑换交易密码
      exchangeCode: '', // 商品兑换验证码
      exchangeColumns: [ // 兑换历史列表
        {
          title: '流水号',
          key: 'seriesNum'
        },
        {
          title: '商品名称',
          key: 'type'
        },
        {
          title: '联系人',
          key: 'contactPerson'
        },
        {
          title: '联系电话',
          key: 'contactPhone'
        },
        {
          title: '联系人地址',
          key: 'contactAddr'
        },
        {
          title: '当前状态',
          key: 'state'
        }
      ],
      exchangeData: [], // 商品兑换列表内容
      // 服务端对接字段
      UserModel: UserModel,
      LandModel: LandModel
    }
	},
  mounted () {
    // this.userAddr = localStorage.getItem('EthlandAddr')
    // this.userAddr = '123'
    this.assetState = 'myAssets'
    this.getUserInfo()
    this.getUserProduct()
    this.copyAddrBind()
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
        case 'product-exchange':
          this.assetState = 'product-exchange'
          break
        case 'modify-bind-email':
          this.assetState = 'modify-bind-email'
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

    // 复制功能回调绑定
    copyAddrBind () {
      let self = this
      clipboard.on('success', function(e) {
        alertSuccInfo(self, LoginCodes.Copy_Addr_Succ)
      })
      clipboard.on('error', function(e) {
        alertErrInfo(self, LoginCodes.Copy_Addr_Fail)
      })
    },

    // 改变当前选中列表模块
    changeCurrentListItem (item) {
      console.log(item)
      this.assetState = item
    },
    async getUserInfo() {
      const userInfo = await serverRequest.getUserInfoAndAssetsByAddr(this.userAddr)
      console.log('userInfo', userInfo)
      if (!userInfo) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        this.userInfo = data
        this.myTotalAssets = data
        const qr = qrCode.qrcode(10, 'L')
        qr.addData(this.userInfo[UserModel.account])
        qr.make()
        var qrcodeNew = qr.createImgTag(4)
        document.getElementById('qrImg').innerHTML = qrcodeNew
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(userInfo.data, succCb, errCb)
    },

    async getUserProduct () {
      const products = await serverRequest.queryLandProductByAddr(this.userAddr)
      console.log(products)
      if (!products) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        if (!data || data.length === 0) return
        this.myProducts = data
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(products.data, succCb, errCb)
    },

    async getCode (email) {
      if (email === '') {
        alertErrInfo(this, CommonCodes.Please_Bind_Email_First)
        return
      }
      const sendEmail = await serverRequest.userGeneCode(email)
      if (!sendEmail) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        alertSuccInfo(this, LoginCodes.Send_Email_Succ)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(sendEmail.data, succCb, errCb)
    },
    AssetsRollOut () {

    },
    async resetLoginPass () {
      if (this.oldLoginPass === '' || this.newLoginPass === '') {
        alertErrInfo(this, LoginCodes.Password_Not_Null)
        return
      }
      if (this.newLoginPass !== this.newLoginPassRepeat) {
        alertErrInfo(this, LoginCodes.Password_Not_Repeat)
        return
      }
      const cleanInput = () => {
        this.oldLoginPass = ''
        this.newLoginPass = ''
        this.newLoginPassRepeat = ''
      }
      const loginPassChange = await serverRequest.userChangeLoginPass(this.userAddr, this.oldLoginPass, this.newLoginPass)
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
      cleanInput()
    },
    async resetTradePass () {
      if (this.newTradePass === '') {
        alertErrInfo(this, LoginCodes.Password_Not_Null)
        return
      }
      if (this.newTradePass !== this.newTradePassRepeat) {
        alertErrInfo(this, LoginCodes.Password_Not_Repeat)
        return
      }
      const cleanInput = () => {
        this.newTradePass = ''
        this.modifyTradePassCode = ''
        this.newTradePassRepeat = ''
      }
      const loginPassChange = await serverRequest.userChangeTradePass(this.userAddr, this.newTradePass, this.modifyTradePassCode)
      if (!loginPassChange) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        this.getUserInfo()
        alertSuccInfo(this, LoginCodes.Set_New_Pwd_Succ)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(loginPassChange.data, succCb, errCb)
      cleanInput()
    },
    async getTradeCode () {
      if (!this.userInfo || this.userInfo.uemail === '') {
        alertErrInfo(this, CommonCodes.Please_Bind_Email_First)
        return
      } 
      const sendEmail = await serverRequest.userGeneCode(this.userInfo.uemail)
      if (!sendEmail) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        alertSuccInfo(this, LoginCodes.Send_Email_Succ)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(sendEmail.data, succCb, errCb)
    },
    async getEmailCode () {
      if (this.emailBind === '') {
        alertErrInfo(this, CommonCodes.Please_Bind_Email_First)
        return
      } 
      await this.getCode(this.emailBind)
    },
    async bindEmail () {
      const checkEmail = await serverRequest.bindEmail(this.emailBind, this.emailBindCode)
      if (!checkEmail) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = async (data) => {
        await this.getUserInfo()
        alertSuccInfo(this, LoginCodes.Set_Email_Succ)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(checkEmail.data, succCb, errCb)
    },

    // 确认商品兑换订单
    async confirmExchange () {
      console.log('...', this.productExchangeType)
      if (!this.exchangeName || !this.exchangePhone || !this.exchangeAddr) {
        alertErrInfo(this, LandProductCodes.Exchange_Product_Info_Not_Null)
        return
      }
      if (!this.exchangePass || !this.exchangeCode) {
        alertErrInfo(this, LandProductCodes.Exchange_Product_Info_Not_Null)
        return
      }
      const cleanInput = () => {
        this.exchangeName = ''
        this.exchangePhone = ''
        this.exchangeAddr = ''
        this.exchangePass = ''
        this.exchangeCode = ''
      }
      const exchange = await serverRequest.exchangeProduct(this.userAddr, this.productExchangeType,this.exchangeName, this.exchangePhone, this.exchangeAddr, this.exchangePass, this.exchangeCode)
      if (!exchange) {
        alertErrInfo(this, CommonCodes.Service_Wrong)
        return
      }
      let succCb = (data) => {
        alertSuccInfo(this, LandProductCodes.Exchange_Product_Succ)
      }
      let errCb = (msg) => {
        alertErrInfo(this, msg)
      }
      serverRequest.handleRequestRes(exchange.data, succCb, errCb)
      cleanInput()
    },
    // 资产提现点击
    assetsRollOut (type) {
      this.assetState = 'assets-rollout'
      this.assetsRollOutType = type
    },
    // 资产充值
    assetsRollIn (type) {
      this.assetState = 'assets-rollin'
      this.assetsRollInType = type
    },
    // 商品兑换按钮点击
    exchangeProductClick (type) {
      this.assetState = 'product-exchange'
    }
	},
	components: {
		
	},
  computed: {
    ...mapState({
      userAddr: state => state.login.userAddr
    }),
    productsTypeArr () { // 商品兑换列表可选项数组
      if (this.myProducts.length > 0) {
        return this.myProducts.filter(pro => {
          return pro.value > 2
        })
      } else {
        return []
      }
    },
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
            value: this.myTotalAssets[AssetsModel.eth] || 0,
            lock: this.myTotalAssets[AssetsModel.ethLock] || 0
          },
          {
            label: 'EOS',
            value: this.myTotalAssets[AssetsModel.eos] || 0,
            lock: this.myTotalAssets[AssetsModel.eosLock] || 0
          },
          {
            label: 'BAMBOO',
            value: this.myTotalAssets[AssetsModel.bamboo] || 0,
            lock: this.myTotalAssets[AssetsModel.bambooLock] || 0
          }
        ]
      }
    }
  }
}
</script>