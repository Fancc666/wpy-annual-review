<template>
  <div class="page" ref="page">
    <!-- 虚化背景 -->
    <div class="deco-bg"></div>
    <div class="plane"></div>
    <!-- 上方文本 -->
    <div class="text-group">
      <span class="text-year box">2025年</span>
      <span class="text-1 box">你获赞最多的帖子是<span class="show">#MP{{ user.mostLikedPostId }}</span></span>
      <span class="text-postname box">《{{ user.mostLikedPostTitle }}》</span>
      <span class="text-1 box">有<span class="show">{{ user.mostLikedPostLikes }}</span>个用户为你点赞</span>
      <span class="yulu box"><i>可以为点赞数而激动，但不要被它激怒。</i></span>
    </div>
    <!-- 微北娘 -->
    <div class="wpn"></div>
    <div class="wpn-say">
      <div class="box">
        <div class="eclipse"></div>
        <span class="wpn-text" v-html="dialogues[0]"></span>
      </div>
    </div>
    <!-- 装饰 -->
    <div class="deco-1"></div>
    <div class="deco-2"></div>
    <div class="deco-3"></div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(349.28deg, #EBECC7 21.46%, #2BC0E4 70.15%, #2BC0E4 89.53%);
  position: relative;
  padding: 0;
}

.text-group {
  margin-top: 10vh;
  /* text-align: right; */
  margin-left: 25px;
  z-index: 9;
}

.text-group>span {
  display: block;
  width: fit-content;
  margin: 0 auto 8px 0;
}

.text-year,
.text-postname {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 89%;
  background: #FFFFFF;
  color: #68ADFF;
  padding: 4px;
}

.text-group .text-postname {
  margin-right: 25px;
  line-height: 1.5em;
}

.text-1 {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  color: #FFFFFF;
}

.yulu {
  font-family: 'JiangChengXieHei';
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.8);
  padding-top: 10px;
}

.show {
  font-family: 'Smiley Sans';
  font-style: italic;
  font-weight: 400;
  font-size: 40px;
  line-height: 100%;
  color: #FFFFFF;
  margin: 0 4px;
}

.wpn {
  background: url('@/assets/wpn-6.png');
  position: absolute;
  width: 254px;
  height: 387px;
  left: 0;
  bottom: 5px;
}

.wpn-say {
  position: absolute;
  width: max-content;
  right: 40px;
  top: 55%;
  z-index: 9;
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
  position: relative;
}

/* 渐变背景层 */
.eclipse {
  /* content: ''; */
  position: absolute;
  inset: -50px -35px;
  /* 比文字大一圈（可改） */
  background: linear-gradient(125.66deg, #2BC0E4 16.99%, #9BDAD2 121.84%);
  opacity: 0.2;
  /* 透明度 */
  border-radius: 999px;
  /* 圆角可选 */
  pointer-events: none;
  /* z-index: 0; */
  -webkit-mask: radial-gradient(ellipse at center, #000 10%, #000 0, transparent 75%);
  ;
  mask: radial-gradient(ellipse at center, #000 10%, #000 0, transparent 75%);
}

.deco-1 {
  background: url('@/assets/deco-6-1.png') no-repeat;
  position: absolute;
  width: 128px;
  height: 205px;
  top: 5px;
  right: 0;
}

.deco-2 {
  background: url('@/assets/deco-6-2.png') no-repeat;
  position: absolute;
  width: 210px;
  height: 292px;
  bottom: 300px;
  left: 0;
}

.deco-3 {
  background: url('@/assets/deco-6-3.png') no-repeat;
  position: absolute;
  width: 325px;
  height: 458px;
  bottom: -20px;
  right: 0;
}

.deco-bg {
  background: url('@/assets/deco-6-4.png') no-repeat;
  background-size: cover;
  position: absolute;
  width: 100%;
  aspect-ratio: 402 / 841;
  bottom: 0;
  left: 0;
  opacity: .7;
}

.plane {
  background: url('@/assets/plane-6.svg') no-repeat;
  position: absolute;
  width: 271px;
  height: 970px;
  top: 0;
  left: 12px;
  opacity: .8;
}
</style>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
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

// for dialogue
const dialogues = reactive<string[]>(['好多人点赞啊!<br />小微也要来围观~']);
// const showDialogueIndex = ref(0);
// function seqDialogue() {
//   showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
// }
</script>
