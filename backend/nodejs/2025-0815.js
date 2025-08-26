import {
  // readFileSync,
  // writeFileSync,
  // createReadStream,
  // createWriteStream
  rename
} from 'fs'

console.clear()

// 檔案複製

// // 1. 一次性讀取 => 寫入
// // 先讀取檔案
// const data = readFileSync('./test.mp4')
// // 將檔案寫入到新的檔案中
// writeFileSync('./test(copy).mp4', data)

// // 2. 檔案流式讀取 => 流式寫入
// // 創建讀取流
// const readStream = createReadStream('./test.mp4')
// // 創建寫入流
// const writeStream = createWriteStream('./test(copy).mp4')
// // 讀取流讀取數據
// readStream.on('data', (chunk) => {
//   console.log('讀取到數據塊:', chunk.length)
//   // 將數據塊寫入到新的檔案中
//   writeStream.write(chunk)
// })
// readStream.on('end', () => {
//   console.log('檔案讀取完成')
// })

// // 3. pipe 寫入
// // 創建讀取流
// const rs = createReadStream('./test.mp4')
// // 創建寫入流
// const ws = createWriteStream('./test(copy)22.mp4')
// // 數據讀取完成後自動寫入
// rs.pipe(ws)

// 重新命名檔案
rename('./files/重命名.txt', './files/重命名2.txt', (err) => {
  if (err) {
    console.error('重新命名檔案失敗:', err)
    return
  }
  console.log('檔案重新命名成功!')
})

// 移動檔案位置
rename('./files/移動.txt', './移動順便改名.txt', (err) => {
  if (err) {
    console.error('移動檔案失敗:', err)
    return
  }
  console.log('檔案移動並重新命名成功!')
})
