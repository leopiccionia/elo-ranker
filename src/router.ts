import { createRouter, createWebHashHistory } from 'vue-router'

import Facade from './components/Facade.vue'
import Match from './components/Match.vue'
import Ranking from './components/Ranking.vue'
import { useStore } from './store'
import { parseSetup } from './utils/setup'

const demos: Record<string, string> = {
  'estados-br': 'https://raw.githubusercontent.com/leopiccionia/elo-ranker/main/demos/estados-br.ini',
}

const router = createRouter({
  history: createWebHashHistory('elo-ranker'),
  routes: [
    { name: 'root', path: '/', redirect: '/facade' },
    { name: 'facade', path: '/facade', component: Facade },
    { name: 'match', path: '/match', component: Match },
    { name: 'ranking', path: '/ranking', component: Ranking },
    ...Object.keys(demos).map((demo) => ({ name: `demo:${demo}`, path: `/demo/${demo}`, component: Match, meta: { demo } })),
    { name: '404', path: '/:catchAll(.*)', redirect: '/facade' },
  ],
})

router.beforeEach(async (to) => {
  const store = useStore()

  if (to.meta.demo) {
    store.setup = await parseSetup(await fetch(demos[to.meta.demo as string]))
    return { name: 'match' }
  } else if (to.name !== 'facade' && !store.setup) {
    return { name: 'facade' }
  }
})

export { router }
