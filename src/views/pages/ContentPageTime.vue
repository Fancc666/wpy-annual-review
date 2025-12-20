<template>
  <div :class="['page', user.mostActivePeriod.toLowerCase()]" ref="page">
    <!-- 上方文本 -->
    <div class="text-group">
      <span class="text-1 box">你最爱在<span class="show">{{ titleText }}</span></span>
      <span class="text-1 box">浏览微北洋</span>
      <span class="yulu box"><i>信息的即时传递消灭了晨钟暮鼓，</i></span>
      <span class="yulu box"><i>但太阳依旧升起和落下。</i></span>
    </div>
    <!-- 微北娘 -->
    <div class="wpn"></div>
    <div class="wpn-text">
      <span class="wpn-say box" v-html="dialogues[0]"></span>
    </div>
    <!-- 装饰 -->
    <div class="plane"></div>
    <!-- 时间相关装饰 -->
    <div v-if="user.mostActivePeriod === 'MORNING'">
      <div class="deco-1-1"></div>
      <div class="deco-1-2"></div>
      <div class="deco-1-3"></div>
    </div>
    <div v-if="user.mostActivePeriod === 'NOON'">
      <div class="deco-2-1"></div>
      <div class="deco-2-2"></div>
      <div class="deco-2-3"></div>
    </div>
    <div v-if="user.mostActivePeriod === 'AFTERNOON'">
      <div class="deco-3-1"></div>
      <div class="deco-3-2"></div>
      <div class="deco-3-3"></div>
    </div>
    <div v-if="user.mostActivePeriod === 'NIGHT'">
      <div class="deco-4-1"></div>
      <div class="deco-4-2"></div>
      <div class="deco-4-3"></div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(169.28deg, #FF7D5C 10.47%, #FFC05C 39.48%, #EDEDED 80.79%, #E8FDFF 104.23%);
  position: relative;
  padding: 0;
}

