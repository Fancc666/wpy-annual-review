<template>
  <div class="page" ref="page">
    <!-- 上方文本 -->
    <div class="text-group">
      <span class="text-year box">2025年</span>
      <span class="text-1 box">你在校务专区向<span class="show">{{ user.departmentName }}</span></span>
      <span class="text-1 box">反馈了<span class="show">{{ user.departmentCount }}</span>个问题</span>
      <span class="text-1 box">共计建言<span class="show">{{ user.feedbackCount }}</span>次</span>
      <span class="yulu box"><i>民主是互联网的天然属性。</i></span>
    </div>
    <!-- 底部图片和像素文本 -->
    <div class="bottom-img">
      <div class="box">
        <div class="wpn-say">
          <span class="wpn-text" v-html="dialogues[0]"></span>
        </div>
      </div>
    </div>
    <!-- 微北娘 -->
    <div class="wpn-small"></div>
    <div class="wpn"></div>
    <!-- 装饰 -->
    <div class="deco-1"></div>
    <div class="deco-2"></div>
    <div class="deco-3"></div>
    <div class="plane"></div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(349.28deg, #FDFFC3 8.39%, #5FA9FF 39.5%);
  position: relative;
  padding: 0;
}

.text-group {
  margin-top: 10vh;
  text-align: right;
  margin-left: 32px;
  z-index: 9;
}

.text-group>span {
  display: block;
  width: fit-content;
  margin: 0 auto 5px 0;
}

.text-year {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 89%;
  background: #FFFFFF;
  color: #68ADFF;
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

.bottom-img {
  position: absolute;
  background: url('@/assets/deco-5-1.png') no-repeat;
  bottom: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 402 / 373;
  background-size: cover;
  max-height: 373px;
  z-index: 5;
}

.wpn-say {
  position: absolute;
  right: 25px;
  top: -42px;
  width: max-content;
}

.wpn-text {
  font-family: 'Cubic11';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 142.49%;
  display: flex;
  align-items: flex-end;
  text-align: right;
  letter-spacing: 0.03em;
  font-feature-settings: 'halt' on, 'kern' off;
  color: #FFFFFF;
}

.wpn-small {
  background: url('@/assets/wpn-5-small.png');
  position: absolute;
  width: 32px;
  height: 43px;
  bottom: 1.4%;
  right: 25%;
  z-index: 6;
}

.wpn {
  background: url('@/assets/wpn-5.png');
  position: absolute;
  width: 141px;
  height: 195px;
  bottom: 10%;
  right: 0;
  z-index: 6;
}

.deco-1 {
  background: url('@/assets/deco-5-2-1.png') no-repeat;
  position: absolute;
  width: 239px;
  height: 106px;
  left: 15px;
  top: 0;
}

.deco-2 {
  background: url('@/assets/deco-5-2-2.png') no-repeat;
  position: absolute;
  width: 74px;
  height: 116px;
  right: 0;
  top: 160px;
}

.deco-3 {
  background: url('@/assets/deco-5-2-3.png') no-repeat;
  position: absolute;
  width: 142px;
  height: 171px;
  left: 0;
  top: 310px;
}

.plane {
  background: url('@/assets/plane-5.svg') no-repeat;
  position: absolute;
  width: 332px;
  height: 970px;
  top: 0;
  left: 10%;
  opacity: .8;
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
  "小微感谢每一个<br />为校园建设建言献策的同学！"
]);
// const showDialogueIndex = ref(0);
// function seqDialogue() {
//   showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
// }
</script>
