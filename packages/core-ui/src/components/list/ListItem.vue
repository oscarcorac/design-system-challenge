<template>
  <li :class="['list__item', 'list__item--button']">
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItem',
});
</script>

<style scoped>
.list__item {
  @apply flex justify-start items-center cursor-pointer hover:font-medium text-longform-sm px-2 py-1 line-clamp-1;
}
</style>
