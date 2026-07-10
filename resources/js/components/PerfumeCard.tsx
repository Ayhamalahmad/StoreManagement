import { Link } from 'react-router-dom';
import { Perfume } from '../lib/api';

export default function PerfumeCard({ perfume }: { perfume: Perfume }) {
    return (
        <Link to={`/perfumes/${perfume.code}`} className="block bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
                {perfume.perfume_image ? (
                    <img src={perfume.perfume_image} alt={perfume.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
            </div>
            <div className="p-4 space-y-2">
                <p className="text-xs text-gray-500 font-mono">{perfume.code}</p>
                <h3 className="font-semibold text-gray-900">{perfume.name}</h3>
                <p className="text-sm text-gray-600">{perfume.brand}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{perfume.gender}</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{perfume.category}</span>
                    <span className={`px-2 py-1 rounded ${perfume.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {perfume.is_available ? 'Available' : 'Out of Stock'}
                    </span>
                </div>
                <p className="text-xs text-gray-500">Section {perfume.section_number} / Shelf {perfume.shelf_number}</p>
            </div>
        </Link>
    );
}
