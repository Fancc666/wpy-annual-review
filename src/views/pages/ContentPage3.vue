<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">今年你一共发了<span class="data">{{ user.totalPosts }}</span>个帖子 <span class="data">{{ user.totalFloors }}</span>条评论</p>
      <p class="box">其中有<span class="data">{{ user.feedbackCount }}</span>条校务反馈</p>
      <p class="box"><i>我们需要交流，正如我们需要水</i></p>
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
const dialogues = reactive<string[]>([]);
function analyseDialogue() {
  if (user.postRankLevel === "LOW") {
    dialogues.splice(0, 0, ...[
      "原来不止威尼斯湖底有潜水怪，青年湖底也有",
      "偶尔也出来冒冒泡嘛，小微很期待你的发言哦～"
    ]);
    return;
  }
  if (user.postRankLevel === "MEDIUM") {
    dialogues.splice(0, 0, ...[
      "我们总是在与其他人交流，因为这是我们的天性",
      "趁想法还年轻，去表达吧！别让它被时间磨损了"
    ]);
    return;
  }
  if (user.postRankLevel === "HIGH") {
    dialogues.splice(0, 0, ...[
      "青年湖底的一汪绿水，竟然能养出此等龙王",
      "没有你的话，小微肯定会无聊呢～"
    ]);
    return;
  }
}
analyseDialogue();
const showDialogueIndex = ref(0);
function seqDialogue() {
  showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
}
</script>
