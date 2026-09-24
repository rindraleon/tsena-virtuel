import { useState } from 'react';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import { sidebarCategories } from '../../data/categories';

export default function CategorySidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:block w-[220px] shrink-0" aria-label="Catégories de produits">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-primary text-white font-semibold px-4 py-3 rounded-t-xl"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid size={18} aria-hidden="true" />
            Acheter par catégories
          </span>
          <ChevronRight size={18} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>

        <nav className="bg-surface border border-t-0 border-border rounded-b-xl shadow-sm overflow-hidden">
          <ul className="divide-y divide-border">
            {sidebarCategories.map((category) => {
              const Icon = category.lucideIcon;
              return (
                <li key={category.id}>
                  <a
                    href={`/category/${category.id}`}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-text hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <Icon size={16} className="text-muted shrink-0" aria-hidden="true" />
                    <span>{category.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="/categories"
            className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors border-t border-border"
          >
            Voir toutes les catégories
            <ChevronRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </aside>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setIsOpen(false)}>
          <div
            className="absolute top-16 left-4 right-4 bg-surface rounded-xl shadow-xl overflow-hidden max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Menu catégories"
          >
            <nav className="p-2">
              <ul className="divide-y divide-border">
                {sidebarCategories.map((category) => {
                  const Icon = category.lucideIcon;
                  return (
                    <li key={category.id}>
                      <a
                        href={`/category/${category.id}`}
                        className="flex items-center gap-3 px-4 py-3.5 text-sm text-text hover:bg-primary/5 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon size={16} className="text-muted" aria-hidden="true" />
                        {category.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
