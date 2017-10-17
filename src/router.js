import Vue from 'vue'
import Router from 'vue-router'
import List from './components/List'
import Form from './components/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'achievements',
      component: List,
      meta: {title: 'Click Your Achievements!'}
    },
    {
      path: '/add',
      name: 'add',
      component: Form,
      meta: {title: 'What do you want to achieve?'}
    },
    {
      path: '/edit/:id(\\d+)?',
      props: (route) => {
        return { id: parseInt(route.params.id) }
      },
      name: 'edit',
      component: Form,
      meta: {title: 'Edit your achievement'}
    }
  ]
})
