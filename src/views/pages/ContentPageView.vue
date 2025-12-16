<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">2025年</p>
      <p class="box">你一共浏览了<span class="data">{{ user.totalBrowsedCount }}</span>个帖子</p>
      <p class="box">收藏了<span class="data">{{ user.totalFavoritesCount }}</span>个帖子</p>
      <p class="box"><i>我们既是信息的发出者，又是信息的接收者</i></p>
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
  padding: 60px 0;
  margin: 0 auto;
}
.group > *{
  margin-bottom: 30px;
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
import DialogueBox from '../components/DialogueBox.vue';
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
(()=>{
  if (user.collectionRankLevel === "LOW"){
    dialogues.splice(0, 0, ...["常回来看看！小微会想你的哦( ˘•ω•˘ )"]);
  }
  if (user.collectionRankLevel === "MEDIUM"){
    dialogues.splice(0, 0, ...["要记得把精彩的帖子推荐给小微呀"]);
  }
  if (user.collectionRankLevel === "HIGH"){
    dialogues.splice(0, 0, ...["阅遍湖底三千帖，不会玩梗也能水~"]);
  }
})();
const showDialogueIndex = ref(0);
function seqDialogue() {
  showDialogueIndex.value = (showDialogueIndex.value + 1) % dialogues.length;
}
</script>
