<template>
  <div class="container">
    <el-card class="card-2-1">
        <template #header>
          <span>系统信息</span>
        </template>
        <el-descriptions class="descriptions" :column="2" title="项目信息" border>
          <el-descriptions-item label="版本">v1.0.0</el-descriptions-item>
          <el-descriptions-item label="作者">PeideZH</el-descriptions-item>
          <el-descriptions-item label="Github"><a href="#">点击进入</a></el-descriptions-item>
          <el-descriptions-item label="Gitee"><a href="#">点击进入</a></el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="descriptions" :column="2" title="后端技术栈" border>
          <el-descriptions-item label="开发环境">IDEA + MySQL8 + JDK8</el-descriptions-item>
          <el-descriptions-item label="项目框架">Maven</el-descriptions-item>
          <el-descriptions-item label="核心框架">Spring Boot</el-descriptions-item>
          <el-descriptions-item label="后端框架">Spring、Spring MVC、Mybaits</el-descriptions-item>
          <el-descriptions-item label="日志管理">Logback</el-descriptions-item>
          <el-descriptions-item label="安全框架">Spring Security + Jwt</el-descriptions-item>
          <el-descriptions-item label="API文档">Swagger</el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="descriptions" :column="2" title="前端技术栈" border>
          <el-descriptions-item label="开发环境">Nodejs</el-descriptions-item>
          <el-descriptions-item label="编程语言">TypeScript 4.x + JavaScript</el-descriptions-item>
          <el-descriptions-item label="构建工具">Vite 2.x</el-descriptions-item>
          <el-descriptions-item label="前端框架">Vue 3.x</el-descriptions-item>
          <el-descriptions-item label="路由工具">Vue Router 4.x</el-descriptions-item>
          <el-descriptions-item label="状态管理">Vuex 4.x</el-descriptions-item>
          <el-descriptions-item label="UI框架">Element Plus</el-descriptions-item>
          <el-descriptions-item label="CSS预编译">Sass</el-descriptions-item>
          <el-descriptions-item label="网络请求">Axios</el-descriptions-item>
          <el-descriptions-item label="Git Hook">husky + lint-staged</el-descriptions-item>
          <el-descriptions-item label="代码规范">ESLint</el-descriptions-item>
          <el-descriptions-item label="提交规范">Commitizen + Commitlint</el-descriptions-item>
          <el-descriptions-item label="国际化">vue-i18n</el-descriptions-item>
          <el-descriptions-item label="单元测试">vue-test-utils</el-descriptions-item>
          <el-descriptions-item label="自动部署">GitHub Actions</el-descriptions-item>
          <el-descriptions-item label="图表">echarts</el-descriptions-item>
        </el-descriptions>
      </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'SystemInfo',
});
</script>

<style scoped>
.descriptions {
  margin: 16px;
}
</style>>
