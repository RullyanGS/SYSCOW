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

Vue.use(VueRouter)

const routes = [{
    name:  'home',
    path: '/',
    component: Home
}, {
    name: 'animais',
    path: '/animais',
    component: Animais
}, {
    name: 'pesagem',
    path: '/pesagem',
    component: Pesagem
}, {
    name: 'descarte',
    path: '/descarte',
    component: Descarte
}, {
    name: 'vacinacao',
    path: '/vacinacao',
    component: Vacinacao
}, {
    name: 'consulta',
    path: '/consulta',
    component: Consulta
}, {
    name: 'evento',
    path: '/evento',
    component: Evento
}, {
    name: 'ordenhadiaria',
    path: '/ordenhadiaria',
    component: Ordenhadiaria
}, {
    name: 'relatorios',
    path: '/relatorios',
    component: Relatorios
}]

export default new VueRouter({
    mode: 'history',
    routes: routes
})