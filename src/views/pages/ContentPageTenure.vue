<template>
  <div class="page" ref="page">
    <!-- 其他装饰 -->
    <div class="decorate-group">
      <div class="deco1"></div>
      <div class="deco2"></div>
      <div class="deco3"></div>
      <div class="deco4"></div>
    </div>
    <div class="text-group">
      <span class="text-year box">2025年</span>
      <span class="text-1 box">是你使用微北洋的第<span class="show">{{ yos }}</span>年</span>
      <span class="text-1 box">截止2025/12/20，</span>
      <span class="text-1 box nobreak">你已经与微北洋相伴了<span class="show">{{ dos }}</span>个日夜</span>
      <span class="yulu box"><i>北洋之大，一手掌握。</i></span>
    </div>
    <div class="wpn"></div>
    <div class="wpn-texts2">
      <div class="box">
        <div class="eclipse"></div>
        <span class="wpn-say" v-html="dialogues[showDialogueIndex]"></span>
      </div>
    </div>
    <Transition name="fade">
      <button v-if="!dialogueAdvanced" class="next-btn is-dot" type="button" @click="onNextClick">
        <span class="next-dot"></span>
      </button>
    </Transition>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* background: linear-gradient(135deg, #3b7beb 0%, #5faaff 22%, #b7d7fe 54%, #f2f5fd 100%); */
  background: linear-gradient(169.28deg, #3B7BEB 10.47%, #5FAAFF 31.16%, #B7D7FE 60.96%, #F2F5FD 104.23%);
  position: relative;
  padding: 0;
}

.group {
  padding: 50px 0;
  margin: 0 auto;
}

.group>* {
  margin-bottom: 40px;
}

.text-group .box {
  display: block;
  margin-bottom: 12px;
}

.rd {
  width: 85%;
  display: flex;
  margin: 0 12px 0 auto;
  gap: 10px
}

.wbn {
  width: 40%;
}

.ps {
  color: white;
  font-size: .8em;
  text-align: right;
  padding: 5px 0;
}

.ps span {
  margin-right: 10px;
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

.text-group {
  margin-top: 12vh;
  text-align: left;
  /* margin-right: 32px; */
  z-index: 9;
  padding-left: 28px;
}

.text-1 {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  color: #FFFFFF;
}

.nobreak {
  word-break: keep-all;
}

.yulu {
  font-family: 'JiangChengXieHei';
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.8);
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
  width: fit-content;
}

.wpn {
  position: absolute;
  width: 234px;
  height: 358px;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  background: url('@/assets/wpn-1.png') no-repeat;
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
  width: max-content;
}

.wpn-texts {
  position: absolute;
  right: 25px;
}

.wpn-texts2 {
  position: absolute;
  right: 10px;
  top: calc(50% + 179px + 12px);
  width: auto;
}

/* 渐变背景层 */
.eclipse {
  /* content: ''; */
  position: absolute;
  inset: -35px;
  /* 比文字大一圈（可改） */
  background: linear-gradient(135deg, #5AA1FF 0%, #2F6FE6 100%);
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

.deco1 {
  background: url('@/assets/decorate-1-0.png') no-repeat;
  position: absolute;
  width: 202px;
  height: 166px;
  right: 0px;
  top: 0px;
}

.deco2 {
  background: url('@/assets/decorate-1-1.png') no-repeat;
  position: absolute;
  width: 261px;
  height: 424px;
  left: -30px;
  bottom: 10vh;
}

.deco3 {
  background: url('@/assets/decorate-1-2.png') no-repeat;
  position: absolute;
  width: 208px;
  height: 177px;
  right: 0px;
  bottom: 0px;
}

.deco4 {
  background: url('@/assets/plane-1.svg') no-repeat;
  position: absolute;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  left: -10vw;
  top: 0px;
  opacity: .8;
}

.next-btn {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  z-index: 10;
}

.next-btn.is-dot {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
}

.next-btn.an-fadein {
  animation: fadein .5s linear forwards;
}
.next-dot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.25);
  animation: pulse 1.6s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts" setup>

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const user = storeToRefs(userStore).userData.value!;
const yos = ref(String(user.yearsOfService));
const dos = ref(String(user.daysOfService));
import { reactive, ref, watch } from 'vue';
const page = ref<HTMLElement>();
const timers: number[] = [];
function clearAnimate() {
  timers.forEach(t => clearTimeout(t));
  page.value?.querySelectorAll(".box").forEach(e => {
    e.classList.remove("an-slidein");
  });
  page.value?.querySelector(".next-btn")?.classList.remove("an-fadein");
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
  timers.push(
    setTimeout(() => {
      page.value?.querySelector(".next-btn")?.classList.add("an-fadein");
    }, 350 * count)
  );
}

const props = defineProps<{ activePage: number, pageId: number }>();
watch(() => props.activePage, () => {
  if (props.activePage !== props.pageId) {
    clearAnimate();
    showDialogueIndex.value = 0;
    dialogueAdvanced.value = false;
    return;
  }
  console.log("play animation:", props.activePage);
  applyAnimate();
});

// for dialogue
const dialogues = reactive<string[]>([]);
function analyseDialogue() {
  // const time1 = user.registerDate;
  // const time2Standard = "2022-03-01T00:00:00+08:00";
  // const date1 = new Date(time1);
  // const date2 = new Date(time2Standard);

  if (user.tenureLevel === "LEGEND") {
    dialogues.splice(0, 0, ...[
      "哇……看来小微要叫你前辈了(￣▽￣)／",
      "(￣▽￣)／"
    ]);
    yos.value = "3+";
    dos.value = "999+";
    return;
  }
  if (user.tenureLevel === "NEW_COMER") {
    dialogues.splice(0, 0, ...[
      "小微很高兴在今年认识你呢！<br />不知道这里的帖子有没有帮到你呢？",
      "小微记得，工作室有位哲人说过：<br />“每天湖底看一看，新登更比老登夯”……"
    ]);
    return;
  }
  if (user.tenureLevel === "CASUAL") {
    dialogues.splice(0, 0, ...[
      "小微也是算是看着你长大的吧！<br />你刚来的时候我还给你指过路呢~",
      "怎么样，现在还能记得<br />和小微刚认识的时候是什么感受吗？"
    ]);
    return;
  }
  if (user.tenureLevel === "VETERAN") {
    dialogues.splice(0, 0, ...[
      "咱俩都认识多长时间了，小微就不和你<br />整这些有的没的了，最近过得怎么样？",
      "哇，是老资历！还记得那些神贴嘛？<br />忘了的话就去翻翻精华吧~"
    ]);
    return;
  }
}
analyseDialogue();
const showDialogueIndex = ref(0);
const dialogueAdvanced = ref(false);
function onNextClick() {
  if (dialogues.length > 1) {
    showDialogueIndex.value = 1;
  }
  dialogueAdvanced.value = true;
}
</script>
