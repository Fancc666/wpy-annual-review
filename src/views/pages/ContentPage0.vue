<template>
  <div class="page">
    <span class="big">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);;
}
.big{
  font-size: 2em;
  color: white;
}
</style>
