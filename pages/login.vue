<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
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
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  auth: 'guest',
  name: 'LoginPage',
  data() {
    return {
      phone_number: '',
      password: '',
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
