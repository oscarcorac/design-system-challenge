<template>
  <div :class="['pane', `pane__radius--${radiusSize}`]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { PaneProps } from './types';

defineProps<PaneProps>();
</script>

<style lang="scss" scoped>
.pane {
  @apply flex flex-col;
  @apply bg-white w-full shadow-md;

  &__radius {
    &--md {
      @apply rounded-lg;
    }
  }
}
</style>
