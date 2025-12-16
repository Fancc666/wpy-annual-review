<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">你在校务专区向x部门反馈了x个问题，总计建言<span class="data">{{ user.feedbackCount }}</span>次</p>
      <p class="box"><i>民主是互联网的天然属性</i></p>
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
  "小微感谢每一个为校园建设建言献策的同学！"
]);
const showDialogueIndex = ref(0);
function seqDialogue() {
  showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
}
</script>
