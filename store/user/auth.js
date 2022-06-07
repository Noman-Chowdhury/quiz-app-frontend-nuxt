export default {
  namespace: true,
  state: {},
  mutations: {},
  actions: {
    storeUser(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('http://127.0.0.1:5000/api/users', pd)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  modules: {},
  getters: {
    Questions(state) {
      return state.questions
    },
  },
}
