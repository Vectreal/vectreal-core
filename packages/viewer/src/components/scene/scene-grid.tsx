import { Grid, GridProps as ThreeGridProps } from '@react-three/drei';

export interface GridProps extends ThreeGridProps {
  showGrid?: boolean;
}

const SceneGrid = (props: GridProps) => {
  const { showGrid, ...gridOptions } = {
    showGrid: false,
    cellSize: 0.5,
    sectionSize: 5,
    sectionColor: 'rgb(134, 73, 33)',
    cellColor: 'rgb(100, 100, 100)',
    fadeDistance: 25,
    fadeStrength: 1,
    args: [10, 10],
    followCamera: false,
    infiniteGrid: true,
    ...props,
  };

  return showGrid && <Grid {...(gridOptions as GridProps)} />;
};

export default SceneGrid;
