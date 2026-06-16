"use client";

import WvButton from "@wevisdemo/ui/react/button";
import WvButtonGroup from "@wevisdemo/ui/react/button-group";
import WvParagraphGroup from "@wevisdemo/ui/react/paragraph-group";
import WvSharer from "@wevisdemo/ui/react/sharer";
import "@wevisdemo/ui/styles/button-group.css";
import "@wevisdemo/ui/styles/button.css";
import "@wevisdemo/ui/styles/container.css";
import "@wevisdemo/ui/styles/paragraph-group.css";
import "@wevisdemo/ui/styles/sharer.css";

const AboutPage = () => {
  return (
    <div className=" bg-white">
      <div className="max-w-[1040px] mx-auto px-5 lg:px-0 py-10 flex flex-col gap-24 text-black">
        <div className="md:h-[200px] md:pt-0 pt-12 flex items-center justify-center">
          <h1 className="wv-h4 wv-kondolar wv-black text-black">
            เกี่ยวกับโครงการ
          </h1>
        </div>
        <WvParagraphGroup heading="เป้าหมาย">
          <div className="wv-b4 wv-ibmplexlooped">
            ลานชุมชน คนปั้นเมือง
            เป็นแพลตฟอร์มดิจิทัลภายใต้โครงการนวัตกรรมการจัดทำงบประมาณแบบมีส่วนร่วม
            พัฒนาร่วมกันโดยสถาบันพระปกเกล้าและ WeVis
            โดยมีเป้าหมายให้ประชาชนในพื้นที่สามารถเข้าถึง
            ติดตามและมีส่วนร่วมในกระบวนการงบประมาณของท้องถิ่นได้อย่างโปร่งใสและมีความหมาย
            <ul className="list-disc pl-[2ch]">
              <li>
                <p className="wv-b4 wv-ibmplexlooped text-black">
                  ประการแรก คือ
                  การเปิดเผยข้อมูลงบประมาณขององค์กรปกครองส่วนท้องถิ่น (อปท.)
                  ในรูปแบบที่เข้าถึงและเข้าใจได้ง่าย
                  เพื่อให้ประชาชนสามารถรับรู้ว่างบประมาณในพื้นที่ของตนถูกจัดสรรอย่างไร
                </p>
              </li>
              <li>
                <p className="wv-b4 wv-ibmplexlooped text-black">
                  ประการที่สอง คือ
                  การเปิดช่องทางให้ประชาชนมีส่วนร่วมแสดงความคิดเห็นต่อการจัดสรรงบประมาณผ่านกระบวนการ
                  Participatory Budgeting (PB) ในรูปแบบดิจิทัล
                </p>
              </li>
            </ul>
            <br />
            แนวคิดเบื้องหลังโครงการนี้อิงจากงานวิจัยเรื่อง
            &quot;การจัดทำงบประมาณแบบมีส่วนร่วมผ่านนวัตกรรมประชาธิปไตย:
            การวิเคราะห์เชิงเปรียบเทียบ&quot; ของสำนักนวัตกรรมเพื่อประชาธิปไตย
            สถาบันพระปกเกล้า (2568) ซึ่งศึกษาการประยุกต์ใช้ Digital
            Participatory Budgeting (DPB) ใน 6 ประเทศ ได้แก่ เอสโตเนีย เกาหลีใต้
            อุรุกวัย ไอซ์แลนด์ อินโดนีเซีย และสหรัฐอเมริกา
            และพบว่าแพลตฟอร์มดิจิทัลที่ใช้งานง่าย โปร่งใส
            และออกแบบในรูปแบบผสมผสาน (hybrid) ระหว่างช่องทางออนไลน์และออฟไลน์
            เป็นเครื่องมือสำคัญที่ช่วยให้ประชาชนทุกกลุ่มสามารถเข้ามามีส่วนร่วมได้อย่างแท้จริง
            เว็บไซต์นี้จึงถูกออกแบบบนพื้นฐานของหลักการดังกล่าว
          </div>
        </WvParagraphGroup>

        <WvParagraphGroup heading="ที่มาของข้อมูล & ข้อจำกัด">
          <div className="flex flex-col gap-[30px]">
            <div className="wv-b4 wv-ibmplexlooped">
              ข้อมูลในแพลตฟอร์มนี้มาจากแผนพัฒนาท้องถิ่น ปี 2566-2570
              ขององค์กรปกครองส่วนท้องถิ่น (อปท.) ใน 5 พื้นที่นำร่อง (Sandbox)
              ได้แก่
              <ul className="list-disc pl-[2ch]">
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    เทศบาลเมืองบางคูวัด จ.ปทุมธานี
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    เทศบาลเมืองบางรักพัฒนา จ.นนทบุรี
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    เทศบาลตำบลสุวรรณคูหา จ.หนองบัวลำภู
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    องค์การบริหารส่วนตำบลเชิงทะเล จ.ภูเก็ต
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    องค์การบริหารส่วนจังหวัดลำพูน
                  </p>
                </li>
              </ul>
              ประกอบด้วยโครงการพัฒนาในพื้นที่ จำนวนงบประมาณที่ใช้ในแต่ละโครงการ
              และวัตถุประสงค์ โดยการรวบรวมจากการประสานงานกับหน่วยงานต้นสังกัด
            </div>

            <div className="wv-b4 wv-ibmplexlooped">
              <p className="wv-bold wv-b2">ข้อจำกัดความรับผิดชอบ</p>
              ข้อมูลในแพลตฟอร์มนี้รวบรวมจากเอกสารแผนพัฒนาท้องถิ่นที่ อปท. ทั้ง 5
              แห่งเปิดเผยต่อสาธารณะ
              ภายใต้ข้อจำกัดด้านรูปแบบและความสมบูรณ์ของต้นฉบับ
              <ul className="list-disc pl-[2ch]">
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    ข้อมูลบางส่วนอาจมีความคลาดเคลื่อนหรือยังไม่ได้รับการอัปเดตให้เป็นปัจจุบัน
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    ผู้จัดทำใช้เครื่องมือ AI
                    ในการจัดกลุ่มข้อมูลงบประมาณตามประเด็นต่าง ๆ
                    ซึ่งตรวจสอบโดยมนุษย์แล้ว
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    สถาบันพระปกเกล้าและ WeVis ไม่สามารถรับผิดชอบต่อผลกระทบใดๆ
                    อันเกิดจากความผิดพลาดหรือความไม่ครบถ้วนของข้อมูล
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    แพลตฟอร์มนี้อยู่ในระหว่างการพัฒนา
                    ข้อมูลและฟังก์ชันการทำงานอาจมีการเปลี่ยนแปลง
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    หากต้องการข้อมูลที่เป็นทางการ กรุณาติดต่อ อปท.
                    ในพื้นที่โดยตรง
                  </p>
                </li>
              </ul>
              หากมีข้อสงสัย ต้องการสอบถามเพิ่มเติม แจ้งแก้ไขหรือเพิ่มเติมข้อมูล
              หรือมีข้อเสนอแนะใดๆ สามารถติดต่อได้ที่ สถาบันพระปกเกล้า{" "}
              <p>
                <a
                  href="mailto:sunisa.ka@kpi.ac.th"
                  className="wv-b4 wv-ibmplexlooped underline"
                >
                  sunisa.ka@kpi.ac.th
                </a>
              </p>
            </div>

            <div className="wv-b4 wv-ibmplexlooped">
              <p className="wv-bold wv-b2">ข้อมูล (Open Data)</p>
              ข้อมูลทั้งหมดในแพลตฟอร์มนี้เปิดเผยเป็น Open Data ภายใต้สัญญาอนุญาต
              Attribution-NonCommercial 4.0 International
              ท่านสามารถนำข้อมูลไปใช้ เผยแพร่ ดัดแปลง และต่อยอดได้อย่างเสรี
              ภายใต้เงื่อนไขดังนี้:
              <ul className="list-disc pl-[2ch]">
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    ห้ามนำไปใช้เพื่อการค้า เชิงพาณิชย์หรือแสวงหาผลกำไร
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    ต้องให้เครดิต — ต้องระบุแหล่งที่มาว่า:
                    &quot;ข้อมูลจากแพลตฟอร์ม ลานชุมชน คนปั้นเมือง
                    โดยสถาบันพระปกเกล้า&quot;
                  </p>
                </li>
              </ul>
            </div>

            <div className="wv-b4 wv-ibmplexlooped">
              <p className="wv-bold wv-b2">ซอร์ซโคด (Open Source)</p>
              ซอร์ซโคดของแพลตฟอร์มนี้เปิดเผยเป็น Open Source ภายใต้สัญญาอนุญาต
              Attribution-NonCommercial-ShareAlike 4.0 International
              โดยท่านสามารถนำโค้ดไปใช้ ดัดแปลง และต่อยอดได้ภายใต้เงื่อนไขดังนี้:
              <ul className="list-disc pl-[2ch]">
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    ห้ามนำไปใช้เพื่อการค้า เชิงพาณิชย์หรือแสวงหาผลกำไร
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    ต้องให้เครดิต — ต้องแจ้งและระบุเจ้าของผลงานต้นฉบับ
                  </p>
                </li>
                <li>
                  <p className="wv-b4 wv-ibmplexlooped text-black">
                    ต้องใช้สัญญาอนุญาตเดิม —
                    ผลงานที่ดัดแปลงหรือต่อยอดต้องเผยแพร่ภายใต้เงื่อนไข CC
                    BY-NC-SA 4.0 เช่นเดียวกัน
                  </p>
                </li>
              </ul>
              ผู้อนุญาต (Licensor):  สถาบันพระปกเกล้า 
            </div>
          </div>
        </WvParagraphGroup>

        <WvParagraphGroup heading="ผู้ร่วมพัฒนา">
          <div className="flex flex-col gap-[30px]">
            <div className="wv-b4 wv-ibmplexlooped flex flex-col gap-[10px]">
              <p className="wv-bold">เขียนโปรแกรม</p>
              <p className="">พชร สังข์แก้ว</p>
            </div>
            <div className="wv-b4 wv-ibmplexlooped flex flex-col gap-[10px]">
              <p className="wv-bold">ออกแบบ</p>
              <p className="">น้ำใส ศุภวงศ์</p>
            </div>
            <div className="wv-b4 wv-ibmplexlooped flex flex-col gap-[10px]">
              <p className="wv-bold">สืบค้นและรวบรวมข้อมูล</p>
              <p className="">สถาบันพระปกเกล้า</p>
            </div>
            <div className="wv-b4 wv-ibmplexlooped flex flex-col gap-[10px]">
              <p className="wv-bold">บรรณาธิการ</p>
              <p className="">ธนิสรา เรืองเดช</p>
            </div>
            <div className="wv-b4 wv-ibmplexlooped flex flex-col gap-[10px]">
              <p className="wv-bold">ประสานงานและจัดการอื่น ๆ</p>
              <p className="">อาลาวีย์ วาแม</p>
            </div>
          </div>
        </WvParagraphGroup>
        <WvButtonGroup center>
          <WvButton
            color="blue"
            onClick={() => {
              window.open(
                "https://drive.google.com/drive/folders/18Uh6vb0iv4G38J6Rwa2YMMbUFWQplAA3",
                "_blank",
              );
            }}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_314_173)">
                <path
                  d="M7.03582 2.86356H1.17529V19.4081H19.8247V2.86356C19.8247 2.86356 15.306 2.86356 13.9642 2.86356"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M16.0317 8.65536L10.7284 13.9587L5.42513 8.65536"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <line
                  x1="10.667"
                  y1="0.5"
                  x2="10.667"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <clipPath id="clip0_314_173">
                  <rect
                    width="20.8333"
                    height="20"
                    fill="white"
                    transform="translate(0.0834961 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div>ดาวน์โหลดข้อมูล</div>
          </WvButton>
          <WvButton
            color="blue"
            onClick={() => {
              window.open(
                "https://airtable.com/appsowPzCsRLmUvNx/shryu4errnlj1LWsM",
                "_blank",
              );
            }}
          >
            <img
              width="30"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAACa5JREFUaAXtWWtTVMkZfmaY4TbKTZTLBAQUxJV4qc2mSlNJ5T/kJ+Rz/tD+iXzLhyS1ycZsuVtRUNCIwjirKIW6pTAwl3Od1NP4HJrmDMVuspVya7rq+L793p+3+/TpQaA92h1od6DdgXYH2h1od6DdgXYH2h34n3QgY0cpl8vdU1NTOVv2E+LDTCbTSABvbLz6fSab/0Oh0NmbzSTinwTeOI5RqXqNKAw+N8i2trYK77e3l7p6+ma7OvModOeBjxRzs9lEJpOBTat1H/VGgOruuw1t30JvT0//5tZLnBspohlH6O3p/GhXl2A54mYTezUPvh/i5Ysyps5PFAQYuVwuMzTQj43nZfxscsoYFz6AVsf+2w6o63YcyUSpU8HKS+rK7RguL3+urBdEKK8/RXF8BPl8HlkZM2hvby+GBvvwbbkEP4hMd+jMd0CD8x/6MIbrK5ko9Rri5WPLJUujtOPKen6I0toTDA6cRn9/v3FPAHNG0FQM9BVQLq3BD2NUaz5YggIraRqlDYds0+a27vvyyqm4mosqntnGQYT1tSfo6cphZGTEYCO+ZEvLKZvN4syZM/B9H8/Wn2LmwiyaNQ/a3rJzKZMxoL0baNOqONf/JHM3ljtnDG5j7s7S+hoyzRDnz18EMWkccJIA6OjowOjoKDpzGTzjSgex2SIE4z5Mqoc68T82TctVre9v43JpHY1aBXNzc4fAEuIhwFwhPhwEPTExAcQBys/WzfauNQJYr5ixEzAzafEPbTRkL5nm0otKr3kalS8pV7bhR3j+7TO8f/cGCwsLBoONiTESwHKmUEYEPT09Db+xh+flZ/D8CLWGf2SV3VV354wtmfJIprn0otJrnkbly5p4QG28eI7NVy9w/fp1cyILh5pF+wSwhDbl3s/lcpidncVe5R02XpTN+1H3uNIHW9n2oVzD5m2ZfCUTte1tXnpR+bMJvFDUvRCvXm6gXHqCX3z6Kbq6upJFk618jxxaUogSNL9f8/PzWF5ZQSabRbE4YQB35TuMmV4D+djF2rz0omk6W2bz9HHn3HHcxltbm1h9vIJf3bqFnp6eBCx9VBt9ySeAKXAD0oAygu7s7MTClStYWloyjqNjRVaAznyHsVFggfkxqF0fLxQE+/b1a6zcv4dbt27i1KlT5r21c9s+lB8L2DYW6KtXr2JxcRGZTBYjI2PmEOvMZ480y05KvlVDmMPV2XndOJzzs1P3I7z77jss3r2DmzdvYmBgIAHrxlMMxk0AS3gc5SHW3d2Na9eu4d69RbPyw8PneGtFPre/vdP8WcBxIGwdedfe1gdhjIYX4f37d/jm69v45WefYWhoyNQiX9Zg+6gmxk0AR1F0pNMyJFURBM0r6LVrVw3oT35+wyRsxk3kculnIH1POtIKlW8Yxqh7MSqVbdz56kvcuHHd3KJYE3O4edJiHaqQBvbDU1BOogzK7c33hQlX7t/FzvZ71P0Y7L583Diu3J7bfJof9UEYoeZF2N2r4PY/vsDCwhUUi8XkW6umkNoxVDcp4ySAXSMZ2oEUjKDZVYI2K/2vr1Gp7KDuRYiiw02z4zKhHhXAuctrLt8wig3YanUPX37xF1yam8Xk5GRLsGk1S5YAlkCgRJXU1pMXaP7YYLfv/PPv2N2toOZHyUoLnEApVhq1bfl6GZ84xgHYKv765z9hevq8uQxpGzOWhvi0+NIlgG0jBrDn4hVYVNuboIvFcSzd/Qb1et2coCxUfqQ2oDRettRphHHT7Brf8/DV7b+hv++0AcvLEHNryJdz8a1ocmjR4LihAAoqygL39vbMvZv310f/fozpi/NAsxPdeR4kh6PahUrj5t7PBdSDJoIgwPL9u/jtb35teDaUh6btY/OMmZZD9SaAj0vOAPtF7DdFPLdepVIxV7lz586B8/lLc1h9soqZ2csA8ujKsQBFT/9cHGj3Ofa+ETQRhpE5FK98cjn5zr59+9bk5K5iXTxAVZ/isL400MbeNuJqCYwo9ZKTp5zzMAyxs7NjEvIHNgeTs/tzsxdRevoYfhCYwvm3JQ3FbUUZmye+AfvgHuYvzZrf5wLAxvL9ZaP1rqs+N6Yr5zz1HXYdWSxldOCjlaWcv5vtwcIKhQIuXpg2oFl4w28i+uBrx1E8m3JloyjGw+VFXJiZwvDwWbNaAkx//QVDoO16VQtlHLaO/CHAMrYpjViQHLmyfGcJmmAllw8L48NP1vTUJNbXHhsAns846Z+s/cL2t3EUA48ePsDExHgCTGCVgzkJmnURNGuym6aaSPdjH9AEsBS2sc0zIANXq1V4nofx8XHlPxKUBXJ79/X1YaI4htLaKqK4abY3V8+OS56r3whiEOzqo2WMnB3C+Nh4srKuvRKz4Wy8FsBeGPlQxiFdAlgCGZJKRsrAtVotAWvb2byKEWjec8dGz2J9bdV8U+sB4IcECdOEIOSnhzzw5PFDDPQXzKVCh5HikSqP6qKMoPn3Ny4Ea6RO+jT7Q6c0DezBuZz5OSBgraxsRW0/8QI9PDxsVmv10QMUJ6fNyoem8fvH995eBaX1VYyPjhy6VCgOqZtHc+YYGxvD5uamycHfw2wWHw7qNehjAHNLKACV5O2HYNlBBmYA21bBbCq9bHmqEjRP8FKphBfldXT39BqXanXX/NK6cnkeg4ODSaF2vON45RJo2hK0hgv8yAoLKB3INxoN844woJylU9BWlP4CTV+e3ryccAuyydw9hcKM+clJvVaDVLwAtcpBuewFmnP+jCVlDlLVkgCmQA+D0JCF7e7umhORBSm56HFFpOmYmHH4Nyc+GpTz4RD9PjlsW77TW1tbJg7/SsN89kgAUyhHguWVjhcLHv/cktKRsijN7WAn4W1wafY/NC5jKTYvJ2/evDFnhfn/JOs2lsBnIj42WN1qpFMxomkF/z9lqosLxNrtb7R0CWAWSiG/tdzG/O8W/ipxhxxd+XHzVj6t5K1i0f4kD/25lXlQCrT8EkT8hvEhWP5BjFshrSA56l1jcMrseVrBOjxcXVo82dhxxYsqr2xFWQdzcXCleQ/Y3t4225tzA5jXQH52+Jw+fdqAVYFMkDZcuTtnYhUnqkLceHaRrs6OK17UteXc1XGXEhO/Crz5GcBhGEa+70c8yrmyKsx1dhNQ32plqbP1iiXKWPKVTFR5pNec1Lax9bZcsSmjDTHx2+x5Xmze4WKxuJPNZp/yGKfRSR8V0Mo+TU+Zhusnuair59wett6Wk5etbD58op4n967l5eWZIAh+l81mx+zOuYE+trkF/HU2m/3jx1Z/u952B9odaHeg3YF2B9od+Ig78B9BXoZRBjVExQAAAABJRU5ErkJggg=="
              alt=""
            />
            <span>Feedback</span>
          </WvButton>
        </WvButtonGroup>
        <WvSharer center />
      </div>
    </div>
  );
};

export default AboutPage;
