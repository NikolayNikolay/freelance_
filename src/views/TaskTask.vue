<template>
  <div class="card" v-if="taskID.id">
    <h2>{{ taskID.nameTask }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="taskID.status" /></p>
    <p>
      <strong>Дэдлайн</strong>:
      {{ new Date(taskID.dataCreate).toLocaleDateString() }}
    </p>
    <p><strong>Описание</strong>: {{ taskID.description }}</p>
    <div>
      <button class="btn" @click="removeTask('primary')">Взять в работу</button>
      <button class="btn primary" @click="removeTask('danger')">
        Завершить
      </button>
      <button class="btn danger" @click="removeTask('warning')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";
import AppStatus from "../components/AppStatus";

export default {
  setup() {
    const route = useRoute();
    const taskID = ref(
      JSON.parse(localStorage.getItem("task")).find(
        (elem) => elem.id === route.params.id
      )
    );
    const arrTask = ref();
    async function removeTask(taskStatus) {
      try {
        arrTask.value = await axios.get(
          `https://registered-9e798-default-rtdb.firebaseio.com/task/${route.params.id}.json`
        );
        arrTask.value.data.status = taskStatus;
        taskID.value.status = taskStatus;
        await axios.put(
          `https://registered-9e798-default-rtdb.firebaseio.com/task/${route.params.id}.json`,
          arrTask.value.data
        );
      } catch (error) {
        console.log(error);
      }
    }
    return {
      taskID: taskID.value,
      removeTask,
    };
  },
  components: { AppStatus },
};
</script>

<style scoped>
</style>