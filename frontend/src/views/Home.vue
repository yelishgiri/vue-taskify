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
        const newId = tasks.value.length ? Math.mac(...tasks.value.map(t => t.id)) + 1 : 1;
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

        <!-- Task List -->
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