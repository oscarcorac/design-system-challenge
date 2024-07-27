<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { TodoList, useTodoServices } from '@/services/todoServices';
import { useStore } from 'vuex';
import { MfSelect } from 'challange-public-package';

defineProps<{ msg: string }>();

const count = ref(0);
const selectedOption = ref();

const todoRender = reactive({
  data: ref<TodoList | undefined>(undefined),
  isLoading: ref(true),
});

const todoServices = useTodoServices();

onMounted(async () => {
  try {
    todoRender.data = await todoServices.getTodos();
  } finally {
    todoRender.isLoading = false;
  }
});

const { commit, state } = useStore();
commit('increment');
commit('increment');
console.log(state.count);
</script>

<template>
  <MfSelect
    v-bind="{
      size: 'md',
      options: [
        { value: 'victordiaz@muffin.com', text: 'Victor Díaz' },
        { value: 'sebasaceves@muffin.com', text: 'Sebastián' },
        { value: 'maxmendez@muffin.com', text: 'Max Mendez' },
        { value: 'jesusmillan@muffin.com', text: 'Jesús Millán' },
        { value: 'nicholasyepes@muffin.com', text: 'Nicholas Yepes' },
        { value: 'santiaceves@muffin.com', text: 'Santiago Aceves' },
      ],
      placeholder: 'Elige un usuario',
    }"
    :selectedOption="selectedOption"
    @update:selectedOption="(nextOption) => (selectedOption = nextOption)"
  />
  <h1>{{ msg }}</h1>

  <div class="bg-white">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>

  <div v-if="!todoRender.isLoading">
    <div class="my-10">
      <div class="my-2" v-for="todo in todoRender.data" :key="todo.id">
        {{ todo.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
.test {
  &--scss {
    @apply bg-transparent;
  }
}
</style>
