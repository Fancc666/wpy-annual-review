<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">2025年，是你使用微北洋的第<span class="data">{{ user.yearsOfService }}</span>年</p>
      <p class="box">截止2025年12月20日，你已经与微北洋相伴了<span class="data">{{ user.daysOfService }}</span>个日夜</p>
      <p class="box"><i>北洋之大，一手掌握</i></p>
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

.group {
  padding: 50px 0;
  margin: 0 auto;
}

.group>* {
  margin-bottom: 40px;
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
</style>

<script lang="ts" setup>
import DialogueBox from '../components/DialogueBox.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const user = storeToRefs(userStore).userData.value!;
import { reactive, ref, watch } from 'vue';
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
  const time1 = user.registerDate;
  const time2Standard = "2022-03-01T00:00:00+08:00";
  const date1 = new Date(time1);
  const date2 = new Date(time2Standard);

  if (date1 < date2) {
    dialogues.splice(0, 0, ...[
      "哇……看来小微要叫你前辈了(￣▽￣)／",
      "(￣▽￣)／"
    ]);
    return;
  }
  if (user.tenureLevel === "NEW_COMER") {
    dialogues.splice(0, 0, ...[
      "小微很高兴在今年认识你呢！不知道这里的帖子有没有帮到你呢？",
      "小微记得，工作室有位哲人说过：“每天湖底看一看，新登更比老登夯”……"
    ]);
    return;
  }
  if (user.tenureLevel === "CASUAL") {
    dialogues.splice(0, 0, ...[
      "小微也是算是看着你长大的吧！你刚来的时候我还给你指过路呢~",
      "怎么样，现在还能记得和小微刚认识的时候是什么感受吗？"
    ]);
    return;
  }
  if (user.tenureLevel === "VETERAN") {
    dialogues.splice(0, 0, ...[
      "咱俩都认识多长时间了，小微就不和你整这些有的没的了，最近过得怎么样？",
      "哇，是老资历！还记得那些神贴嘛？忘了的话就去翻翻精华吧~"
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
