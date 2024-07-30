<script setup lang="ts">
import { MfFormRow, MfSelect, SelectOption } from '@oscarcorac/core-ui';
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  features: string[];
  owners: number;
  image: string;
};

const selectedOption = ref<SelectOption>();

const { state, isLoading } = useAsyncState<Car[] | undefined>(
  fetch('https://freetestapi.com/api/v1/cars', {
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
          options: state.map((car) => ({
            value: car.id.toString(),
            text: car.model,
          })),
          placeholder: 'Elige un auto',
        }"
        variant="search"
        sort="alphabetical"
        :selectedOption="selectedOption"
        @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
      />
      <template #description>
        {{ 'Este componente renderea una lista de autos' }}
      </template>
    </MfFormRow>
  </div>
</template>

<style lang="scss" scoped></style>
