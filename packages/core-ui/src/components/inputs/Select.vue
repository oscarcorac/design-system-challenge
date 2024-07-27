<template>
  <div class="select">
    <div v-if="isAnyOptionSelected" class="select__label">
      {{ props.placeholder }}
    </div>

    <div
      :class="[
        'select__box',
        `select__box--${size}`,
        { 'select__box--opened': isOpen },
        { 'select__box--selected': isAnyOptionSelected },
      ]"
      @click="showOptions"
    >
      <span class="select__box__value">
        {{ props.selectedOption?.text ?? props.placeholder }}
      </span>
      <MfDownArrowIcon class="w-5 h-5 text-secondary stroke-[0.5] stroke-[#6B7280]"/>
    </div>

    <MfPane v-if="isOpen" ref="target" class="select__options" radiusSize="md">
      <MfList spacingSize="md">
        <MfListItem
          v-for="option in sortedOptions"
          :class="{
            'select__options--dirty': isOptionDirty(option),
            'select__options--selected':
              !isAnyOptionDirty && isOptionSelected(option),
          }"
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
import { onClickOutside, useDebounceFn } from '@vueuse/core';
import { MfList, MfListItem } from '../list';
import { MfPane } from '../cards';
import { SelectProps, SelectOption } from './types';
import { MfDownArrowIcon } from '../../icons';

const isOpen = ref(false);
const target = ref(null);
const dirtyOption = ref<SelectOption | null>(null);

const isAnyOptionSelected = toRef(() => Boolean(props.selectedOption));
const isAnyOptionDirty = toRef(() => Boolean(dirtyOption.value));

const debouncedHideOptions = useDebounceFn((callback: () => void) => {
  callback();
}, 400);

const sortedOptions = toRef(() => {
  let sortedOptions = props.options;

  if (props.sort === 'alphabetical') {
    sortedOptions = sortOptionsByName(sortedOptions);
  }

  sortedOptions = sortSelectionFirst(sortedOptions);

  return sortedOptions;
});

function isOptionSelected(option: SelectOption) {
  return option.value === props.selectedOption?.value;
}

function isOptionDirty(option: SelectOption) {
  return option.value === dirtyOption.value?.value;
}

function showOptions() {
  isOpen.value = true;
}

function hideOptions() {
  isOpen.value = false;
}

async function selectOption(option: SelectOption) {
  dirtyOption.value = option;
  await debouncedHideOptions(() => {
    hideOptions();
    emits('update:selectedOption', option);
    dirtyOption.value = null;
  });
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
    @apply flex items-center text-secondary text-longform-sm justify-between gap-1;
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

    &--dirty {
      @apply font-medium;
    }

    &--selected {
      @apply font-medium;
    }
  }
}
</style>
