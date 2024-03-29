export default {
  namespace: true,
  state: {},
  mutations: {},
  actions: {
    storeUser(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/sanctum/csrf-cookie').then(() => {
          this.$axios
            .$post('/api/users', pd)
            .then((response) => {
              resolve(response)
            })
            .catch((error) => {
              reject(error)
            })
        })
      })
    },
  },
  modules: {},
  getters: {},
}
