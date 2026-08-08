# เสี่ยงเซียมซีไขปริศนา

เกมเว็บภาษาไทยสำหรับสุ่มเซียมซี ไขปริศนา และเปิดคำทำนาย พร้อมระบบคะแนน สถิติสูงสุด เสียงประกอบ และหน้าจอที่รองรับมือถือ

## Deploy บน Railway

Repository นี้มี `Dockerfile` และ `railway.json` พร้อมใช้งาน Railway จะติดตั้ง dependency, build เกม, เริ่มเซิร์ฟเวอร์ด้วย `npm start` และอ่านพอร์ตจากตัวแปร `PORT` โดยอัตโนมัติ

## Run ในเครื่อง

```bash
npm install
npm run build
npm start
```

ต้องใช้ Node.js 22.13 ขึ้นไป
