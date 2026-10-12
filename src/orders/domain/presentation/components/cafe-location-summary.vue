<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  location: { type: Object, required: true },
  orders: { type: Array, default: () => [] }
});

const { t } = useI18n();

const locationOrders = computed(() => props.orders.filter(o => o.locationId === props.location.id));
const totalOrdered = computed(() => locationOrders.value.reduce((sum, o) => sum + o.quantity, 0));
const availableCapacity = computed(() => props.location.maxCapacity - totalOrdered.value);
</script>

<template>
  <article class="location-card">
    <h3>{{ location.name }}</h3>
    <p v-if="locationOrders.length === 0" class="muted">{{ t('orders.no-orders') }}</p>
    <ul v-else class="order-list">
      <li v-for="order in locationOrders" :key="order.id">
        <span>{{ order.coffeeName }}</span>
        <span class="muted">{{ t('orders.quantity-short') }}: {{ order.quantity }}</span>
      </li>
    </ul>
    <footer class="location-stats">
      <span>{{ t('orders.total-ordered') }} <strong>{{ totalOrdered }}</strong></span>
      <span>{{ t('orders.available-capacity') }} <strong>{{ availableCapacity }}</strong></span>
    </footer>
  </article>
</template>