import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

import * as actionTypes from './action-types'

Vue.use(Vuex)

const actions = {
  [actionTypes.ADD] ({commit}, achievement) {
    commit('add', achievement)
  },
  [actionTypes.CLICK] ({commit}, achievement) {
    achievement.logs.push(new Date().getTime())
    commit('edit', achievement)
  },
  [actionTypes.EDIT] ({commit}, achievement) {
    commit('edit', achievement)
  },
  [actionTypes.EMPTY] ({commit}) {
    commit('empty')
  },
  [actionTypes.REMOVE] ({commit}, id) {
    commit('remove', id)
  },
  [actionTypes.RESTART] ({commit}, achievement) {
    achievement.logs = []
    commit('edit', achievement)
  },
  [actionTypes.SET] ({commit}, id) {
    commit('set', id)
  }
}

const mutations = {
  add (state, data) {
    console.log('Adding', data)
    if (data.id) {
      throw new Error('Cannot add, because the data includes an id', data)
    }
    data.id = new Date().getTime()
    state.achievements.push(data)
  },
  edit (state, data) {
    console.log('Editing', data)
    const achievement = state.achievements.find((elem) => elem.id === data.id)
    if (!achievement) {
      throw new Error('Cannot edit, because the achievement does not exist', achievement)
    }
    Object.assign(achievement, data)
  },
  empty (state) {
    console.log('Setting an empty achievement')
    // Assign a copy in order to ensure that mutation watchers are called, even in cases where the previous value was
    // already `emptyAchievement`.
    state.achievement = JSON.parse(JSON.stringify(emptyAchievement))
  },
  remove (state, id) {
    console.log('Removing id', id)
    const idx = state.achievements.findIndex((elem) => elem.id === id)
    if (idx === -1) {
      throw new Error('Cannot remove, because the achievement cannot be found:', id)
    }
    state.achievements.splice(idx, 1)
  },
  set (state, id) {
    console.log('Setting id', id)
    const achievement = state.achievements.find((elem) => elem.id === id)
    if (!achievement) {
      throw new Error('Cannot set, because the achievement cannot be found', id)
    }
    // Assign a copy in order to ensure that mutation watchers are called, even in cases where the previous value was
    // already the same achievement
    state.achievement = JSON.parse(JSON.stringify(achievement))
  }
}

const emptyAchievement = {
  id: null,
  name: '',
  daysInARow: null,
  numberOfClicks: null,
  goalType: null,  // DAYS_IN_A_ROW or NUMBER_OF_CLICKS
  logs: []
}

const state = {
  achievement: emptyAchievement,
  achievements: []
}

export default new Vuex.Store({
  plugins: [createPersist({
    namespace: 'achievements',
    initialState: state
  })],
  actions,
  mutations,
  state
})
