<template>
  <div class="dialogue box" v-for="(dg, index) in dialogues" :key="dg" v-show="index === showIndex">
    {{ dg }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  dialogues: string[],
  showIndex: number
}>();
const dialogues = props.dialogues;
</script>

<style scoped>
.dialogue {
  background-color: #f6f6f6;
  padding: 8px;
  box-sizing: border-box;
  /* border: 1px solid black; */
  border-radius: 10px;
  height: fit-content;
  flex: 1 1 auto;
}

.dialogue::after {
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
