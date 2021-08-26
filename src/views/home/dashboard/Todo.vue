<template>
  <el-card>
    <template #header>
      <div>
        <el-space>
          <span>待办事项</span>
          <el-link type="primary" :underline="false" icon="el-icon-plus" @click.prevent="handleAdd"> 添加 </el-link>
        </el-space>
      </div>
    </template>
    <el-checkbox-group v-model="checkedTodos" @change="handleCheckedChange">
      <template v-for="(todo, index) in todos" :key="index">
        <el-dropdown v-if="editIndex !== index" trigger="contextmenu" style="width: 100%">
          <span>
            <el-checkbox class="todo-item" :label="todo" border>{{ todo }}</el-checkbox>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-edit-outline" @click="handleEdit(index)">编辑</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" @click="handleDelete(index)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-input v-else ref="input" v-model="text" @blur="handleBlur" @keyup.enter="handleEnter" />
      </template>
    </el-checkbox-group>
    <el-divider />
    <el-space :size="32">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
        全选
      </el-checkbox>
      <el-button type="primary" size="mini" @click="handleDeleteAll">清空已完成</el-button>
    </el-space>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, nextTick } from "vue";

export default defineComponent({
  setup() {
    const input = ref();

    const checkInfo = reactive<{
      checkAll: boolean,
      isIndeterminate: boolean,
      checkedTodos: string[],
      todos: string[],
      editIndex: number,
    }>({
      checkAll: false,
      isIndeterminate: false,
      checkedTodos: [],
      todos: [],
      editIndex: -1,
    });

    checkInfo.todos = JSON.parse(localStorage.getItem('todos') || '[]');

    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(checkInfo.todos));
    }

    const text = ref<string>('');

    const handleCheckAllChange = (val: boolean) => {
      checkInfo.checkedTodos = val ? checkInfo.todos : [];
      checkInfo.isIndeterminate = false;
    }

    /** 设置全选框的状态 */
    const handleCheckedChange = (value: string[]) => {
      const checkedCount = value.length;
      checkInfo.checkAll = checkedCount === checkInfo.todos.length && checkedCount !== 0;
      checkInfo.isIndeterminate = checkedCount > 0 && checkedCount < checkInfo.todos.length;
    }

    handleCheckedChange(checkInfo.checkedTodos);

    /** 添加Todo并使用输入框输入内容 */
    const handleAdd = () => {
      checkInfo.todos.push('');
      checkInfo.editIndex = checkInfo.todos.length - 1;
      // 在DOM更新后使输入框获取焦点
      nextTick(function () {
        input.value.focus();
      })
    }

    /** 输入完成失去焦点事件 */
    const handleBlur = () => {
      if (text.value === '') {
        checkInfo.todos.splice(checkInfo.editIndex, 1);
        return;
      }
      checkInfo.todos[checkInfo.editIndex] = text.value;
      text.value = '';
      checkInfo.editIndex = -1;
      saveTodos();
    }

    /** 输入框回车失去焦点 */
    const handleEnter = () => {
      input.value.blur();
    }

    const handleEdit = (index: number) => {
      checkInfo.editIndex = index;
      text.value = checkInfo.todos[index];
      nextTick(function () {
        input.value.focus();
      });
      saveTodos();
    }

    const handleDelete = (index: number) => {
      checkInfo.todos.splice(index, 1);
      saveTodos();
    }

    const handleDeleteAll = () => {
      checkInfo.todos = checkInfo.todos.filter((todo: string) => checkInfo.checkedTodos.indexOf(todo) === -1);
      checkInfo.checkedTodos = [];
      handleCheckedChange(checkInfo.checkedTodos);
      saveTodos();
    }

    return {
      input,
      text,
      ...toRefs(checkInfo),
      handleCheckAllChange,
      handleCheckedChange,
      handleAdd,
      handleEnter,
      handleBlur,
      handleEdit,
      handleDelete,
      handleDeleteAll,
    }
  }
});
</script>

<style scoped>
.todo-item {
  margin: 4px 0;
  width: 100%;
}
.el-checkbox.is-bordered+.el-checkbox.is-bordered {
  margin: 4px 0;
}
</style>
