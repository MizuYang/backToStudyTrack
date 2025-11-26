import bcrypt from "bcryptjs";

// bcrypt 示範
const password = "mizuNo123!";

// 密碼加密
const hashedPassword = await bcrypt.hash(password, 12);
console.log("hashedPassword: ", hashedPassword);

// 密碼比較是否一致
const isMatch = await bcrypt.compare(password, hashedPassword);
console.log("密碼是否一致: ", isMatch);
