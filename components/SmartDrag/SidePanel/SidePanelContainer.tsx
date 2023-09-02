'use client';

import { useTooltipStore, useSidePanelStore } from '@/store/sidePanel';
import SidePanelView from '@/components/SmartDrag/SidePanel/SidePanelView';

export default function SidePanelContainer() {
  const { isOpenSidePanel, setIsOpenSidePanel } = useSidePanelStore();
  const { selectedMode } = useTooltipStore();

  return (
    <SidePanelView
      selectedMode={selectedMode}
      isOpenSidePanel={isOpenSidePanel}
      setIsOpenSidePanel={setIsOpenSidePanel}
    />
  );
}
