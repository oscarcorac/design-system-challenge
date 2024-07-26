<template>
  <div class="select">
    <div :class="['select__box', `select__box--${size}`]" @click="showOptions">
      {{ text }}
    </div>
    <div
      v-if="isOpen"
      ref="target"
      class="select__options"
      :style="{ 'box-shadow': '0px 4px 8px 0px #4043443D' }"
    >
      <List>
        <div
          v-for="option in options"
          :key="option.value"
          class="cursor-pointer hover:font-medium"
          @click="value = option.value"
        >
          {{ option.text }}
        </div>
      </List>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<SelectProps>();

import { ref, toRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import List from '../list/List.vue';
import { SelectProps } from './types';

const isOpen = ref(false);
const target = ref(null);

const value = ref<string | null>(null);
const text = toRef(
  () => props.options.find((option) => option.value === value.value)?.text
);

function showOptions() {
  isOpen.value = true;
}

function hideOptions() {
  isOpen.value = false;
}

onClickOutside(target, () => hideOptions());
</script>

<style lang="scss" scoped>
.select {
  @apply relative;

  &__box {
    @apply w-full box-border cursor-pointer;
    @apply flex items-center;
    @apply border border-solid border-gray-300 rounded-lg outline-none bg-white;

    &--md {
      @apply h-[38px] px-4 py-2;
    }
  }

  &__options {
    @apply absolute z-20 rounded-lg bg-white ring-1 ring-black mt-1 w-full overflow-y-auto p-2 max-h-[114px];

    &::-webkit-scrollbar {
      @apply hidden;
    }
  }
}
</style>
