export default {
  state: {
    namespace: true,
    daily: null,
    weekly: null,
    overall: null,
  },
  mutations: {
    setDailyReport(state, values) {
      state.daily = values
    },
    setWeeklyReport(state, values) {
      state.weekly = values
    },
    setOverallReport(state, values) {
      state.overall = values
    },
  },
  actions: {
    dailyReport(ct) {
      this.$axios.get('/api/leaderboard/daily').then((r) => {
        ct.commit('setDailyReport', r.data)
      })
    },
    weeklyReport(ct) {
      this.$axios.get('/api/leaderboard/weekly').then((r) => {
        ct.commit('setWeeklyReport', r.data)
      })
    },
    overallReport(ct) {
      this.$axios.get('/api/leaderboard/overall').then((r) => {
        ct.commit('setOverallReport', r.data)
      })
    },
  },
  modules: {},
  getters: {
    DailyReportGetter(state) {
      return state.daily
    },
    WeeklyReportGetter(state) {
      return state.weekly
    },
    OverallReportGetter(state) {
      return state.overall
    },
  },
}
