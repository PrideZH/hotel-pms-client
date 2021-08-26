<template>
  <div class="container">
    <el-link
      type="success"
      :underline="false"
      icon="el-icon-s-order"
      @click.prevent="handleCheckIn(scope.row)">
      登记
    </el-link>
    <!-- 入住登记对话框 -->
    <el-dialog title="入住登记" v-model="dialogCheckInVisible">
      <el-form ref="checkInForm" :model="form.checkIn">
        <el-divider>房间信息</el-divider>
        <el-descriptions>
          <el-descriptions-item label="房间">{{ form.checkIn.room.roomNo }}</el-descriptions-item>
          <el-descriptions-item label="入住日期">{{ form.checkIn.inDate.toLocaleDateString() }}</el-descriptions-item>
          <el-descriptions-item label="入住天数">{{ form.checkIn.days }}</el-descriptions-item>
          <el-descriptions-item label="押金">55</el-descriptions-item>
        </el-descriptions>
        <el-divider>基本信息</el-divider>
          <el-form-item label="姓名" prop="contactsName" :rules="{ required: true, message: '请输入联系人', trigger: 'blur' }">
            <el-input v-model="form.checkIn.contactsName" />
          </el-form-item>
          <el-form-item label="手机" prop="contactsMobile" :rules="{ required: true, message: '请输入联系人电话', trigger: 'blur' }">
            <el-input v-model="form.checkIn.contactsMobile" autocomplete="off" />
          </el-form-item>
        <el-space direction="vertical">
          <el-card v-for="(customer, index) in form.checkIn.customers" :key="index" shadow="never">
            <el-space>
              <el-tag :type="levelValue[customer.level].type">{{ levelValue[customer.level].text }}</el-tag>
              <el-form-item
                :prop="'customers.' + index + '.idCard'"
                :rules="{ required: true, message: '请输入身份证号', trigger: 'blur' }">
                <el-input placeholder="身份证" v-model="customer.idCard">
                  <template #suffix>
                    <el-link type="primary" @click.prevent="handleGetCustomerByIdCard(index, customer)">读取</el-link>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                :prop="'customers.' + index + '.name'"
                :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
                <el-input placeholder="姓名" v-model="customer.name" />
              </el-form-item>
              <el-form-item
                :prop="'customers.' + index + '.mobile'"
                :rules="{ required: true, message: '请输入手机号', trigger: 'blur' }">
                <el-input placeholder="手机号" v-model="customer.mobile" />
              </el-form-item>
              <IconBtn iconType="el-icon-delete" @click="delCustomer(index)" />
            </el-space>
          </el-card>
        </el-space>
        <el-link type="primary" @click.prevent="addCustomer">+ 添加入住人</el-link>
        <el-divider>订单备注</el-divider>
        <el-input v-model="form.checkIn.orderNote" />
      </el-form>
      <template #footer>
        <span>
          订单金额：￥{{ form.checkIn.totalAmount }}
        </span>
        <span class="dialog-footer">
          <el-button @click="dialogCheckInVisible = false">取 消</el-button>
          <el-button type="primary" @click="handelConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import IconBtn from '../../../components/button/IconBtn.vue';
import { ElMessage } from 'element-plus'

import axios from '../../../utils/axios';

import { Order } from '../CheckIn/index.vue';

import { Room, Customer } from './index.vue';

export default defineComponent({
  components: {
    IconBtn,
  },
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
  emits: ['requestTableData'],
  setup(props, { emit }) {
    const checkInForm = ref();

    const dialogCheckInVisible = ref(false);

    const form = reactive<{
      checkIn: Order,
    }>({
      checkIn: {
        oid: 0,
        contactsName: '',
        contactsMobile: '',
        inDate: new Date(),
        days: 1,
        deposit: 0,
        totalAmount: 0,
        orderNote: '',
        payType: 0,
        payStatus: 0,
        createTime: new Date(),
        room: null,
        customers: [],
      },
    });

    const addCustomer = () => {
      form.checkIn.customers.push({
        cid: 0,
        name: '',
        age: 0,
        gender: 1,
        idCard: '',
        mobile: '',
        level: 1,
      })
    }

    const delCustomer = (index: number) => {
      form.checkIn.customers.splice(index, 1);
    }

    const handleCheckIn = (row: Room) => {
      form.checkIn.inDate = props.condition?.inDate;
      form.checkIn.days = props.condition?.days;
      form.checkIn.room = row;
      form.checkIn.deposit = 55;
      form.checkIn.totalAmount = row.roomType.rent;
      dialogCheckInVisible.value = true;
    }

    const levelValue = ref([{
      value: 0,
      text: '黑名单',
      type: 'info',
    }, {
      value: 1,
      text: '顾客',
      type: '',
    }, {
      value: 2,
      text: '会员',
      type: 'warning',
    }]);

    const handleGetCustomerByIdCard = (index: number, customer: Customer) => {
      if (customer.idCard === '') {
        ElMessage.error("请输入身份证号");
        return;
      }
      axios({
        method: 'get',
        url: '/v1/customer/idCard/',
        params: {
          idCard: customer.idCard,
        }
      }).then((res: any) => {
        if (res.code === 200) {
          if (res.data !== null) {
            ElMessage.success('获取成功');
            form.checkIn.customers[index] = res.data;
          } else {
            ElMessage.warning('无该用户');
          }
        }
      });
    }

    const handelConfirm = () => {
      checkInForm.value.validate((valid: boolean) => {
        if (valid === false) {
          return false;
        }
        console.log(form.checkIn)
        axios({
            method: 'post',
            url: '/v1/order/',
            data: {
              param: JSON.stringify(form.checkIn),
            }
        }).then((res: any) => {
          if (res.code === 200) {
            emit('requestTableData');
            ElMessage.success('登记成功');
          }
        });
        form.checkIn = {
          oid: 0,
          contactsName: '',
          contactsMobile: '',
          inDate: new Date(),
          days: 1,
          deposit: 0,
          totalAmount: 0,
          orderNote: '',
          payType: 0,
          payStatus: 0,
          createTime: new Date(),
          room: {
            rid: 0,
            roomNo: '',
            status: 0,
            note: '',
            roomType: {
              rtid: 0,
              name: '',
              number: 0,
              area: 0,
              rent: 0,
            }
          },
          customers: [],
        };
        dialogCheckInVisible.value = false;
      });
    }

    return {
      checkInForm,
      dialogCheckInVisible,
      form,
      levelValue,
      addCustomer,
      delCustomer,
      handleCheckIn,
      handleGetCustomerByIdCard,
      handelConfirm,
    };
  },
});
</script>

<style scoped>

</style>
