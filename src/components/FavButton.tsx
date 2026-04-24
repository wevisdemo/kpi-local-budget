"use client";

import Image from "next/image";
import { useState, type ButtonHTMLAttributes } from "react";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import type { Project } from "../services/type";
import { addFavProject, removeFavProject } from "../services/submitTransaction";
import { useTurnstile } from "./TurnstileProvider";

interface FavButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  project?: Project;
  id?: string;
  count?: number;
  selected?: boolean;
  defaultSelected?: boolean;
  onChange?: (selected: boolean) => void;
}

export default function FavButton({
  id,
  count = 0,
  selected,
  project,
  defaultSelected = false,
  onChange,
  className = "",
  ...rest
}: FavButtonProps) {
  const storeSelected = useFavoritesStore((state) =>
    id ? !!state.favorites[id] : false,
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const { getToken } = useTurnstile();

  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const [isBusy, setIsBusy] = useState(false);

  const isControlled = selected !== undefined;
  const useStore = !isControlled && !!id;

  const isSelected = isControlled
    ? selected
    : useStore
      ? storeSelected
      : internalSelected;

  const displayCount = !isControlled && isSelected ? count + 1 : count;

  const handleClick = async () => {
    if (isBusy) return;

    const next = !isSelected;

    if (useStore && id) {
      toggleFavorite(id);
    } else if (!isControlled) {
      setInternalSelected(next);
    }
    onChange?.(next);

    if (!project?.project_id) return;

    setIsBusy(true);
    try {
      const token = await getToken();
      if (isSelected) {
        await removeFavProject(project.project_id, project.vote_count ?? 0, token);
      } else {
        await addFavProject(project.project_id, displayCount ?? 0, token);
      }
    } catch (error) {
      console.error("Failed to update favorite", error);
      if (useStore && id) {
        toggleFavorite(id);
      } else if (!isControlled) {
        setInternalSelected(!next);
      }
      onChange?.(!next);
    } finally {
      setIsBusy(false);
    }
  };

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const iconSrc = isSelected
    ? `${basePath}/icon/heart-pink-check.svg`
    : `${basePath}/icon/heart-pink.svg`;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isSelected}
      disabled={isBusy || rest.disabled}
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
  );
}
