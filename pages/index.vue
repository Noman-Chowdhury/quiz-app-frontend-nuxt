<template>
  <div class="welcome">
    <div class="test">
      <v-btn
        x-large
        class="ma-2"
        outlined
        color="indigo"
        @click.prevent="dialog = true"
      >
        Start Quiz
      </v-btn>
    </div>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          Start Quiz Some Rules of this Quiz !
        </v-card-title>
        <v-card-text
          >1. There are 10 questions 2. You will have only 15 seconds per each
          question. 3. Once you select your answer, it can't be undone. 4. You
          can't select any option once time goes off. 5. You can't exit from the
          Quiz while you're playing. 6. You'll get points on the basis of your
          correct answers.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-orange darken-1"
            outlined
            dark
            @click="dialog = false"
          >
            Exit Quiz
          </v-btn>
          <v-btn color="teal darken-1" dark @click="dialog = false">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
