import { ref } from "vue";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  const currencyPairs = ["BTCUSDT", "BNBBTC", "ETHBTC"];
  const selectedPair = ref("BTCUSDT");
  const currencyPairChanges = ref([]);

  const setSelectedPair = (pair) => {
    selectedPair.value = pair;
  };

  const addCurrencyPairChange = (change) => {
    currencyPairChanges.value.unshift(change);
  };

  return {
    currencyPairs,
    selectedPair,
    currencyPairChanges,
    setSelectedPair,
    addCurrencyPairChange,
  };
});
