import type { Todo } from "../../types/todo.type";

export function filterTodos(todos: Todo[], search: string) {
  const normalizedSearch = search.trim().toLowerCase();

  if (normalizedSearch === "") {
    return todos;
  }

  return todos.filter((todo) => {
    const matchesTitle = todo.title.toLowerCase().includes(normalizedSearch);
    const matchesUser = todo.user?.name?.toLowerCase().includes(normalizedSearch);

    return matchesTitle || matchesUser;
  });
}
