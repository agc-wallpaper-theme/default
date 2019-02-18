import _ from 'lodash'

export default async function({ store, params, error, route, redirect }) {
  let keyword = store.state.keyword
  if (_.isEmpty(keyword) || !_.isEqual(keyword.slug, params.keyword_slug)) {
    try {
      keyword = await store.dispatch('fetchKeyword', params.keyword_slug)
    } catch (e) {
      return error({ statusCode: 404, message: 'Resource not found' })
    }
  }
  let image = _.find(keyword.results, function(o) {
    return (
      _.isEqual(params.image_id, o.id) || _.isEqual(params.image_slug, o.slug)
    )
  })
  if (!image) {
    image = _.first(keyword.results)
    let routeUrl = route.fullPath
    routeUrl = _.replace(routeUrl, params.image_slug, image.slug)
    routeUrl = _.replace(routeUrl, params.image_id, image.id)
    return redirect(302, routeUrl)
  } else {
    store.commit('setKeyword', keyword)
  }
}
