"use client";

import React from "react";

import { ideaCategories } from "../createIdea/data";

const ExploreIdea = () => {
  return (
    <div className="w-full bg-yellow-10 min-h-screen">
      <div className="max-w-[1040px] mx-auto py-20 px-5 lg:px-0 flex flex-col gap-2.5">
        <h1 className="wv-h5 wv-ibmplexlooped wv-bold text-black ">
          สำรวจเพื่อ &apos;สนับสนุนไอเดีย&apos; จากเพื่อนในท้องถิ่นคุณ
        </h1>
        <p className="wv-b4 wv-ibmplexlooped text-gray-50 ">
          ประชาชนอยากเห็นแผนพัฒนาท้องถิ่นสำหรับ 5 ปีข้างหน้าแบบไหน
        </p>
        <div className=" grid grid-cols-1 gap-2.5 md:grid-cols-2">
          <div className="rounded-[10px] bg-yellow-20 p-10">ddddd</div>
          <div className="rounded-[10px] bg-yellow-20 p-10">ddddd</div>
        </div>
        <p className="wv-b3 wv-ibmplexlooped py-5 wv-bold text-black">
          แบ่งออกเป็น 11 ประเด็น
        </p>
        <div className="flex flex-wrap gap-2.5">
          {ideaCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {}}
              style={{
                borderColor: "var(--maincategory-color)",
              }}
              className={`wv-b5 wv-ibmplexlooped maincategory__${category.id} cursor-pointer rounded-[10px] border bg-transparent! px-2.5 py-1.5 transition-colors hover:bg-gray-10! text-gray-50`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreIdea;
