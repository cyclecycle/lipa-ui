import Vue from 'vue'
import Router from 'vue-router'
import DocumentView from './views/DocumentView.vue'
import RoleLabellingView from './views/RoleLabellingView.vue'
import PatternsView from './views/RoleLabellingView.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/document',
      name: 'document',
      component: () => import('./views/DocumentView.vue'),
      props: (route) => {
        return {
          documentId: Number(route.query.doc_id)
        }
      },
    },
    {
      path: '/patterns',
      name: 'patterns',
      component: () => import('./views/PatternsView.vue'),
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
