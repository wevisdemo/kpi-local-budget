"use client";

import Image from "next/image";
import { useEffect, useState, type ButtonHTMLAttributes } from "react";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import type { Goal, GoalTransaction } from "../services/type";
import { addFavGoal, removeFavGoal } from "../services/exploreIdea";
import Button from "./Button";
import {
  formatTransactionTimestamp,
  getTransactionsByUserId,
  removeFavGoalTransaction,
  linkLikeToGoal,
} from "../services/submitTransaction";
import { useCookieConsentStore } from "../stores/useCookieConsentStore";
import { Turnstile } from "@marsidev/react-turnstile";
import { basePath } from "@/src/lib/basePath";

interface FavButtonGoalProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  goal?: Goal;
  id?: string;
  count?: number;
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
  onRefetch?: () => void;
}

export default function FavButtonGoal({
  id,
  count = 0,
  selected,
  goal,
  defaultSelected = false,
  onChange,
  className = "",
  onRefetch,
  ...rest
}: FavButtonGoalProps) {
  const storeSelected = useFavoritesStore((state) =>
    id ? !!state.favorites[id] : false,
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const timestamp = formatTransactionTimestamp();
  const consentId = useCookieConsentStore((state) => state.consentId);
  const [token, setToken] = useState<string | null>(null);
  const userId = consentId ?? "";
  const [transactions, setTransactions] = useState<GoalTransaction[]>([]);

  const goalTransaction = transactions.find(
    (transaction) => transaction.goal?.goal === goal?.goal,
  );

  useEffect(() => {
    if (confirmOpen && userId) {
      getTransactionsByUserId(userId).then(setTransactions);
    }
  }, [confirmOpen]);

  const isControlled = selected !== undefined;
  const useStore = !isControlled && !!id;

  const isSelected = isControlled
    ? selected
    : useStore
      ? storeSelected
      : internalSelected;

  const displayCount = !isControlled && isSelected ? count : count;

  const applyChange = async () => {
    if (goal?.Id) {
      if (isSelected) {
        await removeFavGoalTransaction(
          token ?? "",
          goal.Id,
          goalTransaction?.Id ?? "",
        );
        await removeFavGoal(token ?? "", goalTransaction?.Id ?? "");
      } else {
        const likeId = await addFavGoal(token ?? "", userId ?? "", timestamp);
        await linkLikeToGoal(goal.Id, likeId?.Id ?? "", token ?? "");
      }
    }
    onRefetch?.();

    const next = !isSelected;
    if (useStore && id) {
      toggleFavorite(id);
    } else if (!isControlled) {
      setInternalSelected(next);
    }
    onChange?.(next);
  };

  const handleClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    applyChange();
  };

  const handleCancel = () => setConfirmOpen(false);

  useEffect(() => {
    if (!confirmOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirmOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [confirmOpen]);

  const iconSrc = isSelected
    ? `${basePath}/icon/heart-pink-check.svg`
    : `${basePath}/icon/heart-pink.svg`;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={isSelected}
        className={[
          "group inline-flex flex-col items-center  cursor-pointer",
          className,
        ].join(" ")}
        {...rest}
      >
        <Image
          src={iconSrc}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="transition-transform group-hover:scale-110"
        />
        <span className="wv-b5 wv-bold leading-none text-pink-30 wv-ibmplexlooped">
          {displayCount}
        </span>
      </button>

      {confirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fav-goal-confirm-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
          onClick={handleCancel}
        >
          <div
            className="relative w-full max-w-[480px] rounded-[20px] bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCancel}
              aria-label="ปิด"
              className="absolute right-5 top-5 cursor-pointer text-black hover:opacity-60"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2
              id="fav-goal-confirm-title"
              className="wv-h6 wv-bold wv-ibmplexlooped text-black"
            >
              ยืนยัน
            </h2>

            <div className="wv-b3 wv-ibmplexlooped mt-4 text-black">
              <span>
                {isSelected ? (
                  <p>
                    คุณต้องการ<b className="font-normal underline">ยกเลิก</b>
                    สนับสนุนเป้าหมาย
                  </p>
                ) : (
                  "คุณต้องการสนับสนุนเป้าหมาย"
                )}{" "}
                <p className="wv-bold">‘{goal?.goal ?? "-"}’</p>
              </span>
            </div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
              onSuccess={(token) => setToken(token)}
            />
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="secondary"
                theme="dark"
                leftIcon={null}
                rightIcon={null}
                onClick={handleCancel}
              >
                ไม่ใช่
              </Button>
              <Button
                variant="primary"
                theme="dark"
                leftIcon={null}
                rightIcon={null}
                onClick={handleConfirm}
              >
                ใช่
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
