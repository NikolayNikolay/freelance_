<template>
  <h1 class="text-white center" v-if="!task">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeTask.length }}</h3>
    <div class="sort-param card">
      <select v-model="sortStatus">
        <option>All</option>
        <option>Active</option>
      </select>
    </div>
    <div class="card" v-for="item in task" :key="item.id">
      <h2 class="card-title">
        {{ item.nameTask }}
        <app-status :type="item.status"></app-status>
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date().toLocaleDateString() }} -
            {{ new Date(item.dataCreate).toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="$router.push(`/task/${item.id}`)">
        Посмотреть
      </button>
    </div>
  </template>
</template>

<script>
import axios from "axios";
import { computed, ref, watch } from "vue";
import AppStatus from "../components/AppStatus";
// $router.push('/task')
export default {
  setup() {
    const task = ref();
    const sortStatus = ref("All");

    //загружаем задания
    (async function outputTasks() {
      let d;
      const { data } = await axios.get(
        "https://registered-9e798-default-rtdb.firebaseio.com/task.json/"
      );
      d = Object.keys(data).map((key) => {
        return { id: key, ...data[key] };
      });
      //проверка на актуальность даты
      d.forEach((elem) => {
        if (new Date().getTime() > new Date(elem.dataCreate).getTime()) {
          elem.status = "danger";
        }
      });
      //загрузка в локалсторадж
      localStorage.setItem("task", JSON.stringify(d));
      //выгрузка с локал сторадж
      if (localStorage.getItem("task")) {
        task.value = JSON.parse(localStorage.getItem("task"));
      }
    })();
    //вычисление количества активных задач
    const activeTask = computed(() => {
      const activeNum = task.value.filter((item) => item.status === "primary");
      return activeNum;
    });
    function sortTaskActive() {
      task.value = task.value.filter((item) => item.status === "primary");
    }
    watch(sortStatus, (newvalue) => {
      if (newvalue == "Active") {
        sortTaskActive();
      } else {
        if (localStorage.getItem("task")) {
          task.value = JSON.parse(localStorage.getItem("task"));
        }
      }
    });
    return {
      task,
      activeTask,
      sortStatus,
    };
  },
  components: { AppStatus },
};
</script>
