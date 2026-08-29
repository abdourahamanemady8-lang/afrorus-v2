'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  label: string;
  icon?: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('categorie') || 'all';

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === 'all') {
      params.delete('categorie');
    } else {
      params.set('categorie', categoryId);
    }
    const queryString = params.toString();
    const target = pathname + (queryString ? `?${queryString}` : '');
    router.push(target, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
            ${
              currentCategory === cat.id
                ? 'bg-russia-red text-white shadow-md scale-105'
                : 'bg-white text-charcoal border border-light-gray hover:border-russia-red hover:text-russia-red'
            }
          `}
        >
          {cat.icon && <span className="mr-2">{cat.icon}</span>}
          {cat.label}
        </button>
      ))}
    </div>
  );
}