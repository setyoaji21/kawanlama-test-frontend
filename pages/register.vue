<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Register an account
          </h1>
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="handleSubmit"
            novalidate
          >
            <UFormGroup label="Username" name="username" required>
              <UInput v-model="state.username" />
            </UFormGroup>
            <UFormGroup label="Name" name="name" required>
              <UInput v-model="state.name" />
            </UFormGroup>
            <UFormGroup label="Password" name="password" required>
              <UInput v-model="state.password" />
            </UFormGroup>
            <div class="flex justify-between">
              <UButton type="submit"> Register </UButton>
              <NuxtLink to="/">
                <UButton type="button" color="black" variant="outline" style="">Login</UButton>
              </NuxtLink>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script setup>
  import { object, string } from 'yup';
  const userStore = useUserStore()

  const schema = object({
    username: string()
      .min(4, 'Username must be at least 4 characters')
      .required(),
    name: string()
      .required(),
    password: string()
      .min(4, 'Password must be at least 4 characters')
      .required(),
  });

  const state = reactive({
    username: undefined,
    name: undefined,
    password: undefined,
  });
  
  function handleSubmit() {
    userStore.register({ user_id: state.username, password: state.password, name: state.name })
  }
  
</script>
