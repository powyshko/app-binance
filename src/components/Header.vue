<template>
  <header class="header">
    <img
      src="@/assets/logo.svg"
      alt="Logo"
      class="header__logo"
    />

    <nav class="header__nav">
      <v-btn
        variant="text"
        :to="{ name: 'settings' }"
      >
        Настройки
      </v-btn>

      <v-btn
        variant="text"
        :to="{ name: 'order-book' }"
      >
        Order Book
      </v-btn>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}

.header__logo {
  width: 35px;
  height: 35px;
}

.header__nav {
  display: flex;
  gap: 10px;
}
</style>