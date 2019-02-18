import _ from 'lodash'

export const state = () => ({
  site: {
    title: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION
  },
  keyword: {},
  users: [],
  terms: [],
  user: {}
})

export const getters = {
  keyword: state => state.keyword
}

export const mutations = {
  setKeyword(state, keyword) {
    state.keyword = keyword
    if (keyword.results) {
      const users = _.map(keyword.results, function(u) {
        return u.user
      })
      state.users = _.uniqBy(users, 'username')
    }
  },
  setUsers(state, users) {
    state.users = users
  },
  setTerms(state, terms) {
    state.terms = terms
  },
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  fetchKeyword({ commit }, slug = '') {
    return this.$axios.$get(`/api/keyword/${slug}`)
  },
  fetchUsers({ commit }) {
    return this.$axios.$get(`/api/users`)
  },
  fetchTerms({ commit }) {
    return this.$axios.$get(`/api/terms`)
  }
}
