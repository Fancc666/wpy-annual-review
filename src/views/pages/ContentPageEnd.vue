<template>
  <div class="page" ref="page">
    <h2 class="white">
      <span>写在最后</span>
    </h2>
    <div class="texts">
      <p class="box"><span class="data">天外天</span>感谢每一位用户的支持与陪伴！</p>
      <p class="box">让我们2026继续携手同行！</p>
      <p class="box">小微和工作室全体成员祝大家新年快乐！</p>
      <img src="@/assets/chr-test.jpg" class="wbn box" />
    </div>
    <div class="bottom white">
      <p class="box">
        <span @click="clicked = true">TwT Studio, 2025. </span>
        <span v-if="clicked">@FANCC</span>
      </p>
    </div>
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
h2{
  margin-top: 50px;
}
h2 span{
  display: inline-block;
}
.texts{
  color: white;
  margin-top: 50px;
}
.texts > *{
  margin: 30px 0;
}
.bottom{
  position: absolute;
  bottom: 50px;
}
.wbn{
  margin: 0 auto;
  display: block;
  max-height: 248px;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';
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
const clicked = ref(false);
const props = defineProps<{ activePage: number, pageId: number }>();
watch(() => props.activePage, () => {
  if (props.activePage !== props.pageId) {
    clearAnimate();
    clicked.value = false;
    return;
  }
  console.log("play animation:", props.activePage);
  applyAnimate();
});
</script>