.page.morning {
  background: linear-gradient(169.28deg, #FF7D5C 10.47%, #FFC05C 39.48%, #EDEDED 80.79%, #E8FDFF 104.23%);
}

.page.noon {
  background: linear-gradient(169.28deg, #FFC05C 10.47%, #E8EFEC 56%, #A6D3E9 87.1%, #3DBEFF 100.63%);
}

.page.afternoon{
  background: linear-gradient(168.92deg, #FFCA76 1.75%, #E8EFEC 21.95%, #A6D3E9 51.01%, #3DBEFF 88.45%, #005EEA 104.21%);
}

.page.night{
  background: linear-gradient(168.62deg, #1E1074 1.76%, #1C1EAB 17.11%, #3585DA 53.4%, #AEC6E7 85.62%, #C5B9F2 98.74%);
}

.text-group {
  margin-top: 12vh;
  text-align: right;
  margin-right: 32px;
  z-index: 9;
}

.text-group>span {
  display: block;
  width: fit-content;
  margin: 0 0 10px auto;
}

.text-1 {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  color: #FFFFFF;
}

.page.noon .text-1 {
  color: #E63D00;
}

.page.afternoon .text-1 {
  color: #424242;
}

.yulu {
  font-family: 'JiangChengXieHei';
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.page.noon .yulu {
  color: rgba(230, 61, 0, 0.8);
}

.page.afternoon .yulu {
  color: rgba(66, 66, 66, 0.8);
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

.page.noon .show {
  color: #E63D00;
}

.page.afternoon .show {
  color: #424242;
}

.wpn {
  position: absolute;
  width: 389.12px;
  height: 383.12px;
  left: -2px;
  top: calc(50% - 383.12px / 2 + 131.56px);
  background: url('@/assets/wpn-3.png') no-repeat;
}

.wpn-text {
  margin: 65px 32px 0 auto
}

.wpn-say {
  font-family: 'Cubic11';
  font-style: normal;
  font-weight: 200;
  font-size: 16px;
  line-height: 142.49%;
  text-align: right;
  letter-spacing: 0.05em;
  font-feature-settings: 'halt' on, 'kern' off;
  color: #FFFFFF;
  display: flex;
  position: relative;
  z-index: 9;
}

.page.noon .wpn-say {
  color: #E63D00;
}

.page.afternoon .wpn-say {
  color: #424242;
}

.plane {
  position: absolute;
  background: url('@/assets/plane-3.svg') no-repeat;
  width: 375.61px;
  height: 955px;
  left: -18px;
  top: -10px;
  opacity: .8;
}

.deco-1-1 {
  background: url('@/assets/deco-3-1-1.png') no-repeat;
  position: absolute;
  width: 166px;
  height: 174px;
  left: -2px;
  top: 32px;
}

.deco-1-2 {
  background: url('@/assets/deco-3-1-2.png') no-repeat;
  position: absolute;
  width: 174px;
  height: 262px;
  left: -2px;
  top: 154px;
  z-index: 3;
}

.deco-1-3 {
  background: url('@/assets/deco-3-1-3.png') no-repeat;
  position: absolute;
  width: 167px;
  height: 237px;
  right: 0;
  bottom: 0;
}

.deco-2-1 {
  background: url('@/assets/deco-3-2-1.png') no-repeat;
  position: absolute;
  width: 166px;
  height: 174px;
  left: -2px;
  top: 32px;
}

.deco-2-2 {
  background: url('@/assets/deco-3-2-2.png') no-repeat;
  position: absolute;
  width: 174px;
  height: 262px;
  left: -2px;
  top: 154px;
  z-index: 3;
}

.deco-2-3 {
  background: url('@/assets/deco-3-2-3.png') no-repeat;
  position: absolute;
  width: 167px;
  height: 237px;
  right: 0;
  bottom: 0;
}

.deco-3-1 {
  background: url('@/assets/deco-3-2-1.png') no-repeat;
  position: absolute;
  width: 166px;
  height: 174px;
  left: -2px;
  top: 32px;
}

.deco-3-2 {
  background: url('@/assets/deco-3-3-2.png') no-repeat;
  position: absolute;
  width: 174px;
  height: 262px;
  left: -2px;
  top: 154px;
  z-index: 3;
}

.deco-3-3 {
  background: url('@/assets/deco-3-3-3.png') no-repeat;
  position: absolute;
  width: 167px;
  height: 237px;
  right: 0;
  bottom: 0;
}

.deco-4-1 {
  background: url('@/assets/deco-3-4-1.png') no-repeat;
  position: absolute;
  width: 166px;
  height: 174px;
  left: -2px;
  top: 32px;
}

.deco-4-2 {
  background: url('@/assets/deco-3-4-2.png') no-repeat;
  position: absolute;
  width: 174px;
  height: 262px;
  left: -2px;
  top: 154px;
  z-index: 3;
}

.deco-4-3 {
  background: url('@/assets/deco-3-3-3.png') no-repeat;
  position: absolute;
  width: 167px;
  height: 237px;
  right: 0;
  bottom: 0;
}
</style>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const user = storeToRefs(userStore).userData.value!;
const activePeriod = ref<string>("");
const activePeriodAccount = ref<string>("0");

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
const dialogues = reactive<string[]>([]);
const titleText = ref("");
(() => {
  if (user.mostActivePeriod === "NONE") return;
  if (user.mostActivePeriod === "MORNING") {
    activePeriod.value = "早上";
    activePeriodAccount.value = ((user.morningAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["一周全早八的朋友们都知道，<br />湖底的的提神效力是咖啡的十倍！"]);
    titleText.value = "早上6点-12点";
  };
  if (user.mostActivePeriod === "NOON") {
    activePeriod.value = "中午";
    activePeriodAccount.value = ((user.noonAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["有些帖子真的下饭吗？"]);
    titleText.value = "中午10点-14点";
  };
  if (user.mostActivePeriod === "AFTERNOON") {
    activePeriod.value = "下午";
    activePeriodAccount.value = ((user.afternoonAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["刷湖底不失为一种课后的放松手段~"]);
    titleText.value = "下午14点-18点";
  };
  if (user.mostActivePeriod === "NIGHT") {
    activePeriod.value = "夜晚";
    activePeriodAccount.value = ((user.nightAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["睡不着的话，<br />小微可以给你讲故事哦～"]);
    titleText.value = "午夜20点-6点";
  };
})();
// const showDialogueIndex = ref(0);
// function seqDialogue() {
//   showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
// }
</script>
