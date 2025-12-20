<template>
  <div class="page" ref="page">
    <!-- 其他装饰 -->
    <div class="decorate-group">
      <div class="deco1"></div>
      <div class="deco2"></div>
      <div class="deco3"></div>
      <div class="deco4"></div>
    </div>
    <!-- 上方文本 -->
    <div class="text-group">
      <span class="text-year box">2025年</span>
      <span class="text-1 box">你一共浏览了<span class="show">{{ user.totalBrowsedCount }}</span>个帖子</span>
      <span class="text-1 box">收藏了<span class="show">{{ user.totalFavoritesCount }}</span>个</span>
      <span class="yulu box"><i>我们既是信息的发出者，</i></span>
      <span class="yulu box"><i>又是信息的接收者。</i></span>
    </div>
    <!-- 微北娘 -->
    <!-- <div class="wpn-group">
      <div class="wpn-texts">
        <span class="wpn-say" v-html="dialogues[0]"></span>
      </div>
    </div> -->
    <div class="wpn">
      <div class="wpn-texts2">
        <div class="box">
          <div class="eclipse"></div>
          <span class="wpn-say" v-html="dialogues[0]"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(169.28deg, #728FEF 10.47%, #5F97FF 31.16%, #B7CBFE 60.96%, #F2F4FD 104.23%);
  position: relative;
  padding: 0;
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

.wpn-group {
  position: absolute;
  right: 0;
  bottom: 52%;
  width: 100%;
}

.wpn {
  position: absolute;
  width: 264px;
  height: 351px;
  right: -74px;
  bottom: -49px;
  background: url('@/assets/wpn-2.png') no-repeat;
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
}

.wpn-texts {
  position: absolute;
  right: 25px;
}

.wpn-texts2 {
  position: absolute;
  left: -18px;
  top: -32px;
}

/* 渐变背景层 */
.eclipse {
  /* content: ''; */
  position: absolute;
  inset: -35px;
  /* 比文字大一圈（可改） */
  background: linear-gradient(125.66deg, #64ACFF 16.99%, #4384F9 121.84%);
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
  background: url('@/assets/decorate-2-0.png') no-repeat;
  position: absolute;
  width: 724px;
  height: 966px;
  left: -30px;
  bottom: -317px;
}

.deco2 {
  background: url('@/assets/decorate-2-1.png') no-repeat;
  position: absolute;
  width: 244.33px;
  height: 209.24px;
  left: 0;
  top: 0;
}

.deco3 {
  background: url('@/assets/decorate-2-2.png') no-repeat;
  position: absolute;
  width: 102px;
  height: 131px;
  right: 0;
  top: 36vh;
}

.deco4 {
  background: url('@/assets/plane-2.svg') no-repeat;
  position: absolute;
  position: absolute;
  width: 364.17px;
  height: 936px;
  left: 30px;
  top: -10px;
  opacity: .8;
}
</style>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
// import DialogueBox from '../components/DialogueBox.vue';
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
(() => {
  if (user.collectionRankLevel === "LOW") {
    dialogues.splice(0, 0, ...["常回来看看！<br />小微会想你的哦( ˘•ω•˘ )"]);
  }
  if (user.collectionRankLevel === "MEDIUM") {
    dialogues.splice(0, 0, ...["要记得把精彩的帖子<br />推荐给小微呀"]);
  }
  if (user.collectionRankLevel === "HIGH") {
    dialogues.splice(0, 0, ...["阅遍湖底三千帖,<br />不会玩梗也能接~"]);
  }
})();
// const showDialogueIndex = ref(0);
// function seqDialogue() {
//   showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
// }
</script>
