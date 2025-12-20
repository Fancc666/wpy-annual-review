<template>
  <div class="page" ref="page">
    <!-- 纸飞机 -->
    <div class="plane"></div>
    <!-- 云朵 -->
    <div class="cloud"></div>
    <!-- 上方标题 -->
    <div class="title-group">
      <div>
        <span class="title-bg">#{{ user.nickname }}#!</span>
        <span class="title-r">请查收你的</span>
      </div>
      <img src="@/assets/wpy-review.svg" width="243" />
      <p class="subtitle"><i>让微北娘来陪你一起来看看吧！</i></p>
    </div>
    <!-- 微北娘 -->
    <div class="wpn-group">
      <p class="wpn-say"><span class="box">好久不见~想小微了吗？</span></p>
      <div class="wpn-img"></div>
    </div>
    <!-- 右下角 -->
    <div class="corner"></div>
    <!-- 上划开启 -->
    <div class="bottom">
      <div class="triangle"></div>
      <span class="slide-text">上滑开启</span>
    </div>
  </div>
</template>

<style scoped>
.page {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  background: linear-gradient(169.28deg, #5FA4F4 10.47%, #5FA9FF 24.89%, #C5D6F5 104.23%);
  position: relative;
  padding: 0;
}

.title-group {
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  z-index: 9;
  position: relative;
}

.title-bg {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 89%;
  color: #68ADFF;
  background: #FFFFFF;
  padding: 6px 10px;
}

.title-r {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 35px;
  color: #FFFFFF;
  margin-left: 8px;
}

.subtitle {
  font-family: 'JiangChengXieHei';
  font-style: normal;
  font-weight: 200;
  font-size: 18px;
  line-height: 20px;
  color: #E6F2FF;
  margin-top: 5px;
}

.wpn-group {
  position: absolute;
  width: 100%;
  bottom: 52%;
  z-index: 9;
}

.wpn-img {
  position: absolute;
  right: 0;
  width: 339px;
  height: 401px;
  background: url('@/assets/wpn-0.png');
}

.wpn-say {
  position: absolute;
  top: 40px;
  right: 20px;
  font-family: 'Cubic11';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 142.49%;
  letter-spacing: 0.03em;
  font-feature-settings: 'halt' on;
  color: #FFFFFF;
}

.plane {
  position: absolute;
  background: url('@/assets/plane.svg') no-repeat;
  bottom: -14px;
  right: 0px;
  width: 348px;
  height: 744px;
  background-size: cover;
  opacity: 0.6;
}

.cloud {
  position: absolute;
  background: url('@/assets/cloud-0-0.png') no-repeat;
  width: 474px;
  height: 230px;
  top: 25vh;
}

.corner {
  background: url('@/assets/corner.png');
  position: absolute;
  left: 62.94%;
  right: -96.63%;
  top: 81.58%;
  bottom: -21.59%;
}

.bottom {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.bottom > *{
  display: inline-block;
}

.triangle {
  width: 17px;
  height: 9px;
  background: url('@/assets/triangle-0.svg');
  transform: translate(-50%, -50%);
}

.slide-text {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 350;
  font-size: 24px;
  line-height: 35px;
  letter-spacing: -0.08em;
  color: #FFFFFF;
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
