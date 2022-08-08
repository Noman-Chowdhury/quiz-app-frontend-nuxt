<template>
  <div>
    <div v-if="questions && questions.length > 0">
      <v-card v-for="(q, index) in questions" :key="index" class="mt-2">
        <v-toolbar
          flat
          :color="index % 2 === 0 ? 'indigo lighten-2' : 'teal lighten-2'"
          dark
        >
          <v-toolbar-title>{{ q.question }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-item-group>
            <v-subheader>Answers</v-subheader>
            <v-item v-for="n in q.answers" :key="n">
              <v-chip
                active-class="green--text"
                :input-value="n === q.correct_ans"
              >
                {{ n }}
              </v-chip>
            </v-item>
          </v-item-group>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-chip class="purple--text">{{
            q.contributor_name + ' - ' + q.contributor_number
          }}</v-chip>
          <v-spacer></v-spacer> <v-chip>{{ 'Submitted - ' + q.date }}</v-chip>
          <v-spacer></v-spacer>
          <v-btn color="success" depressed @click.stop="openModal(q)">
            Take It
          </v-btn>
          <v-btn color="red" depressed> Reject It </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>No Contributed Questions Found!</div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title>Point?</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.point"
            placeholder="Enter point for this question"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>

          <v-btn color="green darken-1" text @click="takeQuestion">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ContributedPage',
  data() {
    return {
      dialog: false,
      option: {
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        option_answer: '',
      },
      form: {
        question: '',
        options: [],
        point: null,
        feedback: '',
      },
    }
  },
  computed: {
    questions() {
      return this.$store.getters['admin/question/Questions']
    },
  },
  created() {
    this.getQuestions()
  },
  methods: {
    getQuestions() {
      this.$store.dispatch('admin/question/contributedQuestions').then(() => {
        this.$nextTick(() => {
          // this.results = this.$store.state["user/question/results"]
          // alert(typeof (this.$store.state["user/question/results"]))
        })
      })
    },
    takeQuestion() {
      this.$store
        .dispatch('admin/question/createQuestion', this.form)
        .then((response) => {
          if (response.success) {
            this.dialog = false
            this.text = 'Question successfully added'
            this.timeout = 4000
            this.snackbar = true
          }
        })
    },
    openModal(object) {
      this.option.option1 = object.answers[0]
      this.option.option2 = object.answers[1]
      this.option.option3 = object.answers[2]
      this.option.option4 = object.answers[3]
      this.option.option_answer = object.correct_ans
      this.form.feedback = object.reference
      this.form.question = object.question
      this.form.options = this.setOptionVal()
      this.form.temp_question = true
      this.form.temp_question_id = object.id
      this.dialog = true
    },
    setOptionVal() {
      return [
        {
          option: this.option.option1,
          is_correct_option: this.option.option_answer === this.option.option1,
        },
        {
          option: this.option.option2,
          is_correct_option: this.option.option_answer === this.option.option2,
        },
        {
          option: this.option.option3,
          is_correct_option: this.option.option_answer === this.option.option3,
        },
        {
          option: this.option.option4,
          is_correct_option: this.option.option_answer === this.option.option4,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
