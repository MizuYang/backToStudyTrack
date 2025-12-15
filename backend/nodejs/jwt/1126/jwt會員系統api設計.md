api 練習 - JWT 會員系統
===============================================
## 欄位、格式:
- 帳號: 只能是英文、數字，且長度 4~16 字元
- 密碼: 只能是英文、數字，且長度 8~20 字元
- 暱稱: 只能是中文、英文、數字，且長度 2~10 字元
- 信箱: 必須符合 email 格式
- 生日: 必須為有效日期
- 性別: 只能是男或女

## [註冊會員 API]
METHOD: POST
BASE_URL: /api/v1/users
PATH: /register
BODY: 帳號, 密碼, 暱稱, 信箱, 生日, 性別

- 檢查是否有缺失欄位，回傳 400
- 檢查欄位格式是否正確，回傳 400
- 使用 bcrypt 將密碼加密
- 撈會員資料
- 檢查帳號、信箱是否重複，回傳 409
- 寫入會員資料，回傳 201 (資料被創立)

## [登入會員 API]
METHOD: POST
BASE_URL: /api/v1/users
PATH: /login
BODY: 帳號, 密碼(明碼) -> 帶明碼的原因是為了要讓 bcrypt 做比對

- 檢查是否有缺失欄位，回傳 400
- 檢查帳號、密碼格式是否正確，回傳 400
- 撈會員資料，檢查帳號是否存在、使用 bcrypt 檢查密碼是否正確，回傳 401 (只回傳「帳號或密碼錯誤」，不讓攻擊者知道是帳號不存在還是密碼錯誤（更安全）)
- 建立 AccessToken: 將會員資料、secret key 產生 JWT，並設定有效期限: 15 分鐘 ~ 1 小時
- 建立 RefreshToken: 將會員資料、secret key 產生 JWT，並設定較長的有效期限: 7 天 ~ 30 天
- 將 RefreshToken setCookie，並設定 httpOnly, domain
- 回傳 200，並回傳 AccessToken, 使用者資料

補充:
### 前端密碼傳送方式說明:
- 客戶端應該傳送明文密碼（透過 HTTPS 加密傳輸）
- 因為 bcrypt 每次加密同樣的密碼會產生不同的雜湊值（有加鹽機制）
- 如果客戶端先加密再傳送，後端就無法用 bcrypt.compare() 比對了

- 請前端將 AccessToken 儲存在 fetch header 的 Authorization 欄位，格式: Bearer <token>

## [忘記密碼]
### 忘記密碼會有兩隻 API
1. 請求重設密碼-發送密碼修改的郵件:
  - 建立 reset token, 發送修改密碼郵件
2. 重設密碼:
  - 將密碼加密，寫入資料庫，並將 reset token 標記為已使用過
  - token: 檢查 reset token 是否有效(token是否存在資料庫、是否過期、是否已被使用過)

### [1. 請求重設密碼-發送密碼修改的郵件 API]
METHOD: POST
BASE_URL: /api/v1/users
PATH: /forgot-password
BODY: 信箱

- 驗證信箱的格式，不論正不正確都回傳 200，避免被探測出有效信箱格式
- 撈使用者資料庫確認是否有這個信箱，無論有沒有都回傳200（避免帳號探測）
- 建立 reset token (crypto)，設定有效期限，寫入使用者的資料庫中
- 寄信給使用者，並夾帶 reset token 的連結，回傳 200

### [2. 重置密碼 API]
METHOD: POST
BASE_URL: /api/v1/users
PATH: /reset-password
BODY: reset token, 新密碼

- 用 reset token 撈資料庫檢查是否存在、是否有效、是否過期、是否已使用過，回傳 400
- 檢查密碼是否未填寫，回傳 400
- 檢查密碼格式是否正確，回傳 400
- 檢查密碼是否相同，回傳 200
- 將密碼加密, 寫入使用者資料庫, 並將 reset token 標記為已使用過
- 發送郵件服務通知使用者密碼修改成功
- 回傳 200


## [修改密碼 API]
METHOD: POST
BASE_URL: /api/v1/users
PATH: /change-password
BODY: 目前密碼, 新密碼
HEADERS: Authorization: bearer <Access Token>

- 檢查密碼、新密碼是否為空，回傳 400
- 檢查 Access Token 是否有效，回傳 401
- 檢查新密碼的格式，回傳 400 (放在檢查 access token 之後比較安全)
- 撈會員資料庫，用 bcrypt 比對目前密碼是否正確，回傳 401
- 檢查目前密碼是否與新密碼相同，回傳 400
- 將新密碼加密，寫入資料庫
- 使用寄信服務通知使用者密碼修改成功，回傳 200

優化方向: 同一個信箱 5 分鐘內只能請求一次
