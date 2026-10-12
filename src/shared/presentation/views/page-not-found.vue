<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const unavailableRoute = route.fullPath;
</script>

<template>
  <section class="page-section">
    <article class="simple-card">
      <h1>{{ t('page-not-found.title') }}</h1>
      <p class="muted">{{ t('page-not-found.content', { 'unavailable-route': unavailableRoute }) }}</p>
      <button class="primary-button" type="button" @click="router.push({ name: 'home' })">
        {{ t('page-not-found.go-home') }}
      </button>
    </article>
  </section>
</template>