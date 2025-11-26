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
