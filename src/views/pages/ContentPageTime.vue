<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">你最爱在<span class="data">{{ activePeriod }}({{ activePeriodAccount }}%)</span>浏览微北洋</p>
      <p class="box"><i>信息的即时传递消灭了晨钟暮鼓，但太阳依旧升起和落下</i></p>
    </div>
    <div class="rd">
      <img src="@/assets/chr-test.jpg" class="wbn" @click="seqDialogue()" />
      <DialogueBox :dialogues="dialogues" :show-index="showDialogueIndex" :direction="1"></DialogueBox>
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
  margin: 0 auto 0 12px;
  gap: 10px
}
.wbn{
  width: 40%;
}
</style>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import DialogueBox from '../components/DialogueBox.vue';
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
(()=>{
  if (user.mostActivePeriod === "NONE") return;
  if (user.mostActivePeriod === "MORNING") {
    activePeriod.value = "早上";
    activePeriodAccount.value = ((user.morningAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["一周全早八的朋友们都知道，湖底的的提神效力是咖啡的十倍！"]);
  };
  if (user.mostActivePeriod === "AFTERNOON") {
    activePeriod.value = "中午";
    activePeriodAccount.value = ((user.noonAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["有些帖子真的下饭吗？"]);
  };
  if (user.mostActivePeriod === "EVENING") {
    activePeriod.value = "下午";
    activePeriodAccount.value = ((user.afternoonAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["刷湖底不失为一种课后的放松手段~"]);
  };
  if (user.mostActivePeriod === "NIGHT") {
    activePeriod.value = "夜晚";
    activePeriodAccount.value = ((user.nightAccessCount / user.totalAccessCount) * 100).toFixed(1);
    dialogues.splice(0, 0, ...["睡不着的话，小微可以陪你哦～"]);
  };
})();
const showDialogueIndex = ref(0);
function seqDialogue() {
  showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
}
</script>
