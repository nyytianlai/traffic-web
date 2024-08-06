<template>
  <div
    :class="[`table-${type}`, 'sipmle-table', {'show-border': showBorder}]"
  >
    <a-table
      :columns="columns"
      :row-key="(record, index) => index"
      :data-source="tableData"
      :scroll="scroll"
      :pagination="newPagination"
      :custom-row="customRow"
      :show-header="showHeader"
      :custom-header-row="customHeaderRow"
      :row-selection="rowSelection(selection)"
      :loading="loading"
      @change="handleChange"
    >
      <template
        v-for="item in Object.keys($slots)"
        #[item]="itemdata"
      >
        <slot
          :name="item"
          v-bind="itemdata || {}"
        />
      </template>
    </a-table>
  </div>
</template>

<script>
  import OverflowText from '@/components/overflow-text/index.vue'
  import { h } from '@vue/runtime-core'
  const TABLE_STYLE = {
    // 字体颜色
    color: '#ffffff',
    // 行背景颜色
    backgroundColor: ['rgba(14,39,88,0.4)', 'rgba(80,140,224,0.26)'],
    // 字体类型
    fontFamily: 'Microsoft YaHei',
    // 下划线 underline
    underline: 'unset',
    // 斜体 italic
    fontStyle: 'unset',
    // 加粗 bolder
    fontWeight: 'unset'
  }

  export default {
    components: {
    // OverflowText
    },
    props: {
      showBorder: { // 显示表格外边框
        type: Boolean,
        default: false
      },
      scroll: {
        type: [Object],
        default: () => {}
      },
      tableStyle: {
        type: [Object],
        default: () => {}
      },
      selection: {
        type: Boolean,
        default: false
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: [Object, Boolean],
        default: false
      },
      tableHead: {
        type: Array,
        default: () => []
      },
      type: {
        type: String,
        default: 'default'
      },
      tableData: {
        type: Array,
        default: () => {}
      },
      footerList: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        tableOnStyle: {},
        columns: []
      }
    },
    computed: {
      newPagination () {
        return this.pagination ? {
          pageSizeOptions: ['10', '20', '50', '100'],
          showLessItems: true,
          showQuickJumper: true,
          showSizeChanger: true,
          size: 'middle',
          total: 0,
          showTotal: total => `共 ${total} 条`,
        ...this.pagination
        } : this.pagination
      }
    },
    watch: {
      tableHead: {
        handler (val) {
          this.columns = val.map(item => {
            return {
            ...item,
            customRender: item.slots ? undefined : (
              item.customRender || function (record) {
                const text = typeof record.text === 'string' ? record.text : record.text?.toString()
                const renderText = text || text === 0 ? text : '--'
                return h(OverflowText, { text: renderText }, { default: () => renderText })
              }
            )
            }
          })
        },
        deep: true,
        immediate: true
      }
    },
    created () {
      this.tableOnStyle = { ...TABLE_STYLE, ...this.tableStyle }
      this.getColumns()
    },
    methods: {
      clickOperation (key, row) {
        this.$emit('clickOperation', key, row)
      },
      getColumns () {
        if (!this.scroll?.y || !this.width || !this.tableHead?.length) return
        const length = this.tableHead.length
        const width = this.width / length
        this.columns = this.tableHead.map((item, index) => {
          if (!item.width) item.width = width
          return item
        })
        this.columns[length - 1].width = 'auto'
      },
      customRow (record, index) {
        const that = this
        let backgroundColor = this.tableOnStyle.backgroundColor
        backgroundColor =
          typeof backgroundColor === 'string' ? [backgroundColor, backgroundColor] : backgroundColor
        backgroundColor = index % 2 === 0 ? backgroundColor[0] : backgroundColor[1]
        // 给footer添加特殊样式
        if (record.key === 'footer') {
          backgroundColor = record.remarkDesk ? record.remarkDesk.backgroundColor : '#2C60BE'
        }
        return {
          style: {
            // 字体颜色
            color: record.remarkDesk?.fontColor || this.tableOnStyle.color,
            // 行背景颜色
            'background-color': record.remarkDesk?.backgroundColor || backgroundColor,
            // 字体类型
            'font-family': record.remarkDesk?.fontFamily || this.tableOnStyle.fontFamily,
            // 下划线
            'text-decoration': record.remarkDesc?.underline || this.tableOnStyle.underline,
            // 字体样式-斜体
            'font-style': record.remarkDesc?.fontStyle || this.tableOnStyle.fontStyle,
            // 字体样式-加粗
            'font-weight': record.remarkDesc?.fontWeight || this.tableOnStyle.fontWeight
          },
          // 鼠标单击行
          onClick: (event) => {
            that.$emit('rowClick', record, event)
          },
          // 鼠标双击
          onDblclick: (event) => {
            that.$emit('dbClick', record, event)
          }
        }
      },
      customHeaderRow (record, index) {
        const that = this
        return {
          // 鼠标单击表头
          onClick: (event) => {
            that.$emit('rowHeaderClick', record, index, event)
          }
        }
      },
      // 复选框事件
      rowSelection (selection) {
        if (!selection) return
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            this.$emit('selectedChange', selectedRowKeys, selectedRows)
          },
          onSelect: (record, selected, selectedRows) => {
            this.$emit('selectedSelect', record, selected, selectedRows)
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            this.$emit('selectedSelectAll', selected, selectedRows, changeRows)
          }
        }
      },
      handleChange (pagination, filters, sorter) {
        sorter.order = sorter.order
          ? sorter.order === 'ascend' ? 1 : 2
          : 0
        this.$emit('change', { pagination, filters, sorter })
      }
    }
  }
