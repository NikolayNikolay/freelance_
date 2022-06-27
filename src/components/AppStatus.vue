<template>
  <span :class="['badge', type]">{{ textType }}</span>
</template>
<script>
import { computed } from "@vue/runtime-core";
export default {
  props: ["type"],
  setup(props) {
    const textType = computed(() => {
      if (props.type == "primary") {
        return "Активно";
      } else if (props.type == "danger") {
        return "Завершено";
      } else if (props.type == "warning") {
        return "Дедлайн";
      }
    });
    return {
      textType,
    };
  },
};
</script>