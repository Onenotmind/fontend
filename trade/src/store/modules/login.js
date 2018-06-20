import _ from 'lodash'
import * as mutTypes from '../mutation-types.js'

const state = {
	userAddr: '', // 用户addr
	curLang: 'cn', // 当前语言
	userBamboo: 0 // 用户竹子量
}

const actions = {
	changeUserAddr ({ commit }, payload) {
		commit(mutTypes.CHANGE_USERADDR, payload)
	},

	changeLanguage ({ commit }, payload) {
		commit(mutTypes.CHANGE_LANGUAGE, payload)
	},

	changeBambooCount ({ commit }, payload) {
		commit(mutTypes.CHANGE_BAMBOO_COUNT, payload)
	}
}

const mutations = {
	[mutTypes.CHANGE_USERADDR] (state, { addr }) {
		state.userAddr = addr
	},

	[mutTypes.CHANGE_LANGUAGE] (state, { lang }) {
		state.curLang = lang
	},

	[mutTypes.CHANGE_BAMBOO_COUNT] (state, { count }) {
		state.userBamboo = count
	}
}

const getters = {
}

export default {
  getters,
  state,
  actions,
  mutations
}