import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../plugins/firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    edificacionOptions: [
      { id: 1, text: "Vivienda Familiar", value: "Vivienda Familiar" },
      { id: 2, text: "Vivienda Adosada", value: "Vivienda Adosada" },
      { id: 3, text: "Vivienda Multifamiliar", value: "Vivienda Multifamiliar" },
      { id: 4, text: "Vivienda Residencial", value: "Vivienda Residencial" },
      { id: 5, text: "Oficinas y Locales", value: "Oficinas y Locales" },
      { id: 6, text: "Comercial", value: "Comercial" },
      { id: 7, text: "Administrativo", value: "Administrativo" },
      { id: 8, text: "Estacionamientos", value: "Estacionamientos" },
      { id: 9, text: "Pública concurrencia", value: "Pública concurrencia" },
      { id: 10, text: "Docencia", value: "Docencia" },
      { id: 11, text: "Salud", value: "Salud" },
      { id: 12, text: "Industrial", value: "Industrial" },
    ],
    proyectos_estudiosOptions: [
      { id: 2, text: "Estructuras A1", value: "Estructuras A1", disabled: true },
      { id: 3, text: "Estructuras A2", value: "Estructuras A2", disabled: true },
      { id: 4, text: "Estructuras B1", value: "Estructuras B1", disabled: true },
      { id: 1, text: "Arquitectura", value: "Arquitectura" },
      { id: 5, text: "Instalación hidrosanitaria", value: "Instalación hidrosanitaria" },
      { id: 6, text: "Ventilación y Extracción", value: "Ventilación y Extracción" },
      { id: 7, text: "Acondicionamiento sin balance térmico", value: "Acondicionamiento sin balance térmico" },
      { id: 8, text: "Acondicionamiento con balance térmico", value: "Acondicionamiento con balance térmico" },
      { id: 9, text: "Instalación Eléctrica", value: "Instalación Eléctrica" },
      { id: 10, text: "Voz y Datos", value: "Voz y Datos" },
      { id: 11, text: "Instalación de Gas", value: "Instalación de Gas" },
      { id: 12, text: "Protección contra Incendios", value: "Protección contra Incendios" },
    ],
    accesibilidadOptions: [
      { id: 1, text: "Muy buena", value: "muy_buena" },
      { id: 2, text: "Buena", value: "buena" },
      { id: 3, text: "Normal", value: "normal" },
      { id: 4, text: "Dificil", value: "dificil" },
      { id: 5, text: "Muy dificil", value: "muy_dificil" },
    ],
    topografiaOptions: [
      { id: 1, text: "Plana", value: 'plana' },
      { id: 2, text: "Con desnivel minimo", value: 'desnivel_minimo' },
      { id: 3, text: "Con desnivel pronunciado", value: 'desnivel_pronunciado' },
      { id: 4, text: "Accidentada", value: 'accidentada' },
      { id: 5, text: "Muy accidentada", value: 'muy_accidentada' },
    ],
    ubicacionOptions: [
      { id: 1, text: "Entre colindancias", value: 'entre_colindancias' },
      { id: 2, text: "En esquina", value: 'en_esquina' },
      { id: 3, text: "Aislada", value: 'aislada' },
    ],
    dataCotizacionNuevaEdificacion: {},
    userContact: {},
  },
  mutations: {
    setDataNuevaEdificacion(state, payload){
      state.dataCotizacionNuevaEdificacion = payload;
    },
    setUserContact(state, payload){
      state.userContact = payload;
    },
    setStructuresState(state, payload){
      state.proyectos_estudiosOptions = payload;
    }
  },
  actions: {
    async setDataCotizacionNuevaEdificacion({ commit }, data){
      console.log(data);
      if(data.success){
        commit('setDataNuevaEdificacion', data.quotations);
        commit('setUserContact', data.datos_contacto);
      }
    },
    setStructuresStateAction({ commit, state }, data){
      const originalStates = state.proyectos_estudiosOptions.map((edification) => {
        const { text } = edification;
        return (text === 'Estructuras A1' || text === 'Estructuras A2' || text === 'Estructuras B1') ? { ...edification, disabled: true } : edification
      });

      const newStates = originalStates.map((edification) => 
        edification.text === data ? { ...edification, disabled: false } : edification
      );
      commit('setStructuresState', newStates);
    }
  },
  modules: {
  }
})
