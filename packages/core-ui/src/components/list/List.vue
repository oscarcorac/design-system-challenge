<template>
  <ul :class="['list', `list--${spacingSize}`]">
    <slot />
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ spacingSize: 'md' }>();
</script>

<style lang="scss" scoped>
.list {
  @apply flex flex-col;

  &--md {
    @apply gap-1;
  }
}
</style>
