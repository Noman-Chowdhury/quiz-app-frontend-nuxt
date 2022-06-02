<template>
  <div style="text-align: -webkit-center !important">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="primary"
      absolute
      text
    >
      {{ text }}

      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <form>
      <v-card elevation="2" width="800px">
        <v-card-text>
          <v-text-field
            v-model="form.question"
            label="Question Title"
            placeholder="Type question here..."
            outlined
            required
          ></v-text-field>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="option.option1"
                label="Option A"
                placeholder="Option A"
                solo
                :append-icon="
                  option.option_answer === option.option1 &&
                  option.option_answer.length > 1
                    ? 'mdi-cancel'
                    : 'mdi-spellcheck'
                "
                @click:append="
                  option.option_answer === option.option1
                    ? (option.option_answer = '')
                    : (option.option_answer = option.option1)
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="option.option2"
                label="Option B"
                placeholder="Option B"
                solo
                :append-icon="
                  option.option_answer === option.option2 &&
                  option.option_answer.length > 1
                    ? 'mdi-cancel'
                    : 'mdi-spellcheck'
                "
                @click:append="
                  option.option_answer === option.option2
                    ? (option.option_answer = '')
                    : (option.option_answer = option.option2)
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="option.option3"
                label="Option C"
                placeholder="OptionCB"
                solo
                :append-icon="
                  option.option_answer === option.option3 &&
                  option.option_answer.length > 1
                    ? 'mdi-cancel'
                    : 'mdi-spellcheck'
                "
                @click:append="
                  option.option_answer === option.option3
                    ? (option.option_answer = '')
                    : (option.option_answer = option.option3)
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="option.option4"
                label="Option D"
                placeholder="Option D"
                solo
                :append-icon="
                  option.option_answer === option.option4 &&
                  option.option_answer.length > 1
                    ? 'mdi-cancel'
                    : 'mdi-spellcheck'
                "
                @click:append="
                  option.option_answer === option.option4
                    ? (option.option_answer = '')
                    : (option.option_answer = option.option4)
                "
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row class="mt-2">
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                v-model="form.point"
                label="Point"
                placeholder="Point"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="9" md="9">
              <v-textarea
                v-model="form.feedback"
                outlined
                label="Feedback"
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="text--darken-3">Check question before submit.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-orange darken-1" outlined dark @click="clearForm">
            Clear
          </v-btn>
          <v-btn color="teal darken-1" dark @click="handleSubmit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateQuestion',
  data() {
    return {
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
        point: '',
        feedback: '',
      },
      snackbar: false,
      text: '',
      timeout: -1,
    }
  },
  methods: {
    clearForm() {
      for (const key in this.form) {
        this.form[key] = ''
      }
      for (const key in this.option) {
        this.option[key] = ''
      }
    },
    handleSubmit() {
      this.form.options = this.setOptionVal()
      this.$store
        .dispatch('admin/question/createQuestion', this.form)
        .then((response) => {
          if (response.success) {
            this.clearForm()
            this.text = 'Question successfully added'
            this.timeout = 4000
            this.snackbar = true
          }
        })
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
