// 刪除文件
// import { unlink, rm } from 'fs'

// unlink('./files/刪我1.txt', (err) => {
//   if (err) {
//     console.error('刪除檔案失敗:', err)
//     return
//   }
//   console.log('檔案刪除成功!')
// })

// rm('./files/刪我2.txt', (err) => {
//   if (err) {
//     console.error('刪除檔案失敗:', err)
//     return
//   }
//   console.log('檔案刪除成功!')
// })

// 創建資料夾
// import { mkdir } from 'fs'
// mkdir('./newFolder', (err) => {
//   if (err) {
//     console.error('創建資料夾失敗:', err)
//     return
//   }
//   console.log('資料夾創建成功!')
// })
// 遞歸創建資料夾
// mkdir('./newFolder/a/b', { recursive: true }, (err) => {
//   if (err) {
//     console.error('創建資料夾失敗:', err)
//     return
//   }
//   console.log('資料夾創建成功!')
// })

// 讀取資料夾
// import { readdir } from 'fs'
// readdir('./files', (err, data) => {
//   if (err) {
//     console.error('讀取資料夾失敗:', err)
//     return
//   }
//   console.log('資料夾內容:', data)
// })

// 刪除資料夾
// import { rm } from 'fs'
// // 遞歸刪除資料夾
// rm('./newFolder', { recursive: true }, (err) => {
//   if (err) {
//     console.error('刪除資料夾失敗:', err)
//     return
//   }
//   console.log('資料夾刪除成功!')
// })

// 讀取狀態
// import { stat } from 'fs'

// stat('./test.mp4', (err, data) => {
//   if (err) {
//     console.error('讀取檔案狀態失敗:', err)
//     return
//   }
//   // console.log('檔案狀態讀取成功!', data)
//   console.dir(data)
//   console.log('是檔案', data.isFile())
//   console.log('是資料夾', data.isDirectory())
// })

import { writeFile } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// 獲取目前檔案的路徑
const __filename = fileURLToPath(import.meta.url)
// 獲取目前目錄的路徑
const __dirname = dirname(__filename)
console.log(__dirname)

// 所在文件的所在目錄的絕對路徑
const newPath = `${__dirname}/index.html`
writeFile(newPath, '<h1>xxx</h1>', (err) => {
  if (err) {
    console.error('寫入檔案失敗:', err)
    return
  }
  console.log('檔案寫入成功!')
})
