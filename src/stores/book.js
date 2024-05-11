import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getDepthSnapshot, openWebSocket } from "@/controllers/binance";

export const useBookStore = defineStore("book", () => {
  const orderBook = ref({ bids: {}, asks: {} });

  let lastUpdateId = null;

  const LIMIT = 1000;

  let ws = null;

  const fetchOrderBookSnapshot = async (symbol) => {
    const snapshot = await getDepthSnapshot(symbol, LIMIT);

    orderBook.value = {
      bids: convertToMap(snapshot.bids),
      asks: convertToMap(snapshot.asks),
    };

    lastUpdateId = snapshot.lastUpdateId;
  };

  const convertToMap = (list) => {
    const map = {};
    list.forEach((item) => {
      map[item[0]] = parseFloat(item[1]);
    });
    return map;
  };

  const handleWebSocketUpdates = (symbol) => {
    if (ws) {
      ws.close();
    }

    ws = openWebSocket(symbol.toLowerCase());

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);

      if (update.u <= lastUpdateId) return;

      if (update.U <= lastUpdateId + 1 && update.u >= lastUpdateId + 1) {
        lastUpdateId = update.u;
      } else {
        lastUpdateId = update.u;
      }

      updateOrderBook(update);
    };
  };

  const updateOrderBook = (update) => {
    const { a: asks, b: bids } = update;

    asks.forEach(([price, qty]) => {
      if (qty === "0.00000000") {
        delete orderBook.value.asks[price];
      } else {
        orderBook.value.asks[price] = parseFloat(qty);
      }
    });

    bids.forEach(([price, qty]) => {
      if (qty === "0.00000000") {
        delete orderBook.value.bids[price];
      } else {
        orderBook.value.bids[price] = parseFloat(qty);
      }
    });
  };

  const convertMapToArray = (map) => {
    return Object.keys(map).map((key) => ({
      price: parseFloat(key),
      quantity: map[key],
      total: parseFloat(key) * map[key],
    }));
  };

  const bidsArray = computed(() => {
    return convertMapToArray(orderBook.value.bids);
  });

  const asksArray = computed(() => {
    return convertMapToArray(orderBook.value.asks);
  });

  return {
    orderBook,
    bidsArray,
    asksArray,
    fetchOrderBookSnapshot,
    handleWebSocketUpdates,
  };
});
