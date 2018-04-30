<i18n src='../../common/i18n/guide/guide.json'></i18n>
<template>
	<div id="guide">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="my-assets" style="width:160px;" @on-select="selectMenu">
        <MenuGroup :title="$t('Newbie guide')">
            <MenuItem name="assets-list">
                <Icon type="document-text"></Icon>
                {{ $t("Quickly Start") }}
            </MenuItem>
        </MenuGroup>
        <MenuGroup :title="$t('Walkthrough')">
            <MenuItem name="modify-bind-email">
                <Icon type="heart"></Icon>
                {{ $t("Pandas' Property") }}
            </MenuItem>
            <MenuItem name="modify-trade-pass">
                <Icon type="heart-broken"></Icon>
                {{ $t("Travel") }}
            </MenuItem>
            <MenuItem name="modify-trade-pass">
                <Icon type="heart-broken"></Icon>
                {{ $t("PandaHome") }}
            </MenuItem>
            <MenuItem name="product-bag">
                <Icon type="heart-broken"></Icon>
                {{ $t("Common problem") }}
            </MenuItem>
        </MenuGroup>
    </Menu>
  </Col>

<!-- 新手引导 -->
<Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'Newbie guide'">
    <p>
      用户注册之后会随机赠送一只熊猫，通过在catchbaboo页面中点击播放可以免费获得竹子，或是在商场里面直接充值购买竹子。在主页中可以选择你想要熊猫外出的方向，地图上有五个点，在这附近的东西比较多带回照片的可能性比较大，如果熊猫集齐同一种东西的三张照片即可换实物。
    </p>
    </Card>
  </Col>

  <!-- 熊猫属性 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'Property'">
    <p>
      <ul>
        <li>
          每种熊猫有13个等级。分别是G10-G0，白银，铂金，等级越高其属性值越高，获得对应属性照片的可能性就越大，白银和铂金两种熊猫为特殊熊猫，它们是有一个月的生命期限，在此一个月，白银可以获得当前所以熊猫旅游花费竹子的1%，铂金可以获得5%。
        </li>
        <li>
          每只熊猫有金木水火土五个属性，每件东西也有其属性,派出旅游的熊猫其某个属性越高，则获得相对应属性照片的可能性也就越高。比如，球鞋的属性为火，那么派出属性火越高的熊猫获得照片的可能性就更大。
        </li>
        <li>
          换取实物的东西不是一成不变的，每三个月实物会更新一次，后期我们也可以通过用户投票来上市实物。用户可以投票自己哪方面属性值比较高的实物。
        </li>
      </ul>
    </p>
  </Card>
</Col>


  <!-- 熊猫旅游 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'Travel'">
    <p>
      <ul>
        <li>
          一次只能派出一只熊猫旅游，选择好自己想要外出的熊猫之后就选择自己想要熊猫旅游的方向，在熊猫家园页面有一张地图，地图上的五个点表示产生东西的地方，往这几个方向旅游得到照片的机率比较大。消耗竹子越多熊猫可以走的越远，所以带上竹子就可以选择外出旅游啦
        </li>
        <li>
          熊猫外出时间不限，可以在地图上查看熊猫到达哪里，熊猫最多可以带回三张照片。
        </li>
    </ul>
    </p>
  </Card>
</Col>

  <!-- 熊猫孵化 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'PandaHome'">
    <p>
      
    </p>
  </Card>
</Col>

<!-- 常见问题 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="assetState === 'Common problem'">
    <p>
     <ol>
      <li>
        Q:熊猫旅游带回照片的机率大吗？
        R:熊猫在旅游期间会源源不断接送到地方产生的符合条件的照片，这个条件是随机的，即每张照片会有一个随机数，这主要取决于熊猫的属性，属性值范围越大，接受照片的可能性就越大，但是带回的只能有三张照片。
      </li>
      <li>
        Q:如果集齐了两张照片，三个月又到了那照片是不是作废？
        R:用户可以通过用竹子购买照片一获得实物，但是一张照片是不能通过消费竹子来获得实物的。
      </li>
      <li>
        Q:
        R:
      </li>
      <li>
        Q:
        R:
      </li>
      <li>
        Q:
        R:
      </li>
      <li>
        Q:
        R:
      </li>
     </ol>
    </p>
  </Card>
</Col>
    </Row>
	</div>
</template>
<style scoped>

