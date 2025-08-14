import { appendFile, appendFileSync, writeFile, writeFileSync, createWriteStream, readFile, readFileSync } from 'fs'

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

// appendFile('./files/追加.txt', `\r\n寫入內容 ${new Date().toLocaleString()}`, err => {
//   if (err) {
//     console.error('1 追加寫入失敗:', err);
//     return;
//   }
//   console.log('1 追加寫入成功!');
// })

// 追加寫入 (同步)
// try {
//   appendFileSync('./files/追加.txt', '\r\n寫入內容 ' + new Date().toLocaleString());
//   console.log('2 追加寫入成功!');
// } catch (err) {
//   console.error('2 追加寫入失敗:', err);
// }

// console.log("3 執行");

// writeFile 追加寫入
// writeFile("./files/追加.txt", "\r\n追加寫入 writeFile", {
//   flag: "a"
// }, (err) => {
//   if (err) {
//     console.error("1 寫入檔案失敗:", err);
//     return;
//   }
//   console.log("1 檔案寫入成功!");
// });

// writeFileSync 追加寫入
// try {
//   writeFileSync("./files/追加.txt", "\r\n追加寫入 writeFileSync", {
//     flag: "a",
//   });
//   console.log("2 檔案寫入成功!");
// } catch (err) {
//   console.error("2 寫入檔案失敗:", err);
// }

// 串流寫入
// createWriteStream
// const ws = createWriteStream('./files/串流寫入.txt')

// ws.write(`串流寫入內容-${Math.random()} \r\n`)
// ws.write(`串流寫入內容-${Math.random()} \r\n`)
// ws.write(`串流寫入內容-${Math.random()} \r\n`)
// ws.write(`串流寫入內容-${Math.random()} \r\n`)

// // 關閉串流(可加可不加，因為程式執行完後 Node.js 會自動關閉串流)
// ws.close()

// 會出現錯誤，因為串流通道已關閉
// ws.write(`寫不進去內容 XD`)

// 文件讀取
// 非同步讀取
readFile('./files/串流寫入.txt', (err, data) => {
  if (err) {
    console.error('讀取檔案失敗:', err)
    return
  }
  console.log('讀取檔案成功:\n', data.toString())
})

// 同步讀取
try {
  const data = readFileSync('./files/串流寫入.txt')
  console.log('讀取檔案成功:', data.toString())
} catch (err) {
  console.error('讀取檔案失敗:', err)
}

