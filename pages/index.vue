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
          >
          <ol>
            <li>There are 10 questions</li>
            <li>There will be timer. Please keep in mind</li>
            <li>You'll get points on the basis of your
              correct answers</li>
            <li>You cannot come back once you press next</li>
            <li>You cannot close browser</li>
            <li>You cannot change or open new tab</li>
            <li>Once you close this tab. Answer will be submitted</li>
          </ol></v-card-text
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
          <v-btn color="teal darken-1" dark to="/quiz">
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
