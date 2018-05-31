import _ from 'lodash'
import * as mutTypes from '../mutation-types.js'

const state = {
	userAddr: '',
	curLang: 'cn'
}

const actions = {
	changeUserAddr ({ commit }, payload) {
		commit(mutTypes.CHANGE_USERADDR, payload)
	},

	changeLanguage ({ commit }, payload) {
		commit(mutTypes.CHANGE_LANGUAGE, payload)
	}
}

const mutations = {
	[mutTypes.CHANGE_USERADDR] (state, { addr }) {
		state.userAddr = addr
	},

	[mutTypes.CHANGE_LANGUAGE] (state, { lang }) {
		state.curLang = lang
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