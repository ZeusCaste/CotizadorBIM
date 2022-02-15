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
    path: '/acceso-cuenta',
    name: 'Sesion',
    component: ()=> import('../views/AccountAccess.vue'),
  },
  {
    path: '/sobre-nosotros',
    name: "Nosotros",
    component: ()=> import('../views/SobreNosotros.vue'),
  },
  {
    path: '/admin-session',
    name: "AdminSession",
    component: ()=> import('../views/AdminSession.vue'),
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
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        next();
      }
      else{
        next({
          name : 'Sesion'
        })
      }
    });
  }else{
    next();
  }
})

export default router
