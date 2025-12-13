<template>
  <div class="page" ref="page">
    <span class="big text box">
      <slot></slot>
    </span>
    <span class="text box">hello world <slot></slot></span>
    <span class="text box">hello world <slot></slot></span>
    <span class="text box">hello world <slot></slot></span>
    <span class="text box">hello world <slot></slot></span>
    <span class="text box">hello world <slot></slot></span>
  </div>
</template>

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
      }, 450 * count)
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

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  ;
}

.big {
  font-size: 2em;
}

.text {
  color: white;
}
</style>
