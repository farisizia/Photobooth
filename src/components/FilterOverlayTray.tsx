import { useState, useMemo, useRef, useEffect } from 'react';
import { CameraFilter, CAMERA_FILTERS } from '../utils/filters';
import { OverlayItem, OVERLAY_ITEMS } from '../utils/overlays';
import {
  ALL_EFFECT_PRESETS,
  EffectItem,
  effectToCameraFilter,
  effectToOverlayItem,
} from '../constants/effectsData';
import {
  Sparkles,
  Flower2,
  Wand2,
  Palette,
  X,
  RotateCcw,
  Check,
  Search,
  ChevronRight,
  Layers,
} from 'lucide-react';

export type FilterTrayTab = 'color' | 'floral' | 'cute' | 'y2k' | 'all';

interface FilterOverlayTrayProps {
  selectedFilter: CameraFilter;
  onSelectFilter: (filter: CameraFilter) => void;
  selectedOverlay: OverlayItem;
  onSelectOverlay: (overlay: OverlayItem) => void;
  onClose: () => void;
  defaultTab?: 'tone' | 'flowers' | 'cute' | 'color' | 'floral' | 'y2k';
  onSelectEffect?: (effect: EffectItem) => void;
}

const PAGE_SIZE = 16;

export function FilterOverlayTray({
  selectedFilter,
  onSelectFilter,
  selectedOverlay,
  onSelectOverlay,
  onClose,
  defaultTab = 'color',
  onSelectEffect,
}: FilterOverlayTrayProps) {
  // Normalize default tab
  const initialTab: FilterTrayTab =
    defaultTab === 'tone' ? 'color' : defaultTab === 'flowers' ? 'floral' : (defaultTab as FilterTrayTab);

  const [activeTab, setActiveTab] = useState<FilterTrayTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset pagination limit when switching tabs or typing search
  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab, searchQuery]);

  // Tab Counts for badges
  const tabCounts = useMemo(() => {
    return {
      color: ALL_EFFECT_PRESETS.filter((e) => e.category === 'color').length,
      floral: ALL_EFFECT_PRESETS.filter((e) => e.category === 'floral').length,
      cute: ALL_EFFECT_PRESETS.filter((e) => e.category === 'cute').length,
      y2k: ALL_EFFECT_PRESETS.filter((e) => e.category === 'y2k').length,
      all: ALL_EFFECT_PRESETS.length,
    };
  }, []);

  // Filtered preset list by search and category
  const filteredPresets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_EFFECT_PRESETS.filter((item) => {
      // Category match
      const categoryMatch = activeTab === 'all' || item.category === activeTab;
      if (!categoryMatch) return false;

      // Search match
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    });
  }, [activeTab, searchQuery]);

  // Chunked visible presets for 60 FPS mobile performance
  const visiblePresets = useMemo(() => {
    return filteredPresets.slice(0, displayCount);
  }, [filteredPresets, displayCount]);

  const hasMore = displayCount < filteredPresets.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, filteredPresets.length));
  };

  const handleReset = () => {
    onSelectFilter(CAMERA_FILTERS[0]);
    onSelectOverlay(OVERLAY_ITEMS[0]);
  };

  const handleSelectPreset = (item: EffectItem) => {
    if (item.type === 'css-filter') {
      onSelectFilter(effectToCameraFilter(item));
    } else {
      onSelectOverlay(effectToOverlayItem(item));
    }
    if (onSelectEffect) {
      onSelectEffect(item);
    }
  };

  const hasActiveModifiers = selectedFilter.id !== 'normal' || selectedOverlay.id !== 'none';

  return (
    <div className="w-full bg-[#111116]/95 backdrop-blur-xl p-3 sm:p-3.5 rounded-3xl border border-white/15 animate-fade-in flex flex-col gap-2.5 shadow-2xl">
      {/* Top Header: Title, Active Badges, and Action Buttons */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-xs font-black text-white tracking-wider uppercase flex items-center gap-1.5 flex-shrink-0">
            <Wand2 className="w-4 h-4 text-coral-400" />
            <span className="hidden sm:inline">100+ FILTER & EFEK</span>
          </span>

          {/* Active summary pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
            {selectedFilter.id !== 'normal' && (
              <span className="px-2 py-0.5 rounded-full bg-coral-500/20 text-coral-300 border border-coral-500/30 font-semibold whitespace-nowrap flex items-center gap-1">
                <span>🎨 {selectedFilter.name}</span>
                <button
                  type="button"
                  onClick={() => onSelectFilter(CAMERA_FILTERS[0])}
                  className="hover:text-white"
                  title="Hapus Filter Warna"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
            {selectedOverlay.id !== 'none' && (
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold whitespace-nowrap flex items-center gap-1">
                <span>✨ {selectedOverlay.name}</span>
                <button
                  type="button"
                  onClick={() => onSelectOverlay(OVERLAY_ITEMS[0])}
                  className="hover:text-white"
                  title="Hapus Efek Overlay"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {hasActiveModifiers && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-[10px] font-semibold transition-all active:scale-90"
              title="Reset ke Normal"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-gray-300 hover:text-white flex items-center justify-center text-xs transition-all active:scale-90"
            title="Tutup Panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search className="w-3.5 h-3.5 absolute left-3 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari 100+ efek (misal: B&W, Portra, Sakura, Bunny, Y2K)..."
          className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-gray-400 focus:outline-hidden focus:border-coral-400 focus:ring-1 focus:ring-coral-400 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 text-gray-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
        {/* Tab 1: Gaya Warna */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('color');
          }}
          className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg font-bold transition-all ${
            activeTab === 'color'
              ? 'bg-gradient-to-r from-coral-500 to-rose-500 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Palette className="w-3 h-3 flex-shrink-0" />
          <span className="text-[10px] sm:text-[11px] truncate">Warna</span>
          <span className="text-[9px] opacity-75 font-mono">({tabCounts.color})</span>
        </button>

        {/* Tab 2: Bunga & Botanical */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('floral');
          }}
          className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg font-bold transition-all ${
            activeTab === 'floral'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Flower2 className="w-3 h-3 flex-shrink-0" />
          <span className="text-[10px] sm:text-[11px] truncate">Bunga</span>
          <span className="text-[9px] opacity-75 font-mono">({tabCounts.floral})</span>
        </button>

        {/* Tab 3: Cute & Kawaii */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('cute');
          }}
          className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg font-bold transition-all ${
            activeTab === 'cute'
              ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Wand2 className="w-3 h-3 flex-shrink-0" />
          <span className="text-[10px] sm:text-[11px] truncate">Cute</span>
          <span className="text-[9px] opacity-75 font-mono">({tabCounts.cute})</span>
        </button>

        {/* Tab 4: Y2K & Cyber */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('y2k');
          }}
          className={`flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg font-bold transition-all ${
            activeTab === 'y2k'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-3 h-3 flex-shrink-0" />
          <span className="text-[10px] sm:text-[11px] truncate">Y2K</span>
          <span className="text-[9px] opacity-75 font-mono">({tabCounts.y2k})</span>
        </button>
      </div>

      {/* Horizontal Scroll Bar of Preset Cards with Chunked Pagination */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2.5 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent snap-x snap-mandatory touch-pan-x items-center"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {/* RESET / DEFAULT CARD: Normal / Tanpa Efek */}
        <button
          type="button"
          onClick={handleReset}
          className={`flex-shrink-0 snap-start flex flex-col items-center gap-1.5 p-1.5 rounded-2xl border transition-all active:scale-95 text-left ${
            !hasActiveModifiers
              ? 'border-gray-300 bg-white/20 ring-2 ring-white/50 shadow-lg'
              : 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30'
          }`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden relative bg-black/40 border border-white/10 flex items-center justify-center">
            <span className="text-xl">🚫</span>
            {!hasActiveModifiers && (
              <div className="absolute inset-0 bg-white/15 flex items-center justify-center backdrop-blur-[0.5px]">
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            )}
          </div>
          <span className="text-[11px] font-bold tracking-tight text-center max-w-[70px] truncate px-0.5 text-gray-300">
            Polos
          </span>
        </button>

        {/* PRESET CARDS */}
        {visiblePresets.map((item) => {
          const isSelected =
            item.type === 'css-filter'
              ? selectedFilter.id === item.id
              : selectedOverlay.id === item.id;

          const ringColor =
            item.category === 'color'
              ? 'border-coral-400 bg-coral-500/25 ring-2 ring-coral-400/50 shadow-coral-500/30'
              : item.category === 'floral'
              ? 'border-pink-400 bg-pink-500/25 ring-2 ring-pink-400/50 shadow-pink-500/30'
              : item.category === 'cute'
              ? 'border-purple-400 bg-purple-500/25 ring-2 ring-purple-400/50 shadow-purple-500/30'
              : 'border-cyan-400 bg-cyan-500/25 ring-2 ring-cyan-400/50 shadow-cyan-500/30';

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectPreset(item)}
              className={`flex-shrink-0 snap-start flex flex-col items-center gap-1.5 p-1.5 rounded-2xl border transition-all active:scale-95 text-left ${
                isSelected
                  ? `${ringColor} shadow-lg`
                  : 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden relative bg-black/40 border border-white/10 shadow-xs">
                {/* Background model image */}
                <img
                  src="/mockups/korean_pose_1.jpg"
                  alt={item.name}
                  style={item.type === 'css-filter' && item.cssFilter ? { filter: item.cssFilter } : undefined}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay / AR asset preview */}
                {item.type !== 'css-filter' && item.assetUrl && (
                  <img
                    src={item.assetUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none p-1"
                    loading="lazy"
                  />
                )}

                {/* Selection Checkmark */}
                {isSelected && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[0.5px]">
                    <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                )}

                {/* Corner emoji icon */}
                <span className="absolute bottom-0.5 right-1 text-xs select-none">{item.icon}</span>
              </div>

              {/* Title label */}
              <span
                className={`text-[11px] font-bold tracking-tight text-center max-w-[70px] truncate px-0.5 ${
                  isSelected ? 'text-white font-extrabold' : 'text-gray-300'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}

        {/* Load More Button for Mobile Virtualization */}
        {hasMore && (
          <button
            type="button"
            onClick={handleLoadMore}
            className="flex-shrink-0 snap-start flex flex-col items-center justify-center gap-1 w-16 h-20 sm:w-18 sm:h-22 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 px-2 text-center"
            title="Muat Lebih Banyak Efek"
          >
            <div className="w-8 h-8 rounded-full bg-coral-500/30 border border-coral-400/50 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-coral-300" />
            </div>
            <span className="text-[10px] font-bold leading-tight">
              +{Math.min(PAGE_SIZE, filteredPresets.length - displayCount)} Lagi
            </span>
          </button>
        )}

        {/* Empty state if search returns nothing */}
        {filteredPresets.length === 0 && (
          <div className="py-6 px-4 text-center text-gray-400 text-xs flex items-center justify-center gap-2 w-full">
            <span>Tidak ada efek yang cocok dengan &quot;{searchQuery}&quot;</span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-coral-400 underline font-semibold"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Bottom Footer: Stats Counter */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 px-1 font-medium">
        <span className="flex items-center gap-1">
          <Layers className="w-3 h-3 text-gray-400" />
          <span>
            Menampilkan {Math.min(displayCount, filteredPresets.length)} dari {filteredPresets.length} preset
          </span>
        </span>
        <span className="text-gray-400 font-mono">100+ Koleksi Efek</span>
      </div>
    </div>
  );
}
