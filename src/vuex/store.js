import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  },
  mutations: {
    setUserData (state, data) {
      state.user = data
      localStorage.setItem('user', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },
    clearUserData (state) {
      localStorage.removeItem('user')
      location.reload() // forcing a refresh, we clear state and axios headers. This is a more scalable solution
    }
  },
  actions: {
    register ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          commit('setUserData', data)
        })
    },
    login ({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('setUserData', data)
        })
    },
    logout ({ commit }) {
      commit('clearUserData')
    }
  }
})
