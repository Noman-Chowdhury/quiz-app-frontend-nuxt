<template>
  <v-main>
    <div id="recaptcha-container"></div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ currentTitle }}</v-toolbar-title>
            </v-toolbar>
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="50"
                    label="Enter Your Name"
                    minlength="5"
                    maxlength="50"
                    required
                    @keyup.enter="step++"
                  ></v-text-field>
                </v-card-text>
              </v-window-item>
              <v-window-item :value="2">
                <div class="pa-4 text-center">
                  <v-card-text>
                    <v-text-field
                      v-model="number"
                      :rules="numberRules"
                      :counter="11"
                      label="Enter Phone Number"
                      minlength="11"
                      maxlength="11"
                      required
                    ></v-text-field>
                  </v-card-text>
                </div>
              </v-window-item>
              <v-window-item :value="3">
                <div class="pa-4 text-center">
                  <v-otp-input
                    v-model="otp"
                    length="6"
                    type="number"
                    @finish="verifyOTP"
                  ></v-otp-input>
                  <v-overlay absolute :value="loading">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-overlay>
                </div>
              </v-window-item>
              <v-window-item :value="4">
                <v-card-text>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="passwordRules"
                    label="Confirm Password"
                    type="password"
                  ></v-text-field>
                </v-card-text>
              </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
              <NuxtLink v-if="step === 1" to="/login"
                >Already an Account?</NuxtLink
              >
              <v-spacer></v-spacer>
              <v-btn
                v-if="step !== 2 && step !== 3 && step !== 4"
                :disabled="name === ''"
                color="primary"
                depressed
                @click="step++"
              >
                Next
              </v-btn>
              <v-btn
                v-if="step === 2"
                :loading="buttonLoading"
                :disabled="buttonLoading"
                color="primary"
                depressed
                @click="sendOtp"
              >
                Send OTP
              </v-btn>
              <!--          <v-btn v-if="step === 3" color="success" depressed @click="verifyOTP">-->
              <!--            Verify OTP-->
              <!--          </v-btn>-->
              <v-btn
                v-if="step === 3"
                :loading="buttonLoading"
                :disabled="buttonLoading"
                color="primary"
                depressed
                @click="resendOtp"
              >
                Re-Send OTP
              </v-btn>
              <v-btn
                v-if="step === 4"
                color="primary"
                depressed
                @click="submitForm"
              >
                Register
              </v-btn>
            </v-card-actions>
            <v-snackbar
              v-model="snackbar"
              :color="snackbarColor"
              :timeout="2000"
            >
              {{ message }}
            </v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth'

export default {
  auth: 'guest',
  name: 'RegisterPage',
  data: () => ({
    step: 1,
    name: '',
    number: '',
    otp: '',
    emailRules: [
      (v) => !!v || 'Email is required',
      (v) =>
        v.length >= 5 ||
        'The e-mail address must contain at least 5 characters',
      (v) =>
        v.length <= 50 ||
        'The e-mail address cannot be longer than 50 characters',
      (v) => /.+@.+/.test(v) || 'Please enter a valid email address',
    ],
    password: '',
    confirmPassword: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length >= 4 || 'Name must contain at least 8 characters',
      (v) => v.length <= 20 || 'Name cannot be longer than 50 characters',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length >= 8 || 'Password must contain at least 8 characters',
      (v) => v.length <= 50 || 'Password cannot be longer than 50 characters',
    ],
    numberRules: [
      (v) => !!v || 'Phone Number is required',
      (v) =>
        v.length >= 11 || 'Phone Number must contain at least 11 characters',
      (v) =>
        v.length <= 11 || 'Phone Number cannot be longer than 11 characters',
    ],
    otpRules: [
      (v) => !!v || 'OTP is required',
      (v) => v.length >= 6 || 'OTP must contain at least 4 characters',
      (v) => v.length <= 6 || 'OTP address cannot be longer than 8 characters',
    ],
    appVerifier: '',
    snackbar: false,
    snackbarColor: 'default',
    message: '',
    loading: false,
    loader: null,
    buttonLoading: false,
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Sign-up | Name'
        case 2:
          return 'Phone Number'
        case 3:
          return 'Verify OTP'
        case 4:
          return 'Password'
        default:
          return 'Sign-up'
      }
    },
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  created() {
    this.initReCaptcha()
  },
  methods: {
    sendOtp(resend=false) {
      this.buttonLoading =true
      if (process.client) {
        const appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(getAuth(), '+88' + this.number, appVerifier)
          .then((confirmationResult) => {
            // eslint-disable-next-line no-console
            console.log(confirmationResult)
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult
            // ...
            if (resend !== true) {
              this.step++
            }else{
              setTimeout(() => {
                this.loading = false
                this.snackbarColor = 'green'
                this.message = `Check your inbox. OTP sent just Now`
                this.snackbar = true
              }, 1500)
            }
            this.buttonLoading =false
          })
          .catch(() => {
            // Error; SMS not sent
            // ...
          })
      }
    },
    verifyOTP() {
      this.loading = true
      if (process.client) {
        const code = this.otp
        window.confirmationResult
          .confirm(code)
          .then((result) => {
            setTimeout(() => {
              this.loading = false
              this.snackbarColor = 'success'
              this.message = `Processed OTP Verified.`
              this.snackbar = true
            }, 1500)
            // User signed in successfully.
            const user = result.user
            // eslint-disable-next-line no-console
            console.log(user)
            this.step++
            // ...
          })
          .catch(() => {
            setTimeout(() => {
              this.loading = false
              this.snackbarColor = 'red accent-2'
              this.message = `Invalid OTP, please try again`
              this.snackbar = true
            }, 1500)
            // User couldn't sign in (bad verification code?)
            // ...
          })
      }
    },
    initReCaptcha() {
      if (process.client) {
        const auth = getAuth()
        setTimeout(() => {
          window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container',
            {
              size: 'invisible',
              callback(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
              },
              'expired-callback'() {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
              },
            },
            auth
          )
          //
          this.appVerifier = window.recaptchaVerifier
        }, 1000)
      }
    },
    resendOtp() {
      this.otp=''
      this.sendOtp(true)
    },
    submitForm() {
      const user = {
        name: this.name,
        phone_number: this.number,
        password: this.password,
        confirm_password: this.confirmPassword,
      }
      this.$store.dispatch('user/auth/storeUser', user).then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>
<style>
/* stylelint-disable */
.v-text-field__details {
  padding-top: 10px !important;
}
</style>
