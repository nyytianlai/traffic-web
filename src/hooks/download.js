/*
 * @Author: niyayong
 * @LastEditors: niyayong
 * @Date: 2022-07-05 16:32:05
 * @LastEditTime: 2022-12-19 10:22:56
 * @FilePath: \traffic-web\src\hooks\download.js
 * @Description: FilePath
 */
import { jsPDF } from 'jspdf'
export const download = (imgContent, downloadName = '导出.png') => {
  const aLink = document.createElement('a')
  const evt = document.createEvent('HTMLEvents')
  evt.initEvent('click', true, true)
  aLink.download = downloadName
  aLink.href = imgContent
  aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
}
// 横屏打印pdf
export const createPDFObject = (imgData, imgName, width, height) => {
  const pageHeight = width * 592.28 / 841.89
  const leftHeight = height
  const position = 0
  const imgWidth = 841.89
  const imgHeight = 841.89 / width * height
  const doc = jsPDF('l', 'pt')
  if (leftHeight < pageHeight) { // 没有超出一页
    doc.addImage(imgData, 'jpeg', 0, 0, imgWidth, imgHeight)
  } else {
    while (leftHeight > 0) {
      doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight)
      leftHeight -= pageHeight
      position -= 595.28
      if (leftHeight > 0) {
        doc.addPage()
      }
    }
  }
  doc.save(imgName)
}
// 竖屏打印pdf
export const downloadPDF = (imgData, imgName, width, height) => {
  const pageHeight = width * (592.28 / 841.89)
  const leftHeight = height
  const position = 0
  const imgWidth = 841.89
  const imgHeight = (841.89 / width) * height
  const doc = jsPDF('', 'pt', 'a4') // 竖着打印
  if (leftHeight < pageHeight) { // 没有超出一页
    doc.addImage(imgData, 'jpeg', 5, 0, imgWidth, imgHeight) // x y width height
  } else {
    while (leftHeight > 0) {
      doc.addImage(imgData, 'jpeg', 5, position, imgWidth, imgHeight)
      leftHeight -= pageHeight
      // position -= 595.28 // 横着打印
      position -= 841.89 // 竖着打印
      if (leftHeight > 0) {
        doc.addPage()
      }
    }
  }
  doc.save(imgName)
}
