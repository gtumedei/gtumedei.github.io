<script lang="ts" setup>
import Icon from "@/components/ui/icon.vue"

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
  <div class="flex flex-col">
    <h3 class="resume-heading section-subheading mb-12">Resume</h3>

    <div class="resume-grid grid gap-12 lg:grid-cols-2 mb-12">
      <div v-for="(item, i) in resume" :key="i" class="resume-item">
        <p class="text-overline mb-1">{{item.type}}</p>
        <h4 class="section-subsubheading mb-3">{{item.name}}</h4>
        <p class="mb-3">{{item.description}}</p>
        <p class="text-sm flex align-center"><icon name="mdi:calendar-outline" class="!text-sm my-auto mr-2"/>{{item.date}}</p>
      </div>
    </div>

    <a
      href="https://msfvkoblamagehrpbmtw.supabase.co/storage/v1/object/public/gtumedei-github-io/CV.pdf"
      target="_blank"
      rel="nofollow"
      class="btn inverted mx-auto"
    >
      <span>See full CV</span>
      <icon name="mdi:open-in-new"/>
    </a>
  </div>
</template>