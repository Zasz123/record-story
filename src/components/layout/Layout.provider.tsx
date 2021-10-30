import { useState } from 'react';
import constate from 'constate';

function useLayout() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return { selectedIndex, setSelectedIndex };
}

const [LayoutProvider, useLayoutContext] = constate(useLayout);

export { LayoutProvider, useLayoutContext };
