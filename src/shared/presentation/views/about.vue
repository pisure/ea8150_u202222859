<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="page-section">
    <article class="simple-card">
      <h1>{{ t('option.about') }}</h1>
      <p class="muted">
        Blue Bottle helps coffee lovers discover specialty coffee options and organize cafe orders in one place.
      </p>
    </article>
  </section>
</template>