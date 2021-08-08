import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Empleado from '../components/Empleado.vue';
import Login from '../components/Login.vue';
import store from '../store/index';

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      libre: true,
      
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      Admin: true,
      Usuario: true
    }
  },
  {
    path: '/empleado',
    name: 'empleado',
    component: Empleado,
    meta:{
      Admin: true,
      Usuario: true
    }
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.libre)){
    next()
  }
  else if (store.state.usuario && store.state.usuario.rol=='Admin'){
    if(to.matched.some(record => record.meta.Admin)){
      next();
    }
  }
  else if (store.state.usuario && store.state.usuario.rol=='Usuario'){
    if(to.matched.some(record => record.meta.Usuario)){
      next();
    }
  }
  else{
    next({name: 'Login'});
  }
  
})
export default router
