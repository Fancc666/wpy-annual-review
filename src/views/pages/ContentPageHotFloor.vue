<template>
  <div class="page" ref="page">
    <!-- 虚化背景 -->
    <div class="plane"></div>
    <div class="deco-bg"></div>
    <!-- 上方文本 -->
    <div class="text-group">
      <span class="text-year box">2025年</span>
      <span class="text-1 box">你获赞最多的评论是</span>
      <span class="text-postname box">“{{ user.mostLikedFloorContent }}”</span>
      <span class="text-1 box">有<span class="show">{{ user.mostLikedFloorLikes }}</span>个用户为你点赞</span>
      <span class="yulu box"><i>读者的评论也是作品的一部分。</i></span>
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
    <div class="deco1"></div>
    <div class="deco2"></div>
    <div class="deco3"></div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(349.28deg, #C5FFDE -4.23%, #FCD786 44.9%, #F67A7D 89.53%);
  position: relative;
  padding: 0;
}

.text-group {
  margin-top: 10vh;
  /* text-align: right; */
  margin-right: 25px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.text-group>span {
  display: block;
  width: fit-content;
  margin: 0 0 8px auto;
}

.text-year,
.text-postname {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 89%;
  background: #FFFFFF;
  color: #F7797D;
  ;
  padding: 4px;
}

.text-group .text-postname {
  margin-left: 25px;
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
  background: url('@/assets/wpn-7.png') no-repeat;
  position: absolute;
  width: 285px;
  height: 383px;
  right: 0;
  bottom: 0;
}

.wpn-say {
  position: absolute;
  left: 28px;
  bottom: 350px;
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
}

/* 渐变背景层 */
.eclipse {
  /* content: ''; */
  position: absolute;
  inset: -50px -35px;
  /* 比文字大一圈（可改） */
  background: linear-gradient(127.15deg, #F67A7D 17.26%, #DAE1BA 100%);
  opacity: 0.2;
  /* 透明度 */
  border-radius: 999px;
  /* 圆角可选 */
  pointer-events: none;
  /* z-index: 0; */
  -webkit-mask: radial-gradient(ellipse at center, #000 10%, #000 0, transparent 75%);
  mask: radial-gradient(ellipse at center, #000 10%, #000 0, transparent 75%);
}

.deco1 {
  background: url('@/assets/deco-7-1.png') no-repeat;
  position: absolute;
  width: 260px;
  height: 160px;
  top: 0;
  right: 80px;
}

.deco2 {
  background: url('@/assets/deco-7-2.png') no-repeat;
  position: absolute;
  width: 211px;
  height: 320px;
  top: 30vh;
  right: 0;
}

.deco3 {
  background: url('@/assets/deco-7-3.png') no-repeat;
  position: absolute;
  width: 353px;
  height: 462px;
  bottom: 0;
  left: 0;
}

.deco-bg {
  background: url('@/assets/deco-7-4.png') no-repeat;
  background-size: cover;
  position: absolute;
  width: 100%;
  aspect-ratio: 402 / 841;
  bottom: 0;
  left: 0;
  opacity: .7;
}

.plane {
  background: url('@/assets/plane-7.svg') no-repeat;
  position: absolute;
  width: 216px;
  height: 980px;
  left: 10px;
  top: 0;
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
const dialogues = reactive<string[]>(['你还记得这条评论<br />是在哪里发的吗？']);
// const showDialogueIndex = ref(0);
// function seqDialogue() {
//   showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
// }
</script>
