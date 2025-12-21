<template>
  <!-- 首屏加载优化，使用link preload -->
  <link rel="preload" as="image" :href="FirstPageSvg" @load="FirstPageLoad" @error="FirstPageLoad" />
  <link rel="preload" as="font" type="font/woff2" :href="FirstPageWoff" crossorigin="true" @load="FirstPageLoad" @error="FirstPageLoad" />
  <div class="container">
    <HoldPage v-if="loaded" :key="0"></HoldPage>
    <div class="pageContainer" v-else>
      <div class="page">
        <h2>数据加载中</h2>
        <p>请稍等喵(&gt;^ω^&lt;)</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from './stores/user';
import HoldPage from './views/HoldPage.vue';
const FirstPageSvg = new URL('@/assets/wpy-review.svg', import.meta.url).href;
const FirstPageWoff = new URL('@/assets/Cubic_11.woff2', import.meta.url).href;
const loaded = ref(false);
const myUser = useUserStore();
const preloaded = ref(false);
const api_result = ref(false);
async function initData() {
  api_result.value = await myUser.getApiData();
  // await loadFirstPageResources();
  loaded.value = api_result.value && preloaded.value;
}
// 首屏加载优化(两个大文件提前加载缓存)
let resources_loaded_num = 0;
function FirstPageLoad(){
  const all_num = document.querySelectorAll("link[rel='preload']").length;
  resources_loaded_num++;
  console.log("preload", resources_loaded_num);
  if (all_num === resources_loaded_num) preloaded.value = true;
  loaded.value = api_result.value && preloaded.value;
}
initData();
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.page p{
  margin-top: 15px;
}
</style>
