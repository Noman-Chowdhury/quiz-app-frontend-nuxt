export default {
  state: {
    results: [],
    dailyResult: [],
  },
  mutations: {
    setPreviousResults(state, values) {
      state.results = values
    },
    setDailyResult(state, values) {
      state.dailyResult = values
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
    getWeeklyResult(context, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        this.$axios
          .$get(`/api/user/daily-history/${payload.slug}`)
          .then((response) => {
            context.commit('setDailyResult', response)
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
    dailyResult(state) {
      return state.dailyResult
    },
  },
}
