import { useState } from "react";

import { UseDrawerReturnInterface } from "./useDrawer.types";

const useDrawer = (): UseDrawerReturnInterface => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawer = () => setDrawerOpen((prev) => !prev);

  return {
    drawerOpen,
    handleDrawer,
  };
};

export default useDrawer;
