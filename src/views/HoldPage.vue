<template>
  <div class="pageContainer">
    <!-- <ContentPage0 :page-id="0" :active-page="activePage">0</ContentPage0> -->
    <ContentPageStart :page-id="0" :active-page="activePage"></ContentPageStart>
    <ContentPageTenure :page-id="1" :active-page="activePage"></ContentPageTenure>
    <ContentPageView :page-id="2" :active-page="activePage"></ContentPageView>
    <ContentPageTime :page-id="3" :active-page="activePage" v-show="user.mostActivePeriod !== 'NONE'"></ContentPageTime>
    <ContentPageContent :page-id="4" :active-page="activePage"></ContentPageContent>
    <ContentPageSchool :page-id="5" :active-page="activePage"></ContentPageSchool>
    <ContentPageHot :page-id="6" :active-page="activePage" v-show="p4show"></ContentPageHot>
    <ContentPageInfluence :page-id="7" :active-page="activePage"></ContentPageInfluence>
    <!-- ContentPageSummary -->
    <ContentPageEnd :page-id="8" :active-page="activePage"></ContentPageEnd>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
// import ContentPage0 from './pages/ContentPage0.vue';

// views
import ContentPageStart from './pages/ContentPageStart.vue';
import ContentPageTenure from './pages/ContentPageTenure.vue';
import ContentPageView from './pages/ContentPageView.vue';
import ContentPageTime from './pages/ContentPageTime.vue';
import ContentPageContent from './pages/ContentPageContent.vue';
import ContentPageHot from './pages/ContentPageHot.vue';
import ContentPageInfluence from './pages/ContentPageInfluence.vue';
import ContentPageSchool from './pages/ContentPageSchool.vue';
import ContentPageEnd from './pages/ContentPageEnd.vue';

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const user = storeToRefs(userStore).userData.value!;

const p4show = ref(true);
if (user.mostLikedPostId === null || user.mostLikedFloorId === null){
  p4show.value = false;
}

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
