import { useTranslation } from '@/hooks/use-translation';
import type { StoreData } from '../types/store.types';

interface StoreHeaderProps {
    store: StoreData;
}

export default function StoreHeader({ store }: StoreHeaderProps) {
    const { isRtl } = useTranslation();

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1924] via-[#232232] to-[#2a2744] border-b border-[#3d3b54]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYyMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
            <div className="max-w-7xl mx-auto px-4 py-8 flex items-center gap-6 relative z-10" dir={isRtl ? 'rtl' : 'ltr'}>
                {store.logo_full ? (
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-[#ff5722]/20 rounded-full blur-xl" />
                        <img src={store.logo_full} alt={store.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-[#ff5722]/30 shadow-lg relative" />
                    </div>
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff5722] to-[#ff8a50] flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0">
                        {store.name.charAt(0)}
                    </div>
                )}
                <div className="min-w-0">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {store.name}
                    </h1>
                    {store.description && (
                        <p className="text-gray-400 mt-1.5 text-sm leading-relaxed line-clamp-2">{store.description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}