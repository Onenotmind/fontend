import _ from 'lodash'
import * as mutTypes from '../mutation-types.js'

const state = {
	userAddr: ''
}

const actions = {
	changeUserAddr ({ commit }, payload) {
		commit(mutTypes.CHANGE_USERADDR, payload)
	}
}

const mutations = {
	[mutTypes.CHANGE_USERADDR] (state, { addr }) {
		state.userAddr = addr
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