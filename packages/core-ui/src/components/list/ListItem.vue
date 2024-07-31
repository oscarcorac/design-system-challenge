<template>
  <li :class="['list__item', `list__item--${size}`, `list__item--${variant}`]">
    <slot name="leftIcon" />

    <div class="list__item__content">
      <slot />
    </div>
    <slot name="rightIcon" />
  </li>
</template>

<script setup lang="ts">
import { ListItemProps } from './types';

defineProps<ListItemProps>();
</script>

<style lang="scss" scoped>
.list__item {
  @apply flex items-center gap-2;

  &__content {
    @apply flex-1 line-clamp-1;
  }

  &--md {
    @apply text-longform-sm px-2 py-1;
  }

  &--menu {
    @apply cursor-pointer hover:font-semibold;
  }
}
</style>
