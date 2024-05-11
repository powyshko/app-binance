<template>
  <div class="settings-page">
    <h1 class="settings-page__title">Настройки</h1>

    <v-select
      v-model="selectedPair"
      :items="currencyPairs"
      variant="underlined"
      label="Выберите валютную пару"
      @update:modelValue="handleCurrencyPairChange"
    ></v-select>

    <div class="settings-page__logs">
      <h2 class="settings-page__subtitle">Лог изменений:</h2>

      <ul>
        <li
          v-for="change in currencyPairChanges"
          :key="change.timestamp"
        >
          {{ change.from }} → {{ change.to }} ({{ change.timestamp }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useBookStore } from '@/stores/book';
import { storeToRefs } from "pinia";

const { selectedPair, currencyPairChanges } = storeToRefs(useSettingsStore());

const {
  currencyPairs,
  setSelectedPair,
  addCurrencyPairChange,
} = useSettingsStore();

const { fetchOrderBookSnapshot, handleWebSocketUpdates } = useBookStore();

const getPreviousPair = () => {
  const isCurrencyPairChanges = currencyPairChanges.value.length > 0;

  if (isCurrencyPairChanges) {
    return currencyPairChanges.value[0].to;
  } else {
    return 'BTCUSDT';
  }
}

const handleCurrencyPairChange = async (pair) => {
  const previousPair = getPreviousPair();

  const change = {
    from: previousPair,
    to: pair,
    timestamp: new Date().toLocaleTimeString()
  };

  setSelectedPair(pair);
  addCurrencyPairChange(change);

  await handleUpdateOrderBook();
};

const handleUpdateOrderBook = async () => {
  await fetchOrderBookSnapshot(selectedPair.value)

  handleWebSocketUpdates(selectedPair.value);
}

onMounted(async () => {
  await handleUpdateOrderBook();
})
</script>

<style scoped>
@media (max-width: 769px) {
  .settings-page__title {
    font-size: 22px;
  }

  .settings-page__subtitle {
    font-size: 20px;
  }
}
</style>