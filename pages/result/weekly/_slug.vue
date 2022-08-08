<template>
  <div>
    <div class="row text-center">
      <div class="col-md-4">
        <span class="grey--text">Quiz of:</span> {{ items.quiz_name }}
      </div>
      <div class="col-md-4">
        <span class="grey--text">Total Marks:</span> {{ items.total_marks }}
      </div>
      <div class="col-md-4">
        <span class="grey--text">Score:</span> {{ items.my_mark }}
      </div>
    </div>
    <v-divider></v-divider>
    <div v-if="items.histories && items.histories.length > 0">
      <v-card v-for="(q, index) in items.histories" :key="index" class="mt-2">
        <v-toolbar
          flat
          :color="
            q.correct_answer === q.my_answer
              ? 'green lighten-4'
              : 'red lighten-4'
          "
          dense
        >
          <v-toolbar-title>{{ q.question }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <div class="row">
            <div class="col-md-5">
              My Answer:&nbsp;
              <v-chip
                v-if="typeof q.my_answer !== 'boolean' && q.my_answer"
                label
                small
                outlined
                :color="
                  q.correct_answer === q.my_answer
                    ? 'green lighten-2'
                    : 'red lighten-2'
                "
                dark
              >
                {{ q.my_answer }}
              </v-chip>
              <span v-else>Not answered!</span>
              <br />
              <div v-if="q.correct_answer !== q.my_answer">
                Correct Answer:&nbsp;<span class="overline font-weight-bold">
                  {{ q.correct_answer }}</span
                >
              </div>
            </div>
            <div class="col-md-7" style="border-left: 1px solid #dedede">
              <div>asdsa</div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>No data found!</div>
  </div>
</template>

<script>
export default {
  name: 'DetailPage',
  data() {
    return {}
  },
  computed: {
    items() {
      return this.$store.getters['user/result/dailyResult']
    },
  },
  mounted() {
    this.getWeekResult()
  },
  methods: {
    getWeekResult() {
      this.$store.dispatch('user/result/getWeeklyResult', {
        slug: this.$route.params.slug,
      })
    },
  },
}
</script>
