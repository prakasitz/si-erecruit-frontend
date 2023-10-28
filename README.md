# Si-erecruit-frontend
> **Status: Developing**

โปรเจคสำหรับฝั่ง HR นำข้อมูลผู้สมัครเข้าระบบ โดย 1 ครั้ง Import File เรัยกว่า Job และแต่ละ Job จะมีหลาย Profile แต่ 1 Profile มีได้แค่ 1 Candidate เท่านั้น \
ซึ่งจะมี State มากมายที่ไว้ควบคุม Job, Profile, Candidate, จุดที่ท้าทายก็คือการจัดการ Event ของแต่ละ State ให้ดี รวมถึงการทำหน้า Form แบบขั้นบันได ให้ User กรอก \
การเก็บข้อมูล Consent ของ User, การ Design หน้าจอ เป็นต้น

## User Role:
- ADMIN -> จัดการข้อมูล ตรวจดู Log และเพิ่ม User 
- HR -> นำเข้า Job และแก้ไข Profile ก่อนเปิดให้ Candidate เข้า
- Candidate -> จะเข้ามาได้ก็ต่อเมื่ออยู่ในสถานะ Profile:Publishable และจะไม่สามารถเข้าได้ ถ้า Candidate:Inactive ซึ่งจะเข้ามากรอกข้อมูลสมัครงานหรือสละสิทธิ


## Tech Stack (Frontend Only):
- Nuxt3 (Nodejs)
- Vuetify3
- Pinia for Storing State data
- VueDatePicker - for custom datepicker (Vuetify3 on this version not includes)
- OAuth2 & Basic JWT TOKEN
- Nitro Cache - using for storing Credential token
- axios for SSR - send data from backend site to api service "si-erecruit-backend"

