import { writeFile, writeFileSync } from "fs";

// 非同步寫入
writeFile("./files/2025-0814-writeFile.txt", "Hello World!!", (err) => {
  if (err) {
    console.error("1 寫入檔案失敗:", err);
    return;
  }
  console.log("1 檔案寫入成功!");
});

// 同步寫入
try {
  writeFileSync("./files/2025-0814-writeFileSync.txt", "Hello World!!");
  console.log("2 檔案寫入成功!");
} catch (err) {
  console.error("2 寫入檔案失敗:", err);
}

console.log("執行 (這裡會比 非同步寫入 先執行)");
