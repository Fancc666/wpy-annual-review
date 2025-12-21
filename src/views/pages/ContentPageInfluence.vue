<template>
  <div class="page" ref="page">
    <!-- 虚化背景 -->
    <div class="deco-bg"></div>
    <div class="plane"></div>
    <!-- 上方文本 -->
    <div class="text-group">
      <span class="text-year box">2025年</span>
      <span class="text-1 box">你一共收到了</span>
      <span class="text-1 box"><span class="show">{{ user.totalLikesReceived }}</span>个点赞</span>
      <span class="yulu box"><i>点赞是抽象的数字，</i></span>
      <span class="yulu box"><i>喜爱却是具体的感情。</i></span>
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
  background: linear-gradient(341.82deg, #3EC3B8 32.05%, #EFE8DB 56.48%, #FCD786 74.22%);
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

.text-year {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 89%;
  background: #FFFFFF;
  color: #E9BE5E;
  padding: 4px;
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
  background: url('@/assets/wpn-8.png') no-repeat;
  position: absolute;
  width: 396px;
  height: 261px;
  left: 52%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 8;
}

.wpn-say {
  position: absolute;
  left: 30px;
  bottom: 247px;
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
  inset: -85px -35px;
  /* 比文字大一圈（可改） */
  background: linear-gradient(128.31deg, #0093B7 17.47%, #4BB4A7 86.55%);
  opacity: 0.2;
  /* 透明度 */
  border-radius: 999px;
  /* 圆角可选 */
  pointer-events: none;
  /* z-index: 8; */
  -webkit-mask: radial-gradient(ellipse at center, #000 10%, #000 0, transparent 75%);
  ;
  mask: radial-gradient(ellipse at center, #000 10%, #000 0, transparent 75%);
}

.deco1 {
  background: url('@/assets/deco-8-1.png') no-repeat;
  position: absolute;
  width: 128px;
  height: 204px;
  right: 0;
  top: 0;
}

.deco2 {
  background: url('@/assets/deco-8-2.png') no-repeat;
  position: absolute;
  width: 186px;
  height: 407px;
  right: 0;
  bottom: 0;
}

.deco3 {
  background: url('@/assets/deco-8-3.png') no-repeat;
  position: absolute;
  width: 245px;
  height: 425px;
  left: 0;
  top: 245px;
}

.deco-bg {
  background: url('@/assets/deco-8-4.png') no-repeat;
  background-size: cover;
  position: absolute;
  width: 100%;
  aspect-ratio: 402 / 841;
  bottom: 0;
  left: 0;
  opacity: .7;
}

.plane {
  background: url('@/assets/plane-8.svg') no-repeat;
  position: absolute;
  width: 306px;
  height: 912px;
  top: 0;
  left: 18px;
}
</style>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
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

// for dialogue
const dialogues = reactive<string[]>([
  "不要吝惜手里的赞哦<br />小微也习惯<br />给自己点一个赞(´,,•ω•,,)♡"
]);
// const showDialogueIndex = ref(0);
// function seqDialogue() {
//   showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
// }
</script>
