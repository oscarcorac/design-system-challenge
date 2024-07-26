<template>
  <ul :class="['list']">
    <slot />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'List',

});
</script>

<style scoped>
.list {
  @apply flex flex-col gap-1;
  
}
</style>
