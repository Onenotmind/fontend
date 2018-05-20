<i18n src='../../common/i18n/guide/guide.json'></i18n>
<template>
	<div id="guide">
    <Row>
      <!-- 目录 -->
  <Col span="4" class="nomal-padding">
    <Menu  active-name="quick_start" style="width:160px;" @on-select="selectMenu">
        <MenuGroup :title="$t('quick_start')">
          <MenuItem name="quick_start">
            <Icon type="heart"></Icon>
              {{ $t("quick_start") }}
          </MenuItem>
        </MenuGroup>
        <MenuGroup :title="$t('detail_guide')">
            <MenuItem name="land_activity">
                <Icon type="heart"></Icon>
                {{ $t("land_activity") }}
            </MenuItem>
            <MenuItem name="main_market">
                <Icon type="heart-broken"></Icon>
                {{ $t("main_market") }}
            </MenuItem>
            <MenuItem name="my_account">
                <Icon type="heart-broken"></Icon>
                {{ $t("my_account") }}
            </MenuItem>
            <MenuItem name="combo_center">
                <Icon type="heart-broken"></Icon>
                {{ $t("combo_center") }}
            </MenuItem>
            <MenuItem name="discover">
                <Icon type="heart-broken"></Icon>
                {{ $t("discover") }}
            </MenuItem>
        </MenuGroup>
        <MenuGroup :title="$t('question_center')">
          <MenuItem name="question_center">
            <Icon type="heart"></Icon>
              {{ $t("question_center") }}
          </MenuItem>
        </MenuGroup>
    </Menu>
  </Col>

  <!-- 快速上手 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="guideState === 'quick_start'">
    <p slot="title" style="height:30px;">
      <Icon type="ios-film-outline" size="25" class="vertical"></Icon>
      <span class="title">{{ $t("quick_start") }}</span>
    </p>
    <a href="#" slot="extra">
      <Icon type="ios-loop-strong"></Icon>
    </a>
    <p>
      <Row span="24" type="flex" justify="center" align="middle">
        <Col span="24">
          <Row span="24" style="margin-bottom: 15px;">
            <h3>注册</h3>
            <br>
            <p>
              你可以通过以太坊账号注册ETHLAND账号。首次注册，你可以直接输入以太坊账号即可，不一定需要认证邮箱，但是若想免费获取G10熊猫，则先认证邮箱或者登陆后在个人中心认证邮箱即可得到一只G10熊猫。
            </p>
            <br>
            <h3>熊猫概述</h3>
            <br>
            <p>
              1, 熊猫分有多个品种，每个品种有十三个等级，从G10-G0，在G0上面还有三个高阶等级，玄系，幻系，神系。当熊猫的等级超越G0，此时熊猫将脱离本身物种的限制，进化成新的物种。熊猫等级越高，外出获得商品的概率就越高，商品的价值就越大。<br>
              2, 每只熊猫有金木水火土五种属性，属性值与熊猫获取商品和获得商品概率有直接关系。熊猫其某个属性越高，则获得相对应属性商品的可能性也就越高。比如，球鞋的属性为火，那么派出属性火越高的熊猫获得商品的可能性就更大，获得奖品球鞋的概率也更大。G系熊猫还有一类特殊熊猫，该类熊猫天生具有特殊能力，有的刚出生就对火系商品探测能力超凡，有的特殊熊猫的速度极快，可称为 “极速熊猫”。
            </p>
            <br>
            <h3>获取熊猫</h3>
            <br>
            <p>
              1, 用户首次注册，且绑定邮箱后，系统会随机赠送一只10级熊猫，之后该G10熊猫会一只跟随用户，终身不变。用户可差遣它去外出寻宝依次来增强它的经验，让它进化。<br>
              2, 用户可在市场通过竹子购买熊猫。
            </p>
            <br>
            <h3>获取竹子</h3>
            <br>
            <p>
              1, 用户可通过 获取竹子 页面，通过参与算力分享池，消耗自己的CPU资源依次来免费获取竹子。<br>
              2, 用户可在个人中心通过人民币充值或者充值ETH, EOS等虚拟货币来兑换竹子。<br>
              3, 用户可以在 发现 页面通过参与一些活动以此来获取竹子。 
            </p>
          <br>
            <h3>熊猫活动</h3>
            <br>
            <p>
              1，孵化 用户可通过点击熊猫来直接孵化出熊猫。<br>
              2，外出活动 用户点击熊猫可看到熊猫周围出现四个选项球，分别代表 喂食，外出，出售，丢弃等四个功能。用户可直接点击 外出 功能，这时将会出现外出面板，上面可以选择方向，竹子消耗等选项。选择好方向，竹子即可点外出。
            </p>
            <br>
            <h3>熊猫回归及提现</h3>
            <br>
            <p>
              1，如果熊猫外出获得商品碎片或者虚拟货币时，会在外出后的一段时间内回归（可能是一个小时，可能是三个小时，这是一个佛性的游戏）。<br>
              2，当熊猫回归时，会出现熊猫回归面板，上面显示了熊猫外出带回来的商品，这些商品将会加入用户的总资产里面。<br>
              3，当用户的商品资产碎片达到三个以上时，即可进行提现。可在用户中心里点击体现，即可跳转到体现面板，在体现面板输入自己的收获地址，即可。
            </p>
          </Row>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

