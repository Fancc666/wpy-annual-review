<template>
  <div class="pageContainer">
    <ContentPage0 :page-id="0" :active-page="activePage">0</ContentPage0>
    <ContentPage0 :page-id="1" :active-page="activePage">1</ContentPage0>
    <ContentPage0 :page-id="2" :active-page="activePage">2</ContentPage0>
    <ContentPage0 :page-id="3" :active-page="activePage">3</ContentPage0>
    <ContentPage0 :page-id="4" :active-page="activePage">4</ContentPage0>
    <ContentPage0 :page-id="5" :active-page="activePage">5</ContentPage0>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ContentPage0 from './pages/ContentPage0.vue';
const activePage = ref(-1);

function initPageWatcher() {
  const scroller = document.querySelector(".pageContainer");
  const pages = document.querySelectorAll('.page');
  // console.log(scroller, pages);

  // 1. 观察每一页
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = Array.from(pages).indexOf(entry.target as HTMLElement);
      if (entry.isIntersecting && idx !== -1) {
        activePage.value = idx;     // 通知全世界
      }
    });
  }, {
    root: scroller,      // 关键：滚动的元素
    threshold: 0.9       // 60% 面积出现就算“进入”
  });

  // 2. 注册所有页
  pages.forEach(p => io.observe(p));
}

onMounted(() => initPageWatcher());
</script>

<style scoped>
.pageContainer {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  scroll-snap-type: y mandatory;
  max-height: 100vh;
  overflow: scroll;
}
</style>
