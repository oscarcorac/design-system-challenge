<script setup lang="ts">
import { MfFormRow, MfSelect, SelectOption } from '@oscarcorac/core-ui';
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';

type Animal = {
  id: number;
  name: string;
  species: string;
  family: string;
  habitd: string;
  place_of_found: string;
  diet: string;
  description: string;
  weight_kg: number;
  height_cm: number;
  image: string;
};

const selectedOption = ref<SelectOption>();

const { state, isLoading } = useAsyncState<Animal[] | undefined>(
  fetch('https://freetestapi.com/api/v1/animals', {
    method: 'GET',
  }).then((response) => response.json()),
  undefined
);
</script>

<template>
  <div class="animals">
    <MfFormRow v-if="!isLoading && state" size="md">
      <MfSelect
        v-bind="{
          size: 'md',
          variant: 'search',
          optionsSize: 'md',
          sort: 'alphabetical',
          options: state.map((animal) => ({
            value: animal.id.toString(),
            text: animal.name,
            icon: animal.image,
          })),
          placeholder: 'Elige un animal',
        }"
        :selectedOption="selectedOption"
        @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
      >
        <template #leftIcon="{ option }">
          <img v-if="option.icon" class="animals__icon" :src="option.icon" />
        </template>

        <template #emptyOptions>
          {{ 'No se encontraron animales' }}
        </template>
      </MfSelect>

      <template #description>
        {{ 'Este componente renderea una lista de animales' }}
      </template>
    </MfFormRow>
  </div>
</template>

<style lang="scss" scoped>
.animals {
  @apply flex flex-1 w-full flex-col max-w-md p-12 mx-auto;

  &__icon {
    @apply w-4 h-3;
  }
}
</style>
