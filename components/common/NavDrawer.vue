<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item link>
        <v-list-item-avatar color="grey lighten-3">
          <!--          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>-->
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ $auth.user.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{
            $auth.user.phone_number
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item
        v-for="(nav, index) in navs"
        :key="index"
        link
        :to="nav.route"
      >
        <v-list-item-icon>
          <v-icon>{{ nav.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ nav.title }}</v-list-item-title>
      </v-list-item>
      <v-list-item link @click.prevent="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import admin from '@/components/navigation/admin'
import user from '@/components/navigation/user'

export default {
  name: 'NavDrawer',
  data() {
    return {
      drawer: true,
      navs: null,
    }
  },
  created() {
    if (this.$auth.user) {
      this.navs = user
    } else {
      this.navs = admin
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style scoped></style>
