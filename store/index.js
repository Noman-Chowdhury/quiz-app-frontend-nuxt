export const state = () => ({
  questions: [],
  point: 0,
  time: null,
})
export default {
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
  },
  actions: {
    getQuestionFromDB({ commit }) {
      return new Promise((resolve, reject) => {
        this.$axios
          .$get('http://127.0.0.1:5000/api/user/questions')
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
          .$post('http://127.0.0.1:5000/api/user/questions', pd)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async submittedQuestionDetail({ commit }) {
      await this.$axios
        .$get('http://127.0.0.1:5000/api/user/submitted/questions')
        .then((response) => {
          commit('setQuestions', response.questions)
          // commit('setTotalMarks', response.point)
          // commit('setTotalTime', response.time)
        })
    },
  },
  modules: {},
  getters: {
    Questions(state) {
      return state.questions
    },
    Time(state) {
      return state.time
    },
  },
}
