<template>
  <QuestionForm />
</template>

<script>
import QuestionForm from '@/components/common/QuestionForm'
export default {
  name: 'CreateQuestion',
  components: { QuestionForm },
  middleware: 'admin',
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
      // this.$store
      //   .dispatch('admin/question/createQuestion', this.form)
      //   .then((response) => {
      //     if (response.success) {
      //       this.clearForm()
      //       this.text = 'Question successfully added'
      //       this.timeout = 4000
      //       this.snackbar = true
      //     }
      //   })
      this.$store
        .dispatch('user/contribute/question', this.form)
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
