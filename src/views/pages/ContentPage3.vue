<template>
  <div class="page" ref="page">
    <div class="group">
      <p class="box">今年你一共发了x个帖子 y条评论</p>
      <p class="box">其中有x条校务反馈</p>
      <p class="box"><i>我们需要交流，正如我们需要水</i></p>
    </div>
    <div class="rd">
      <div class="dialogue box">
        原来不止威尼斯湖底有潜水怪，青年湖底也有<br />偶尔也出来冒冒泡嘛，小微很期待你的发言哦～
      </div>
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
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue';
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
