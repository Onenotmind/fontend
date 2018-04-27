<template>
	<div id="landBg">
		<!-- 太阳光 -->
			<div class="sunlight">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		<!-- 白云 -->
			<div class="clouds">
			  <div class="cloud x1"></div>
			  <div class="cloud x2"></div>
			  <div class="cloud x3"></div>
			</div>
		<!-- 蜜蜂鲜花 -->
				<div class="bee-box">
					<div class="soil two"></div>
					<div class="soil"></div>
					<div class="flowerpot">
						<div class="flowerpot-top"></div>
						<div class="flowerpot-bottom"></div>
					</div>
					<div class="flower">
						<div class="flower-top">
							<p></p>
							<p></p>
							<p></p>
							<p></p>
						</div>
						<div class="flower-head"></div>
					</div>
					<div class="bee">
						<div class="bee-body"></div>
					</div>
					<div class="bee bee-2">
						<div class="bee-body"></div>
					</div>
					<div class="triangle-box two">
						<div class="item"></div>
						<div class="item"></div>
						<div class="item"></div>
					</div>
				</div>
	<div class="loading">
		<div class="pic">
			<div class="egg-wrapper">
				<div class="egg infinite">
				</div>
			</div>
			<p>我是一只鸡</p>
		</div>
	</div>
	</div>
</template>
<style scoped>
.egg-wrapper span:before,
.egg:before,
.chick-head:before,
.chick-head:after,
.chick-body:before,
.eye span:before,
.eye span:after,
.blusher span:before,
.blusher span:after,
.foot:before,
.foot span:before,
.face:before,
.face:after,
.wing-left:before,
.house-6:before,
.house-7:before,
.house-7:after,
.house-8:before,
.house-8:after,
.bee-box:before,
.soil:before,
.soil:after,
.flowerpot:after,
.flowerpot-top:before,
.flowerpot-top:after,
.flower-top:before,
.flower-head:after,
.flower-head:before,
.bee:before,
.bee:after,
.bee-body:before,
.bee-body:after,
.fence span:nth-child(1):before,
.fence span:nth-child(1):after,
.fence span:nth-child(2):before,
.fence span:nth-child(2):after,
.fence span:nth-child(3):before,
.fence span:nth-child(3):after,
.fence span:nth-child(4):before,
.fence span:nth-child(4):after,
.trough:before,
.trough span:before,
.trough span:after,
.fodder:before,
.fodder:after{
  position: absolute;
  content: "";
}
#landBg {
	position: absolute;
	left: 0;
	height: calc(100% - 64px);
	width: 100%;
	background-image: url(../../images/home-bg.png);
	background-size: 100% 100%;
}

