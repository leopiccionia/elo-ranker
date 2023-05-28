import { createRouter, createWebHashHistory } from 'vue-router'

import Facade from './components/Facade.vue'
import Match from './components/Match.vue'
import Ranking from './components/Ranking.vue'
import { useStore } from './store'

const router = createRouter({
  history: createWebHashHistory('elo-ranker'),
  routes: [
    { name: 'root', path: '/', redirect: '/facade' },
    { name: 'facade', path: '/facade', component: Facade },
    { name: 'match', path: '/match', component: Match },
    { name: 'ranking', path: '/ranking', component: Ranking },
  ],
})

router.beforeEach((to) => {
  const store = useStore()

  if (to.name !== 'facade' && !store.setup) {
    return { name: 'facade' }
  }
})

export { router }
