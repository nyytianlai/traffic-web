/**
 * 根据树形数据返回桑基图需要的nodes和links
 * @param {Array} tree 树形结构
 * @returns {Object}
 */
export const getNodesLinks = tree => {
  const nodes = [] // { name: 'a', isLeaf: false}, {name: 'b', isLeaf: true }, { name: 'c', tooltip: {show: false} }
  const links = [] // { source: 'a', target: 'b', value: 1 },  {source: 'b', target: 'c', value: 1, isLastEdge: true }
  const leafNodes = []
  const deepIter = (array, parentName) => {
    array.forEach(item => {
      const children = item.children

      // 储存node节点
      const node = {
        ...item,
        _name: item.name,
        name: `${item.node}` // 以节点唯一标识node作为name给echarts配置
      }
      node.isLeaf = !children // 是否树形数据的叶子节点
      delete node.children // 每个node不用储存children
      nodes.push(node)

      // 构建link关系： 父子关系
      if (parentName) {
        const link = { source: parentName, target: node.name, value: 1 }
        links.push(link)
      }

      if (children && children.length) {
        deepIter(children, node.name)
      } else {
        node.isLeaf = true
        leafNodes.push(node)
      }
    })
  }

  deepIter(tree) // 深度遍历树节点

  // 给叶子节点再创建一个关联的空白节点实现关联面积图,这里用isLastEdge标识面积图
  // const leafNodes = nodes.filter(item => item.isLeaf)
  leafNodes.forEach(node => {
    const lastNode = creatLastNode()
    nodes.push(lastNode)
    const link = { source: node.name, target: lastNode.name, value: 1, isLastEdge: true } // 构建link关系： 叶子节点与空白节点关系
    links.push(link)
  })

  return { nodes, links }
}

let nodeId = +new Date()
function creatLastNode () {
  return {
    name: `${nodeId++}`,
    isLastNode: true, // 最后的空白节点，仅用于与子节点连接实现面积图连线
    tooltip: { show: false } // 此设置让该空白节点不显示tooltip
  }
}
