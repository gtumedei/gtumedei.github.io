<template>
  <app-header/>
  <main class="container px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <router-view />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Home Layout]
    </div>
  </main>
  <app-footer/>
</template>
