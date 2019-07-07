import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Overview',
      component: () => import('./views/Overview.vue'),
      redirect: '/patterns'
    },
    {
      path: '/documents',
      name: 'DocumentsView',
      component: () => import('./views/DocumentsView.vue'),
    },
    {
      path: '/sentences',
      name: 'SentencesView',
      component: () => import('./views/SentencesView.vue'),
    },
    {
      path: '/patterns',
      name: 'patterns-view',
      component: () => import('./views/PatternsView.vue'),
      props: (route) => {
        return {
          highlightPatternId: Number(route.query.highlight_pattern_id)
        }
      },
    },
    {
      path: '/matches',
      name: 'matches-view',
      component: () => import('./views/MatchesView.vue'),
      props: (route) => {
        return {
          patternId: Number(route.query.pattern_id)
        }
      },
    },
    {
      path: '/document',
      name: 'document-view',
      component: () => import('./views/DocumentView.vue'),
      props: (route) => {
        return {
          documentId: Number(route.query.id)
        }
      },
    },
    {
      path: '/create-training-example',
      name: 'CreateTrainingExampleView',
      component: () => import('./views/CreateTrainingExampleView.vue'),
      props: (route) => {
        return {
          sentenceId: Number(route.query.sent_id)
        }
      },
    },
    {
      path: '/calculate-pattern',
      name: 'calculate-pattern-view',
      component: () => import('./views/CalculatePatternView.vue'),
      props: (route) => {
        return {
          posMatchId: Number(route.query.pos_match_id)
        }
      },
    },
    {
      path: '/import_docs',
      name: 'import-docs-view',
      component: () => import('./views/ImportDocsView.vue'),
    },
    {
      path: '/user_guide',
      name: 'user-guide-view',
      component: () => import('./views/UserGuideView.vue'),
    },
    {
      path: '/visualise',
      name: 'visualise-view',
      component: () => import('./views/VisualiseView.vue'),
      props: (route) => {
        return {
          patternId: Number(route.query.pattern_id),
          sentenceId: Number(route.query.sentence_id),
          matchId: Number(route.query.match_id),
        }
      },
    },
  ]
})
