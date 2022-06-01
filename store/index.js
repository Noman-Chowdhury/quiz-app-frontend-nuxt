import axios from "axios";

export default ({
  state: {
    questions :[],
    point : 0,
    time : null,
  },
  mutations: {
    setQuestions(state, values){
      state.questions = values
    },
    setTotalMarks(state, value){
      state.point = value
    },
    setTotalTime(state, value){
      state.time = value
    },
  },
  actions: {
    getQuestionFromDB(ct){
      return new Promise((resolve, reject) => {
        axios.get('http://127.0.0.1:3000/api/user/questions')
          .then((response)=> {
            ct.commit('setQuestions',response.data.questions)
            ct.commit('setTotalMarks',response.data.point)
            ct.commit('setTotalTime',response.data.time)
            resolve()
          })
          .catch(error =>{
            reject(error)
          })
      })
    },
    submitQuestionAnswer(ct, pd){
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:3000/api/user/questions', pd)
          .then((response)=> {
            resolve(response.data)
          })
          .catch(error =>{
            reject(error)
          })
      })
    }
  },
  modules: {
  },
  getters: {
    Questions(state){
      return state.questions
    }
  }
})

