import {
  readFileSync,
  writeFileSync,
  createReadStream,
  createWriteStream
} from 'fs'

console.clear()

// 文件複製

// 1. 一次性讀取 => 寫入
// 先讀取文件
const data = readFileSync('./test.mp4')
// 將文件寫入到新的文件中
writeFileSync('./test(copy).mp4', data)

// 2. 文件流式讀取 => 流式寫入
// 創建讀取流
const readStream = createReadStream('./test.mp4')
// 創建寫入流
const writeStream = createWriteStream('./test(copy).mp4')
// 讀取流讀取數據
readStream.on('data', (chunk) => {
  console.log('讀取到數據塊:', chunk.length)
  // 將數據塊寫入到新的文件中
  writeStream.write(chunk)
})
readStream.on('end', () => {
  console.log('文件讀取完成')
})

// 3. pipe 寫入
// 創建讀取流
const rs = createReadStream('./test.mp4')
// 創建寫入流
const ws = createWriteStream('./test(copy)22.mp4')
// 數據讀取完成後自動寫入
rs.pipe(ws)
