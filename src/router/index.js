import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from '../plugins/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('../views/AboutUs.vue'),
  },
  {
    path: '/create-quotation',
    name: 'CreateQuotation',
    component: ()=> import('../views/Quotations.vue'),
  },
  {
    path: '/collaborate-with-us',
    name: "CollaborateWIthUs",
    component: ()=> import('../views/CollaborateWithUs.vue'),
  },
  {
    path: '/account-access',
    name: 'AccountAccess',
    component: ()=> import('../views/AccountAccess.vue'),
  },
  {
    path: '/about-us',
    name: "AboutUs",
    component: ()=> import('../views/AboutUs.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    component: ()=> import('../views/Account.vue'),
    children: [
      {
        path: 'admin-session',
        name: "AdminSession",
        component: ()=> import('../views/AdminSession.vue'),
        meta:{
          requieresAuth: true
        }
      },
      {
        path: 'user-filters',
        name: "UserFilters",
        component: ()=> import('../views/UserFilters.vue'),
        meta:{
          requieresAuth: true
        }
      },
      {
        path: 'partner-session',
        name: "partnerSession",
        component: ()=> import('../views/PartnerSession.vue'),
        meta: {
          requieresAuth: true
        }
      },
      {
        path: 'customer-session',
        name: "customerSession",
        component: ()=> import('../views/CustomerSession.vue'),
        meta: {
          requieresAuth: true
        }
      },
    ]
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
      if(user) next();
      else next({ name : 'AccountAccess' })
    });
  }
  else{
    next();
  }
})

export default router
