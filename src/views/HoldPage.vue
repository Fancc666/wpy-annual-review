<template>
  <div class="pageContainer">
    <ContentPage0>0</ContentPage0>
    <ContentPage0>1</ContentPage0>
    <ContentPage0>2</ContentPage0>
    <ContentPage0>3</ContentPage0>
    <ContentPage0>4</ContentPage0>
    <ContentPage0>5</ContentPage0>
  </div>
</template>

<script lang="ts" setup>
import ContentPage0 from './pages/ContentPage0.vue';
</script>

<style scoped>
.pageContainer{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  scroll-snap-type: y mandatory;
  max-height: 100vh;
  overflow: scroll;
}
</style>
