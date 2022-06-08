export default {
  namespace: true,
  state: {},
  mutations: {},
  actions: {
    storeUser(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('https://quick-quiz-back.herokuapp.com/api/users', pd)
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
