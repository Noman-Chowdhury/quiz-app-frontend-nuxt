<template>
  <div>
    <form>
      <v-card
        elevation="2"
        width="800px"
      >
        <v-card-title>
          <v-text-field
            v-model="form.question"
            label="Question Title"
            placeholder="Type question here..."
            outlined
            required
          ></v-text-field>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="option1"
                label="Solo"
                placeholder="Placeholder"
                solo
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="option2"
                label="Solo"
                placeholder="Placeholder"
                solo
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="option3"
                label="Solo"
                placeholder="Placeholder"
                solo
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-text-field
                v-model="option4"
                label="Solo"
                placeholder="Placeholder"
                solo
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="text--darken-3">Check question before submit.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-orange darken-1"
            outlined
            dark
            @click="clearForm"
          >
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
  name: "CreateQuestion",
  data() {
    return {
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      option_answer:'',
      form: {
        question: '',
        options: []
      },
    }
  },
  methods: {
    handleSubmit() {
      this.form.options = this.setOptionVal()
      this.$store.dispatch('admin/question/createQuestion', this.form).then(response=>{
        console.log(response)
      })

    },
    setOptionVal(){
      return [
        {
          option:this.option1,
          is_correct_option: this.option_answer===this.option1
        },
        {
          option:this.option2,
          is_correct_option: this.option_answer===this.option2
        },
        {
          option:this.option3,
          is_correct_option: this.option_answer===this.option3
        },
        {
          option:this.option4,
          is_correct_option: this.option_answer===this.option4
        }
      ]
    }
  }
}
</script>
