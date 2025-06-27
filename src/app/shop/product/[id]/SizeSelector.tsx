'use client';

type SizeSelectorProps = {
  sizing?: {
    hasSizing?: boolean;
    options?: string[];
  };
  onSizeChange: (size: string | null) => void;
  selectedSize: string | null;
};

export default function SizeSelector({ sizing, onSizeChange, selectedSize }: SizeSelectorProps) {
  if (!sizing?.hasSizing || !sizing?.options || sizing.options.length === 0) {
    return (
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-3 text-center">
          <span className="text-sm font-medium text-gray-700 uppercase">One Size Fits All</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h4 className="font-bold mb-3 uppercase">Size</h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {sizing.options.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`
              px-3 py-2 border text-center font-medium uppercase transition-colors
              ${selectedSize === size 
                ? 'border-black bg-black text-white' 
                : 'border-gray-300 hover:border-gray-400 bg-white text-black'
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
      {sizing.hasSizing && !selectedSize && (
        <p className="text-xs text-red-600 mt-2">Please select a size</p>
      )}
    </div>
  );
} 