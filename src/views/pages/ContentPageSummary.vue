<template>
  <div class="page" ref="page">
    <div class="title-group">
      <span class="title0">来自<span class="show-small">#{{ user.nickname }}#</span>的</span>
      <img src="@/assets/wpy-review.svg" width="243" />
      <img src="@/assets/line-2025.svg" width="307" />
    </div>
    <div class="content-group">
      <div class="content-left">
        <span class="text1">截止2025/12/20</span>
        <span class="text1">你已经使用了<span class="show">{{ dos }}</span>天微北洋</span>
      </div>
      <div class="content-right">
        <span class="text1">总计发了<span class="show">{{ user.totalPosts }}</span>条帖子，<span class="show">{{
          user.totalFloors }}</span>个评论</span>
        <span class="text1">其中有<span class="show">{{ user.feedbackCount }}</span>条校务反馈</span>
      </div>
      <div class="content-left2">
        <span class="text1" v-show="user.mostLikedPostId !== null">你获赞最多的帖子是<span class="show" style="font-size: 36px;">#MP{{ user.mostLikedPostId
        }}</span></span>
        <span class="text-postname" v-show="user.mostLikedPostId !== null">《{{ user.mostLikedPostTitle }}》</span>
        <span class="text1">共获赞<span class="show">{{ user.totalLikesReceived }}</span>个</span>
        <span class="wpn-text">快去截图分享吧！</span>
      </div>
    </div>
    <!-- 装饰 -->
    <div class="wpn"></div>
    <div class="deco1"></div>
    <div class="deco2"></div>
    <div class="deco3"></div>
    <div class="deco4"></div>
    <div class="plane"></div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background: linear-gradient(169.28deg, #5FA4F4 10.47%, #5FA9FF 24.89%, #C5D6F5 104.23%);
  position: relative;
  padding: 0;
}

.title-group {
  display: flex;
  align-items: center;
  margin-top: 8vh;
  flex-direction: column;
  gap: 10px;
  z-index: 9;
}

.title0 {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  color: #FFFFFF;
  padding: 0 10px;
  word-break: break-all;
}

.show-small {
  font-family: 'Smiley Sans';
  font-style: italic;
  font-weight: 400;
  font-size: 24px;
  line-height: 100%;
  color: #FFFFFF;
  margin: 0 4px;
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

.content-group {
  width: 350px;
  margin: 0 auto;
  z-index: 9;
}

.content-group>div>span {
  display: block;
}

.text1 {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  color: #FFFFFF;
}

.content-right {
  text-align: right;
  margin-top: 20px;
}

.text-postname {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 89%;
  background: #FFFFFF;
  color: #68ADFF;
  padding: 4px;
  margin: 10px 0;
  line-height: 1.5em;
  word-break: break-all;
  width: fit-content;
}

.content-left2 {
  margin-top: 20px;
}

.wpn {
  background: url('@/assets/wpn-9.png') no-repeat;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 356px;
  height: 394px;
}

.wpn-text {
  font-family: 'Cubic11';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 142.49%;
  letter-spacing: 0.03em;
  font-feature-settings: 'halt' on, 'kern' off;
  color: #FFFFFF;
  margin-top: 10px;
}

.deco1 {
  background: url('@/assets/deco-9-1.png') no-repeat;
  position: absolute;
  width: 225px;
  height: 75px;
  top: 0;
  right: 10px;
}

.deco2 {
  background: url('@/assets/deco-9-2.png') no-repeat;
  position: absolute;
  width: 217px;
  height: 201px;
  left: 0;
  bottom: 0;
}

.deco3 {
  background: url('@/assets/deco-9-3.png') no-repeat;
  position: absolute;
  width: 117px;
  height: 139px;
  left: 0;
  top: 40%;
}

.deco4 {
  background: url('@/assets/deco-9-4.png') no-repeat;
  position: absolute;
  width: 149px;
  height: 177px;
  right: 0;
  top: 20%;
}

.plane {
  background: url('@/assets/plane-9.svg') no-repeat;
  position: absolute;
  height: 100vh;
  left: 40%;
  top: 0;
  transform: translateX(-50%);
  opacity: .5;
  aspect-ratio: 267 / 1000;
  background-size: cover;
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const user = storeToRefs(userStore).userData.value!;

const yos = ref(String(user.yearsOfService));
const dos = ref(String(user.daysOfService));
if (user.tenureLevel === 'LEGEND') {
  yos.value = "3+";
  dos.value = "999+";
}

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
