<template>
  <div class="container" :title="title" @click="handelChange">
    <i :class="iconType" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "IconChangeBtn",
  props: {
    iconTypeFirest: {
      type: String,
      require: true,
    },
    iconTypeSecond: {
      type: String,
      require: true,
    },
    titleFirest: {
      type: String,
      default: '',
    },
    titleSecond: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const iconType = ref(props.iconTypeFirest);
    const title = ref(props.titleFirest);

    const handelChange = () => {
      if (iconType.value === props.iconTypeFirest) {
        iconType.value = props.iconTypeSecond;
        title.value = props.titleSecond;
      } else {
        iconType.value = props.iconTypeFirest;
        title.value = props.titleFirest;
      }
    }

    return {
      iconType,
      title,
      handelChange,
    }
  }
});
</script>

<style scoped>
.container {
  padding: 4px;
  cursor: pointer;
}

.container:hover {
  color: #409eff;
}
</style>
