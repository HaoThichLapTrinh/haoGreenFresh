// src/components/product/ProductFilter.tsx


interface FilterProps {
  search: string
  category: string
  sort: string
  onChange: (key: 'search' | 'category' | 'sort', value: string) => void
}

export default function ProductFilter({ search, category, sort, onChange }: FilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={search}
        onChange={(e) => onChange('search', e.target.value)}
        className="border rounded-lg p-2 flex-1"
      />
      <select
        value={category}
        onChange={(e) => onChange('category', e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="all">Tất cả</option>
        <option value="rau">Rau</option>
        <option value="củ">Củ</option>
        <option value="quả">Quả</option>
      </select>
      <select
        value={sort}
        onChange={(e) => onChange('sort', e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="none">Mặc định</option>
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
      </select>
    </div>
  )
}
