<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card" style="background: linear-gradient(#f4f5f8, #f1f3f6)">
        <div class="card-title text-center">Daily Report</div>
        <vue-good-table
          :columns="columns"
          mode="remote"
          :pagination-options="{
            enabled: true,
          }"
          :line-numbers="true"
          style-class="vgt-table striped bordered condensed body-2"
          :row-style-class="styleClass"
          :rows="daily"
        >
        </vue-good-table>
      </div>
    </div>
    <div
      class="card col-md-4"
      style="background: linear-gradient(#f4f5f8, #f1f3f6)"
    >
      <div class="card-title text-center">Monthly Report</div>
      <vue-good-table
        :columns="columns"
        theme="black-rhino"
        mode="remote"
        :pagination-options="{
          enabled: true,
        }"
        :line-numbers="true"
        style-class="vgt-table striped bordered condensed body-2"
        :row-style-class="styleClass"
        :rows="weekly"
      >
      </vue-good-table>
    </div>
    <div class="col-md-4" style="background: linear-gradient(#f4f5f8, #f1f3f6)">
      <div class="card-title text-center">Overall Report</div>
      <vue-good-table
        :columns="columns"
        mode="remote"
        :pagination-options="{
          enabled: true,
        }"
        :line-numbers="true"
        style-class="vgt-table striped bordered condensed body-2"
        :row-style-class="styleClass"
        :rows="overall"
      >
      </vue-good-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardPage',
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Phone',
          field: 'phone_number',
        },
        {
          label: 'Marks',
          field: 'marks',
        },
      ],
    }
  },
  computed: {
    daily() {
      return this.$store.getters['admin/leaderboard/DailyReportGetter']
    },
    weekly() {
      return this.$store.getters['admin/leaderboard/WeeklyReportGetter']
    },
    overall() {
      return this.$store.getters['admin/leaderboard/OverallReportGetter']
    },
  },
  created() {
    this.$store.dispatch('admin/leaderboard/dailyReport')
    this.$store.dispatch('admin/leaderboard/weeklyReport')
    this.$store.dispatch('admin/leaderboard/overallReport')
  },
  methods: {
    styleClass(row) {
      return row.phone_number === this.$auth.user.phone_number
        ? 'teal lighten-4'
        : ''
    },
  },
}
</script>
