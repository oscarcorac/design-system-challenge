<template>
  <ul :class="['list', `list--${size}`, `list--padding-${padding}`]">
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { ListProps } from './types';

defineProps<ListProps>();
</script>

<style lang="scss" scoped>
.list {
  @apply flex flex-col;

  &--md {
    @apply gap-1;
  }

  &--padding-md {
    @apply p-2;
  }
}
</style>
