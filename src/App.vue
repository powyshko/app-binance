<template>
  <v-app class="v-app">
    <v-main class="v-app__main">
      <Header />

      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>

<style scoped>
.v-app__main {
  padding: 15px 8px;
}
</style>
