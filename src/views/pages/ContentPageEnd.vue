<template>
  <div class="page" ref="page">
    <!-- 先做装饰吧 -->
    <div class="bg"></div>
    <div class="plane"></div>
    <div class="wpn">
      <div class="wpn-say">
        <span class="wpn-text">来年再见！</span>
      </div>
    </div>
    <!-- 文本 -->
    <div class="text-group">
      <span>天外天感谢每一位用户的支持与陪伴！</span>
      <div class="end-line"></div>
      <span>2026，让我们继续并肩同行！</span>
      <div class="end-line"></div>
      <span>祝大家新年快乐，万事顺意！</span>
      <div class="end-line"></div>
      <span class="twt">· 天外天工作室全体成员 敬上 ·</span>
      <div class="twtlogo"></div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(169.28deg, #5CA0EF 10.47%, #4098FF 38.49%, #AEF7FF 104.23%);
  position: relative;
  padding: 0;
}

.bg {
  background: url('@/assets/deco-10-1.png') no-repeat;
  position: absolute;
  background-size: cover;
  left: 0;
  top: 0;
  width: 100%;
  aspect-ratio: 402 / 423;
}

.plane {
  background: url('@/assets/plane-10.svg') no-repeat;
  width: 93px;
  height: 236px;
  z-index: 3;
}

.wpn {
  background: url('@/assets/wpn-10.png') no-repeat;
  position: absolute;
  width: 356px;
  height: 394px;
  z-index: 3;
  bottom: 0;
  right: 0;
}

.wpn-say {
  position: absolute;
  right: 190px;
  top: 270px;
  width: max-content;
}

.wpn-text {
  font-family: 'Cubic11';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 142.49%;
  letter-spacing: 0.03em;
  font-feature-settings: 'halt' on, 'kern' off;
  color: #FFFFFF;
}

.text-group {
  margin-top: 15px;
  text-align: center;
  z-index: 9;
}

.text-group>span {
  display: block;
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  font-feature-settings: 'halt' on;
  color: #FFFFFF;
}

.end-line {
  background: url('@/assets/end-line.svg') no-repeat;
  width: 100%;
  height: 2px;
  margin-bottom: 12px;
}

.twt {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 29px;
  text-align: center;
  font-feature-settings: 'halt' on;
  color: #FFFFFF;
  margin-top: 35px;
}

.twtlogo {
  background: url('@/assets/twtlogo.svg') no-repeat;
  width: 48px;
  height: 41px;
  margin: 66px auto 0 auto;
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
