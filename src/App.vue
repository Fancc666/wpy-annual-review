<template>
  <div class="container">
    <HoldPage v-if="loaded"></HoldPage>
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
const loaded = ref(false);
const myUser = useUserStore();
async function initData() {
  const result = await myUser.getApiData();
  loaded.value = result;
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
