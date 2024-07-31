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
  <div class="cars">
    <MfFormRow v-if="!isLoading && state" size="md">
      <MfSelect
        v-bind="{
          size: 'md',
          variant: 'search',
          optionsSize: 'md',
          sort: 'alphabetical',
          options: state.map((car) => ({
            value: car.id.toString(),
            text: car.model,
            icon: car.image,
          })),
          placeholder: 'Elige un auto',
        }"
        :selectedOption="selectedOption"
        @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
      >
        <template #leftIcon="{ option }">
          <img v-if="option.icon" class="cars__icon" :src="option.icon" />
        </template>

        <template #emptyOptions>
          {{ 'No se encontraron autos' }}
        </template>
      </MfSelect>
      <template #description>
        {{ 'Este componente renderea una lista de autos' }}
      </template>
    </MfFormRow>
  </div>
</template>

<style lang="scss" scoped>
.cars {
  @apply flex flex-1 w-full flex-col max-w-md p-12 mx-auto;

  &__icon {
    @apply w-4 h-3;
  }
}
</style>
