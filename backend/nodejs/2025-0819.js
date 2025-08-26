import fs from "fs";
import url from "url";
import path from "path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const filesPath = `${__dirname}/files/rename`;
console.log(filesPath);

/**
 * 功能敘述：
 * 將 ./files/rename 底下的檔案，10以下的名稱改成 0開頭，例：1.txt => 01.txt
 */

// 讀取資料夾
// const filesFolder = fs.readdirSync('./files/rename')
const filesFolder = fs.readdirSync(filesPath);

renameFile();
renameReset();

// 將 ./files/rename 底下的檔案名稱進行重新命名
function renameFile() {
  filesFolder.forEach((file) => {
    const [num, ext] = file.split(".");
    // 如果 num 是單位數，則在前面補 0
    const newFileName = `${num.padStart(2, "0")}.${ext}`;

    // 重新命名檔案
    fs.rename(
      `${filesPath}/${file}`,
      `${filesPath}/${newFileName}`,
      (err) => {
        if (err) {
          console.error(`重新命名檔案 ${file} 失敗:`, err);
          return;
        }
        console.log(`檔案 ${file} 重新命名成功為 ${newFileName}!`);
      },
    );
  });
}
// 將檔案名稱恢復為原本的名稱
function renameReset() {
  filesFolder.forEach((file) => {
    const [num, ext] = file.split(".");
    if (ext !== "txt") return;

    const newFileName = `${+num}.txt`;

    // 將檔案重新命名恢復
    fs.rename(`${filesPath}/${file}`, `${filesPath}/${newFileName}`, (err) => {
      if (err) {
        console.error(`重新命名檔案 ${file} 失敗:`, err);
        return;
      }
      console.log(`檔案 ${file} 重新命名成功為 ${newFileName}!`);
    });
  });
}
