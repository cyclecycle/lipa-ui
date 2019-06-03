import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/patterns',
      name: 'patterns',
      component: () => import('./views/PatternsView.vue'),
      props: (route) => {
        return {
          highlightPatternId: Number(route.query.highlight_pattern_id)
        }
      },
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import('./views/MatchesView.vue'),
    },
    {
      path: '/document',
      name: 'document',
      component: () => import('./views/DocumentView.vue'),
      // props: (route) => {
      //   return {
      //     documentId: Number(route.query.doc_id)
      //   }
      // },
    },
    {
      path: '/role-label',
      name: 'role-labelling-view',
      component: () => import('./views/RoleLabellingView.vue'),
      props: (route) => {
        return {
          sentenceId: Number(route.query.sent_id)
        }
      },
    },
  ]
})
