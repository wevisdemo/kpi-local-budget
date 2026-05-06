"use client";
import Image from "next/image";
import { ideaCategories } from "../createIdea/data";
import { currentSite } from "@/src/config/sites";
import { useRouter } from "next/navigation";
import LottieAnimation from "./components/LottieAnimation";

export default function LandingPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 h-full">
      <div className="w-full bg-green-40 lg:h-[calc(100vh-56px)] h-full flex flex-col">
        <div
          className="relative w-full py-20 px-10 bg-green-40"
          style={{
            backgroundImage: `url(${basePath}/img/city.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0">
            <LottieAnimation />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <p className="wv-b4 text-black wv-ibmplexlooped px-5 bg-yellow-10 rounded-full w-fit ">
              {currentSite.subtitle}
            </p>
            <div className="mt-10 text-center">
              <p className="wv-h4 wv-ibmplexlooped wv-bold text-white">
                ลานชุมชน คนปั้นเมือง
              </p>
              <p className="wv-b3 text-white wv-ibmplexlooped">
                ชวนล้อมวง ระดมความคิด กำหนดทิศ &apos;งบประมาณท้องถิ่น&apos;
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 flex-1 z-10">
          <div
            className="col-span-2 md:col-span-1"
            onClick={() => {
              router.push(`${basePath}/create-idea`);
            }}
          >
            <button className="group bg-teal-20 md:px-[60px] px-[40px] py-[40px] flex flex-col justify-between h-full w-full">
              <div className="flex flex-col gap-2.5 items-start">
                <p className="wv-b3 wv-bold wv-ibmplexlooped text-black">
                  ปั้นไอเดีย เปลี่ยนเมือง
                </p>
                <p className="wv-b3 wv-ibmplexlooped text-black text-left">
                  คุณอยากเห็นการพัฒนาแบบไหน (ใช้เวลา 5-10 นาที)
                </p>
              </div>
              <div className="flex items-center justify-end ">
                <div className="p-[14px] bg-magenta-30 rounded-full w-fit group-hover:bg-black">
                  <Image
                    src={`${basePath}/icon/arrow-right.svg`}
                    alt="idea"
                    width={20}
                    height={20}
                    className="object-contain "
                  />
                </div>
              </div>
            </button>
          </div>
          <div className="col-span-1">
            <button
              className="group bg-yellow-20 md:px-[60px] px-[40px] py-[40px] flex flex-col justify-between h-full w-full"
              onClick={() => {
                router.push(`${basePath}/explore-idea`);
              }}
            >
              <div className="flex flex-col gap-2.5 items-start">
                <p className="wv-b3 wv-bold wv-ibmplexlooped text-black">
                  สำรวจไอเดีย
                </p>
                <p className="wv-b3 wv-ibmplexlooped text-black text-left">
                  สำรวจเพื่อ ‘สนับสนุน’ ไอเดียจากเพื่อนในท้องถิ่นคุณ
                </p>
              </div>
              <div className="flex items-center justify-end ">
                <div className="p-[14px] bg-magenta-30 rounded-full w-fit group-hover:bg-black">
                  <Image
                    src={`${basePath}/icon/arrow-right.svg`}
                    alt="idea"
                    width={20}
                    height={20}
                    className="object-contain "
                  />
                </div>
              </div>
            </button>
          </div>
          <div className="col-span-1">
            <button
              className="group bg-gray-10 md:px-[60px] px-[40px] py-[40px] flex flex-col justify-between h-full w-full"
              onClick={() => {
                router.push(`${basePath}/plan`);
              }}
            >
              <div className="flex flex-col gap-2.5 items-start">
                <p className="wv-b3 wv-bold wv-ibmplexlooped text-black">
                  สำรวจแผน
                </p>
                <p className="wv-b3 wv-ibmplexlooped text-black text-left">
                  ทำความเข้าใจแผนพัฒนาท้องถิ่นและแผนดำเนินงานประจำปี
                </p>
              </div>
              <div className="flex items-center justify-end ">
                <div className="p-[14px] bg-magenta-30 rounded-full w-fit group-hover:bg-black">
                  <Image
                    src={`${basePath}/icon/arrow-right.svg`}
                    alt="idea"
                    width={20}
                    height={20}
                    className="object-contain "
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto h-[80px] w-full">
          {ideaCategories.map((category) => (
            <div
              key={category.id}
              className={`maincategory__${category.id} lg:flex-1 flex-none`}
            >
              <Image
                src={`${basePath}/img/${category.id}.png`}
                alt={category.title}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-yellow-10">
        <div className="max-w-[1040px] mx-auto px-5 lg:px-0 py-20">
          <p className="wv-h6 wv-ibmplexlooped text-black text-center wv-bold">
            จะดีกว่าไหม? ถ้า &apos;งบประมาณชุมชน&apos;
            <br />
            ถูกใช้ไปกับสิ่งที่คุณต้องการจริงๆ
          </p>
          <p className="wv-b2 wv-ibmplexlooped text-pink-40 text-center wv-bold">
            กระบวนการ
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-5">
            <div className="col-span-1 w-full flex flex-col gap-5">
              <div className="relative">
                <p className="wv-b2 wv-ibmplexlooped text-white text-center wv-bold bg-pink-40 rounded-full w-fit px-3 absolute top-0 left-0">
                  1
                </p>
                <div className="bg-pink-10 border-2 border-pink-40 rounded-[100px] p-5 h-[166.6649932861328]">
                  <Image
                    src={`${basePath}/img/step-1.png`}
                    alt="step1"
                    width={100}
                    height={100}
                    className="object-contain w-full h-full mix-blend-color-burn"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="wv-b2 wv-ibmplexlooped text-black wv-bold">
                  เข้าร่วมกิจกรรม &quot;ลานชุมชน คนปั้นเมือง&quot;
                </p>
                <p className="wv-b4 wv-ibmplexlooped text-black">
                  เปลี่ยนจาก &quot;แค่มาฟังนโยบาย&quot; เป็น &quot;เวทีร่วมคิด
                  ร่วมตัดสินใจ&quot;
                  ที่เปิดโอกาสให้คุณกำหนดอนาคตพื้นที่บ้านเราด้วยตัวเอง
                  ไม่ใช่แค่การประชุมทั่วไป
                  แต่คือการระดมสมองเพื่อหาทางออกที่ตรงจุดที่สุด
                  ผ่านการเสนอนโยบาย และการโหวตเลือกด้วยเสียงของคุณเอง
                </p>
              </div>
            </div>
            <div className="col-span-1 w-full flex flex-col gap-5">
              <div className="relative">
                <p className="z-20 wv-b2 wv-ibmplexlooped text-white text-center wv-bold bg-pink-40 rounded-full w-fit px-3 absolute top-0 left-0">
                  2
                </p>
                <div className="bg-pink-10 border-2 border-pink-40 rounded-[100px] h-[166.6649932861328] z-10">
                  <Image
                    src={`${basePath}/img/step-2.png`}
                    alt="step1"
                    width={100}
                    height={100}
                    className="w-full h-full mix-blend-color-burn object-contain rounded-[100px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="wv-b2 wv-ibmplexlooped text-black wv-bold">
                  แลกเปลี่ยนความเห็นกับนักนโยบายมืออาขีพ
                </p>
                <p className="wv-b4 wv-ibmplexlooped text-black">
                  มาร่วมสวมบทบาท &quot;นักปั้นเมือง&quot;
                  ผู้เป็นพลังสำคัญในการออกแบบโครงการที่ใช่
                  และโหวตเลือกนโยบายที่จะเปลี่ยนชุมชนให้ดีขึ้นจริง
                  โดยทำงานร่วมกับภาครัฐอย่างใกล้ชิด
                </p>
              </div>
            </div>
            <div className="col-span-1 w-full flex flex-col gap-5">
              <div className="relative">
                <p className="z-20 wv-b2 wv-ibmplexlooped text-white text-center wv-bold bg-pink-40 rounded-full w-fit px-3 absolute top-0 left-0">
                  3
                </p>
                <div className="bg-pink-10 border-2 border-pink-40 rounded-[100px] h-[166.6649932861328] z-10">
                  <Image
                    src={`${basePath}/img/step-3.png`}
                    alt="step1"
                    width={100}
                    height={100}
                    className="w-full h-full mix-blend-color-burn object-contain rounded-[100px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[5px]">
                <p className="wv-b2 wv-ibmplexlooped text-black wv-bold">
                  เสียงของคุณ คืออำนาจในการสร้างเมือง
                </p>
                <p className="wv-b4 wv-ibmplexlooped text-black">
                  การคัดเลือกโครงการในท้ายที่สุด
                  จะถูกนำกลับมาทำเป็นรายงานข้อเสนอแนะเชิงนโยบายโดยสถาบันพระปกเกล้า
                  เพื่อส่งมอบต่อไปให้พื้นที่ของคุณ ข้อมูลชุดนี้จะทำให้อปท.
                  มีแนวทางในการจัดทำงบประมาณแบบมีส่วนร่วมในอนาคต
                  และยังเป็นข้อเสนอแนะที่จะมีผลโดยตรงต่อการจัดทำแผนพัฒนาท้องถิ่นปี
                  2570-2575
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-green-50">
        <div className="max-w-[1040px] mx-auto px-5 lg:px-0 py-10">
          <p className="wv-b3 wv-ibmplexlooped text-white wv-bold">
            เกี่ยวกับ ลานชุมชน คนปั้นเมือง
          </p>
          <span className="wv-b4 wv-ibmplexlooped text-white mt-2.5 block">
            เว็บไซต์นี้พัฒนาขึ้นเพื่อเปิดข้อมูลงบประมาณท้องถิ่นให้ประชาชนเข้าถึงได้ง่าย
            และเปิดช่องทางให้ประชาชนมีส่วนร่วมแสดงความคิดเห็นต่อการจัดสรรงบประมาณในพื้นที่ของตน
            ข้อมูลทั้งหมดรวบรวมจากเอกสารราชการและรายงานที่เกี่ยวข้อง
            ภายใต้ข้อจำกัดที่ทีมงานไม่สามารถรับประกันความครบถ้วนในทุกกรณี
            หากพบข้อผิดพลาดหรือต้องการสอบถาม ติดต่อได้ที่
            <br />
            <a
              href="mailto:sunisa.ka@kpi.ac.th"
              className="wv-b4 wv-ibmplexlooped text-white underline"
            >
              sunisa.ka@kpi.ac.th
            </a>
          </span>
          <a
            href={`${basePath}/about`}
            className="wv-b4 wv-ibmplexlooped text-white underline block mt-2.5"
          >
            อ่านเพิ่มเติม
          </a>
        </div>
      </div>
    </div>
  );
}
