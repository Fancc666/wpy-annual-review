<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">2025年，你一共收到了<span class="data">{{ user.totalLikesReceived }}</span>个赞</p>
      <p class="box">帖子<span class="data">{{ user.totalPostLikesReceived }}</span>赞 评论<span class="data">{{ user.totalFloorLikesReceived }}</span>赞</p>
      <p class="box"><i>点赞是抽象的数字，喜爱却是是具体的感情</i></p>
    </div>
    <div class="ps">
      <span>点击微北娘试试看</span>
    </div>
    <div class="rd">
      <DialogueBox :dialogues="dialogues" :show-index="showDialogueIndex"></DialogueBox>
      <img src="@/assets/chr-test.jpg" class="wbn" @click="seqDialogue()" />
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
.ps {
  color: white;
  font-size: .8em;
  text-align: right;
  padding: 5px 0;
}

.ps span {
  margin-right: 10px;
}
</style>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import DialogueBox from '../components/DialogueBox.vue';
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
  "不要吝惜手里的赞哦",
  "你知道吗？小微习惯给自己点一个赞(´,,•ω•,,)♡"
]);
const showDialogueIndex = ref(0);
function seqDialogue() {
  showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
}
</script>
