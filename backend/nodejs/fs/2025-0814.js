import { writeFile, writeFileSync } from "fs";

console.clear()

// 非同步寫入
// writeFile("./files/2025-0814-writeFile.txt", "Hello World!!", (err) => {
//   if (err) {
//     console.error("1 寫入檔案失敗:", err);
//     return;
//   }
//   console.log("1 檔案寫入成功!");
// });

// 同步寫入
// try {
//   writeFileSync("./files/2025-0814-writeFileSync.txt", "Hello World!!");
//   console.log("2 檔案寫入成功!");
// } catch (err) {
//   console.error("2 寫入檔案失敗:", err);
// }

// console.log("執行 (這裡會比 非同步寫入 先執行)");


// 追加寫入 (非同步)
import { appendFile } from 'fs'

appendFile('./files/追加.txt', `\r\n寫入內容 ${new Date().toLocaleString()}`, err => {
  if (err) {
    console.error('1 追加寫入失敗:', err);
    return;
  }
  console.log('1 追加寫入成功!');
})

console.log("3 執行 (這裡會比 追加寫入(非同步) 先執行)");
