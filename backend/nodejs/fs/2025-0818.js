import { unlink, rm } from 'fs'

// 刪除文件
unlink('./files/刪我1.txt', (err) => {
  if (err) {
    console.error('刪除檔案失敗:', err)
    return
  }
  console.log('檔案刪除成功!')
})

rm('./files/刪我2.txt', (err) => {
  if (err) {
    console.error('刪除檔案失敗:', err)
    return
  }
  console.log('檔案刪除成功!')
})
