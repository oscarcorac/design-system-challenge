<template>
  <div :class="['form-row', `form-row--${size}`]">
    <slot />
    <div class="form-row__description">
      <slot name="description" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormRowProps } from './types';

defineProps<FormRowProps>();
</script>

<style lang="scss" scoped>
.form-row {
  @apply flex flex-col;

  &__description {
    @apply text-longform-xs text-secondary;
  }

  &--md {
    @apply gap-1;

    & > .form-row__description {
      @apply text-longform-xs;
    }
  }
}
</style>
