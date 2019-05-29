import Vue from 'vue'
import Router from 'vue-router'
import DocumentView from './views/DocumentView.vue'
import RoleLabellingView from './views/RoleLabellingView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/role-label',
      name: 'role-labelling-view',
      component: () => import(/* webpackChunkName: "about" */ './views/RoleLabellingView.vue'),
      props: (route) => {
        return {
          sentenceId: Number(route.query.sent_id)
        }
      }
    },
    {
      path: '/document',
      name: 'document',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/DocumentView.vue')
    }
  ]
})
