import type { TabId } from "./types";
import { PlanCard } from "./PlanCard";

export function UnderstandTab({ goTo }: { goTo: (id: TabId) => void }) {
  const explore = (id: TabId) => {
    goTo(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <section
      role="tabpanel"
      aria-labelledby="tab-understand"
      id="panel-understand"
      className="flex flex-col gap-10 pt-10 max-w-[1040px] mx-auto lg:px-0"
    >
      <header className="flex flex-col gap-3">
        <h2 className="wv-h5 wv-ibmplexlooped wv-bold text-black ">
          เข้าใจแผนของเทศบาล
        </h2>
        <p className="wv-b4 wv-ibmplexlooped  text-gray-50">
          มีแผนหลัก 2 ประเภทที่ทำงานร่วมกัน
          คลิกที่การ์ดเพื่อสำรวจข้อมูลในแต่ละแผน
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <PlanCard
          badge="5 ปี"
          title={
            <>
              <span>
                แผนพัฒนาท้องถิ่น <br className="md:block hidden" />5 ปี
              </span>
              <br className="md:hidden block" /> <span>(พ.ศ. 2566–2570)</span>
            </>
          }
          onExplore={() => explore("local")}
        >
          <p className="wv-b4 wv-ibmplexlooped text-black">
            เอกสารยุทธศาสตร์ที่กำหนดกรอบงบประมาณและรายการโครงการของ อปท. ในระยะ
            5 ปี ครอบคลุมทั้งมิติระยะยาวและรายละเอียดโครงการรายปี
          </p>
          <div className="space-y-3 wv-b4 wv-ibmplexlooped text-black">
            <p>
              <span className="wv-bold wv-b5 text-black">จุดประสงค์</span>
              <br />
              ใช้กำหนดทิศทาง วิสัยทัศน์ และยุทธศาสตร์การพัฒนาในพื้นที่ของ อปท.
              โดยครอบคลุมทุกด้านการพัฒนา
            </p>
            <p>
              <span className="wv-bold wv-b5 text-black">ระยะเวลา</span>
              <br />
              จัดทำใหม่ทุก 5 ปี แต่สามารถทบทวนและเพิ่มเติม
              หรือเปลี่ยนแปลงได้ตลอด
            </p>
          </div>
          <p className="wv-b5 wv-ibmplexlooped text-gray-30">
            หมายเหตุ: <br />
            เว็บไซต์นี้ใช้แผนนี้เป็นข้อมูลตั้งต้นสำหรับการเลือกเป้าหมายและโครงการในหน้า
            ‘ปั้นไอเดีย’ และ ‘สำรวจไอเดีย’
          </p>
        </PlanCard>
        <PlanCard
          badge="1 ปี"
          title={
            <>
              <span>แผนดำเนินงานประจำปี งบประมาณ</span>
              <br className="md:hidden block" /> <span>(พ.ศ. 2569)</span>
            </>
          }
          onExplore={() => explore("action")}
        >
          <p className="wv-b4 wv-ibmplexlooped text-black">
            เอกสารที่แปลงแผนพัฒนาท้องถิ่น 5 ปี
            ลงสู่การปฏิบัติงานจริงในแต่ละปีงบประมาณ ระบุรายละเอียดโครงการ
            กิจกรรม งบประมาณ และผู้รับผิดชอบอย่างชัดเจน
          </p>
          <div className="space-y-3 wv-b4 wv-ibmplexlooped text-black">
            <p>
              <span className="wv-bold wv-b5 text-black">จุดประสงค์</span>
              <br />
              คัดเลือกและระบุโครงการที่จะลงมือปฏิบัติจริงในปีงบประมาณนั้น
              พร้อมกรอบงบประมาณ
            </p>
            <p>
              <span className="wv-bold wv-b5 text-black">ระยะเวลา</span>
              <br />
              จัดทำใหม่ทุกปีงบประมาณ
            </p>
          </div>
        </PlanCard>
      </div>
    </section>
  );
}
