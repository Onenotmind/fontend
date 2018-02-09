<template>
	<div id="loginService">
		<!-- <component :is="currentView" /> -->
		<login v-show="currentView === 'login'" />
		<register v-show="currentView === 'register'" />
		<resetPass v-show="currentView === 'resetPass'" />
	</div>
</template>
<style>
	
</style>
<script>
import login from './login/login.vue'
import register from './login/register.vue'
import resetPass from './login/resetPass.vue'
export default {
	data () {
		return {
			currentView: 'login'
		}
	},
	components: {
		login,
		register,
		resetPass
	}
}
</script>