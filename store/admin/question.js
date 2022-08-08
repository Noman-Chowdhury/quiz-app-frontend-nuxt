export default {
  state: {
    namespace: true,
    questions: [],
    point: 0,
    time: null,
  },
  mutations: {
    setQuestions(state, values) {
      console.log(values)
      state.questions = values
    },
  },
  actions: {
    createQuestion(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post(`/api/question`, pd)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    contributedQuestions(ct) {
      this.$axios.$get('/api/contributed-questions').then((response) => {
        ct.commit('setQuestions', response.questions)
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
