<template v-if="esAdmin || esUsuario">
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="logueado"
    >
      <v-list dense>
            <template>
          <v-list-item :to="{name: 'Home'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>

          <template >
              <v-list-group>
                    <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Consulta Empleados
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <v-list-item :to="{name: 'empleado'}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Empleados
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
              </v-list-group>
          </template>
        <template v-if="esAdmin">
                <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Listas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{name: 'categoria'}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Area
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to="{name: ''}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Subarea
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Registro Empleados</span>
      </v-toolbar-title>      
      <v-spacer></v-spacer>
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon large
      color="orange darken-2">mdi-call-split</v-icon>Salir
      </v-btn>
       <v-btn :to="{name: 'login'}" icon v-else>
        <v-icon>apps</v-icon> Login
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              William Sorto &copy;2021
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: true
    }
  },
  computed: {
    logueado(){
      return this.$store.state.usuario;
    },
    esAdmin(){
      return this.$store.state.usuario && this.$store.state.rol== 'Admin';
    },
    esUsuario(){
       return this.$store.state.usuario && this.$store.state.rol== 'Usuario';
    }
  },
  created(){  
    this.$store.dispatch("autoLogin")
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
    }
  }

};
</script>
