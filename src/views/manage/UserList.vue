<template>
  <div class="container">
    <el-button type="success" @click="dialogAddVisible = true">新增用户</el-button>
    <!-- 添加对话框 -->
    <el-dialog title="新增" v-model="dialogAddVisible">
      <el-form ref="addFormRef" :model="addForm">
        <el-form-item label="姓名" label-width="120px">
          <el-input class="edit-input" v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" label-width="120px" required>
          <el-input class="edit-input" v-model="addForm.email" />
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input class="edit-input" v-model="addForm.mobile" />
        </el-form-item>
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="addForm.roles" multiple placeholder="请选择">
            <el-option
              v-for="role in roles"
              :key="role.rid"
              :label="role.nameZh"
              :value="role.rid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="users" style="width: 100%">
      <el-table-column label="姓名">
        <template #default="scope">
           <el-space wrap>
             <BlobAvatar :portrait="scope.row.portrait" :name="scope.row.name" size="small" />
            <p>{{ scope.row.name }}</p>
           </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="mob" label="电话" align="center" />
      <el-table-column prop="roles" label="角色" align="center">
        <template #default="scope">
          <el-space wrap>
            <template v-for="role in scope.row.roles" :key="role.rid">
              <template v-if="role.rid === 1">
                <el-tag>{{ role.nameZh }}</el-tag>
              </template>
              <template v-else>
                <el-tag type="success">{{ role.nameZh }}</el-tag>
              </template>
            </template>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <template v-if="!isAdmin(scope.row.roles)">
            <el-space>
              <el-link
                type="primary"
                :underline="false"
                icon="el-icon-edit"
                @click.prevent="handleEdit(scope.$index, scope.row)">
                编辑
              </el-link>
              <el-popconfirm
                title="确定删除吗？"
                icon="el-icon-warning"
                iconColor="red"
                @confirm="handleDelete(scope.$index, scope.row)">
                <template #reference>
                  <el-link type="danger" :underline="false" icon="el-icon-delete" @click.prevent="">删除</el-link>
                </template>
              </el-popconfirm>
            </el-space>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改对话框 -->
    <el-dialog title="编辑" v-model="dialogEditVisible">
      <el-form :model="editForm">
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="editForm.roles" multiple placeholder="请选择">
            <el-option v-for="role in roles" :key="role.rid" :label="role.nameZh" :value="role.rid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" label-width="120px" required>
          <el-input class="edit-input" v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 40]"
      :current-page="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      @current-change="handlePageChange"
      @size-change="handlePageChange"
      background>
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import axios from '../../utils/axios';

import BlobAvatar from '@/components/BlobAvatar.vue';
import { ElMessage } from 'element-plus'

interface Role {
  rid: number,
  nameZh: string,
}

interface User {
  id: number,
  email: string,
  mob: string,
  name: string,
  pwd: string,
  roles: Role[],
}

interface EditForm {
  uid: number,
  roles: number[],
  name: string,
}

export default defineComponent({
  name: "UserList",
  components: {
    BlobAvatar,
  },
  setup() {
    const addFormRef = ref();

    const users = ref<User[]>([]);
    const roles = ref<Role[]>([]);

    const requestRolesData = () => {
      axios({
          method: 'get',
          url: '/v1/role/list',
      }).then((res: any) => {
        if (res.code === 200) {
          roles.value = res.data;
          // 去掉系统管理员
          roles.value = roles.value.filter(role => role.rid !== 1);
        }
      });
    };

    requestRolesData();

    // 分页
    const pageInfo = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0,
    })

    const requestTableData = () => {
      axios({
          method: 'get',
          url: '/v1/auth/list',
          data: {
            page: pageInfo.currentPage,
            limit: pageInfo.pageSize,
          }
      }).then((res: any) => {
        if (res.code === 200) {
          users.value = res.data.list;
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

    const isAdmin = (roles: Role[]): boolean => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].rid === 1) {
          return true;
        }
      }
      return false;
    }

    // 操作
    // 添加用户
    const dialogAddVisible = ref(false);

    const addForm = reactive({
      name: '',
      pwd: '123456',
      email: '',
      mobile: '',
      roles: [],
    });

    const handleAddUser = () => {
      addFormRef.value.validate((valid: boolean) => {
        if (valid) {
          axios({
              method: 'post',
              url: '/v1/auth/register',
              data: {
                name: addForm.name,
                email: addForm.email,
                pwd: addForm.pwd,
                mob: addForm.mobile,
              }
          }).then((res: any) => {
            if(res.code === 200) {
              ElMessage.success("添加成功");
              requestTableData();
            }
          });
        }
      })
    }

    // 编辑用户
    const editForm = reactive<EditForm>({
      uid: 0,
      roles: [],
      name: '',
    });

    const dialogEditVisible = ref(false);

    const handleEdit = (index: number, row: User) => {
      editForm.uid = row.id;
      editForm.name = row.name;
      editForm.roles = [];
      row.roles.forEach((role: any) => {
        editForm.roles.push(role.rid);
      });
      dialogEditVisible.value = true;
    };

    const handleDelete = (index: number, row: User) => {
      axios({
        method: 'delete',
        url: '/v1/auth/' + row.id,
      }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success('删除成功');
          requestTableData();
        }
      });
    };

    const handelConfirm = () => {
      axios({
        method: 'post',
        url: '/v1/auth/role/update',
        data: {
          uid: editForm.uid,
          rids:  editForm.roles.toString(),
        }
      }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success('修改成功');
          requestTableData();
        }
      });
      // 关闭对话框
      dialogEditVisible.value = false;
    };

    return {
      addFormRef,
      users,
      roles,
      pageInfo,
      addForm,
      editForm,
      dialogAddVisible,
      dialogEditVisible,
      handlePageChange,
      filterTag,
      isAdmin,
      handleAddUser,
      handleEdit,
      handleDelete,
      handelConfirm,
    }
  }
});
</script>

<style scoped>
.edit-input {
  width: 256px;
}
</style>
