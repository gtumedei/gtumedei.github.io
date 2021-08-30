<template>
  <div class="flex flex-col justify-center items-center text-center m-auto">

    <h2 class="text-divider text-12xl mb-4">404</h2>
    <h1 class="text-4xl mb-18">Page not found.</h1>

    <router-link to="/" class="btn inverted">Go to Home</router-link>

  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
