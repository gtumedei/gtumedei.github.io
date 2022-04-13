<script lang="ts" setup>
import Icon from "@/components/icon.vue"

const resume = [
  {
    type: "Education",
    name: "Company name",
    date: "2021",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nostrum quod quam maiores facilis ratione dicta consectetur aliquid atque debitis?"
  },
  {
    type: "Education",
    name: "Company name",
    date: "2021",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nostrum quod quam maiores facilis ratione dicta consectetur aliquid atque debitis?"
  },
  {
    type: "Education",
    name: "Company name",
    date: "2021",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nostrum quod quam maiores facilis ratione dicta consectetur aliquid atque debitis?"
  },
  {
    type: "Education",
    name: "Company name",
    date: "2021",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nostrum quod quam maiores facilis ratione dicta consectetur aliquid atque debitis?"
  },
  {
    type: "Education",
    name: "Company name",
    date: "2021",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nostrum quod quam maiores facilis ratione dicta consectetur aliquid atque debitis?"
  },
  {
    type: "Education",
    name: "Company name",
    date: "2021",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nostrum quod quam maiores facilis ratione dicta consectetur aliquid atque debitis?"
  }
]
</script>

<template>
  <div class="flex flex-col px-6 mb-18">
    <h3 class="heading">Resume</h3>

    <div class="resume-grid grid gap-12 lg:grid-cols-2 mb-12">
      <div v-for="(item, i) in resume" :key="i" class="resume-item">
        <p class="text-sm font-bold uppercase tracking-wide mb-1">{{item.type}}</p>
        <h4 class="text-2xl mb-3">{{item.name}}</h4>
        <p class="mb-3">{{item.description}}</p>
        <p class="text-sm flex align-center"><icon name="mdi:calendar-outline" class="!text-sm my-auto mr-2"/>{{item.date}}</p>
      </div>
    </div>

    <button class="btn inverted mx-auto">
        <span>See full CV</span>
        <icon name="mdi:open-in-new"/>
      </button>
  </div>
</template>