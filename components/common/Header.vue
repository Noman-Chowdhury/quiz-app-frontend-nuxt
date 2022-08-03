<template>
  <div>
    <!--    NAVBAR START-->
    <v-app-bar app elevate-on-scrol>
      <v-toolbar-title class="text-white font-weight-black"
        >QuickQuiz</v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn text @click="$router.replace('/')">
        <v-icon>mdi-home-outline</v-icon>Home
      </v-btn>
      <!--      <v-btn text @click="$router.replace({ name: 'home' })">-->
      <!--        <v-icon>mdi-information-outline</v-icon>About-->
      <!--      </v-btn>-->
      <v-btn v-if="$auth.user" text @click="$router.replace('/result')">
        <v-icon>mdi-clipboard-check</v-icon>Result
      </v-btn>

      <!--      <v-menu offset-y transition="slide-y-transition">-->
      <!--        <template #activator="{ on, attrs }">-->
      <!--          <v-btn icon v-bind="attrs" v-on="on">-->
      <!--            <v-icon>mdi-dots-vertical</v-icon>-->
      <!--          </v-btn>-->
      <!--        </template>-->

      <!--        <v-list>-->
      <!--          <v-list-item-->
      <!--            link-->
      <!--          >-->
      <!--            <v-icon class="pr-2">mdi-account-details</v-icon>-->
      <!--            <v-list-item-title>Profile </v-list-item-title>-->
      <!--          </v-list-item>-->
      <!--          <v-list-item link>-->
      <!--            <v-icon class="pr-2">mdi-account-cog</v-icon>-->
      <!--            <v-list-item-title>Setting</v-list-item-title>-->
      <!--          </v-list-item>-->
      <!--          <v-list-item link @click="handleLogout">-->
      <!--            <v-icon class="pr-2">mdi-location-exit</v-icon>-->
      <!--            <v-list-item-title>Logout</v-list-item-title>-->
      <!--          </v-list-item>-->
      <!--        </v-list>-->
      <!--      </v-menu>-->
    </v-app-bar>
  </div>
</template>

<script>
// import {getUserData} from "../../utilities/auth-helpers";
export default {
  name: 'HeaderComp',
  data() {
    return {
      drawer: false,
      // user: getUserData(),
      user: '',
    }
  },
  mounted() {
    // this.showDrawer()
  },
  methods: {
    // showDrawer() {
    //   console.log(this.user.followings)
    //   if (screen.width > 1263) {
    //     this.drawer = true
    //   }
    // },
    handleLogout() {
      // eslint-disable-next-line no-undef
      // axios.post('api/v1/logout', {}, {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('_t')}`
      //   }
      // }).then((response) => {
      //   console.log(response.data)
      //   localStorage.removeItem("_t")
      //   localStorage.removeItem("_u")
      //   this.$router.push('/login')
      // }).then((error) => {
      //   console.log(error)
      // })
    },
  },
}
</script>
