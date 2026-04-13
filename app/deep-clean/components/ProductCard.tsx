'use client';

interface ProductCardProps {
  title: string;
  price: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  features?: string[];
  image?: string;
  onAddToBasket?: () => void;
}

export default function ProductCard({
  title,
  price,
  rating = 4.5,
  reviewCount = 12,
  badge,
  features = [],
  image,
  onAddToBasket,
}: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header with Sponsored */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-xs font-semibold text-gray-600 uppercase">Sponsored</div>
        <div className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
          Trade Rated
        </div>
      </div>

      {/* Title */}
      <h3 className="heading-h3 text-primary mb-4">{title}</h3>

      {/* Image Placeholder */}
      {image && (
        <div className="mb-4 h-48 bg-gray-100 rounded flex items-center justify-center">
          <img src={image} alt={title} className="max-w-full max-h-full" />
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(rating) ? '★' : i < rating ? '★' : '☆'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-blue-600 font-medium">({reviewCount})</span>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <ul className="text-sm text-gray-700 space-y-2 mb-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Badge */}
      {badge && (
        <div className="mb-4 inline-flex items-center gap-2 bg-green-50 border border-green-600 rounded-full px-4 py-2">
          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
            ✓
          </div>
          <span className="text-sm font-semibold text-green-600">{badge}</span>
        </div>
      )}

      {/* Price */}
      <div className="text-right mb-4">
        <span className="text-3xl font-bold text-gray-800">{price}</span>
        <span className="text-xs text-gray-600 ml-2">INC VAT</span>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center border border-gray-300 rounded">
          <button className="px-3 py-2 text-gray-600 hover:bg-gray-50">−</button>
          <input type="number" defaultValue="1" className="w-12 text-center border-l border-r border-gray-300" />
          <button className="px-3 py-2 text-gray-600 hover:bg-gray-50">+</button>
        </div>
      </div>

      {/* Links */}
      <div className="mb-4">
        <a href="#" className="text-blue-600 text-sm font-medium underline">
          Check stock in your local store
        </a>
      </div>

      {/* Collect Option */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-green-50 rounded">
        <div className="w-5 h-5 bg-green-600 rounded-full"></div>
        <span className="font-semibold text-gray-800">Collect</span>
      </div>

      {/* Add to Basket Button */}
      <button
        onClick={onAddToBasket}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mb-3 transition-colors"
      >
        Add to basket
      </button>

      {/* Compare Checkbox */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="compare" className="w-4 h-4 cursor-pointer" />
        <label htmlFor="compare" className="text-sm text-gray-600 uppercase cursor-pointer">
          Compare
        </label>
      </div>
    </div>
  );
}
