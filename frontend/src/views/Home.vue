<script setup>
import { ref, computed } from 'vue'
import { onMounted } from 'vue';

// Using local storage on homepage at first to test features
// will add database later



// defining variables
const tasks = ref([])
const newTaskText = ref('')
const filter = ref('all')



// when the app is mounted to homepage display tasks
// will be mounted after user successfully logins

onMounted(() => {
    const savedTasks = localStorage.getItem('tasks')
    if(savedTasks){
        tasks.value = JSON.parse(savedTasks)
    }
    else {
        tasks.value = [
      { id: 1, text: 'Learn Vue.js', completed: false },
      { id: 2, text: 'Complete Full Stack Coding Assessment', completed: false },
      { id: 3, text: 'Submit before 12:00pm', completed: false }
    ]
    }
})


// need to add database logic later
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
}


//filtering feature for tasks
const filteredTasks = computed(() => {
    if(filter.value == 'active') {
        return tasks.value.filter(task => !task.completed)
    }
    else if(filter.value == 'completed'){
        return tasks.value.filter(task => task.completed)
    }
    return tasks.value
})

const remainingCount = computed(() => {
    return tasks.value.filter(task => !task.completed).length
})


// Logic for adding new task
// using js max func to determine the highest task id if task exist otherwise just assigning 1
const addTask = () => {
    if(newTaskText.value.trim()) {
        const newId = tasks.value.length ? Math.max(...tasks.value.map(t => t.id)) + 1 : 1;
        tasks.value.push({
            id: newId,
            text: newTaskText.value.trim(),
            completed: false
        })
        newTaskText.value = ''
        saveTasks()
    }
}

const toggleTask = (task) => {
    task.completed = !task.completed
    saveTasks()
}

const deleteTask = (taskId) => {
    const index = tasks.value.findIndex(task => task.id === taskId)
    if(index !== -1)
    tasks.value.splice(index,1)
    saveTasks();
}


const clearCompleted = () => {
    tasks.value = tasks.value.filter(task => !task.completed)
    saveTasks();
}





</script>

<template>
       <div class="task-manager">
      <header>
        <h1>Task Manager</h1>
        <p>Organize your tasks efficiently</p>
      </header>
      <div class="add-task-container">
        <form @submit.prevent="addTask">
          <input
            v-model="newTaskText"
            type="text"
            placeholder="Add a new task..."
            aria-label="New task"
          />
          <button type="submit" aria-label="Add task">
            Add Task
          </button>
        </form>
      </div>

      <div class="task-list-container">
        <div class="task-filters">
          <div class="task-count">
            {{ remainingCount }} tasks remaining
          </div>
          <div class="filter-buttons">
            <button
              @click="filter = 'all'"
              :class="{ active: filter === 'all' }"
            >
              All
            </button>
            <button
              @click="filter = 'active'"
              :class="{ active: filter === 'active' }"
            >
              Active
            </button>
            <button
              @click="filter = 'completed'"
              :class="{ active: filter === 'completed' }"
            >
              Completed
            </button>
          </div>
          <button
            @click="clearCompleted"
            class="clear-completed"
          >
            Clear completed
          </button>
        </div>

        <ul class="task-list" role="list" aria-label="Task list">
          <li v-if="filteredTasks.length === 0" class="empty-state">
            No tasks to display
          </li>
          <li
            v-for="task in filteredTasks"
            :key="task.id"
            class="task-item"
          >
            <div class="task-content">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTask(task)"
                :id="`task-${task.id}`"
              />
              <label :for="`task-${task.id}`" :class="{ completed: task.completed }">
                {{ task.text }}
              </label>
            </div>
            <button
              @click="deleteTask(task.id)"
              aria-label="Delete task"
              class="delete-button"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
      </div>
</template>

<style scoped>
.task-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

header p {
  color: #666;
}

.add-task-container {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  gap: 0.5rem;
}

input[type="text"] {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  background: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: #3a56d4;
}

.task-list-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.task-count {
  font-size: 0.875rem;
  color: #666;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-buttons button {
  background: transparent;
  color: #666;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.filter-buttons button.active {
  background: #e6effd;
  color: #4361ee;
}

.clear-completed {
  background: transparent;
  color: #666;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
}

.clear-completed:hover {
  color: #f44336;
  background: transparent;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #999;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.task-item:hover {
  background: #f9f9f9;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.task-content label {
  cursor: pointer;
}

.task-content label.completed {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  background: transparent;
  color: #999;
  font-size: 0.875rem;
}

.delete-button:hover {
  color: #f44336;
  background: transparent;
}

.tips-section {
  margin-top: 2rem;
  background: #e6effd;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #d1e3fa;
}

.tips-section h2 {
  color: #2c4c8c;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.tips-section ul {
  padding-left: 1.5rem;
  color: #4361ee;
}

.tips-section li {
  margin-bottom: 0.5rem;
}
</style>