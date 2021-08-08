<template>
<v-layout align-start>
  <v-flex>
    <v-card>
      <v-card-title>
        Empleados
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Busqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{‌{ formTitle }}</span>
            </v-card-title>
 
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="nombres"
                      label="Nombres"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="apellidos"
                      label="Apellidos"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="12" >
                  <v-select :items="items" v-model="tipo_documento" label="Tipo_Documento"></v-select>
                  </v-col>
                   <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="numero_documento"
                      label="Numero_Documento"
                      :rules="{
                          required: true,
                          digits: 10,
                          regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
                        }"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="telefono"
                      label="Telefono"
                      :rules="{
                          required: true,
                          digits: 10,
                          regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
                        }"
                    ></v-text-field>
                  </v-col>
                     <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="email"
                      label="Email"
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                     <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="cargo"
                      label="Cargo"
                    ></v-text-field>
                  </v-col>
                     <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="area"
                      label="Area"
                    ></v-text-field>
                  </v-col>
                     <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="subarea"
                      label="SubArea"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="12" md="12" v-show="valida">
                       <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">

                       </div>
                   </v-col>
                  <!-- <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>
 
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardar"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Estas seguro que quieres eliminar?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="borrar">Confirmar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="empleados"
        :search="search"
        class="elevation-1"
      >
        <!-- <template v-slot:[`item.estado`]="{ item }">
          <v-chip
            :color="getColor(item.estado)"
            dark
          >
            <div v-if="item.estado"><span> Activo</span></div>
            <div v-else><span> Inactivo</span></div>
          </v-chip>
        </template> -->
        <template v-slot:[`item.acciones`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
           edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
           delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="listar()"
          >
            Resetear
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</v-layout>
 
</template>
 
<script>
import axios from 'axios'
// import { required, digits, email, max, regex } from 'vee-validate/dist/rules'

// extend('digits', {
//     ...digits,
//     message: '{_field_} needs to be {length} digits. ({_value_})',
//   })

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search:'',
    empleados:[],
    headers: [
     
      { text: 'Nombres', value: 'nombres', sortable: true },
      { text: 'Apellidos', value: 'apellidos', sortable: true },
      { text: 'Tipo_Documento', value: 'tipo_documento', sortable: false },
      { text: 'Numero_Documento', value: 'numero_documento', sortable: false },
      { text: 'Email', value: 'email', sortable: false },
      { text: 'Telefono', value: 'telefono', sortable: false },
      { text: 'Cargo', value: 'cargo', sortable: false },
      { text: 'Area', value: 'area', sortable: false },
      { text: 'Subarea', value: 'subarea', sortable: false },
      { text: 'Acciones', value: 'acciones', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    _id:'',
    nombres:'',
    apellidos:'',
    tipo_documento:'',
    numero_documento:'',
    telefono:'',
    email:'',
    cargo:'',
    area:'',
    subarea:'',
    valida:0,
    validaMensaje:[],
    items: ['DUI', 'Pasaporte', 'Otro'],
    emailRules: [
        v => !!v || 'Email es requerido',
        v => /.+@.+/.test(v) || 'Ingrese Email valido',
      ],
   
  }),
 
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
    }
  },
 
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
 
  created () {
    this.listar()
  },
 
  methods: {
    getColor (estado) {
      if (estado) {
        return 'green'
      } else {
        return 'red'
      }
    },
    listar () {
      let me = this;
      let header={"Token" : this.$store.state.token};
      let configuracion= {headers: header};
      axios.get('empleados', configuracion)
      .then(function(response){
        //console.log(response);
        me.empleados=response.data;
      })
      .catch(function(error){
        console.log(error);
      })
    },
    limpiar(){
        this._id='';
        this.nombres='';
        this.apellidos='';
        this.tipo_documento='';
        this.numero_documento='';
        this.telefono='';
        this.email='';
        this.cargo='';
        this.area='';
        this.subarea='';
        this.valida=0;
        this.validaMensaje=[];
        this.editedIndex=-1;
    },
    validar(){
        this.valida=0;
        this.validaMensaje=[];
        if(this.nombres.length<1 || this.nombres.length>60){
            this.validaMensaje.push('El Nombre de empleado debe tener entre 1-60 caracteres')
        }
         if(this.apellidos.length<1 || this.apellidos.length>60){
            this.validaMensaje.push('El Apellido de empleado debe tener entre 1-60 caracteres')
        }
        if(this.validaMensaje.length){
            this.valida=1
        }
        return this.valida;
    },
    guardar(){
        let me= this;
        let header={"Token" : this.$store.state.token};
         let configuracion= {headers: header};
        if(this.validar()){ return; }
        if(this.editedIndex >-1){
            //axios.put('empleados/:idEmpleado', )
            axios.put(`/empleados/${this._id}`, {
                'nombres': this.nombres,
                'apellidos': this.apellidos,
                'tipo_documento': this.tipo_documento,
                'numero_documento': this.numero_documento,
                'telefono': this.telefono,
                'email': this.email,
                'cargo': this.cargo,
                'area': this.area,
                'subarea': this.subarea
            }, configuracion)
            .then(function(response){
                me.limpiar();
                me.close();
                me.listar();
            })
            .catch(function(error){
                console.log(error);
            })
        }   
        else{
            axios.post('/empleados', {
                'nombres': this.nombres,
                'apellidos': this.apellidos,
                'tipo_documento': this.tipo_documento,
                'numero_documento': this.numero_documento,
                'telefono': this.telefono,
                'email': this.email,
                'cargo': this.cargo,
                'area': this.area,
                'subarea': this.subarea
            }, configuracion)
            .then(function(response){
                me.limpiar();
                me.close();
                me.listar();
            })
            .catch(function(error){
                console.log(error);
            })
        }
    },
    borrar(){
         let me= this;
        // this.editedIndex =1
      //  this.dialogDelete=true;
       let header={"Token" : this.$store.state.token};
       let configuracion= {headers: header};
         axios.delete(`/empleados/${this._id}`, configuracion)
            .then(function(response){
              //  me.limpiar();
                me.closeDelete();
                me.listar();
            })
            .catch(function(error){
                console.log(error);
            })
    },

 
    editItem (item) {
      this._id=item._id;
       this.nombres=item.nombres;
       this.apellidos=item.apellidos;
        this.tipo_documento=item.tipo_documento;
        this.numero_documento=item.numero_documento;
        this.telefono=item.numero_documento;
        this.email=item.email;
        this.cargo=item.cargo;
        this.area=item.area;
        this.subarea=item.subarea
      this.dialog = true
      this.editedIndex=1;
    },
 
    deleteItem (item) {
    //    this.editedIndex = this.desserts.indexOf(item)
    //    this.editedItem = Object.assign({}, item)
     this._id=item._id;
    this.dialogDelete=true;  
     this.editedIndex=1;
    },
 
    deleteItemConfirm () {
    //   this.desserts.splice(this.editedIndex, 1)
   
    // borrar();
      this.closeDelete()
       this.dialogDelete = false
        this.editedIndex=1;
    },
 
    close () {
      this.dialog = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem)
    //     this.editedIndex = -1
    //   })
    },
 
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
 
 
  },
}
</script>