<template>
  <div class="select">
    <!-- Label -->
    <div
      v-if="manageOptionsStateInstance.isSomeOptionSelected"
      class="select__label"
    >
      {{ placeholder }}
    </div>

    <!-- Select box -->
    <div
      :class="[
        'select__box',
        `select__box--${size}`,
        {
          'select__box--opened': manageOptionsStateInstance.isOptionsMenuOpened,
        },
        {
          'select__box--selected':
            manageOptionsStateInstance.isSomeOptionSelected,
        },
      ]"
      @click="manageOptionsStateHandlers.showOptions"
    >
      <template v-if="variant === 'search'">
        <input
          ref="selectInputRef"
          v-if="manageOptionsStateInstance.isOptionsMenuOpened"
          class="select__box__search"
          type="text"
          @input="handleInputChange"
        />

        <span v-else class="select__box__text">
          {{ selectedOption?.text ?? placeholder }}
        </span>
      </template>

      <span v-else class="select__box__text">
        {{ selectedOption?.text ?? placeholder }}
      </span>

      <component
        :class="
          manageOptionsStateInstance.isOptionsMenuOpened
            ? 'select__box__open-icon'
            : 'select__box__close-icon'
        "
        :is="
          !manageOptionsStateInstance.isOptionsMenuOpened
            ? MfChevronDown
            : MfChevronUp
        "
      />
    </div>

    <!-- Select options -->
    <MfPane
      v-if="manageOptionsStateInstance.isOptionsMenuOpened"
      ref="selectOptionsRef"
      :class="['select__options', `select__options--${optionsSize}`]"
      radiusSize="md"
    >
      <MfList size="md" padding="md">
        <template v-if="!filterOptionsInstance.isFilterOptionsListEmpty">
          <MfListItem
            v-for="option in filterOptionsInstance.filteredOptions"
            :class="{
              'select__options--selected':
                manageOptionsStateHandlers.isOptionActive(option),
            }"
            size="md"
            variant="menu"
            :key="option.value"
            @click="handleSelectOption(option)"
          >
            <template #leftIcon>
              <slot name="leftIcon" :option="option" />
            </template>

            <span class="select__options__text">
              {{ option.text }}
            </span>

            <template #rightIcon>
              <MfCheckmark
                v-if="manageOptionsStateHandlers.isOptionActive(option)"
                class="select__options__icon"
              />
            </template>
          </MfListItem>
        </template>

        <MfListItem size="md" variant="default" v-else>
          <slot name="emptyOptions" />
        </MfListItem>
      </MfList>
    </MfPane>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRef } from 'vue';
import { MfList, MfListItem } from '../list';
import { MfPane } from '../cards';
import { SelectProps, SelectOption } from './types';
import { MfChevronDown, MfChevronUp, MfCheckmark } from '../../icons';
import { useFilterSelectOptions } from './useFilterSelectOptions';
import { useManageOptionsState } from './useManageOptionsState';
import { useSortSelectOptions } from './useSortSelectOptions';
import { onClickOutside, useDebounceFn } from '@vueuse/core';

const props = defineProps<SelectProps>();
const emits = defineEmits<{
  'update:selectedOption': [option: SelectOption];
}>();

// Refs
const selectOptionsRef = ref(null);
const selectInputRef = ref<HTMLInputElement | null>(null);

// Composables
const useDebounceSelection = useDebounceFn((callback: () => void) => {
  callback();
}, 400);

const useDebounceFiltering = useDebounceFn((callback: () => void) => {
  callback();
}, 400);

const [sortOptionsInstance] = useSortSelectOptions(
  reactive({
    sort: toRef(() => props.sort),
    options: toRef(() => props.options),
    selectedOption: toRef(() => props.selectedOption),
  })
);

const [filterOptionsInstance, filterOptionsHandlers] = useFilterSelectOptions(
  reactive({
    sort: toRef(() => props.sort),
    options: toRef(() => sortOptionsInstance.sortedOptions),
  })
);

const [manageOptionsStateInstance, manageOptionsStateHandlers] =
  useManageOptionsState(
    reactive({
      options: toRef(() => props.options),
      selectedOption: toRef(() => props.selectedOption),
    }),
    {
      onAfterShowOptions() {
        selectInputRef.value?.focus();
      },
      onAfterHideOptions() {
        filterOptionsHandlers.setSearch('');
      },
    }
  );

// Fn
function handleInputChange(event: Event) {
  const { value } = event.currentTarget as HTMLInputElement;

  useDebounceFiltering(() => {
    filterOptionsHandlers.setSearch(value);
  });
}

function handleSelectOption(option: SelectOption) {
  manageOptionsStateHandlers.setDirtyOption(option);

  useDebounceSelection(() => {
    manageOptionsStateHandlers.hideOptions();
    manageOptionsStateHandlers.setDirtyOption(null);
    emits('update:selectedOption', option);
  });
}

// Observers
onClickOutside(selectOptionsRef, () =>
  manageOptionsStateHandlers.hideOptions()
);
</script>

<style lang="scss" scoped>
.select {
  @apply relative;

  &__label {
    @apply absolute top-[-8px] left-3 text-xs px-0.5 text-secondary line-clamp-1 bg-gradient-transparent-white max-w-[80%] break-all;
  }

  &__box {
    @apply w-full box-border cursor-pointer;
    @apply flex items-center text-secondary text-longform-sm justify-between gap-1;
    @apply border border-solid border-gray-300 rounded-lg outline-none bg-white;

    &__text {
      @apply line-clamp-1;
    }

    &__search {
      @apply flex w-full outline-none text-primary;
    }

    &__open-icon {
      @apply w-5 h-5 text-primary stroke-[0.5] stroke-primary;
    }

    &__close-icon {
      @apply w-5 h-5 text-secondary stroke-[0.5] stroke-secondary;
    }

    &--md {
      @apply h-[38px] px-4 py-2;
    }

    &--opened {
      @apply border-brand-blue;
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
    @apply absolute mt-1 overflow-y-auto;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      @apply hidden;
    }

    &__text {
      @apply text-dark-blue;
    }

    &--md {
      @apply max-h-[114px];
    }

    &__icon {
      @apply w-3 h-3 text-dark-green;
    }

    &--selected {
      @apply font-semibold;
    }
  }
}
</style>
