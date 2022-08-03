export default {
  state: {},
  mutations: {},
  actions: {
    question(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('/api/user/contribute/questions', pd)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  getters: {},
}
