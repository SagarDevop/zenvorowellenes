import React from 'react';
import {
  Flame,
  Brain,
  Moon,
  Sparkles,
  Zap
} from 'lucide-react';

const iconMap = {
  inner_power: Flame,
  brain_focus: Brain,
  deep_recovery: Moon,
  trio_ritual: Sparkles,
  energy: Zap
};

export const CategoryScroller = ({ categories = [], selectedCategory, onSelectCategory }) => {
  return (
    <section className="categories-section" aria-label="Product Categories">
      <div className="categories-track no-scrollbar">
        {categories.map((cat) => {
          const IconComp = iconMap[cat.id] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              className={`category-item ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory && onSelectCategory(cat.id === selectedCategory ? null : cat.id)}
            >
              <div className="category-icon-box">
                <IconComp size={22} strokeWidth={1.9} color="currentColor" />
              </div>
              <span className="category-name">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

