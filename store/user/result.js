export default {
  state: {
    results: [],
  },
  mutations: {
    setPreviousResults(state, values) {
      state.results = values
    },
  },
  actions: {
    getPreviousResults({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$get('/api/user/weekly-history')
          .then((response) => {
            commit('setPreviousResults', response.histories)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getWeeklyResult(commit, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        this.$axios
          .$get(`/api/user/daily-history/${payload.slug}`)
          .then((response) => {
            commit('setPreviousResults', response.histories)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  getters: {
    previousResults(state) {
      return state.results
    },
  },
}