</script>

<style lang="less" scoped>
.sipmle-table {
  &.show-border :deep(.ant-table-wrapper .ant-table-default) {
    border: 1px solid #375be8;
  }

  :deep(.anticon-filter.ant-dropdown-trigger) {
    background-color: transparent !important;

    svg {
      color: #9bd4ff;
    }

    &:hover {
      background-color: transparent !important;

      svg {
        color: #9bd4ff;
      }
    }
  }

  :deep(.ant-table-header.ant-table-hide-scrollbar) {
    overflow: hidden !important;
  }
}
.drop-rise {
  margin-left: 7px;
}
:deep(table tbody tr:hover > td) {
  background-color: transparent !important;
}
:deep(table tbody .colorblue) {
  // color: #54b5ff !important;
  color: #9bd4ff !important;
  cursor: pointer;
}
:deep(.ant-table-placeholder) {
  padding: .06rem;
  background-image: linear-gradient(0deg, #0a1746 0%, #122567 100%) !important;
  border-color: transparent;

  .ant-empty-normal {
    margin: 0;
  }
  .ant-empty-image {
    width: 1rem;
    height: .8rem;
    margin: auto;
    background-image: url(./nodata.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    svg {
      display: none !important;
    }
  }
  .ant-empty-description {
    position: relative;

// margin-top: .23rem;
    // color: #54b5ff;
    color: #9bd4ff;
    visibility: hidden;
  }
  .ant-empty-description::after {
    content: "\6682\65e0\6570\636e";
    position: absolute;
    top: 0;
    left: 50%;

// color: #54b5ff;
    color: #9bd4ff;
    font-family: PingFangSC-Medium;
    font-size: .16rem;
    font-weight: 500;
    transform: translateX(-50%);
    visibility: visible;
  }
  .ant-empty-img-simple-ellipse,
  .ant-empty-img-simple-path,
  .ant-empty-img-simple-g {
    fill: #54b5ff;
    // stroke: #54B5FF;
  }
}
.operation {
  display: flex;
  justify-content: space-evenly;
}
:deep(.ant-pagination-options-size-changer) {
  &.ant-select {
    width: auto;
    min-width: 1.2rem;
  }
}
:deep(.ant-pagination-total-text) {
  margin-right: .16rem;

// color: #54b5ff;
  color: #9bd4ff;
  font-family: PingFangTC-Regular;
  font-size: .16rem;
  font-weight: 400;
}
:deep(.ant-pagination-options-quick-jumper) {
  color: #00b7ff;
  font-family: PingFangSC-Regular;
  font-size: .14rem;
  font-weight: 400;
  letter-spacing: -.44px;

  input {
    color: #00b7ff;
    font-size: .14rem;
    background-color: transparent;
    border: 1px solid #54b5ff;
    border-radius: 2px;
  }
}

:deep(.ant-select-item) {
  // color: #54b5ff;
  font-family: PingFangSC-Regular;
  font-size: .14rem;
  font-weight: 400;
  letter-spacing: 0;
}

:deep(.ant-select-item-option-active) {
  &:not(.ant-select-item-option-disabled) {
    // color: #fff !important;
    font-weight: 400 !important;
    background: rgba(84,181,255,.30) !important;
  }
}
:deep(.ant-pagination) {
  // color: #54b5ff;
  color: #9bd4ff;

  .ant-pagination-item {
    background-color: transparent;
    border: 1px solid #54b5ff;
  }

  .ant-pagination-item > a {
    // color: #54b5ff;
    color: #9bd4ff;
    font-family: ArialMT;
    font-size: 14px;
  }

  .ant-pagination-item-active {
    font-weight: 700;
    background: #1890ff;
    border-color: #1890ff;

    & > a {
      color: #010628;
      font-weight: 700;
    }
  }

  .ant-pagination-next > .ant-pagination-item-link,
  .ant-pagination-prev > .ant-pagination-item-link {
    background-color: transparent;
    border-color: #1890ff;
    & > span {
      color: #1890ff;
    }
  }
  .ant-pagination-options-quick-jumper {
    margin-left: 8px;
    input {
      // color: #54b5ff;
      color: #9bd4ff;
      background: transparent;
      border-color: #1890ff;
    }
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background: transparent;
  }

  .ant-pagination-options {
    .ant-pagination-options-size-changer.ant-select {
      margin-right: 0;
    }

    .ant-select-dropdown {
      // color: #54b5ff;
      color: #9bd4ff;
      background: rgba(0,9,45,.90) !important;
      box-shadow: none;
      border: 1px solid rgba(84,181,255,.50);
      border-radius: 2px;
    }
  }
}
</style>
