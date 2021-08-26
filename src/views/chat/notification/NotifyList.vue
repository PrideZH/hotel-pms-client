<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="notify.title" label="标题" width="180" />
    <el-table-column prop="notify.content" label="内容" />
    <el-table-column label="时间" align="center" width="180">
      <template #default="scope">
        {{ dateFormat(scope.row.notify.createdTime) }}
      </template>
    </el-table-column>
    <el-table-column prop="notify.senderId" label="发布者编号" align="center" width="180" />
    <el-table-column label="操作" align="center" width="180">
      <template #default="scope">
        <slot :span="4" @click="onClick(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { dateFormat } from '../../../utils/dateUtil';

export default defineComponent({
  props: {
    list: {
      type: Object,
      required: true,
    }
  },
  emits: ['onClick'],
  setup(_, { emit }) {
    const onClick = (item: any) => {
      emit('onClick', item);
    }

    return {
      dateFormat,
      onClick,
    };
  },
});
</script>

<style scoped>
.unread-list {
  width: 100%;
}

.unread-item {
  line-height: 200%;
  align-items: center;
}

.unread-item:hover {
  background-color: #f5f7fa;
}

.notify-time {
  color: #888;
}
</style>
