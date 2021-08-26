import { App, Component } from "vue";
import {
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBadge,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElCard,
  ElCol,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElLink,
  ElLoading,
  ElMain,
  ElMessage,
  ElMenu,
  ElMenuItem,
  ElResult,
  ElRow,
  ElOption,
  ElPagination,
  ElPopconfirm,
  ElSelect,
  ElSteps,
  ElStep,
  ElSpace,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElTag,
  ElTimeline,
  ElTimelineItem,
} from 'element-plus';

import "element-plus/lib/theme-chalk/index.css";

// 组件
const components = [
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBadge,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElCard,
  ElCol,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElResult,
  ElRow,
  ElSpace,
  ElOption,
  ElSelect,
  ElSteps,
  ElStep,
  ElPagination,
  ElPopconfirm,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTabPane,
  ElTag,
  ElTimeline,
  ElTimelineItem,
]

// 插件
const plugins = [
  ElLoading,
  ElMessage,
];

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(<string>component.name, component);
  });
  // 注册插件
  plugins.forEach(plugin => {
    app.use(plugin);
  });
}
