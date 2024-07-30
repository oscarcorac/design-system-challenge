<script setup lang="ts">
import { MfSelect, SelectOption } from '@oscarcorac/core-ui';
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';

const selectedOption = ref<SelectOption>();

const { state, isLoading } = useAsyncState<
  | {
      id: number;
      name: string;
      population: number;
      land_area: number;
      density: number;
      capital: string;
      currency: string;
      flag: string;
    }[]
  | undefined
>(
  fetch('https://freetestapi.com/api/v1/countries', {
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
        placeholder: 'Elige un usuario',
      }"
      variant="search"
      sort="alphabetical"
      :selectedOption="selectedOption"
      @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
