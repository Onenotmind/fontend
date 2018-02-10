<template>
	<div id="loginService">
		<!-- <component :is="currentView" /> -->
		<login v-show="currentView === 'login'" @show-register="showRegister" @show-resetPass="showResetPass" />
		<register v-show="currentView === 'register'" @show-login="showLogin" />
		<resetPass v-show="currentView === 'resetPass'" @show-login="showLogin" />
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
	methods: {
		showLogin () {
			this.currentView = 'login'
		},
		showRegister () {
			this.currentView = 'register'
		},
		showResetPass () {
			this.currentView = 'resetPass'
		}
	},
	components: {
		login,
		register,
		resetPass
	}
}
</script>