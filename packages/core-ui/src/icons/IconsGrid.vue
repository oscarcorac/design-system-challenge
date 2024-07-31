<template>
  <div class="icons-grid">
    <div
      v-for="(iconData, index) in icons"
      :key="index"
      class="icons-grid__card"
    >
      <component :is="iconData.icon" class="icons-grid__card__icon" />
      <div>
        {{ iconData.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { Icon } from './types';

export default defineComponent({
  name: 'Icons',
  props: {
    icons: {
      type: Array as PropType<Icon[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
.icons-grid {
  @apply grid grid-cols-4 gap-3 text-center;

  &__card {
    @apply flex flex-col items-center justify-center gap-4 p-4;
    @apply w-full bg-white rounded-md ring-gray-500 shadow-lg text-longform-sm;
    &__icon {
      @apply mt-4 w-[48px] h-[48px];
    }
    &__image {
      @apply mt-4 max-h-[48px];
    }
  }
}
</style>
