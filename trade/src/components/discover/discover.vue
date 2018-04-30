<template>
	<div id="discover">
		<Row>
			<Col span="4" class="nomal-padding">
		<Menu  active-name="free-activity" style="width:160px;" @on-select="selectMenu">
        <MenuGroup title="当前活动">
            <MenuItem name="ads-list">
                <Icon type="document-text"></Icon>
                广告活动
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="生活服务">
          <MenuItem name="call-charge">
                <Icon type="email"></Icon>
                充值话费
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="商品中心">
        	<MenuItem name="current-product-center">
                <Icon type="email"></Icon>
                当前商品
            </MenuItem>
          <MenuItem name="next-product-vote">
                <Icon type="email"></Icon>
                下期商品投票
            </MenuItem>
        </MenuGroup>
    </Menu>
  </Col>
  <!-- 广告 -->
  <Col span="20">
  <Card style="width: 100%;margin-top:15px;" :shadow="true"  v-show="true">
    <p>
      <Row span="24">
        <Col span="24" align="left" class="nomal-padding">
          <Icon type="ios-film-outline" size="28" class="vertical"></Icon>
          <span class="discover-card-title">广告中心</span>
        </Col>
        <Col span="24" style="border-bottom: 1px solid #ccc;color: green;"></Col>

        <Col span="20" class="rollout-card-margin" offset="4">
          <Button type="success" style="width: 400px;">确认修改</Button>
        </Col>
      </Row>
    </p>
  </Card>
</Col>
</Row>
	</div>
</template>
<style scoped>
.nomal-padding {
	padding-top: 15px;
	padding-bottom: 20px;
}
.discover-card-title {
  font-size:18px;
  color:green;
  margin-left:8px;
  line-height: 20px;
}
</style>
<script>
	
</script>