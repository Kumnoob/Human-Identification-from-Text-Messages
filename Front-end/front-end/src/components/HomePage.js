import React from 'react'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="searchField">
        <h2 style={{ marginTop: "50px" }}>
          <strong>CE KMITL Project 2565</strong>
        </h2>
        <h2 style={{ marginBottom: "40px" }}>
          <strong>Human Identification from Text Messages</strong>
        </h2>
        <h5 style={{ marginBottom: "40px" }}>
          <strong>วัตถุประสงค์</strong>
        </h5>
        <p>
          &emsp;&emsp;&emsp;&emsp; เว็บไซต์นี้ จัดทำขึ้น เพื่อใช้ประโยชน์
          ในการทดสอบ การแยกแยะ ตัวบุคคล จากบทความออนไลน์ โดยใช้
          เทคโนโลยีที่ชื่อว่า Machine Learning
          ซึ่งเป็นเทคโนโลยีที่สามารถทำให้ระบบคอมพิวเตอร์ เรียนรู้ได้ด้วยตนเอง
          โดยใช้ข้อมูลที่มีอยู่ โดย Machine Learning นี้ สามารถทำการ จัดหมวดหมู่
          ของข้อมูล หรือเรียกว่า Classification ได้ ซึ่งจะเป็นหัวใจหลักของการ
          แยกตัวบุคคล จากบทความ หรือ งานเขียนต่างๆ
          และสามารถพัฒนาไปสู่การระบุความเป็นไปได้ของตัวบุคคลจากข้อความ
          ที่ไม่ระบุตัวตนในโลกออนไลน์ในอนาคตได้
        </p>
        <p style={{marginTop:"40px"}}>
          &emsp;&emsp;&emsp;&emsp; ผลงานนี้ เป็นส่วนหนึ่งของวิชา COMPUTER
          ENGINEERING PROJECT ของคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์
          สถาบันเทคโนโลยีพระจอมเกล้า เจ้าคุณทหารลาดกระบัง
        </p>
      </div>
  )
}
