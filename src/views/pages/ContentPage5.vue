<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">2025年，你一共收到了xx个赞</p>
      <p class="box"><i>点赞是抽象的数字，喜爱却是是具体的感情</i></p>
    </div>
    <div class="rd">
      <div class="dialogue box">
        确实很精彩呢，小微也给你点赞~<br />你知道吗？小微习惯给自己点一个赞(´,,•ω•,,)♡
      </div>
      <img src="@/assets/chr-test.jpg" class="wbn" />
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(135deg, #667eea 0%, #e2c6ff 100%);
  position: relative;
}
.group{
  padding: 70px 0;
  margin: 0 auto;
}
.group > *{
  margin-bottom: 40px;
}
.rd{
  width: 85%;
  display: flex;
  margin: 0 12px 0 auto;
  gap: 10px
}
.wbn{
  width: 40%;
}
.dialogue{
  background-color: #f6f6f6;
  padding: 8px;
  box-sizing: border-box;
  /* border: 1px solid black; */
  border-radius: 10px;
  height: fit-content;
}
.dialogue::after{
    content: '';
    width: 0;
    height: 0;
    border-left: 12px solid #f6f6f6;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    position: absolute;
    right: -9px;
    top: 20%;
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
