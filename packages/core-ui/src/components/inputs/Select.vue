<template>
  <div class="select">
    <div
      :class="[
        'select__box',
        `select__box--${size}`,
        { 'select__box--opened': isOpen },
        { 'select__box--selected': isOptionSelected },
      ]"
      @click="showOptions"
    >
      {{ props.selectedOption?.text ?? props.placeholder }}
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
          class="cursor-pointer hover:font-medium text-longform-sm px-2 py-1"
          @click="selectOption(option)"
        >
          {{ option.text }}
        </div>
      </List>
    </div>

    <div
      v-if="isOptionSelected"
      class="absolute top-[-8px] left-3 text-xs bg-white px-0.5 text-secondary line-clamp-1"
    >
      {{ props.placeholder }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<SelectProps>();
const emits = defineEmits<{
  'update:selectedOption': [option: SelectOption];
}>();

import { ref, toRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import List from '../list/List.vue';
import { SelectProps, SelectOption } from './types';

const isOpen = ref(false);
const target = ref(null);

const isOptionSelected = toRef(() => Boolean(props.selectedOption));

function showOptions() {
  isOpen.value = true;
}

function hideOptions() {
  isOpen.value = false;
}

function selectOption(option: SelectOption) {
  emits('update:selectedOption', option);

  hideOptions();
}

onClickOutside(target, () => hideOptions());
</script>

<style lang="scss" scoped>
.select {
  @apply relative;

  &__box {
    @apply w-full box-border cursor-pointer;
    @apply flex items-center text-secondary text-longform-sm;
    @apply border border-solid border-gray-300 rounded-lg outline-none bg-white;

    &--md {
      @apply h-[38px] px-4 py-2;
    }

    &--opened {
      @apply border-[#164E63];
    }

    &--selected {
      @apply text-primary;
    }

    &:not(.select__box--opened) {
      &:hover {
        box-shadow: 0px 4px 8px 0px #4043443d;
      }
    }
  }

  &__options {
    @apply absolute z-20 rounded-lg bg-white ring-1 ring-black mt-1 w-full overflow-y-auto p-2 max-h-[114px] text-dark-blue;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      @apply hidden;
    }
  }
}
</style>
