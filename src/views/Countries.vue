<script setup lang="ts">
import { MfFormRow, MfSelect, SelectOption } from '@oscarcorac/core-ui';
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';

type Country = {
  id: number;
  name: string;
  population: number;
  land_area: number;
  density: number;
  capital: string;
  currency: string;
  flag: string;
};

const selectedOption = ref<SelectOption>();

const { state, isLoading } = useAsyncState<Country[] | undefined>(
  fetch('https://freetestapi.com/api/v1/countries', {
    method: 'GET',
  }).then((response) => response.json()),
  undefined
);
</script>

<template>
  <div class="flex flex-1 w-full flex-col max-w-md p-12 mx-auto">
    <MfFormRow size="md">
      <MfSelect
        v-if="!isLoading && state"
        v-bind="{
          size: 'md',
          options: state.map((animal) => ({
            value: animal.id.toString(),
            text: animal.name,
          })),
          placeholder: 'Elige un país',
        }"
        variant="search"
        sort="alphabetical"
        :selectedOption="selectedOption"
        @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
      />

      <template #description>
        {{ 'Este componente renderea una lista de países' }}
      </template>
    </MfFormRow>
  </div>
</template>

<style lang="scss" scoped></style>
