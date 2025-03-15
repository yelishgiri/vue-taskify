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
     </div>
</template>