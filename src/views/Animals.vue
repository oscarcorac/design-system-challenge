<script setup lang="ts">
import { MfSelect, SelectOption } from '@oscarcorac/core-ui';
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
  <div class="flex flex-1 w-full flex-col max-w-md p-12 mx-auto">
    <MfSelect
      v-if="!isLoading && state"
      v-bind="{
        size: 'md',
        options: state.map((country) => ({
          value: country.id.toString(),
          text: country.name,
        })),
        placeholder: 'Elige un animal',
      }"
      variant="search"
      sort="alphabetical"
      :selectedOption="selectedOption"
      @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
