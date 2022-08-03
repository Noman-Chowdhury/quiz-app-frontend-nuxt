export default {
  state: {
    questions: [],
    point: 0,
    time: 0,
    results: [],
  },
  mutations: {
    setQuestions(state, values) {
      state.questions = values
    },
    setTotalMarks(state, value) {
      state.point = value
    },
    setTotalTime(state, value) {
      state.time = value
    },
    setSubmittedResult(state, val) {
      state.results = val
    },
  },
  actions: {
    getQuestionFromDB({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$get('/api/user/questions')
          .then((response) => {
            commit('setQuestions', response.questions)
            commit('setTotalMarks', response.point)
            commit('setTotalTime', response.time)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submitQuestionAnswer(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('/api/user/questions', pd)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submittedQuestionDetail({ commit }) {
      this.$axios.$get('/api/user/submitted/questions').then((response) => {
        commit('setSubmittedResult', response.questions)
      })
    },
    todayAvailable({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$get('/api/user/today')
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  getters: {
    Questions(state) {
      return state.questions
    },
    Time(state) {
      return state.time
    },
    results(state) {
      console.log('results')
      return state.results
    },
  },
}
