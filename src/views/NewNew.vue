<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="name.nameTask" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="name.dataCreate" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="name.description"></textarea>
    </div>

    <button
      class="btn primary"
      @click.prevent="createNewTask"
      :disabled="!flagComputed"
    >
      Создать
    </button>
  </form>
</template>


<script>
import axios from "axios";
import { reactive, ref, watch, computed } from "vue";
export default {
  setup() {
    const name = reactive({
      nameTask: "",
      dataCreate: "",
      description: "",
      status: "primary",
    });
    async function createNewTask() {
      if (flagComputed.value) {
        await axios.post(
          "https://registered-9e798-default-rtdb.firebaseio.com/task.json",
          name
        );
        for (const key in name) {
          name[key] = "";
        }
      }
    }
    // вычисление заполености полей================================
    const flag = ref(false);
    const flagComputed = computed(() => flag.value);
    watch(name, (news) => {
      if (news.nameTask && news.dataCreate && news.description) {
        flag.value = true;
      } else {
        flag.value = false;
      }
    });
    // ============================================
    return {
      name,
      createNewTask,
      flagComputed,
    };
  },
};
</script>