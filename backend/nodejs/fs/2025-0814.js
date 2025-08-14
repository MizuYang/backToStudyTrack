import { appendFile, appendFileSync, writeFile, writeFileSync } from "fs";

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
writeFile("./files/追加.txt", "\r\n追加寫入 writeFile", {
  flag: "a"
}, (err) => {
  if (err) {
    console.error("1 寫入檔案失敗:", err);
    return;
  }
  console.log("1 檔案寫入成功!");
});

// writeFileSync 追加寫入
// try {
//   writeFileSync("./files/2025-0814-writeFileSync.txt", "Hello World!!");
//   console.log("2 檔案寫入成功!");
// } catch (err) {
//   console.error("2 寫入檔案失敗:", err);
// }