</style>
<script>
// import lineImg from '../../images/line.png'
// import getaddrqrImg from '../../images/webbg/getaddrqr.png'
// import serverRequest from '../../libs/serverRequest.js'
// import { alertSuccInfo, alertErrInfo, LoginCodes, CommonCodes } from '../../libs/statusHandle.js'
export default {
	data () {

	},
  mounted () {

  },
	methods: {
    selectMenu (name) {
      console.log(name)
      switch(name) {
        case 'Newbie guide': 
          this.assetState = 'Newbie guide'
          break
        case 'Property':
          this.assetState = 'Property'
          break
        case 'Travel':
          this.assetState = 'Travel'
          break
        case 'PandaHome':
          this.assetState = 'PandaHome'
          break
        case 'Common problem':
          this.assetState = 'Common problem'
          break
        default:
          break
      }
    },
//     async getUserInfo() {
//       const userInfo = await serverRequest.getUserInfoAndAssetsByAddr(this.userAddr)
//       console.log('userInfo', userInfo)
//       if (!userInfo) {
//         alertErrInfo(this, CommonCodes.Service_Wrong)
//         return
//       }
//       let succCb = (data) => {
//         alertSuccInfo(this, LoginCodes.Register_Succ)
//         this.userInfo = data
//         this.myTotalAssets = data
//       }
//       let errCb = (msg) => {
//         alertErrInfo(this, msg)
//       }
//       serverRequest.handleRequestRes(userInfo.data, succCb, errCb)
//     },
//     getCode () {

//     },
//     AssetsRollOut () {

//     },
//     async resetLoginPass () {
//       if (this.oldLoginPass === '' || this.newLoginPass === '') {
//         alertErrInfo(this, LoginCodes.Password_Not_Null)
//         return
//       }
//       if (this.newLoginPass !== this.newLoginPassRepeat) {
//         alertErrInfo(this, LoginCodes.Password_Not_Repeat)
//         return
//       }
//       const loginPassChange = await serverRequest.userChangeLoginPass(this.userAddr, this.oldLoginPass, this.newLoginPass)
//       if (!loginPassChange) {
//         alertErrInfo(this, CommonCodes.Service_Wrong)
//         return
//       }
//       let succCb = (data) => {
//         alertSuccInfo(this, LoginCodes.Set_New_Pwd_Succ)
//       }
//       let errCb = (msg) => {
//         alertErrInfo(this, msg)
//       }
//       serverRequest.handleRequestRes(loginPassChange.data, succCb, errCb)
//     },
//     async resetTradePass () {
//       if (this.oldTradePass === '' || this.newTradePass === '') {
//         alertErrInfo(this, LoginCodes.Password_Not_Null)
//         return
//       }
//       if (this.newTradePass !== this.newTradePassRepeat) {
//         alertErrInfo(this, LoginCodes.Password_Not_Repeat)
//         return
//       }
//       const loginPassChange = await serverRequest.userChangeLoginPass(this.userAddr, this.newTradePass)
//       if (!loginPassChange) {
//         alertErrInfo(this, CommonCodes.Service_Wrong)
//         return
//       }
//       let succCb = (data) => {
//         alertSuccInfo(this, LoginCodes.Set_New_Pwd_Succ)
//       }
//       let errCb = (msg) => {
//         alertErrInfo(this, msg)
//       }
//       serverRequest.handleRequestRes(loginPassChange.data, succCb, errCb)
//     },
//     async getTradeCode () {
//       if (!this.userInfo || this.userInfo.uemail === '') {
//         alertErrInfo(this, CommonCodes.Please_Bind_Email_First)
//         return
//       } 
//       const sendEmail = await serverRequest.userGeneCode(this.userInfo.uemail)
//       if (!sendEmail) {
//         alertErrInfo(this, CommonCodes.Service_Wrong)
//         return
//       }
//       let succCb = (data) => {
//         alertSuccInfo(this, LoginCodes.Send_Email_Succ)
//       }
//       let errCb = (msg) => {
//         alertErrInfo(this, msg)
//       }
//       serverRequest.handleRequestRes(sendEmail.data, succCb, errCb)
//     },
//     async getEmailCode () {
//       if (this.emailBind === '') {
//         alertErrInfo(this, CommonCodes.Please_Bind_Email_First)
//         return
//       } 
//       const sendEmail = await serverRequest.userGeneCode(this.emailBind)
//       if (!sendEmail) {
//         alertErrInfo(this, CommonCodes.Service_Wrong)
//         return
//       }
//       let succCb = (data) => {
//         alertSuccInfo(this, LoginCodes.Send_Email_Succ)
//       }
//       let errCb = (msg) => {
//         alertErrInfo(this, msg)
//       }
//       serverRequest.handleRequestRes(sendEmail.data, succCb, errCb)
//     },
//     async bindEmail () {
//       const checkEmail = await serverRequest.userCheckCode(this.userInfo.uemail, this.emailBindCode)
//       if (!checkEmail) {
//         alertErrInfo(this, CommonCodes.Service_Wrong)
//         return
//       }
//       let succCb = (data) => {
//         alertSuccInfo(this, LoginCodes.Set_Email_Succ)
//       }
//       let errCb = (msg) => {
//         alertErrInfo(this, msg)
//       }
//       serverRequest.handleRequestRes(checkEmail.data, succCb, errCb)
//     },
//     copyAddr () {

//     }
// 	},
// 	components: {
		
// 	},
//   computed: {
//     myAssets () {
//       if (!this.myTotalAssets) {
//         return [
//           {
//             label: 'ETH',
//             value: 0,
//             lock: 0
//           },
//           {
//             label: 'EOS',
//             value: 0,
//             lock: 0
//           },
//           {
//             label: 'BAMBOO',
//             value: 0,
//             lock: 0
//           }
//         ]
//       } else {
//         return [
//           {
//             label: 'ETH',
//             value: this.myTotalAssets.eth || 0,
//             lock: this.myTotalAssets.ethLock || 0
//           },
//           {
//             label: 'EOS',
//             value: this.myTotalAssets.eos || 0,
//             lock: this.myTotalAssets.eosLock || 0
//           },
//           {
//             label: 'BAMBOO',
//             value: this.myTotalAssets.bamboo || 0,
//             lock: this.myTotalAssets.bambooLock || 0
//           }
//         ]
//       }
//     }
  }
}
</script>