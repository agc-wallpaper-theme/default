import _ from 'lodash'

export default async function({ store, error }) {
  if (_.isEmpty(store.state.keyword)) {
    try {
      const keyword = await store.dispatch('fetchKeyword')
      store.commit('setKeyword', keyword)
    } catch (e) {
      // error({ statusCode: 500, message: 'Resource not found' })
    }
  }
  if (_.isEmpty(store.state.terms)) {
    try {
      const terms = await store.dispatch('fetchTerms')
      store.commit('setTerms', terms)
    } catch (e) {
      // error({ statusCode: 500, message: 'Resource not found' })
    }
  }
}
