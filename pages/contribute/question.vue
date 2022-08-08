<template>
  <div>
    <QuestionForm />
  </div>
</template>

<script>
import QuestionForm from '@/components/common/QuestionForm'

export default {
  name: 'QuestionPage',
  components: {
    QuestionForm,
  },
  middleware: ['auth', 'user'],
}
</script>
