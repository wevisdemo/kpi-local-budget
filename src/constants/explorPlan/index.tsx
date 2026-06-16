"use client";

import ActionPlanTab from "./components/ActionPlanTab";
import { TabBar } from "./components/TabBar";
import type { TabId } from "./components/types";
import { UnderstandTab } from "./components/UnderstandTab";
import LocalDevelopmentTab from "./components/LocalDevelopmentTab";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TAB_IDS: readonly TabId[] = ["understand", "local", "action"];

const resolveTab = (value: string | null): TabId =>
  TAB_IDS.includes(value as TabId) ? (value as TabId) : "understand";

const ExplorePlan = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    resolveTab(searchParams.get("tab")),
  );

  useEffect(() => {
    setActiveTab(resolveTab(searchParams.get("tab")));
  }, [searchParams]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(resolveTab(params.get("tab")));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const url = `${basePath}${path}?${params.toString()}`;
    if (tab === "understand") {
      window.history.replaceState(null, "", url);
    } else {
      window.history.pushState(null, "", url);
    }
  };
  return (
    <div className="bg-white">
      <TabBar active={activeTab} onChange={handleTabChange} />
      <div className="mx-auto flex flex-col px-5 py-10 text-black">
        <div>
          <div hidden={activeTab !== "understand"}>
            <UnderstandTab goTo={handleTabChange} />
          </div>
          <div hidden={activeTab !== "local"}>
            <LocalDevelopmentTab />
          </div>
          <div hidden={activeTab !== "action"}>
            <ActionPlanTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePlan;
