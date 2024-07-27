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
  @apply flex flex-col gap-1;

  &--md {
    @apply gap-1;
  }
}
</style>
