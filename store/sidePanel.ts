import create from 'zustand';

interface SidePanelTypes {
  isOpenSidePanel: boolean;
  setIsOpenSidePanel: (value: boolean) => void;
}

export const useSidePanelStore = create<SidePanelTypes>((set) => ({
  isOpenSidePanel: true,
  setIsOpenSidePanel: (value) => set((state) => ({ isOpenSidePanel: value })),
}));

interface TooltipTypes {
  selectedMode: string;
  setSelectedMode: (value: string) => void;
}

export const useTooltipStore = create<TooltipTypes>((set) => ({
  selectedMode: 'default',
  setSelectedMode: (value: string) => set((state) => ({ selectedMode: value })),
}));

interface DragaTextTypes {
  dragText: string;
  setDragText: (value: string) => void;
}

export const useDragTextStore = create<DragaTextTypes>((set) => ({
  dragText: '',
  setDragText: (value: string) => set((state) => ({ dragText: value })),
}));

interface SelectedTextTypes {
  selectedText: string;
  setSelectedText: (value: string) => void;
}

export const useSelectedTextStore = create<SelectedTextTypes>((set) => ({
  selectedText: '',
  setSelectedText: (value: string) => set((state) => ({ selectedText: value })),
}));

interface AISearchTypes {
  isLoadingAISearchResult: boolean;
  setIsLoadingAISearchResult: (value: boolean) => void;
}

// isWaitingForSearchResult: true,
export const useAISearchStore = create<AISearchTypes>((set) => ({
  isLoadingAISearchResult: false,
  setIsLoadingAISearchResult: (value: boolean) => set(() => ({ isLoadingAISearchResult: value })),
}));

// TODO: smartDrag로 변경
