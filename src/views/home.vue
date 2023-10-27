<template>
  <section class="h-screen p-6 flex justify-between">
    <div class="w-2/6">
      <div class="text-white mb-2 flex justify-between items-center">
        <p class="text-lg font-bold">Backlog</p>
        <PlusCircleIcon class="text-white w-6 cursor-pointer" @click="openModal" />
      </div>
      <div class="h-5/6 flex flex-col justify-between flex-wrap rounded p-4 card overflow-x-auto bg-white">
        <div v-if="tasksTODO.length">
          <div v-for="(task, index) in tasksTODO" :key="index" class="mt-8">
            <CardTaskComponent :task="task" @changeStatus="changeStatus" :options="statusOptions"></CardTaskComponent>
          </div>
        </div>
        <div class="empty-card w-full text-center" v-else>
          <p class="text-gray-400 text-center">
            Crie uma nova tarefa clicando no botão abaixo
          </p>
          <button class="bg-green-700 p-2 rounded inline-flex justify-between items-center mt-4 hover:bg-green-900"
            @click="openModal">
            <PlusCircleIcon class="text-white w-6 cursor-pointer mr-1" />
            <span class="text-white"> Tarefa </span>
          </button>
        </div>
      </div>
    </div>
    <Modal :isOpen="showModal" v-on:keyup.esc="showModal = false">
      <template v-slot:title> Adicione uma nova tarefa </template>
      <template v-slot:body>
        <div>
          <form>
            <label class="block">
              <span
                class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Titulo
              </span>
              <input type="text" name="title" v-model="taskForm.title"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
            </label>
            <label class="block mt-4">
              <span
                class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Descrição
              </span>
              <textarea name="description" v-model="taskForm.description"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
            </label>
            <div class="mt-8 flex">
              <button @click="newTask" type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2">
                Cadastrar
              </button>
              <button type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                @click="showModal = false">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
    <div class="w-3/6 mx-4">
      <div class="text-white mb-2 flex justify-between items-center">
        <p class="text-lg font-bold">Em progresso</p>
      </div>
      <div :class="`h-5/6	rounded p-4 bg-white card overflow-x-auto ${tasks.length ? 'relative' : ''
      }`">
        <div class="flex flex-col justify-between">
          <div class="flex justify-end">
            <button class="bg-green-700 p-2 rounded hover:bg-green-900">
              <span class="text-white opacity-50"> Configurações </span>
            </button>
          </div>
          <div v-if="tasksInProgress.length">
            <div v-for="(task, index) in tasksInProgress" :key="index" class="mt-8">
              <CardTaskComponent :task="task" @changeStatus="changeStatus" :options="statusOptions"></CardTaskComponent>
            </div>
          </div>
          <div class="text-center mt-16">
            <div class="empty-card m-auto">
              <p :class="`${disabled ? 'opacity-50' : 'opacity-100'
              } text-gray-600 text-center font-medium text-5xl`">
                {{ currentTime }}
              </p>
              <div class="flex justify-center mt-8">
                <button :class="`p-2 rounded-full bg-red-500 w-12 h-12 inline-flex items-center justify-center ${tasksInProgress.length ? 'opacity-100' : 'opacity-50 pointer-events-none'
                }`" @click="reset">
                  <div class="bg-white w-4 h-4 rounded"></div>
                </button>
                <button :class="`p-2 mx-4 rounded-full bg-yellow-500 w-12 h-12 inline-flex items-center justify-center ${tasksInProgress.length ? 'opacity-100' : 'opacity-50 pointer-events-none'
                }`" @click="pause">
                  <PauseIcon class="w-6 h-6 text-white" />
                </button>
                <button :class="`p-2 rounded-full bg-green-700 w-12 h-12 inline-flex items-center justify-center ${tasksInProgress.length ? 'opacity-100' : 'opacity-50 pointer-events-none'
                }`" @click="play">
                  <PlayIcon class="w-6 h-6 text-white" />
                </button>
              </div>
              <p class="text-gray-600 text-lg mt-16" v-if="!tasksInProgress.length">
                Arraste uma tarefa para começar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-2/6">
      <div class="text-white mb-2">
        <p class="text-lg font-bold">Finalizado</p>
      </div>
      <div class="h-5/6 flex flex-col justify-between rounded p-4 card overflow-x-auto bg-white">
        <div v-if="tasksFinish.length">
          <div v-for="(task, index) in tasksFinish" :key="index" class="mt-8">
            <CardTaskComponent :task="task" @changeStatus="changeStatus" :options="statusOptions"></CardTaskComponent>
          </div>
        </div>
        <div class="empty-card w-full text-center" v-if="!tasksFinish.length">
          <p class="text-gray-400 text-center">
            Você ainda não possui tarefas finalizadas.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CardTaskComponent from "../components/card-task-component.vue";
import AchievementComponent from "../components/achievement-component.vue";
import Modal from "@/components/modal-component.vue";
import { PlusCircleIcon } from "@heroicons/vue/outline";
import { PauseIcon, PlayIcon } from "@heroicons/vue/solid";
import { generateID } from "../services/helpers";
import { useToast } from "vue-toastification";

export default {
  components: {
    CardTaskComponent,
    PlusCircleIcon,
    PauseIcon,
    PlayIcon,
    AchievementComponent,
    Modal
  },
  data() {
    return {
      disabled: true,
      showModal: false,
      taskForm: {
        title: "",
        descripton: "",
        status: {}
      },
      tasks: [],
      tasksTODO: [],
      tasksInProgress: [],
      tasksFinish: [],
      statusOptions: [
        {
          label: "Backlog",
          value: "todo"
        },
        {
          label: "Em progresso",
          value: "in-progress"
        },
        {
          label: "Finalizada",
          value: "finish"
        }
      ],
      toast: useToast(),
      time: 1500000,
      timeRunning: false,
      currentTime: '',
      interval: 1000
    };
  },
  methods: {
    sum(a,b) {
      return a + b;
    },
    openModal() {
      this.taskForm = {};
      this.showModal = true;
    },
    newTask() {
      this.taskForm.status = {
        label: "Backlog",
        value: "todo"
      };
      this.taskForm.id = generateID(this.tasks.length);
      this.$store.dispatch("setNewTask", this.taskForm);
      this.getTasks();
      this.showModal = false;
    },
    getTasks() {
      this.tasks = this.$store.getters.getTasks;
      this.tasksTODO = this.tasks.filter((task) => {
        return task.status.value === "todo";
      });
      this.tasksInProgress = this.tasks.filter((task) => {
        return task.status.value === "in-progress";
      });
      this.tasksFinish = this.tasks.filter((task) => {
        return task.status.value === "finish";
      });
    },
    changeStatus(e) {
      const status = this.statusOptions.find((option) => option.value === e.event);
      if (status.value === "in-progress" && this.tasksInProgress.length === 1) {
        this.toast.error("Finalize a task em progresso para puxar outra.");
        e.task.status = { label: e.task.status.label, value: e.task.status.value }
        // e.task.status.value === 'in-progress' && (this.time = 1500000) && clearInterval(this.interval)
      } else {
        e.task.status = status;
        this.$store.dispatch('updateTaskStatus', e.task);
      }
      this.getTasks()
    },
    convertTime() {
      var minutes = Math.floor(this.time / 60000);
      var seconds = ((this.time % 60000) / 1000).toFixed(0);
      this.currentTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    play() {
      if (this.tasksInProgress.length) this.interval = setInterval(() => {
        console.log(this.time > 1000)
        if (this.time > 1000) { this.time -= 1000; } else { clearInterval(this.interval) }
        this.convertTime();
      }, 1000);
    },
    pause() {
      clearInterval(this.interval);
      this.interval = 0;
    },
    reset() {
      this.time = 1500000;
      clearInterval(this.interval);
      this.convertTime();
    }
  },
  mounted() {
    this.convertTime();
  }
};
</script>

<style>
section {
  background-color: #293a6d;
}

.card::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: #f5f5f5;
}

.card::-webkit-scrollbar {
  width: 7px;
  background-color: #f5f5f5;
}

.card::-webkit-scrollbar-thumb {
  border-radius: 8px;
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.4);
  background-color: rgb(187, 187, 187);
}
</style>
