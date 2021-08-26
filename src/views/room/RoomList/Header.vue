<template>
  <div class="container">
    <el-space>
      <span>入住日期</span>
      <el-date-picker v-model="condition.inDate" type="date" :shortcuts="shortcuts" :clearable="false"
        @blur="changeInDate" />
      <span>入住天数</span>
      <el-input-number controls-position="right" v-model="condition.days" :min="1" :max="10" @change="changeDays" />
    </el-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  props: {
    scope: {
      type: Object,
      riquest: true,
    },
    condition: {
      type: Object,
      riquest: true,
    }
  },
  emits: ['setInDate', 'setDays', 'setMoneyRange'],
  setup(props, { emit }) {
    // 时间选择
    const shortcuts = ref([{
        text: '今天',
        value: () => {
          const start = new Date()
          return start;
        },
      }, {
        text: '明天',
        value: () => {
          const start = new Date()
          start.setTime(start.getTime() + 3600 * 1000 * 24 * 1)
          return start;
        },
      }, {
        text: '后天',
        value: () => {
          const start = new Date()
          start.setTime(start.getTime() + 3600 * 1000 * 24 * 2)
          return start;
        },
      }]
    );

    const condition = reactive<{
      // 入住时间
      inDate: Date,
      days: number,
    }>({
      inDate: new Date(),
      days: 1,
    })

    const changeInDate = () => {
      emit('setInDate', condition.inDate);
    };

    const changeDays = () => {
      emit('setDays', condition.days);
    };

    return {
      shortcuts,
      condition,
      changeInDate,
      changeDays,
    }
  },
});
</script>
