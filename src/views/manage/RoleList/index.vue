<template>
  <div class="container">
    <Header @requestTableData="requestTableData" :MenuOption="MenuOption" />
    <!-- 表格 -->
    <el-table :data="roles" style="width: 100%">
      <el-table-column prop="rid" label="序号" align="center" />
      <el-table-column prop="nameZh" label="角色" align="center" />
      <el-table-column label="菜单＆权限" align="center">
        <template #default="scope">
          <el-space wrap>
            <template v-if="scope.row.rid === 1">
              <el-tag>全部</el-tag>
            </template>
            <template v-else>
              <template v-for="menu in scope.row.menus" :key="menu.id">
                <el-tag type="success">{{ menu.desc }}</el-tag>
              </template>
            </template>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column label="管理" align="center">
        <template #default="scope">
          <Control :scope="scope" @requestTableData="requestTableData" :MenuOption="MenuOption" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import axios from '../../../utils/axios';

import Header from './Header.vue';
import Control from './Control.vue';

export interface Menu {
  id: number,
  code: string,
  desc: string,
}

export interface Role {
  rid: number,
  nameZh: string,
  menus: Menu[],
}

export default defineComponent({
  name: "RoleList",
  components: {
    Header,
    Control,
  },
  setup() {
    const roles = ref<Menu[]>([]);

    const hasMenu = (menus: Menu[], id: number): boolean => {
      if (menus === undefined) {
        return false;
      }
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].id === id) {
          return true;
        }
      }
      return false;
    }

    // 分页
    const pageInfo = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0,
    })

    const requestTableData = () => {
      axios({
          method: 'get',
          url: '/v1/role/list',
          params: {
            page: pageInfo.currentPage,
            limit: pageInfo.pageSize,
          }
      }).then((res: any) => {
        if (res.code === 200) {
          roles.value = res.data;
          pageInfo.total = Number(res.data.total);
        }
      });
    }

    requestTableData();

    const handlePageChange = () => {
      requestTableData();
    };

    // 表格支付状态标签
    const filterTag = (value: string, row: any) => {
      return row.payStatus == value;
    }

    const MenuOption = ref<Menu[]>([]);

    axios({
      method: 'get',
      url: '/v1/menu/list',
    }).then((res: any) => {
      if (res.code === 200) {
        MenuOption.value = res.data;
      }
    });

    return {
      roles,
      MenuOption,
      requestTableData,
      hasMenu,
      handlePageChange,
      filterTag,
    }
  }
});
</script>

<style scoped>
.edit-input {
  width: 256px;
}
</style>
