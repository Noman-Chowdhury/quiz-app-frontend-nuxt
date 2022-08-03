<template>
  <v-app>


    <v-main>
        <div class="d-flex overflow-x-hidden">
          <NavDrawer v-if="$auth.user"/>
        <v-container>
          <HeaderComp />
          <Nuxt />
        </v-container>
        </div>
      </v-main>

  </v-app>
</template>

<script>
import HeaderComp from '@/components/common/Header'
import NavDrawer from "@/components/common/NavDrawer";
export default {
  name: 'DefaultLayout',
  components: {NavDrawer, HeaderComp },
}
</script>
<style>
.test {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* stylelint-disable */
.v-input__slot {
  margin-bottom: -6px !important;
}
</style>