<!-- 熊猫家园 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="guideState === 'land_activity'">
    <p slot="title" style="height:30px;">
      <Icon type="ios-film-outline" size="25" class="vertical"></Icon>
      <span class="title">{{ $t("land_activity") }}</span>
    </p>
    <a href="#" slot="extra">
      <Icon type="ios-loop-strong"></Icon>
    </a>
    <p>
      <Row span="24" type="flex" justify="center" align="middle">
        <Col span="24">
          <Row span="24" style="margin-bottom: 15px;">
            <h3>孵化熊猫</h3>
            <br>
            <p>孵化熊猫只需点击熊猫家园中的熊猫蛋，即可进行孵化，如下图:</p>
            <br>
            <img src="../../images/guide/land/land1.png">
            <br>
            <h3>熊猫活动</h3>
            <br>
            <p>点击熊猫，将显示熊猫当前可进行的活动：</p>
            <br>
            <img src="../../images/guide/land/land3.png">
            <br>
            <h4>熊猫外出</h4>
            <br>
            <p>点击熊猫，在弹出的选项中点击外出选项，即可弹出外出面板：</p>
            <br>
            <img src="../../images/guide/land/land4.png">
            <br>
            <p>在外出面板中，有两个必选项，第一个是本次熊猫外出所储备的粮食--竹子。当给与的竹子越多，熊猫外出的时间越长，则外出的距离就越远，获得的商品可能性就越大。要理解这个，我们得理解两个关键点，一个是商品产生中心，第二个是自身的地理位置。我们可以点击左下角的地理图：如图</p>
            <br>
            <img src="../../images/guide/land/land6.png">
            <br>
            <p>点击之后地理图变大</p>
            <br>
            <img src="../../images/guide/land/land7.png">
            <br>
            <p>图中位置图标显示的是你当前所处的位置，五个绿色的圆圈球标识五个商品中心，当离商品中心越近，熊猫获取的概率就越大。同时，获取商品也跟熊猫对商品属性的探测，及熊猫自身的属性有关。</p>
            <br>
            <h4>出售熊猫</h4>
            <br>
            <p>点击熊猫选项中的第三个 出售选项 即可弹出出售面板，如图：</p>
            <br>
            <img src="../../images/guide/land/land5.png">
            <br>
            <p>出售面板上面显示熊猫相应的属性能力值，与参考售价，用户只要在售价中填写售价值，点击确定即可。</p>
          </Row>
        </Col>
      </Row>
    </p>
  </Card>
</Col>


<!-- 熊猫市场 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="guideState === 'main_market'">
    <p slot="title" style="height:30px;">
      <Icon type="ios-film-outline" size="25" class="vertical"></Icon>
      <span class="title">{{ $t("main_market") }}</span>
    </p>
    <a href="#" slot="extra">
      <Icon type="ios-loop-strong"></Icon>
    </a>
    <p>
      <Row span="24" type="flex" justify="center" align="middle">
        <Col span="24">
          <Row span="24" style="margin-bottom: 15px;">
            <h3>购买熊猫</h3>
            <br>
            <p>进入熊猫市场，将展示所有待售的熊猫。如下图</p>
            <br>
            <img src="../../images/guide/market/market1.png">
            <br>
            <h4>筛选熊猫</h4>
            <br>
            <p>我们提供多种筛选条件帮助用户更好的找到心仪的熊猫。如对属性值的筛选，对熊猫代数的筛选。</p>
            <br>
            <img src="../../images/guide/market/market3.png">
            <br>
            <img src="../../images/guide/market/market4.png">
            <br>
            <h4>购买熊猫</h4>
            <br>
            <p>点击熊猫市场中心仪的熊猫，将会出现熊猫购买的面板，面板上详细的显示出熊猫的属性值：</p>
            <br>
            <img src="../../images/guide/market/market2.png">
            <br>
            <p>如所选熊猫符合用户的预期，则点击购买即可得到该熊猫。</p>
          </Row>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

<!-- 获取竹子 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="guideState === 'combo_center'">
    <p slot="title" style="height:30px;">
      <Icon type="ios-film-outline" size="25" class="vertical"></Icon>
      <span class="title">{{ $t("combo_center") }}</span>
    </p>
    <a href="#" slot="extra">
      <Icon type="ios-loop-strong"></Icon>
    </a>
    <p>
      <Row span="24" type="flex" justify="center" align="middle">
        <Col span="24">
          <Row span="24" style="margin-bottom: 15px;">
            <h3>获取竹子</h3>
            <br>
            <p>进入获取竹子页面，点击开始按钮即可。如下图</p>
            <br>
            <img src="../../images/guide/combo/combo1.png">
            <br>
            <h4>参与算力池之后，可进行相应的操作，如暂停等。</h4>
            <br>
             <img src="../../images/guide/combo/combo2.png">
          </Row>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

</Row>
	</div>
</template>
<style scoped>
* {
  font-family: "Helvetica Neue", "Segoe UI", Tahoma, Arial, "Hiragino Sans GB", STHeiti, "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif
}
hr {
  color: #eee;
}
.title {
  font-size:18px;
  color:green;
  margin-left:8px;
  line-height: 24px;
}
p {
  line-height: 20px;
  font-size: 16px;
  letter-spacing: 1px;
  text-indent: 2px;
  color: #999
}
</style>
<script>

export default {
	data () {
    return {
      guideState: 'quick_start'
    }
	},
  mounted () {

  },
	methods: {
    selectMenu (name) {
      switch(name) {
        case 'quick_start': 
          this.guideState = 'quick_start'
          break
        case 'land_activity':
          this.guideState = 'land_activity'
          break
        case 'main_market':
          this.guideState = 'main_market'
          break
        case 'my_account':
          this.guideState = 'my_account'
          break
        case 'combo_center':
          this.guideState = 'combo_center'
          break
        case 'discover':
          this.guideState = 'discover'
          break
        default:
          break
      }
    }
  }
}
</script>