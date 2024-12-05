import React, { useState } from 'react';
import { useGetCategoriesQuery } from '../api/endpoints/category';

interface FilterProps {
    categories: { id: string; name: string }[];
    onFilterChange: (filters: {
        category?: string;
        priceFilter?: string;
        dateOrder?: 'recent' | 'old' | undefined;
    }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        category: '',
        priceFilter: '',
        dateOrder: undefined as 'recent' | 'old' | undefined,
    });
    const { data: categoriesData } = useGetCategoriesQuery();

    const handleFilterChange = (field: string, value: string) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const categoryList = Array.isArray(categoriesData) ? categoriesData : categoriesData?.categories || [];

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            {/* Filtre par catégorie */}
            <select
                className="border p-2 rounded"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
            >
                <option value="">Toutes les catégories</option>
                {categoryList.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            {/* Filtre combiné pour tri et limite de prix */}
            <select
                className="border p-2 rounded"
                value={filters.priceFilter}
                onChange={(e) => handleFilterChange('priceFilter', e.target.value)}
            >
                <option value="">Filtrer par prix</option>
                <option value="asc">Moins cher au plus cher</option>
                <option value="desc">Plus cher au moins cher</option>
                <option value="15">Moins de 15€</option>
                <option value="30">Moins de 30€</option>
            </select>

            {/* Tri par date */}
            <select
                className="border p-2 rounded"
                value={filters.dateOrder || ''}
                onChange={(e) => handleFilterChange('dateOrder', e.target.value)}
            >
                <option value="">Tri par date</option>
                <option value="recent">Plus récent</option>
                <option value="old">Plus ancien</option>
            </select>
        </div>
    );
};

export default Filter;
