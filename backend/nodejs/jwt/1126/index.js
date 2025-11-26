import bcrypt from "bcryptjs";
import validator from "validator";
import isLength from "validator/lib/isLength.js"; // 單獨引入 isLength 函式

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
console.log(await validator.isEmail("8catCute@bar.com")); // true
// 是否為有效的字串長度
console.log(isLength("8catCute", { min: 5, max: 20 })); // true

const strongPassword = "MyPass123";

const isValid = await validator.isStrongPassword(strongPassword, {
  minLength: 8, // 最小長度 8
  minLowercase: 1, // 至少 1 個小寫
  minUppercase: 1, // 至少 1 個大寫
  minNumbers: 1, // 至少 1 個數字
  minSymbols: 0, // 不要求特殊符號(預設是 1)
});

console.log("強密碼驗證結果: ", isValid); // true 或 false
