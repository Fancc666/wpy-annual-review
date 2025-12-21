<template>
  <div class="page" ref="page">
    <!-- 上方文本 -->
    <div class="text-group">
      <span class="text-year box">2025年</span>
      <span class="text-1 box">你一共发布了<span class="show">{{ user.totalPosts }}</span>个帖子</span>
      <span class="text-1 box">和<span class="show">{{ user.totalFloors }}</span>条评论</span>
      <span class="yulu box"><i>我们需要交流，正如我们需要水</i></span>
    </div>
    <!-- 微北娘 -->
    <div class="wpn">
      <div class="box">
        <div class="wpn-say">
          <div class="eclipse"></div>
          <span class="wpn-text" v-html="dialogues[0]"></span>
        </div>
      </div>
    </div>
    <!-- 装饰 -->
    <div class="deco-1"></div>
    <div :class="[user.postRankLevel === 'HIGH' ? 'deco-2-crown' : 'deco-2']"></div>
    <div class="deco-3"></div>
    <div class="deco-4"></div>
    <div class="deco-5"></div>
    <div class="plane"></div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(188.1deg, #3477C4 10.44%, #4DBCF0 38.65%, #BAE9FF 82.98%);
  position: relative;
  padding: 0;
}

.text-group {
  margin-top: 10vh;
  text-align: right;
  margin-left: 30px;
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
  padding-top: 12px;
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
  background: url('@/assets/wpn-4.png') no-repeat;
  width: 361px;
  height: 399px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.wpn-say {
  position: absolute;
  top: 80px;
  right: 40px;
  width: max-content;
  z-index: 9;
}

.wpn-text {
  display: flex;
  font-family: 'Cubic11';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 142.49%;
  color: #FFFFFF;
  letter-spacing: 0.03em;
  text-align: right;
  position: relative;
}

/* 渐变背景层 */
.eclipse {
  /* content: ''; */
  position: absolute;
  inset: -85px -35px;
  /* 比文字大一圈（可改） */
  background: linear-gradient(135deg, #5AA1FF 0%, #2F6FE6 100%);
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

.deco-1 {
  background: url('@/assets/deco-4-1.png') no-repeat;
  position: absolute;
  right: 0;
  top: 0;
  width: 402px;
  height: 464px;
}

.deco-2 {
  background: url('@/assets/deco-4-2.png') no-repeat;
  position: absolute;
  left: 0;
  top: 27vh;
  width: 249px;
  height: 502px;
}

.deco-2-crown {
  background: url('@/assets/deco-4-2-crown.png') no-repeat;
  position: absolute;
  left: 0;
  top: 27vh;
  width: 249px;
  height: 528px;
}

.deco-3 {
  background: url('@/assets/deco-4-3.png') no-repeat;
  position: absolute;
  left: 0;
  top: 0;
  width: 162px;
  height: 182px;
}

.deco-4 {
  background: url('@/assets/deco-4-4.png') no-repeat;
  position: absolute;
  right: 75px;
  top: 30vh;
  width: 122px;
  height: 122px;
}

.deco-5 {
  background: url('@/assets/deco-4-5.png') no-repeat;
  position: absolute;
  right: 0;
  top: 42vh;
  width: 170px;
  height: 249px;
}

.plane {
  background: url('@/assets/plane-4.svg') no-repeat;
  position: absolute;
  right: 0;
  top: 0;
  width: 337px;
  height: 919px;
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
const dialogues = reactive<string[]>([]);
function analyseDialogue() {
  if (user.postRankLevel === "LOW") {
    dialogues.splice(0, 0, ...[
      "原来不止威尼斯湖底有潜水怪，<br />青年湖底也有！"
    ]);
    return;
  }
  if (user.postRankLevel === "MEDIUM") {
    dialogues.splice(0, 0, ...[
      "趁想法还年轻，去表达吧！<br />别让它被时间磨损了！"
    ]);
    return;
  }
  if (user.postRankLevel === "HIGH") {
    dialogues.splice(0, 0, ...[
      "青年湖底的一汪绿水，<br />竟然能养出此等龙王…"
    ]);
    return;
  }
}
analyseDialogue();
// const showDialogueIndex = ref(0);
// function seqDialogue() {
//   showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
// }
</script>
