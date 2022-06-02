<template>
  <v-app>
    <HeaderComp />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComp from '@/components/common/Header'
export default {
  name: 'DefaultLayout',
  components: { HeaderComp },
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
