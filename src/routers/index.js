import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home/main.vue'
import Task from 'components/task/main.vue'

import store from 'store'

Vue.use(Router)


let protectedRoute = (to, from, next) => {
    const auth = store.state.auth.user

    if(!auth.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
}


/*
* Prevent redirecting on login/registration page if there's existing session
*/
let hasExistingSession = (to, from, next) => {

  const auth = store.state.auth.user

  if(auth.token) {
    next({
      path: '/tasks',
    })
  } else {
    next()
  }

}

const router = new Router({
  mode:'history',
  routes: [
    { path: '', component: Home, beforeEnter: hasExistingSession},
    { path: '/login', component: Home, beforeEnter: hasExistingSession},
    { path: '/tasks', component: Task, beforeEnter: protectedRoute }
  ]
})

export default router