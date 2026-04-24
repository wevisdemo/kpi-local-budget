import Image from "next/image";
import type { IdeaCategory } from "../types";

interface CategoryStepProps {
  categories: IdeaCategory[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryStep({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryStepProps) {
  return (
    <section className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {categories.map((category) => {
        const isSelected = selectedCategoryId === category.id;
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            className={`relative maincategory__${category.id} rounded-xl border p-4 text-left transition text-white md:h-[192.5px] h-[161.6666717529297px]`}
          >
            <div
              className={`absolute inset-0 flex items-center justify-center z-10 overflow-hidden maincategory__${category.id} p-5 rounded-xl  `}
            >
              <Image
                src={`${basePath}/img/${category.id}.png`}
                alt={category.title}
                width={100}
                height={100}
                className="object-contain w-full h-full mix-blend-color-burn"
              />
            </div>
            <p className="relative wv-b3 wv-bold wv-ibmplexlooped text-center z-20 ">
              {category.title}
            </p>
            {/* <p
              className={`mt-1 text-sm ${
                isSelected ? "text-zinc-200" : "text-zinc-500"
              }`}
            >
              {category.description}
            </p> */}
          </button>
        );
      })}
    </section>
  );
}
