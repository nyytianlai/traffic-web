/*
 * @Author: your name
 * @Date: 2021-10-19 11:07:22
 * @LastEditTime: 2022-07-15 15:58:14
 * @LastEditors: qinyushan
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zndd-web\src\plugins\antd.js
 */
/**
 * @desc:
 * @author: liaowanquan
 * @create: 2021-07-15 16:52:23
 */

import { app } from '@/plugins/app'
import {
  AutoComplete,
  Button,
  Input,
  Form,
  Alert,
  message,
  Tabs,
  ConfigProvider,
  Breadcrumb,
  Spin,
  Modal,
  Dropdown,
  Menu,
  Pagination,
  Badge,
  Table,
  Radio,

  Divider,
  Select,
  Checkbox,
  Tooltip,
  DatePicker,
  Carousel,
  Steps,
  Icon,
  Popover,
  Progress,
  Slider,
  TreeSelect,
  Switch,
  Collapse,
  Empty
} from 'ant-design-vue'
// import { use } from 'echarts'

app
  .use(AutoComplete)
  .use(Button)
  .use(Input)
  .use(Form)
  .use(Alert)
  .use(message)
  .use(Tabs)
  .use(ConfigProvider)
  .use(Breadcrumb)
  .use(Spin)
  .use(Modal)
  .use(Modal.name)
  .use(Dropdown)
  .use(Menu)
  .use(Pagination)
  .use(Badge)
  .use(Table)
  .use(Radio)
  .use(Divider)
  .use(Select)
  .use(TreeSelect)
  .use(Checkbox)
  .use(Tooltip)
  .use(DatePicker)
  .use(Carousel)
  .use(Steps)
  .use(Icon)
  .use(Popover)
  .use(Progress)
  .use(Slider)
  .use(Switch)
  .use(Collapse)
  .use(Empty)
