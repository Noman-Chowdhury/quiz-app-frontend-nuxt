export default {
  state: {
    namespace:true,
    questions: [],
    point: 0,
    time: null,
  },
  mutations: {
    setQuestions(state, values) {
      state.questions = values
    },
  },
  actions: {
    createQuestion(ct, pd) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$post('http://127.0.0.1:3000/api/question', pd)
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
