<template>
<div>
  <QuestionForm />
</div>
</template>

<script>
import QuestionForm from '@/components/common/QuestionForm'
export default {
  name: 'CreateQuestion',
  components: { QuestionForm },
  middleware: ['auth','admin'],
}
</script>
