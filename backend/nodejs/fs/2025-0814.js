import { writeFile } from 'fs'

// 非同步寫入
writeFile('./2025-0814-helloWorld.txt', 'Hello World!!', (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('1 檔案寫入成功!')
})