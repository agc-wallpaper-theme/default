import _ from 'lodash'

export default async function({ store, params, error, route, redirect }) {
  let user = store.state.user
  if (_.isEmpty(user) || !_.isEqual(user.username, params.user_id)) {
    if (!_.isEmpty(store.state.users)) {
      user = _.find(store.state.users, ['username', params.user_id])
      if (user) {
        return store.commit('setUser', user)
      }
    }
    try {
      const users = await store.dispatch('fetchUsers')
      store.commit('setUsers', users)
      user = _.find(users, ['username', params.user_id])
      if (user) {
        return store.commit('setUser', user)
      }
    } catch (e) {
      return error({ statusCode: 404, message: 'Resource not found' })
    }
  }
}
