<template>
  <div class="banned">
    <page-search :search-config="searchConfig" />
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts">
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
</script>

<style scoped>
.banned {
}
</style>
