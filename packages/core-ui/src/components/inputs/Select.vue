<template>
  <div class="select">
    <div v-if="isOptionSelected" class="select__label">
      {{ props.placeholder }}
    </div>

    <div
      :class="[
        'select__box',
        `select__box--${size}`,
        { 'select__box--opened': isOpen },
        { 'select__box--selected': isOptionSelected },
      ]"
      @click="showOptions"
    >
      <span class="select__box__value">
        {{ props.selectedOption?.text ?? props.placeholder }}
      </span>
    </div>

    <MfPane v-if="isOpen" ref="target" class="select__options" radiusSize="md">
      <MfList spacingSize="md">
        <MfListItem
          v-for="option in sortedOptions"
          :key="option.value"
          @click="selectOption(option)"
        >
          {{ option.text }}
        </MfListItem>
      </MfList>
    </MfPane>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<SelectProps>();
const emits = defineEmits<{
  'update:selectedOption': [option: SelectOption];
}>();

import { ref, toRef } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { MfList, MfListItem } from '../list';
import { MfPane } from '../cards';
import { SelectProps, SelectOption } from './types';

const isOpen = ref(false);
const target = ref(null);

const isOptionSelected = toRef(() => Boolean(props.selectedOption));

const sortedOptions = toRef(() => {
  let sortedOptions = props.options;

  if (props.sort === 'alphabetical') {
    sortedOptions = sortOptionsByName(sortedOptions);
  }

  sortedOptions = sortSelectionFirst(sortedOptions);

  return sortedOptions;
});

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

function sortOptionsByName(options: SelectOption[]): SelectOption[] {
  return options.sort((a, b) => a.text.localeCompare(b.text));
}

function sortSelectionFirst(options: SelectOption[]) {
  const filteredOptions = options.filter(
    (option) => option.value !== props.selectedOption?.value
  );

  const sortedOptions = props.selectedOption
    ? [props.selectedOption, ...filteredOptions]
    : filteredOptions;

  return sortedOptions;
}

onClickOutside(target, () => hideOptions());
</script>

<style lang="scss" scoped>
.select {
  @apply relative;

  &__label {
    @apply absolute top-[-8px] left-3 text-xs px-0.5 text-secondary line-clamp-1 bg-gradient-transparent-white max-w-[90%] break-all;
  }

  &__box {
    @apply w-full box-border cursor-pointer;
    @apply flex items-center text-secondary text-longform-sm;
    @apply border border-solid border-gray-300 rounded-lg outline-none bg-white;

    &__value {
      @apply line-clamp-1;
    }

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
        @apply shadow-md;
      }
    }
  }

  &__options {
    @apply absolute mt-1 overflow-y-auto p-2 max-h-[114px];

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      @apply hidden;
    }
  }
}
</style>
