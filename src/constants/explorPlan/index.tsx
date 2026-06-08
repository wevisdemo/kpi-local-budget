"use client";

import ActionPlanTab from "./components/ActionPlanTab";
import { TabBar } from "./components/TabBar";
import type { TabId } from "./components/types";
import { UnderstandTab } from "./components/UnderstandTab";
import LocalDevelopmentTab from "./components/LocalDevelopmentTab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TAB_IDS: readonly TabId[] = ["understand", "local", "action"];

const ExplorePlan = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const activeTab: TabId = TAB_IDS.includes(tabParam as TabId)
    ? (tabParam as TabId)
    : "understand";

  const handleTabChange = (tab: TabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
