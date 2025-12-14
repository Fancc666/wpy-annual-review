<template>
  <div class="pageContainer">
    <!-- <ContentPage0 :page-id="0" :active-page="activePage">0</ContentPage0> -->
    <ContentPageStart :page-id="0" :active-page="activePage"></ContentPageStart>
    <ContentPage1 :page-id="1" :active-page="activePage"></ContentPage1>
    <ContentPage2 :page-id="2" :active-page="activePage"></ContentPage2>
    <ContentPage3 :page-id="3" :active-page="activePage"></ContentPage3>
    <ContentPage4 :page-id="4" :active-page="activePage"></ContentPage4>
    <ContentPage5 :page-id="5" :active-page="activePage"></ContentPage5>
    <ContentPage6 :page-id="6" :active-page="activePage"></ContentPage6>
    <ContentPageEnd :page-id="7" :active-page="activePage"></ContentPageEnd>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
// import ContentPage0 from './pages/ContentPage0.vue';

// views
import ContentPageStart from './pages/ContentPageStart.vue';
import ContentPage1 from './pages/ContentPage1.vue';
import ContentPage2 from './pages/ContentPage2.vue';
import ContentPage3 from './pages/ContentPage3.vue';
import ContentPage4 from './pages/ContentPage4.vue';
import ContentPage5 from './pages/ContentPage5.vue';
import ContentPage6 from './pages/ContentPage6.vue';
import ContentPageEnd from './pages/ContentPageEnd.vue';

const activePage = ref(-1);

function initPageWatcher() {
  const scroller = document.querySelector(".pageContainer");
  const pages = document.querySelectorAll('.page');
  console.log(scroller, pages);

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

<style scoped></style>
