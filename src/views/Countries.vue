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
  <div class="countries">
    <MfFormRow v-if="!isLoading && state" size="md">
      <MfSelect
        v-bind="{
          size: 'md',
          variant: 'search',
          optionsSize: 'md',
          sort: 'alphabetical',
          options: state.map((countries) => ({
            value: countries.id.toString(),
            text: countries.name,
            icon: countries.flag,
          })),
          placeholder: 'Elige un país',
        }"
        :selectedOption="selectedOption"
        @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
      >
        <template #leftIcon="{ option }">
          <img v-if="option.icon" class="countries__icon" :src="option.icon" />
        </template>

        <template #emptyOptions>
          {{ 'No se encontraron países' }}
        </template>
      </MfSelect>
      <template #description>
        {{ 'Este componente renderea una lista de países' }}
      </template>
    </MfFormRow>
  </div>
</template>

<style lang="scss" scoped>
.countries {
  @apply flex flex-1 w-full flex-col max-w-md p-12 mx-auto;

  &__icon {
    @apply w-4 h-3;
  }
}
</style>
