<template>
  <div class="page" ref="page">
    <h2 class="white">
      <span>年度汇总</span>
    </h2>
    <div class="group">
      <p class="box" style="font-size: 1.2em;text-align: center;">{{ user.nickname }}的2025微北洋年度报告</p>
      <p class="box">截止2025/12/20你已经使用了<span class="data">{{ user.daysOfService }}</span>天微北洋</p>
      <p class="box">总计发了<span class="data">{{ user.totalPosts }}</span>条帖子，<span class="data">{{ user.totalFloors }}</span>个评论</p>
      <p class="box">其中有<span class="data">{{ user.feedbackCount }}</span>条校务反馈</p>
      <p class="box">你获赞最多的帖子是<span class="data">【{{ user.mostLikedPostTitle }}】#MP{{ user.mostLikedPostId }}</span></p>
      <p class="box">所有帖子评论共获赞<span class="data">{{ user.totalLikesReceived }}</span>个</p>
      <p class="box">小微帮你整理好了哦，快去截图分享吧！</p>
    </div>
    <div class="rd">
      <img src="@/assets/chr-test.jpg" class="wbn" />
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
  padding: 15px 0;
  margin: 0 auto;
  font-size: 1em;
}
.group > *{
  margin-bottom: 20px;
}
.rd{
  position: absolute;
  bottom: 20px;
  right: 10px;
  width: fit-content;
  z-index: 0;
  opacity: .5;
}
.wbn{
  /* width: 40%; */
  width: 200px;
}
h2{
  margin-top: 20px;
}
h2 span{
  display: block;
  text-align: center;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';
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
</script>
