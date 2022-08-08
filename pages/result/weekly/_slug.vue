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
          :color="index % 2 === 0 ? 'indigo lighten-2' : 'teal lighten-2'"
          dark
          dense
        >
          <v-toolbar-title>{{ q.question }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-item-group>
            <v-subheader>My Answer:&nbsp;
              <v-chip
              :color="q.correct_answer===q.my_answer?'green lighten-2':'red lighten-2'"
              dark
            >
              {{ q.my_answer }}
            </v-chip>
              <v-spacer></v-spacer>
              Correct Answer:&nbsp;
              <v-chip
                active-class="green--text"
              >
                {{ q.correct_answer }}
              </v-chip>
            </v-subheader>
          </v-item-group>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>No data found!</div>
  </div>
</template>

<script>
export default {
  name: "DetailPage",
  data(){
    return{
    }
  },
  computed:{
    items(){
     return this.$store.getters["user/result/dailyResult"]
    }
  },
  mounted() {
    this.getWeekResult()
  },
  methods:{
    getWeekResult(){
      this.$store.dispatch('user/result/getWeeklyResult', {slug:this.$route.params.slug})
    }
  }
}
</script>

<style scoped>

</style>
