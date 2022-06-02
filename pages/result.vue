<template>
  <section style="text-align: -webkit-center">
    <!--questionBox-->
    <div
      v-for="(ques, index) in questions"
      :key="index"
      class="row questionBox mb-3"
    >
      <div class="col-7" style="border-right: 1px solid #dedede">
        <div class="questionContainer">
          <h2 class="titleContainer title">
            {{ ques.question }}
            <v-icon
              aria-hidden="false"
              :color="ques.correct && ques.answered ? 'success' : 'red'"
            >
              {{
                ques.correct && ques.answered
                  ? 'mdi-check'
                  : !ques.correct && ques.answered
                  ? 'mdi-close'
                  : ''
              }}
            </v-icon>
            <span class="caption red--text">{{
              ques.answered ? '' : 'not-answered'
            }}</span>
          </h2>

          <!-- quizOptions -->
          <div
            v-for="(ans, index1) in ques.answers"
            :key="index1"
            class="optionContainer"
          >
            <div
              class="option"
              :class="
                ans.is_correct_answer
                  ? 'success'
                  : !ans.is_correct_answer && ans.is_user_selected
                  ? 'red'
                  : ''
              "
            >
              {{ ans.option }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div>
          FeedBack: <br />
          {{ ques.feedback }}
        </div>
      </div>
      <!-- transition -->
    </div>
    <!--/questionBox-->
  </section>
</template>

<script>
export default {
  name: 'ResultPage',
  data() {
    return {
      questions: [],
    }
  },
  created() {
    this.$store.dispatch('submittedQuestionDetail').then(() => {
      this.questions = this.$store.getters.Questions
    })
  },
}
</script>

<style scoped lang="scss">
$trans_duration: 0.3s;
$primary_color: #3d5afe;

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;

  height: 100vh;

  background: #cfd8dc;

  /* mocking native UI */
  cursor: default !important; /* remove text selection cursor */
  user-select: none; /* remove text selection */
  user-drag: none; /* disbale element dragging */

  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  transition: $trans_duration;
}

.title,
.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: normal;
}

.animated {
  transition-duration: $trans_duration/2;
}

.container {
  margin: 0 0.5rem;
}

.questionBox {
  max-width: 50rem;
  width: 50rem;
  //min-height: 30rem;

  background: #fafafa;
  position: relative;
  display: flex;

  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  header {
    background: rgba(0, 0, 0, 0.025);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h1 {
      font-weight: bold;
      margin-bottom: 1rem !important;
    }

    .progressContainer {
      width: 60%;
      margin: 0 auto;

      > progress {
        margin: 0;
        border-radius: 5rem;
        overflow: hidden;
        border: none;

        color: $primary_color;

        &::-moz-progress-bar {
          background: $primary_color;
        }

        &::-webkit-progress-value {
          background: $primary_color;
        }
      }

      > p {
        margin: 0;
        margin-top: 0.5rem;
      }
    }
  }

  .titleContainer {
    text-align: center;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .quizForm {
    display: block;
    white-space: normal;

    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }

  .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align: center;

    > .icon {
      color: #ff5252;
      font-size: 5rem;

      .is-active {
        color: #00e676;
      }
    }
  }

  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;

      .option {
        border-radius: 290486px;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.85);
        border: transparent 1px solid;

        &.is-selected {
          border-color: rgba(black, 0.25);
          background-color: white;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        &:active {
          transform: scaleX(0.9);
        }
      }
    }

    .questionFooter {
      background: rgba(0, 0, 0, 0.025);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      align-self: flex-end;

      .pagination {
        //padding: 10px 15px;
        margin: 15px 25px;
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  margin: 0 0.25rem;

  transition: 0.3s;

  &:hover {
    cursor: pointer;
    background: #eceff1;
    border-color: rgba(0, 0, 0, 0.25);
  }

  &.is-active {
    background: $primary_color;
    color: white;
    border-color: transparent;

    &:hover {
      background: darken($primary_color, 10%);
    }
  }
}

@media screen and (min-width: 769px) {
  .questionBox {
    align-items: center;
    justify-content: center;

    .questionContainer {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}
</style>
