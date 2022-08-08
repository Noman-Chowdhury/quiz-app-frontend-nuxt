<template>
  <div class="row">
    <div class="col-md-8 text-center">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-alert border="left" color="secondary" dark>
            আমি যদি তাদেরকে পৃথিবীতে প্রতিষ্ঠিত করি (ক্ষমতা ওঁ সম্পদ দ্বারা)
            তাহলে তারা সালাত কায়েম করবে, সৎ কাজের নির্দেশ দেবে ও অসৎ কাজ হতে
            নিষেধ করবে, আর সব কাজের পরিণাম আল্লাহর (নিকট) (সুরাহ হাজ ২২:৪১)
          </v-alert>
        </v-layout>
      </v-container>
    </div>
    <div class="col-md-4">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md8>
            <v-card class="elevation-6">
              <v-toolbar dense dark color="secondary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="phone_number"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    @keyup.enter="login"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    @keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <NuxtLink to="/register">Create an Account</NuxtLink>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
            <v-card width="400" class="mt-6">
              <v-toolbar dense dark color="secondary">
                <v-toolbar-title>Prayer times</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">Today</div>

                <v-timeline align-top dense>
                  <v-timeline-item
                    v-for="message in messages"
                    :key="message.time"
                    :color="message.color"
                    small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ message.from }}</strong> @{{ message.time }}
                      </div>
                      <div>{{ message.message }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  name: 'LoginPage',
  data() {
    return {
      phone_number: '',
      password: '',
      messages: [
        {
          from: 'Fajr',
          message: `4.00am - 5.30am`,
          time: '04:30am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'Johr',
          message: `1.00am - 2.00pm`,
          time: '01:30pm',
          color: 'green',
        },
        {
          from: 'Asr',
          message: `4.30am - 5.30pm`,
          time: '04:50am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'Magrib',
          message: `6.50am - 7.10pm`,
          time: '07:00pm',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'Esha',
          message: `8.00am - 11.30pm`,
          time: '08:30pm',
          color: 'deep-purple lighten-1',
        },
      ],
    }
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith('laravelSanctum', {
          data: {
            phone_number: this.phone_number,
            password: this.password,
          },
        })
        .then((response) => {
          if (this.$store.state.auth.user.role === 'user') {
            this.$router.push('/dashboard')
          } else {
            this.$router.push('/admin/dashboard')
          }
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    },
  },
}
</script>
