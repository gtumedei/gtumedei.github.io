<template>
  <app-header/>
  <main class="container flex-grow px-6">
    <router-view />
  </main>
  <app-footer/>
  <client-only><back-to-top-button/></client-only>
</template>
