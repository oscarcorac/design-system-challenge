<template>
  <div :class="['pane']">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pane',
});
</script>

<style scoped>
.pane {
  @apply flex flex-col;
  @apply z-20 rounded-lg bg-white w-full shadow-md;
}
</style>
