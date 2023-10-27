<template>
  <div class="border-gray bg-white rounded p-4 break-word cursor-pointer">
    <h1 class="font-medium text-gray-900 text-base mb-2">
      {{ task.title }}
    </h1>
    <p class="text-gray-500 text-sm mb-2 max-h-48 overflow-x-auto">
      {{ task.description }}
    </p>
    <select :value="task.status.value"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      @input="changeStatus({ event: $event.target.value, task })">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    task: {},
    options: { type: Array }
  },
  data() {
    return {
    }
  },
  methods: {
    changeStatus(e) {
      this.$emit('changeStatus', e)
    }
  }

}
</script>

<style>
.border-gray {
  border: 1px solid rgba(75, 85, 99, .2);
}
</style>