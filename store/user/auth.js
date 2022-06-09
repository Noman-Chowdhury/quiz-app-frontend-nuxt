export default {
  namespace: true,
  state: {},
  mutations: {},
  actions: {
    storeUser(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('/api/users', pd)
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
  getters: {},
}
