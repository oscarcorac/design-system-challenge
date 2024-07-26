export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
export type TodoList = Todo[];

export function useTodoServices() {
  async function getTodos() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'GET',
        }
      );
      const data: TodoList = await response.json();
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return {
    getTodos,
  };
}
