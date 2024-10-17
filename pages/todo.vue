<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <app-header />
    <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:h-full xl:p-0 m-10 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"
          >
            To Do List
          </h1>
          <UButton type="button" color="primary" variant="solid" @click="isOpen = true" class="flex flex-end">Add To Do</UButton>
          <UCard ui="{shadow: 'shadow'}" v-for="todo in todoStore.todos" :key="todo._id">
            <div class="flex justify-between min-h-20">
              <div class="flex flex-col justify-between">
                <h3 class="font-bold leading-tight tracking-tight">{{ todo.subject }}</h3>
                <span>{{ todo.description }}</span>
                <UBadge :color="todo.status === 'Unmarked' ? 'teal' : todo.status === 'Done' ? 'blue' : 'red'">{{ todo.status }}</UBadge>
              </div>
              <div class="flex flex-col" v-if="todo.status === 'Unmarked'">
                <UButton type="button" color="blue" variant="outline" @click="handleDone(todo)" class="m-1">Done</UButton>
                <UButton type="button" color="yellow" variant="outline" @click="setEditData(todo)" class="m-1">Edit</UButton>
                <UButton type="button" color="red" variant="outline" @click="handleDelete(todo._id)" class="m-1">Delete</UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
    <UModal v-model="isOpen">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"
          >
            {{  state.id ? 'Edit To Do' : 'Add To Do'  }}
          </h1>
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="state.id ? handleEdit() : handleAdd()"
            novalidate
          >
            <UFormGroup label="Subject" name="subject" required>
              <UInput v-model="state.subject" />
            </UFormGroup>
            <UFormGroup label="Description" name="description" required>
              <UTextarea v-model="state.description" size="lg" />
            </UFormGroup>
            <div class="flex justify-end">
              <UButton type="submit" color="primary" variant="solid" class="mr-2">{{  state.id ? 'Edit' : 'Add'  }}</UButton>
              <UButton type="button" color="red" variant="solid" @click="isOpen = false">Cancel</UButton>
            </div>
          </UForm>
        </div>
      <Placeholder class="h-32" />
    </UModal>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { object, string } from 'yup'

const todoStore = useTodoStore()
const userStore = useUserStore()
const isOpen = ref(false)

const schema = object({
    subject: string()
      .required(),
    description: string()
      .required(),
  });

  const state = reactive({
    id: null,
    subject: null,
    description: null,
  });

onMounted(async () => {
  await userStore.setToken()
  await userStore.getUser()
  await todoStore.fetchTodos()
})

function handleAdd() {
  todoStore.addTodo({ subject: state.subject, description: state.description })
  this.isOpen = false
  state.subject = null
  state.description = null
}

function handleDone(todo) {
  const status = todo.status === 'Done' ? 'Unmarked' : 'Done'
  todoStore.updateTodo(todo._id, { status })
  todoStore.fetchTodos()
}

function setEditData (todo) {
  this.isOpen = true
  state.id = todo._id
  state.subject = todo.subject
  state.description = todo.description
}

function handleEdit() {
  todoStore.updateTodo(state.id, { subject: state.subject, description: state.description })
  todoStore.fetchTodos()
  this.isOpen = false
  state.id = null
  state.subject = null
  state.description = null
}

function handleDelete(id) {
  todoStore.deleteTodo(id)
  todoStore.fetchTodos()
}
</script>
