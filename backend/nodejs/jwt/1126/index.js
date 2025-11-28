import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import isLength from "validator/lib/isLength.js"; // 單獨引入 isLength 函式

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 載入專案根目錄的 .env.dev 環境變數
dotenv.config({ path: path.resolve(__dirname, "../../../../.env.dev") });

// bcrypt 示範
const password = "mizuNo123!";

// 密碼加密
const hashedPassword = await bcrypt.hash(password, 12);
// console.log("hashedPassword: ", hashedPassword);

// 密碼比較是否一致
const isMatch = await bcrypt.compare(password, hashedPassword);
// console.log("密碼是否一致: ", isMatch);

const salt = await bcrypt.genSalt(12);
const hash = await bcrypt.hash(password, salt);
// console.log("salt", salt);
// console.log("hash", hash);
/**
 * salt $2b$12$SuXyRVuxUwlcXzEb6GlFiO
   hash $2b$12$SuXyRVuxUwlcXzEb6GlFiO3ooldPGF7qLlHFdWcoLUSAVgB7C91d.
 */

// validator 示範
// 是否為有效的電子郵件格式
// console.log(await validator.isEmail("8catCute@bar.com")); // true
// 是否為有效的字串長度
// console.log(isLength("8catCute", { min: 5, max: 20 })); // true

const strongPassword = "MyPass123";

const isValid = await validator.isStrongPassword(strongPassword, {
  minLength: 8, // 最小長度 8
  minLowercase: 1, // 至少 1 個小寫
  minUppercase: 1, // 至少 1 個大寫
  minNumbers: 1, // 至少 1 個數字
  minSymbols: 0, // 不要求特殊符號(預設是 1)
});

// console.log("強密碼驗證結果: ", isValid); // true 或 false

const PAYLOAD = {
  userName: "Mizu",
  role: "admin",
  pets: ["cat", "dog"],
};

const DEFAULT_TEST_JWT_SECRET = "qw~f21!@@!123"; // 隨便打的測試用 secret XD
const SECRET = process.env.NUXT_PUBLIC_JWT_SECRET || DEFAULT_TEST_JWT_SECRET;

// 1. 建立 JWT TOKEN
const TOKEN = await new Promise((resolve, reject) => {
  jwt.sign(
    PAYLOAD,
    SECRET,
    {
      expiresIn: process.env.NUXT_PUBLIC_JWT_EXPIRES_DAYS || "7d",
    },
    (err, token) => {
      if (err) {
        console.error("JWT 建立失敗: ", err);
        reject(err);
      } else {
        resolve(token);
      }
    },
  );
});
console.log(
  "可將 JWT TOKEN 和 JWT SECRET 丟到 https://www.jwt.io/ 觀看解碼結果: ",
);
console.log("JWT TOKEN: ", TOKEN);
console.log("JWT SECRET: ", SECRET);

// 2. 驗證 JWT TOKEN 並解碼
const decode = await new Promise((resolve, reject) => {
  jwt.verify(TOKEN, SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT 驗證失敗: ", err);
      reject(err);
    } else {
      resolve(decoded);
    }
  });
});
console.log("解碼後的 JWT 資料: ", decode);
