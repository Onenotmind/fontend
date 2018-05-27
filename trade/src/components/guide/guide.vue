<i18n src='../../common/i18n/guide/guide.json'></i18n>
<template>
	<div id="guide">
    <Row>
      <!-- 目录 -->
  <Col span="4" class="nomal-padding">
    <Menu  active-name="quick_start" style="width:160px;" @on-select="selectMenu">
        <MenuGroup :title="$t('quick_start')">
          <MenuItem name="quick_start">
            <!-- <Icon type="heart"></Icon> -->
              {{ $t("quick_start") }}
          </MenuItem>
        </MenuGroup>
        <MenuGroup :title="$t('detail_guide')">
            <MenuItem name="land_activity">
                <!-- <Icon type="heart"></Icon> -->
                {{ $t("land_activity") }}
            </MenuItem>
            <MenuItem name="main_market">
                <!-- <Icon type="heart-broken"></Icon> -->
                {{ $t("main_market") }}
            </MenuItem>
            <MenuItem name="my_account">
                <!-- <Icon type="heart-broken"></Icon> -->
                {{ $t("my_account") }}
            </MenuItem>
            <MenuItem name="combo_center">
                <!-- <Icon type="heart-broken"></Icon> -->
                {{ $t("combo_center") }}
            </MenuItem>
           <!--  <MenuItem name="discover">
                {{ $t("discover") }}
            </MenuItem> -->
        </MenuGroup>
        <!-- <MenuGroup :title="$t('question_center')">
          <MenuItem name="question_center">
              {{ $t("question_center") }}
          </MenuItem>
        </MenuGroup> -->
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

            <h3>{{ $t("start_h3_1") }}</h3><br>
            <p>{{ $t("start_p_1") }}</p><br><br>
            <img src="../../images/guide/start/start1.png"><br> 
            <p>{{ $t("start_p_2") }}</p><br>
            <p>{{ $t("start_p_3") }}</p><br><br>
            <img src="../../images/guide/start/start3.png"><br>

            <h3>{{ $t("start_h3_2") }}</h3><br>
            <p>{{ $t("start_h3_2_p_1") }}</p><br>
            <p>{{ $t("start_h3_2_p_2") }}</p><br><br>

            <h3>{{ $t("start_h3_3") }}</h3><br>
            <p>{{ $t("start_h3_3_p_1") }}</p><br>
            <img src="../../images/guide/land/land1.png"><br>
            <p>{{ $t("start_h3_3_p_2") }}</p><br>
            <img src="../../images/guide/market/market2.png"><br>

            <h3>{{ $t("start_h3_4") }}</h3><br>
            <p>{{ $t("start_h3_4_p_1") }}</p><br>
            <img src="../../images/guide/combo/combo2.png"><br>
            <p>{{ $t("start_h3_4_p_2") }}</p><br>
            <img src="../../images/guide/assets/assets2.png"><br>
            <p>{{ $t("start_h3_4_p_3") }}</p><br>

            <h3>{{ $t("start_h3_5") }}</h3><br>
            <p>{{ $t("start_h3_5_p_1") }}</p><br>
            <img src="../../images/guide/land/land1.png"><br>
            <p>{{ $t("start_h3_5_p_2") }}</p><br>
            <img src="../../images/guide/land/land3.png"><br>
            <p>{{ $t("start_h3_5_p_3") }}</p><br>
            <img src="../../images/guide/land/land4.png"><br><br>

            <h3>{{ $t("start_h3_6") }}</h3><br><br>
            <img src="../../images/guide/land/land8.png"><br>
            <p>{{ $t("start_h3_6_p_1") }}</p><br>
            <p>{{ $t("start_h3_6_p_2") }}</p><br>
            <img src="../../images/guide/assets/assets3.png"><br>
            <p>{{ $t("start_h3_6_p_3") }}</p><br>
            <img src="../../images/guide/assets/assets4.png"><br>
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
            <h3>{{ $t("land_h3_1") }}</h3><br>
            <p>{{ $t("land_h3_1_p_1") }}</p><br>
            <img src="../../images/guide/land/land1.png"><br>
            <h3>{{ $t("land_h3_2") }}</h3><br>
            <p>{{ $t("land_h3_2_p_1") }}</p><br>
            <img src="../../images/guide/land/land3.png"><br>

            <h4>{{ $t("land_h3_3") }}</h4><br>
            <p>{{ $t("land_h3_3_p_1") }}</p><br>
            <img src="../../images/guide/land/land4.png"><br>
            <p>{{ $t("land_h3_3_p_2") }}</p><br>
            <img src="../../images/guide/land/land6.png"><br>
            <p>{{ $t("land_h3_3_p_3") }}</p><br>
            <img src="../../images/guide/land/land7.png"><br>
            <p>{{ $t("land_h3_3_p_4") }}</p><br>

            <h4>{{ $t("land_h3_4") }}</h4><br>
            <p>{{ $t("land_h3_4_p_1") }}</p><br>
            <img src="../../images/guide/land/land5.png"><br>
            <p>{{ $t("land_h3_4_p_2") }}</p><br>
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
            <h3>{{ $t("market_h3_1") }}</h3><br>
            <p>{{ $t("market_h3_1_p_1") }}</p><br>
            <img src="../../images/guide/market/market1.png"><br>
            <h4>{{ $t("market_h3_1_h4_1") }}</h4><br>
            <p>{{ $t("market_h3_1_p_2") }}</p><br>
            <img src="../../images/guide/market/market3.png"><br>
            <img src="../../images/guide/market/market4.png"><br>
            <h4>{{ $t("market_h3_1_h4_2") }}</h4><br>
            <p>{{ $t("market_h3_1_p_3") }}</p><br>
            <img src="../../images/guide/market/market2.png"><br>
            <p>{{ $t("market_h3_1_p_4") }}</p>
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
            <h3>{{ $t("combo_h3_1") }}</h3><br>
            <p>{{ $t("combo_h3_1_p_1") }}</p><br>
            <img src="../../images/guide/combo/combo1.png"><br>
            <h4>{{ $t("combo_h3_1_h4_1") }}</h4><br>
            <img src="../../images/guide/combo/combo2.png">
          </Row>
        </Col>
      </Row>
    </p>
  </Card>
</Col>

<!-- 个人中心 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="guideState === 'my_account'">
    <p slot="title" style="height:30px;">
      <Icon type="ios-film-outline" size="25" class="vertical"></Icon>
      <span class="title">{{ $t("my_account") }}</span>
    </p>
    <a href="#" slot="extra">
      <Icon type="ios-loop-strong"></Icon>
    </a>
    <p>
      <Row span="24" type="flex" justify="center" align="middle">
        <Col span="24">
          <Row span="24" style="margin-bottom: 15px;">
            <h3>{{ $t("combo_h3_1") }}</h3><br>
            <p>{{ $t("combo_h3_1_p_1") }}</p><br>
            <img src="../../images/guide/assets/assets2.png"><br>
            <h3>{{ $t("combo_h3_2") }}</h3><br>
            <p>{{ $t("combo_h3_2_p_1") }}</p><br>
            <img src="../../images/guide/assets/assets1.png"><br>
            <h3>{{ $t("combo_h3_3") }}</h3><br>
            <p>{{ $t("combo_h3_3_p_1") }}</p><br>
            <img src="../../images/guide/assets/assets5.png"><br>
            <h3>{{ $t("combo_h3_4") }}</h3><br>
            <p>{{ $t("combo_h3_4_p_1") }}</p><br>
            <img src="../../images/guide/assets/assets4.png"><br>
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