<template>
  <div class="order-book-page">
    <v-select
      :items="[100, 500, 1000]"
      v-model="itemsPerPage"
      label="Items per page"
      density="compact"
    ></v-select>

    <div class="order-book-page__row">
      <div class="order-book-page__table">
        <h1 class="order-book-page__title">Bids</h1>
        <v-data-table
          class="order-book-page__table-bids"
          :headers="currentHeaders"
          :items="bidsArray"
          :items-per-page="itemsPerPage"
          fixed-header
          hide-default-footer
        ></v-data-table>
      </div>

      <div class="order-book-page__table">
        <h1 class="order-book-page__title">Asks</h1>
        <v-data-table
          class="order-book-page__table-asks"
          :headers="currentHeaders"
          :items="asksArray"
          :items-per-page="itemsPerPage"
          fixed-header
          hide-default-footer
        ></v-data-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useBookStore } from '@/stores/book';
import { storeToRefs } from "pinia";

const { bidsArray, asksArray } = storeToRefs(useBookStore());
const { fetchOrderBookSnapshot, handleWebSocketUpdates } = useBookStore();

const fullHeaders = [
  { title: 'Price', key: 'price' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Total', key: 'total' }
];
const reducedHeaders = [
  { title: 'Price', key: 'price' },
  { title: 'Quantity', key: 'quantity' },
];

const screenWidth = ref(window.innerWidth);
const currentHeaders = computed(() => screenWidth.value <= 769 ? reducedHeaders : fullHeaders);

const itemsPerPage = ref(100);

const updateWidth = () => {
  screenWidth.value = window.innerWidth;
}

onMounted(async () => {
  if (bidsArray.value.length === 0 || asksArray.value.length === 0) {
    await fetchOrderBookSnapshot('BTCUSDT');

    handleWebSocketUpdates('BTCUSDT');

    window.addEventListener('resize', updateWidth);
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<style scoped>
.order-book-page {
  max-height: 100vh;
  overflow: hidden;
}

.order-book-page__row {
  display: flex;
  gap: 15px;
  overflow: hidden;
}

.order-book-page__table {
  width: 100%;
}

.order-book-page__table-bids,
.order-book-page__table-asks {
  height: calc(100vh - 220px);
  overflow: auto;
}

@media (max-width: 769px) {
  .order-book-page__title {
    font-size: 22px;
  }

  .order-book-page__row {
    flex-direction: column;
    gap: 8px;
  }

  .order-book-page__table-bids,
  .order-book-page__table-asks {
    height: 30vh;
  }
}
</style>