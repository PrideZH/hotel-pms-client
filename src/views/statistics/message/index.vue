<template>
  <div class="container">
    <el-row :gutter="32">
      <el-col :span="8">
        <el-card>
          <el-descriptions title="统计信息" :column="1">
            <el-descriptions-item label="总营业额 (元)">￥7999.50</el-descriptions-item>
            <el-descriptions-item label="日收益">
              <el-space>
                <span>￥{{ dayAmount }}</span>
                <el-tag :type="tagType(daily)">{{ numStr(daily) }}</el-tag>
              </el-space>
            </el-descriptions-item>
            <el-descriptions-item label="月增长">
              <el-space>
                <span>￥{{ monthAmount }}</span>
                <el-tag :type="tagType(monthly)">{{ numStr(monthly) }}</el-tag>
              </el-space>
            </el-descriptions-item>
            <el-descriptions-item label="年增长">
              <el-space>
                <span>￥{{ yearAmount }}</span>
                <el-tag :type="tagType(yearly)">{{ numStr(yearly) }}</el-tag>
              </el-space>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <div id="myChart" :style="{ width: '600px', height: '300px' }"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const axios = instance?.appContext.config.globalProperties.$axios;

    const status = reactive<{
      yearAmount: string,
      monthAmount: string,
      dayAmount: string,
      daily: number,
      monthly: number,
      yearly: number,
      revenues: number[],
    }>({
      yearAmount: '',
      monthAmount: '',
      dayAmount: '',
      daily: 0,
      monthly: 0,
      yearly: 0,
      revenues: [],
    });

    /** 格式化数字 2333 => '2,333' */
    const toThousands = (num: number): string => {
      let numStr: string = (num || 0).toString(), result: string = '';
      while (numStr.length > 3) {
        result = ',' + numStr.slice(-3) + result;
        numStr = numStr.slice(0, numStr.length - 3);
      }
      if (numStr) {
        result = numStr + result;
      }
      return result;
    }

    const tagType = (num: number): string => {
      let res: string = 'info';
      num = num | 0;
      if (num < 0) {
        res = 'danger';
      } else if (num > 0) {
        res = 'success';
      }
      return res;
    }

    const numStr = (num: number): string => {
      let res: string = '-';
      num = num | 0;
      if (num < 0) {
        res = '↓' + -num + '%';
      } else if (num > 0) {
        res = '↑' + num + '%';
      }
      return res;
    }

    const drawChart = () => {
      if (instance == null) {
        return;
      }
      let myChart = instance.appContext.config.globalProperties.$echarts.init(
        document.getElementById("myChart")
      );
      let dates: string[] = [];
      for (let dateTime: number = new Date().getTime(), i: number = 0; i < 7;dateTime -= 24 * 60 * 60 * 1000, i++) {
        let date: Date = new Date(dateTime);
        dates.unshift(date.getMonth() + 1 + '-' + date.getDate());
      }
      // 绘制图表
      myChart.setOption({
        title: { text: "每日营业额 (元)" },
        tooltip: {},
        xAxis: {
          data: dates,
        },
        yAxis: {},
        series: [
          {
            name: "营业额",
            type: "line",
            data: status.revenues,
          },
        ],
      });
    }

    axios({
      method: 'get',
      url: '/v1/statistical/turnover/',
    }).then((res: any) => {
      if (res.code === 200) {
        status.yearAmount = toThousands(res.data.yearAmount);
        status.monthAmount = toThousands(res.data.monthAmount);
        status.dayAmount = toThousands(res.data.dayAmount);
        status.daily = res.data.daily;
        status.monthly = res.data.monthly;
        status.yearly = res.data.yearly;
        status.revenues = res.data.revenues;

        drawChart();
      }
    });

    return {
      ...toRefs(status),
      tagType,
      numStr,
    }
  },
});
</script>

<style scoped>

</style>
