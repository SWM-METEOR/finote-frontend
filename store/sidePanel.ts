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
