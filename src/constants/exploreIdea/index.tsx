"use client";

import React, { useEffect, useState } from "react";

import { ideaCategories } from "../createIdea/data";
import Card from "./component/Card";
import type { Goal, ProjectNocoDb, Transaction } from "@/src/services/type";
import {
  getGoals,
  getProjects,
  getTransactions,
} from "@/src/services/exploreIdea";
import { IdeaCategory } from "../createIdea/types";
import Image from "next/image";

const ExploreIdea = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [projects, setProjects] = useState<ProjectNocoDb[]>([]);
  const [activeCategory, setActiveCategory] = useState<IdeaCategory | null>(
    null,
  );
  const fillterCategoryGoals = activeCategory
    ? [activeCategory]
    : ideaCategories;
  useEffect(() => {
    getGoals()
      .then((data) => {
        setGoals(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load goals", error);
        setGoals([]);
      });
    getTransactions()
      .then((data) => {
        setTransactions(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load transactions", error);
        setTransactions([]);
      });
    getProjects()
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
        setProjects([]);
      });
  }, []);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const totalPeople = new Set(
    transactions
      .map((transaction) => transaction.user_id)
      .filter((userId): userId is string => Boolean(userId)),
  ).size;
  const totalProposedGoals = goals.filter((goal) =>
    Boolean(goal.creator_id),
  ).length;
  const totalExistingGoals = Math.max(goals.length - totalProposedGoals, 0);
  const existingGoalPercent =
    goals.length > 0 ? (totalExistingGoals / goals.length) * 100 : 0;
  const proposedGoalPercent =
    goals.length > 0 ? (totalProposedGoals / goals.length) * 100 : 0;
  const totalExistingProjects = projects.filter((project) =>
    Boolean(project.creator_id),
  ).length;
  const totalProposedProjects = Math.max(
    projects.length - totalExistingProjects,
    0,
  );
  const existingProjectPercent =
    projects.length > 0 ? (totalExistingProjects / projects.length) * 100 : 0;
  const proposedProjectPercent =
    projects.length > 0 ? (totalProposedProjects / projects.length) * 100 : 0;

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
          <div className="rounded-[10px] bg-yellow-20 p-10">
            <div className="flex justify-between items-start">
              <div className="wv-ibmplexlooped text-black">
                <p className="wv-b4 ">ผู้ตอบแบบสำรวจ</p>
                <p className="wv-h6 wv-bold">{totalPeople} คน</p>
                <p className="wv-b5">ตอบทั้งหมด {transactions.length} ครั้ง</p>
              </div>
              <Image
                src={`${basePath}/icon/people-icon.svg`}
                alt="explore idea"
                width={32}
                height={32}
              />
            </div>
            <p className="wv-b6 wv-ibmplexlooped text-gray-40">
              หมายเหตุ: นับจำนวนคนตามอุปกรณ์ที่ใช้ตอบ โดยถ้า 1 คนตอบหลายครั้ง
              และใช้อุปกรณ์เครื่องเดิม จะนับเป็น 1 คน
            </p>
          </div>
          <div className="rounded-[10px] bg-yellow-20 p-10 flex flex-col gap-2.5 wv-ibmplexlooped">
            <p className="wv-b3 text-black">ภาพรวม</p>
            <div className="flex gap-1.5 items-center">
              <p className="wv-h6 wv-bold text-black">{goals.length}</p>
              <p className="wv-b3 text-black">เป้าหมาย</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-4">
                <div className="text-gray-50">
                  <p className="wv-b6 wv-bold">
                    {existingGoalPercent.toFixed(1)}%
                  </p>
                  <p className="wv-b6">สิ่งที่กำลังจะทำอยู่แล้ว</p>
                </div>
                <div className="text-right text-green-50">
                  <p className="wv-b6 wv-bold">
                    {proposedGoalPercent.toFixed(1)}%
                  </p>
                  <p className="wv-b6">ไอเดียใหม่จากเพื่อนบ้าน</p>
                </div>
              </div>
              <div className="flex h-[20px] w-full overflow-hidden border border-gray-30 bg-white">
                <div
                  className="bg-gray-20-80"
                  style={{ width: `${existingGoalPercent}%` }}
                  aria-label={`สิ่งที่กำลังจะทำอยู่แล้ว ${existingGoalPercent.toFixed(1)}%`}
                />
                <div
                  className="bg-green-10-80"
                  style={{ width: `${proposedGoalPercent}%` }}
                  aria-label={`ไอเดียใหม่จากเพื่อนบ้าน ${proposedGoalPercent.toFixed(1)}%`}
                />
              </div>
            </div>
            <div className="flex gap-1.5 items-center">
              <p className="wv-h6 wv-bold text-black">{projects.length}</p>
              <p className="wv-b3 text-black">โครงการ</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-4">
                <div className="text-gray-50">
                  <p className="wv-b6 wv-bold">
                    {existingProjectPercent.toFixed(1)}%
                  </p>
                  <p className="wv-b6">สิ่งที่กำลังจะทำอยู่แล้ว</p>
                </div>
                <div className="text-right text-green-50">
                  <p className="wv-b6 wv-bold">
                    {proposedProjectPercent.toFixed(1)}%
                  </p>
                  <p className="wv-b6">ไอเดียใหม่จากเพื่อนบ้าน</p>
                </div>
              </div>
              <div className="flex h-[20px] w-full overflow-hidden border border-gray-30 bg-white">
                <div
                  className="bg-gray-20-80"
                  style={{ width: `${existingProjectPercent}%` }}
                  aria-label={`สิ่งที่กำลังจะทำอยู่แล้ว ${existingProjectPercent.toFixed(1)}%`}
                />
                <div
                  className="bg-green-10-80"
                  style={{ width: `${proposedProjectPercent}%` }}
                  aria-label={`ไอเดียใหม่จากเพื่อนบ้าน ${proposedProjectPercent.toFixed(1)}%`}
                />
              </div>
            </div>
            <p className="wv-b6 wv-ibmplexlooped text-gray-40">
              หมายเหตุ: &quot;สิ่งที่กำลังจะทำอยู่แล้ว&quot; หมายถึง
              สิ่งที่ถูกเขียนไว้ในแผนพัฒนาท้องถิ่น 5 ปี (พ.ศ. 2566-2570) ฉบับแรก
            </p>
          </div>
        </div>
        <p className="wv-b3 wv-ibmplexlooped py-5 wv-bold text-black">
          แบ่งออกเป็น 11 ประเด็น
        </p>
        <div className="flex flex-wrap gap-2.5">
          {ideaCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setActiveCategory(
                  activeCategory?.id === category.id ? null : category,
                );
              }}
              style={{
                borderColor: "var(--maincategory-color)",
              }}
              className={`wv-b5 wv-ibmplexlooped maincategory__${category.id} cursor-pointer rounded-[10px] border bg-transparent! px-2.5 py-1.5 transition-colors hover:bg-gray-10! text-gray-50 ${activeCategory?.id === category.id ? "bg-white!" : ""}`}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
          {fillterCategoryGoals.map((category) => (
            <Card key={category.id} goal={goals} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreIdea;