/*加载*/
.loading{
  position: absolute;
	left: 0;
	height: calc(100% - 64px);
	width: 100%;
	height: 100%;
  overflow: hidden;
  background-color: #b7eaff;
  z-index: 99;
  display: none;
}
.loading .pic{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5rem;
  height: 5rem;
  margin: -2.5rem 0 0 -2.5rem;
}
.loading .pic p{
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: .6rem;
  color: #4d96b5;
}
.loading .egg-wrapper{
  bottom: 20%;
  left: 0;
  -webkit-animation:pic 1.5s ease-in infinite;
}
.loading .egg{
  -webkit-animation:none;
}
/*太阳光 sunlight*/
.sunlight{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.sunlight span{ 
  position: absolute; 
  top: -10%;
  height: 150%;
  width: 3rem;
  background-color: #fff;
  left: 20%;
  transform: rotate(-14deg);
  z-index: 20;
}
.sunlight span:nth-child(1){
  -webkit-animation:sunlight-1 11s ease-in infinite;
}
.sunlight span:nth-child(2){
  left: 28%;
  -webkit-animation:sunlight-2 11.5s ease-in infinite;
}
.sunlight span:nth-child(3){
  left: 65%;
  width: 5rem;
  transform: rotate(-18deg);
  -webkit-animation:sunlight-3 13s ease-in infinite;
}
.sunlight span:nth-child(4){
  left: 108%;
  width: 1.6rem;
  transform: rotate(-22deg);
  -webkit-animation:sunlight-3 15s ease-in infinite;
}

/*白云*/
.clouds{
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.cloud {
  position: absolute;
  top: 2rem;
  width: 5rem;
  height: 1.5rem;
  border-radius: 3rem;
  background-color: #cfeffd;
}
.cloud:before {
  content: '';
  position: absolute;
  background: #cfeffd;
  width: 5rem;
  height: .8rem;
  border-radius: .5rem;
  bottom: 0;
  
}
.cloud.x1{
  left: -30%;
  -webkit-animation:cloud 80s linear infinite;
}
.cloud.x1:before{
  left: -1rem;
}
.cloud.x2{
  right: -30%;
  top: 8rem;
  width: 4rem;
  height: 1.6rem;
  -webkit-animation:cloudx2 150s linear infinite;
}
.cloud.x2:before{
  width: 3rem;
  height: .6rem;
  right: 1.8rem;
}
.cloud.x3{
  left: -50%;
  top: 11rem;
  width: 3rem;
  height: 1.4rem;
  -webkit-animation:cloudx3 120s linear infinite;
}
.cloud.x3:before{
  width: 2rem;
  height: .4rem;
  left: 1.8rem;
}

/*蜜蜂鲜花*/
.bee-box{
  position: absolute;
  bottom: 5rem;
  left: 20rem;
  width: 7rem;
  height: 4rem;
  transform: scale(.8,.8)
}
.bee-box>div{ position: absolute; }
.bee-box:before{
  width: 7rem;
  height: .6rem;
  background-color: #60ae34;
  border-radius: .5rem;
  bottom: -.3rem;
}
.soil,.soil:before{
  width: 2rem;
  height: 1rem;
  border-radius: 3rem 3rem 0 0;
}
.soil{
  bottom: 0;
  left: .8rem;
  background-color: #7e422b;
  z-index: 2
}
.soil:before{
  left: -.8rem;
  background-color: #ab5e2b
}
.soil.two,.soil.two:before{
  width: 1.8rem;
  height: 1.2rem;
  border-radius: 3rem 3rem 0 0;
}
.soil:after,.soil.two:after{
  top: .5rem;
  left: 0;
  width: .25rem;
  height: .25rem;
  border-radius: .25rem;
  background-color: #7e422b;
  z-index: 2
}
.soil.two{
  bottom: 0;
  left: 3rem;
}
.soil.two:before{
  left: -.5rem;
  background-color: #ab5e2b;
}
.flowerpot{
  width: 3.25rem;
  height: 3.25rem;
  right: 0;
  bottom: 0;
}
.flowerpot:after{
  right: 0rem;
  bottom: -.25rem;
  left: 0;
  height: .25rem;
  border-radius: .25rem;
  background-color: #60ae34;
  z-index: 4;
}
.flowerpot>div{
  position: absolute;
}
.flowerpot-top{
  right: 0;
  bottom: .6rem;
  width: 3.5rem;
  height: 0;
  border-bottom-left-radius: .25rem;
  border-bottom: 1.6rem solid #ffd729;
  border-left: .5rem solid transparent;
  border-right: .5rem solid transparent;
  -webkit-transform: rotate(107deg);
  transform: rotate(107deg);
  z-index: 3;
}
.flowerpot-top:before{
  width: .25rem;
  height: 3rem;
  left: 1.1rem;
  top: -.6rem;
  border-radius: .25rem;
  background-color: #ef9f29;
  -webkit-transform: rotate(91deg);
  transform: rotate(91deg);
}
.flowerpot-top:after{
  width: .35rem;
  height: 2.5rem;
  left: 1.14rem;
  bottom: -1.2rem;
  border-radius: .1rem;
  background-color: #fff;
  -webkit-transform: rotate(91deg);
  transform: rotate(91deg);
}
.flowerpot-bottom{
  right: -.7rem;
  bottom: .298rem;
  width: 2.5rem;
  height: 0;
  border-top-left-radius: 1.3rem;
  border-bottom: 1.6rem solid #ffd729;
  border-left: .5rem solid transparent;
  border-right: .2rem solid transparent;
  -webkit-transform: rotate(107deg);
  transform: rotate(107deg);
}
/*小花*/
.flower{
  width: 2rem;
  height: 4rem;
  top: 0;
  left: 1.5rem;
  -webkit-animation:rock 3s ease-in infinite;
}
.flower>div{ position: absolute; }
.flower-top{
  left: 0;
  width: 2rem;
  height: 2rem;
  z-index: 2;
}
.flower-top:before{
  width: .5rem;
  height: .5rem;
  background-color: #fae134;
  border-radius: .5rem;
  top: 50%;
  left: 50%;
  margin: -.25rem 0 0 -.25rem;
  z-index: 2
}
.flower-top p{
  position: absolute;
  top: 50%;
  margin-top: -.15rem;
  width: 2rem;
  height: .3rem;
  background-color: #fff;
  border-radius: .4rem;
}
.flower-top p:nth-child(2){
  transform: rotate(45deg);
  transform-origin:50% 50%;/*定义动画的旋转中心点*/
}
.flower-top p:nth-child(3){
  transform: rotate(90deg);
  transform-origin:50% 50%;/*定义动画的旋转中心点*/
}
.flower-top p:nth-child(4){
  transform: rotate(135deg);
  transform-origin:50% 50%;/*定义动画的旋转中心点*/
}
.flower-head {
  bottom: 0;
  left: .5rem;
  width: 1rem;
  height: 3rem;
  border: 3px solid #60ae34;
  border-radius: 100% 0 0 100%/50%;
  border-right: none;
}
.flower-head:after{
  bottom: 1rem;
  left: -.55rem;
  width: 0;
  height: 0;
  border-left: .25rem solid transparent;
  border-right: 0rem solid transparent;
  border-bottom: .7rem solid #64b033;
  transform: skewX(45deg);
}
.flower-head:before{
  bottom: 1.3rem;
  left: 0;
  width: 0;
  height: 0;
  border-left: .3rem solid transparent;
  border-right: 0rem solid transparent;
  border-bottom: .4rem solid #64b033;
  transform: skewX(-45deg);
}
/*蜜蜂*/
.bee{
  width: 1.5rem;
  height: .8rem;
  will-change: transform;
  -webkit-animation:bee1 6s ease-in infinite;
  z-index: 5;
}
.bee-2{
  right: 0;
  will-change: transform;
  -webkit-animation:bee2 5s ease-in infinite;
}
.bee>div{ position: absolute; }
.bee:before,.bee:after{
  top: 50%;
  right: .45rem;
  width: .1rem;
  height: .1rem;
  border-radius: .1rem;
  background-color: #feca21;
  margin-top: -.05rem;
}
.bee:before{
  right: .7rem;
  z-index: 5;
}
.bee-body,.bee-body:before,.bee-body:after{
  left: 0;
  width: .6rem;
  height: .6rem;
  border-radius: .6rem;
  background-color: #442418;
}
.bee-body:before{
  left: .2rem;
  background-color: #feca21;
}
.bee-body:after{
  left: .5rem;
  background-color: #442418;
}
/*动画*/
.infinite{-webkit-animation-iteration-count: infinite;}
@-webkit-keyframes greenpulse {
  from { -webkit-box-shadow: 0 0 18px #f1ff93; }
  50% { -webkit-box-shadow: 0 0 36px rgba(205,229,41,.5); }
  to { -webkit-box-shadow: 0 0 18px #f1ff93; }
}
@-webkit-keyframes cloud {
  0% { left:-30%; }
  50% { left:120%; }
  100% { left:-30%; }
}
@-webkit-keyframes cloudx2 {
  0% { right:-30%; }
  50% { right:130%; }
  100% { right:-30%; }
}
@-webkit-keyframes cloudx3 {
  0% { left:-50%; }
  50% { left:150%; }
  100% { left:-50%; }
}
@-webkit-keyframes rotate {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@-webkit-keyframes rock {
  0% { transform: rotate(-5deg) translate3d(0, 0, 0);}
  50% { transform: rotate(5deg) translate3d(30%, 0, 0);}
  100% { transform: rotate(-5deg) translate3d(0, 0, 0);}
}
@-webkit-keyframes bee1 {
  0% { transform: rotateY(0deg) translate3d(0, 0, 0);}
  25% { transform: rotateY(0deg) translate3d(50%, 100%, 0);}
  49.9% { transform: rotateY(0deg) translate3d(100%, 0, 0);}
  50% { transform: rotateY(180deg) translate3d(-100%, 0, 0);}
  75% { transform: rotateY(180deg) translate3d(-50%, -100%, 0);}
  99.9% { transform: rotateY(180deg) translate3d(0, 0, 0);}
  100% { transform: rotateY(0deg) translate3d(0, 0, 0);}
}
@-webkit-keyframes bee2 {
  0% { transform: rotateY(180deg) translate3d(0, 0, 0);}
  25% { transform: rotateY(180deg) translate3d(50%, 80%, 0);}
  49.9% { transform: rotateY(180deg) translate3d(80%, 0, 0);}
  50% { transform: rotateY(0deg) translate3d(-80%, 0, 0);}
  75% { transform: rotateY(0deg) translate3d(-50%, -80%, 0);}
  99.9% { transform: rotateY(0deg) translate3d(0, 0, 0);}
  100% { transform: rotateY(180deg) translate3d(0, 0, 0);}
}
@-webkit-keyframes eye {
  0% { transform: translate3d(0, 0, 0);}
  40% { transform: translate3d(0, 0, 0);}
  50% { transform: translate3d(0, 60%, 0);}
  60% { transform: translate3d(0, 0, 0);}
  100% { transform: translate3d(0, 0, 0);}
}
@-webkit-keyframes blusher {
  0% { transform: scale(1);}
  25% { transform: scale(.9);}
  50% { transform: scale(1);}
  75% { transform: scale(.9);}
  100% { transform: scale(1);}
}
@-webkit-keyframes mouth {
  0% { transform: rotate(45deg) scale(1,1);}
  50% { transform: rotate(45deg) scale(1.2,1.2);}
  100% { transform: rotate(45deg) scale(1,1);}
}
@-webkit-keyframes mouthspan {
  0% { 
    left: 0;
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent;
  }
  50% { 
    left: .1rem;
    border-left: .3rem solid transparent;
    border-right: .3rem solid transparent;
  }
  100% { 
    left: 0;
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent;
  }
}
@-webkit-keyframes mouthp {
  0% { 
    left: 0;
    width: .7rem;
    height: 0.1rem;
  }
  50% { 
    left: .1rem;
    width: .55rem;
    height: 0.14rem;
    margin-top: -.07rem;
  }
  100% { 
    left: 0;
    width: .7rem;
    height: 0.1rem;
  }
}
@-webkit-keyframes wingright{
  0% { transform: rotate(0deg) translate3d(0, 0, 0); }
  25% { transform: rotate(-2deg) translate3d(1.5%, 1%, 0); }
  50% { transform: rotate(0deg) translate3d(0, 0, 0); }
  75% { transform: rotate(-2deg) translate3d(1.5%, 1%, 0); }
  100% { transform: rotate(0deg) translate3d(0, 0, 0); }
}
@-webkit-keyframes arm{
  0% { transform: translate3d(5%, 10%, 0);}
  25% { transform: translate3d(10%, 12%, 0);}
  50% { transform: translate3d(5%, 10%, 0);}
  75% { transform: translate3d(10%, 12%, 0);}
  100% { transform: translate3d(5%, 10%, 0);}
}
@-webkit-keyframes chickbody{
  0% { height: 8.6rem; border-radius: 66% 66% 66% 66% / 80% 80% 50% 50%;}
  25% { height: 8.7rem; border-radius: 66% 66% 66% 66% / 75% 75% 50% 50%;}
  50% { height: 8.6rem; border-radius: 66% 66% 66% 66% / 80% 80% 50% 50%;}
  75% { height: 8.7rem; border-radius: 66% 66% 66% 66% / 75% 75% 50% 50%;}
  100% { height: 8.6rem; border-radius: 66% 66% 66% 66% / 80% 80% 50% 50%;}
}
@-webkit-keyframes chickbody-before{
  0% { height: 8.2rem; border-radius: 66% 66% 66% 66% / 80% 80% 50% 50%;}
  25% { height: 8.3rem; border-radius: 66% 66% 66% 66% / 75% 75% 50% 50%;}
  50% { height: 8.2rem; border-radius: 66% 66% 66% 66% / 80% 80% 50% 50%;}
  75% { height: 8.3rem; border-radius: 66% 66% 66% 66% / 75% 75% 50% 50%;}
  100% { height: 8.2rem; border-radius: 66% 66% 66% 66% / 80% 80% 50% 50%;}
}
@-webkit-keyframes food-p{
  0% { opacity: 1;}
  25% {opacity: 0;}
  50% { opacity: 1;}
  75% {opacity: 0;}
  100% { opacity: 1;}
}
@-webkit-keyframes dot-1{
  0% { transform: translate3d(50%, -70%, 0);}
  25% { transform: translate3d(50%, -170%, 0);}
  50% { transform: translate3d(100%, -270%, 0);}
  75% { transform: translate3d(100%, -370%, 0);}
  100% { transform: translate3d(100%, -470%, 0);}
}
@-webkit-keyframes face{
  0% { transform: scale(1,1) translate3d(5%, 10%, 0);}
  25% { transform: scale(1.1,1.1) translate3d(10%, 12%, 0);}
  50% { transform: scale(1,1) translate3d(5%, 10%, 0);}
  75% { transform: scale(1.1,1.1) translate3d(10%, 12%, 0);}
  100% { transform: scale(1,1) translate3d(5%, 10%, 0);}
}
@-webkit-keyframes sunlight-1{
  0% { opacity: 0;}
  50% { opacity: .15;}
  100% { opacity: 0;}
}
@-webkit-keyframes sunlight-2{
  0% { opacity: 0;}
  50% { opacity: .1;}
  100% { opacity: 0;}
}
@-webkit-keyframes sunlight-3{
  0% { opacity: 0;}
  50% { opacity: .08;}
  100% { opacity: 0;}
}
@-webkit-keyframes pic{
  0% { transform: scale(.8,.8)}
  25% {transform: scale(1,1)}
  50% { transform: scale(.8,.8)}
  75% {transform: scale(1,1)}
  100% { transform: scale(.8,.8)}
}
</style>
<script>
export default {
	data () {
		return {
			}
		},
	mounted () {
		setTimeout(() => {
			// document.getElementsByClassName('loading')[0].style.display = 'none'
		}, 2000)
	}
}
</script>