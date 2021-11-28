import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import Animais from '@/components/animais/Animais'
import Pesagem from '@/components/pesagem/Pesagem'
import Descarte from '@/components/descarte/Descarte'
import Vacinacao from '@/components/vacinacao/Vacinacao'
import Consulta from '@/components/consulta/Consulta'
import Evento from '@/components/evento/Evento'
import Ordenhadiaria from '@/components/ordenhadiaria/Ordenhadiaria'
import Relatorios from '@/components/relatorios/Relatorios'
import Login from '@/components/login/Login'
import auth from '@/auth'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: Login
}, {
    path: '/home',
    name:  'home',
    component: Home,
    beforeEnter: requireAuth
}, {
    path: '/animais',
    name: 'animais',
    component: Animais,
    beforeEnter: requireAuth
}, {
    path: '/pesagem',
    name: 'pesagem',
    component: Pesagem,
    beforeEnter: requireAuth
}, {
    path: '/descarte',
    name: 'descarte',
    component: Descarte,
    beforeEnter: requireAuth
}, {
    path: '/vacinacao',
    name: 'vacinacao',
    component: Vacinacao,
    beforeEnter: requireAuth
}, {
    path: '/consulta',
    name: 'consulta',
    component: Consulta,
    beforeEnter: requireAuth
}, {
    path: '/evento',
    name: 'evento',
    component: Evento,
    beforeEnter: requireAuth
}, {
    path: '/ordenhadiaria',
    name: 'ordenhadiaria',
    component: Ordenhadiaria,
    beforeEnter: requireAuth
}, {
    path: '/relatorios',
    name: 'relatorios',
    component: Relatorios,
    beforeEnter: requireAuth
}, {
    path: '/login', component: Login
}, {
    path: '/logout',
    beforeEnter (to, from, next) {
    auth.logout()
    next('/')
    }
}]

function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
  

export default new VueRouter({
    mode: 'history',
    routes: routes
})