<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useOrdersStore from '../../../application/orders.store.js';
import { useOfferingsStore } from '@/offerings/application/offerings.store.js';

const { t } = useI18n();
const router = useRouter();
const ordersStore = useOrdersStore();
const offeringsStore = useOfferingsStore();

const form = ref({
  locationId: null,
  coffee: null,
  quantity: 1
});

const availableCoffees = ref([]);
const selectedCoffeeImage = ref('');
const capacityError = ref(false);

onMounted(() => {
  ordersStore.fetchLocations();
  ordersStore.fetchOrders();
});

const locations = computed(() => ordersStore.locations);

const selectedLocation = computed(() => {
  if (!form.value.locationId) return null;
  return ordersStore.getLocationById(form.value.locationId);
});

const availableCapacity = computed(() => {
  if (!selectedLocation.value) return 0;
  const locOrders = ordersStore.orders.filter(o => o.locationId === selectedLocation.value.id);
  const totalOrdered = locOrders.reduce((sum, o) => sum + o.quantity, 0);
  return selectedLocation.value.maxCapacity - totalOrdered;
});

const onLocationChange = async () => {
  form.value.coffee = null;
  selectedCoffeeImage.value = '';
  if (selectedLocation.value) {
    availableCoffees.value = await offeringsStore.fetchCoffeesByType(selectedLocation.value.coffeeType);
  }
};

const onCoffeeChange = (event) => {
  selectedCoffeeImage.value = event.value?.image || '';
};

const saveOrder = () => {
  if (form.value.quantity > availableCapacity.value) {
    capacityError.value = true;
    return;
  }
  capacityError.value = false;

  ordersStore.addOrder({
    locationId: selectedLocation.value.id,
    coffeeType: selectedLocation.value.coffeeType,
    coffeeId: form.value.coffee.id,
    coffeeName: form.value.coffee.title,
    quantity: form.value.quantity,
    registeredAt: new Date().toISOString()
  }).then(() => {
    router.push({ name: 'home' });
  });
};

const navigateBack = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <section class="page-section">
    <header class="page-heading">
      <h1>{{ t('order.new-title') }}</h1>
      <p>{{ t('order.new-subtitle') }}</p>
    </header>

    <div class="order-layout">
      <form class="order-form" @submit.prevent="saveOrder">
        <div class="form-field">
          <label for="location">{{ t('order.location') }}</label>
          <pv-select
            id="location"
            v-model="form.locationId"
            :options="locations"
            optionLabel="name"
            optionValue="id"
            :placeholder="t('order.select-location')"
            class="w-full"
            required
            @change="onLocationChange"
          />
        </div>

        <div v-if="selectedLocation" class="form-field">
          <label for="coffee">{{ t('order.coffee') }}</label>
          <pv-select
            id="coffee"
            v-model="form.coffee"
            :options="availableCoffees"
            optionLabel="title"
            :placeholder="t('order.select-coffee')"
            class="w-full"
            required
            @change="onCoffeeChange"
          />
          <small class="muted">{{ t('order.available-capacity') }}: <strong>{{ availableCapacity }}</strong></small>
        </div>

        <div v-if="form.coffee" class="form-field">
          <label for="quantity">{{ t('order.quantity') }}</label>
          <pv-input-number
            id="quantity"
            v-model="form.quantity"
            :min="1"
            :max="availableCapacity > 0 ? availableCapacity : 1"
            class="w-full"
            required
          />
          <small v-if="capacityError" class="form-error">{{ t('order.exceeds-capacity') }}</small>
        </div>

        <div class="form-actions">
          <button class="primary-button" type="submit">{{ t('order.save') }}</button>
          <button class="secondary-button" type="button" @click="navigateBack">{{ t('order.cancel') }}</button>
        </div>
      </form>

      <aside v-if="selectedCoffeeImage" class="coffee-preview">
        <p>{{ t('order.coffee-preview') }}</p>
        <img :src="selectedCoffeeImage" :alt="t('order.coffee-preview')">
      </aside>
    </div>
  </section>
</template>