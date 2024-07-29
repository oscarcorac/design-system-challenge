<template>
  <div :class="['form-row', `form-row--${size}`]">
    <slot />
    <div class="text-longform-xs text-secondary">
      <slot name="description" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ size: 'md' }>();
</script>

<style lang="scss" scoped>
.form-row {
  @apply flex flex-col;

  &--md {
    @apply gap-1;
  }
}
</style>
