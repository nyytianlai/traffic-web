import gangkouhuowu from '@/assets/images/gangkouhuowu.png'
import gangkoujizhuangxiang from '@/assets/images/gangkoujizhuangxiang.png'
import lvke from '@/assets/images/lvke.png'
import jichanglvke from '@/assets/images/jichanglvke.png'
import huowu from '@/assets/images/huowu.png'
import xiandaiwuliu from '@/assets/images/xiandaiwuliu.png'
import { reactive } from 'vue'

export const dataConfig = ({
  totaleCode,
  unit,
  icon,
  monthCode,
  monthCompare,
  yearCode,
  yearCompare
} = {}) => ({
  totaleCode,
  unit,
  monthCode,
  monthCompare,
  yearCode,
  yearCompare,
  icon,
  chartConfig: [
    {
      name: '航空运输',
      dataName: '民航运输',
      color: '#F9E900',
      code: 'hkys',
      percentCode: 'hkyszb'
    },
    {
      name: '铁路发送',
      color: '#0053FF',
      code: 'tlfs',
      percentCode: 'tlfszb'
    },
    {
      name: '水路运输',
      color: '#00FFF9',
      code: 'slys',
      percentCode: 'slyszb'
    },
    {
      name: '公路运输',
      color: '#00FF92',
      code: 'glys',
      percentCode: 'glyszb'
    }
  ]
})
export const mapBottomConfig = reactive([
  {
    name: '港口货物吞吐量',
    otherName: '海港货物吞吐量',
    code: '',
    dateCode: '',
    unit: '万吨',
    icon: gangkouhuowu,
    mapType: ''
  },
  {
    name: '港口集装箱吞吐量',
    otherName: '海港集装箱吞吐量',
    code: '',
    dateCode: '',
    unit: '万标准箱',
    icon: gangkoujizhuangxiang,
    mapType: ''
  },
  {
    name: '港口旅客吞吐量',
    code: '',
    dateCode: '',
    unit: '万人次',
    icon: lvke,
    mapType: ''
  },
  {
    name: '机场旅客吞吐量',
    code: '',
    dateCode: '',
    unit: '万人次',
    icon: jichanglvke,
    mapType: ''
  },
  {
    name: '机场货邮吞吐量',
    code: '',
    dateCode: '',
    unit: '万吨',
    icon: huowu,
    mapType: ''
  },
  {
    name: '现代物流业增加值',
    code: '',
    dateCode: '',
    unit: '亿元',
    icon: xiandaiwuliu,
    mapType: ''
  }
])
