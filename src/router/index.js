import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '../plugins/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: ()=> import('../views/SobreNosotros.vue'),
  },
  {
    path: '/arma-tu-cotizacion',
    name: 'Cotizacion',
    component: ()=> import('../views/Cotizacion.vue'),
  },
  {
    path: '/colabora-con-nosotros',
    name: "Colabora",
    component: ()=> import('../views/ColaboraNosotros.vue'),
  },
  {
    path: '/iniciar-sesion',
    name: 'Sesion',
    component: ()=> import('../views/IniciarSesion.vue'),
  },
  {
    path: '/sobre-nosotros',
    name: "Nosotros",
    component: ()=> import('../views/SobreNosotros.vue'),
  },
  {
    path: '/admin',
    name: "Admin",
    component: ()=> import('../views/Admin.vue'),
    meta:{
      requieresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(ruta => ruta.meta.requieresAuth)){
    const user = firebase.auth().currentUser;
    if(user){
      next();
    }else{
      next({
        name : 'Sesion'
      })
    }
  }else{
    next();
  }
})

export default router
