import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    edificacionOptions: [
      {id: 1, text: "Vivienda Familiar", value: "Vivienda Familiar"},
      {id: 2, text: "Vivienda Adosada", value: "Vivienda Adosada"},
      {id: 3, text: "Vivienda Multifamiliar", value: "Vivienda Multifamiliar"},
      {id: 4, text: "Vivienda Residencial", value: "Vivienda Residencial"},
      {id: 5, text: "Oficinas y Locales", value: "Oficinas y Locales"},
      {id: 6, text: "Comercial", value: "Comercial"},
      {id: 7, text: "Administrativo", value: "Administrativo"},
      {id: 8, text: "Estacionamientos", value: "Estacionamientos"},
      {id: 9, text: "Pública concurrencia", value: "Pública concurrencia"},
      {id: 10, text: "Docencia", value: "Docencia"},
      {id: 11, text: "Salud", value: "Salud"},
      {id: 12, text: "Industrial", value: "Industrial"},
    ],
    proyectos_estudiosOptions: [
      {id: 1, text: "Arquitectura", value: "Arquitectura"},
      {id: 2, text: "Instalación hidrosanitaria", value: "Instalación hidrosanitaria"},
      {id: 3, text: "Instalación Eléctrica", value: "Instalación Eléctrica"},
      {id: 4, text: "Aire acondicionado sin balance térmico", value: "Aire acondicionado sin balance térmico"},
      {id: 5, text: "Aire acondicionado con balance térmico", value: "Aire acondicionado con balance térmico"},
      {id: 6, text: "Ventilación y Extracción", value: "Ventilación y Extracción"},
      {id: 7, text: "Voz y Datos", value: "Voz y Datos"},
    ],
    accesibilidadOptions: [
      {id: 1, text: "Muy buena", value: "muy_buena"},
      {id: 2, text: "Buena", value: "buena"},
      {id: 3, text: "Normal", value: "normal"},
      {id: 4, text: "Dificil", value: "dificil"},
      {id: 5, text: "Muy dificil", value: "muy_dificil"},
    ],
    topografiaOptions: [
      {id: 1, text: "Plana", value: 'plana'},
      {id: 2, text: "Con desnivel minimo", value: 'desnivel_minimo'},
      {id: 3, text: "Con desnivel pronunciado", value: 'desnivel_pronunciado'},
      {id: 4, text: "Accidentada", value: 'accidentada'},
      {id: 5, text: "Muy accidentada", value: 'muy_accidentada'},
    ],
    ubicacionOptions: [
      {id: 1, text: "Entre colindancias", value: 'entre_colindancias'},
      {id: 2, text: "En esquina", value: 'en_esquina'},
      {id: 3, text: "Aislada", value: 'aislada'},
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
