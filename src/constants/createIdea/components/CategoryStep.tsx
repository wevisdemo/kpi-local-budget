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

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            className={`maincategory__${category.id} rounded-xl border p-4 text-left transition text-white md:h-[192.5px] h-[161.6666717529297px]`}
          >
            <p className="wv-b3 wv-bold wv-ibmplexlooped text-center">
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
