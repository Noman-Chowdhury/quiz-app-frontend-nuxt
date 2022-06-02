<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-3">
        <div class="timer">
          <div>
            <span id="minute" class="minutes"></span>
            <div class="smalltext">Minutes</div>
          </div>
          <div>
            <span id="second" class="seconds"></span>
            <div class="smalltext">Seconds</div>
          </div>
          <p id="time-up"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    seconds: Number,
    // eslint-disable-next-line vue/require-default-prop
    default: () => 0,
  },
  data() {
    return {
      x: null,
    }
  },
  created() {
    this.calculate()
  },
  destroyed() {
    clearInterval(this.x)
  },
  methods: {
    calculate() {
      if (process.client) {
        let time = this.$props.seconds
        // let time = 5
        this.x = setInterval(function () {
          const min = Math.floor(time / 60)
          const sec = time - min * 60
          const minutes = min
          const seconds = sec
          document.getElementById('minute').innerHTML = minutes
          document.getElementById('second').innerHTML = seconds
          time = time - 1
          if (time <= 0) {
            this.$nuxt.$emit('submitAnswers')
            document.getElementById('time-up').innerHTML = 'TIME UP'
            document.getElementById('minute').innerHTML = '0'
            document.getElementById('second').innerHTML = '0'
          }
        }, 1000)
      }
    },
  },
}
</script>

<style scoped>
h2 {
  font-weight: 500;
  margin: 0 0 20px;
}

.timer {
  margin: 0 0 45px;
  font-family: sans-serif;
  color: #fff;
  display: inline-block;
  font-weight: 100;
  text-align: center;
  font-size: 30px;
}

.timer div {
  padding: 10px;
  border-radius: 3px;
  background: #000;
  display: inline-block;
  font-size: 26px;
  font-weight: 400;
  width: 80px;
}

.timer .smalltext {
  color: #888;
  font-size: 12px;
  font-weight: 500;
  display: block;
  padding: 0;
  width: auto;
}

.timer #time-up {
  margin: 8px 0 0;
  text-align: left;
  font-size: 14px;
  font-style: normal;
  color: #000;
  font-weight: 500;
  letter-spacing: 1px;
}
</style>
