<template>
  <div class="select">
    <div v-if="selectionInstance.isSomeOptionSelected" class="select__label">
      {{ placeholder }}
    </div>

    <div
      :class="[
        'select__box',
        `select__box--${size}`,
        { 'select__box--opened': selectionInstance.isOptionsMenuOpened },
        {
          'select__box--selected': selectionInstance.isSomeOptionSelected,
        },
      ]"
      @click="selectionHandlers.showOptions"
    >
      <template v-if="variant === 'search'">
        <input
          ref="selectInputRef"
          v-if="selectionInstance.isOptionsMenuOpened"
          class="flex flex-1 outline-none text-primary"
          type="text"
          @input="searchHandlers.handleInputChange"
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
          selectionInstance.isOptionsMenuOpened
            ? 'select__box__open-icon'
            : 'select__box__close-icon'
        "
        :is="
          !selectionInstance.isOptionsMenuOpened ? MfChevronDown : MfChevronUp
        "
      />
    </div>

    <MfPane
      v-if="selectionInstance.isOptionsMenuOpened"
      ref="selectOptionsRef"
      class="select__options"
      radiusSize="md"
    >
      <MfList size="md" padding="md">
        <MfListItem
          v-if="searchInstance.options.length"
          v-for="option in searchInstance.options"
          :class="{
            'select__options--selected':
              selectionHandlers.isOptionDirty(option) ||
              (!selectionInstance.isSomeOptionDirty &&
                selectionHandlers.isOptionSelected(option)),
          }"
          size="md"
          variant="menu"
          :key="option.value"
          @click="selectionHandlers.selectOption(option)"
        >
          <span class="select__options__text">
            {{ option.text }}
          </span>

          <template #rightIcon>
            <MfCheckmark
              v-if="
                selectionHandlers.isOptionDirty(option) ||
                (!selectionInstance.isSomeOptionDirty &&
                  selectionHandlers.isOptionSelected(option))
              "
              class="select__options__icon"
            />
          </template>
        </MfListItem>

        <MfListItem size="md" variant="default" v-else>
          {{ 'No items found' }}
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

import { reactive, ref, toRef, nextTick } from 'vue';
import { MfList, MfListItem } from '../list';
import { MfPane } from '../cards';
import { SelectProps, SelectOption } from './types';
import { MfChevronDown, MfChevronUp, MfCheckmark } from '../../icons';
import { useSearchControls } from './useSearchControls';
import { useOptionSelection } from './useOptionSelection';

const selectOptionsRef = ref(null);
const selectInputRef = ref<HTMLInputElement | null>(null);

const [searchInstance, searchHandlers] = useSearchControls(
  reactive({
    sort: toRef(() => props.sort),
    options: toRef(() => props.options),
    selectOption: toRef(() => props.selectedOption),
  })
);

const [selectionInstance, selectionHandlers] = useOptionSelection(
  reactive({
    options: toRef(() => props.options),
    selectedOption: toRef(() => props.selectedOption),
    selectOptionsRef,
  }),
  {
    async onShowOptions() {
      await nextTick();
      selectInputRef.value?.focus();
    },
    onHideOptions() {
      searchHandlers.setSearch('');
    },
    onSelectOption(option) {
      emits('update:selectedOption', option);
    },
  }
);
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

    &__text {
      @apply line-clamp-1;
    }

    &__open-icon {
      @apply w-5 h-5 text-primary stroke-[0.5] stroke-[#000000];
    }

    &__close-icon {
      @apply w-5 h-5 text-secondary stroke-[0.5] stroke-[#6B7280];
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
    @apply absolute mt-1 overflow-y-auto max-h-[114px];

    scrollbar-width: none;
    -ms-overflow-style: none;

    &__text {
      @apply text-dark-blue;
    }

    &__icon {
      @apply w-3 h-3 text-dark-green;
    }

    &::-webkit-scrollbar {
      @apply hidden;
    }

    &--selected {
      @apply font-semibold;
    }
  }
}
</style>
