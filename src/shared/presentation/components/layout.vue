<script setup>
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const items = [
  { label: 'option.home', to: '/home' },
  { label: 'option.new-cafe-order', to: '/cafe/orders/new' },
  { label: 'option.about', to: '/about' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

const changeLanguage = language => locale.value = language;
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <router-link class="brand" to="/home">
        <i class="pi pi-coffee" aria-hidden="true" />
        <span>Blue Bottle</span>
      </router-link>

      <nav class="app-nav" aria-label="Main navigation">
        <router-link v-for="item in items" :key="item.to" :to="item.to" class="nav-link">
          {{ t(item.label) }}
        </router-link>

        <div class="language-switch" aria-label="Language">
          <button
            v-for="language in languages"
            :key="language.code"
            class="language-button"
            :class="{ 'is-active': locale === language.code }"
            type="button"
            :aria-pressed="locale === language.code"
            @click="changeLanguage(language.code)"
          >
            {{ language.label }}
          </button>
        </div>
      </nav>
    </header>

    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>