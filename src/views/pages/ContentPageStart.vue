<template>
  <div class="page" ref="page">
    <h2 class="white">
      <span>{{ user.nickname }}！</span>
      <span>请查收你的微北洋年度报告</span>
    </h2>
    <p class="white text">
      <span>让小微来陪你一起看看吧！</span>
      <span>微北娘发言：好久不见~想小微了吗？</span>
    </p>
    <p class="white bottom">向下滑动开启年度报告~</p>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #e2c6ff 100%);
  position: relative;
}

.big {
  font-size: 2em;
}

h2 {
  margin-top: 50px;
}

h2 span {
  display: inline-block;
}

.text {
  position: absolute;
  top: 50%;
}
.text span{
  display: block;
  padding: 8px 0;
}

.bottom {
  position: absolute;
  bottom: 50px;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const user = storeToRefs(userStore).userData.value!;

const page = ref<HTMLElement>();
const timers: number[] = [];
function clearAnimate() {
  timers.forEach(t => clearTimeout(t));
  page.value?.querySelectorAll(".box").forEach(e => {
    e.classList.remove("an-slidein");
  });
}
function applyAnimate() {
  let count = 0;
  page.value?.querySelectorAll(".box").forEach(e => {
    timers.push(
      setTimeout(() => {
        e.classList.add("an-slidein");
      }, 350 * count)
    );
    count++;
  });
}

const props = defineProps<{ activePage: number, pageId: number }>();
watch(() => props.activePage, () => {
  if (props.activePage !== props.pageId) {
    clearAnimate();
    return;
  }
  console.log("play animation:", props.activePage);
  applyAnimate();
});
</script>
