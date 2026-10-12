<script setup>
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";
import useOrdersStore from "../../../application/orders.store.js";
import CafeLocationSummary from "../components/cafe-location-summary.vue";

const { t } = useI18n();
const ordersStore = useOrdersStore();

onMounted(() => {
  ordersStore.fetchLocations();
  ordersStore.fetchOrders();
});

</script>

<template>
  <section class="page-section">
    <header class="page-heading">
      <h1>{{ t('home.title') }}</h1>
      <p>{{ t('home.content') }}</p>
    </header>

    <section>
      <h2>{{ t('home.my-orders') }}</h2>
      <div class="location-grid">
        <div v-for="location in ordersStore.locations" :key="location.id">
          <cafe-location-summary :location="location" :orders="ordersStore.orders" />
        </div>
      </div>
    </section>
  </section>
</template>