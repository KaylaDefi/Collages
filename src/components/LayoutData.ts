export const LayoutData: {
    [key: number]: { direction: 'row' | 'column'; matrix: number[] }[];
  } = {
    1: [{ direction: 'column', matrix: [1] }],
    2: [
      { direction: 'column', matrix: [1, 1] },
      { direction: 'row', matrix: [1, 1] },
    ],
    3: [
      { direction: 'column', matrix: [1, 2] },
      { direction: 'row', matrix: [1, 2] },
      { direction: 'row', matrix: [2, 1] },
    ],
    4: [
      { direction: 'column', matrix: [2, 2] },
      { direction: 'row', matrix: [2, 2] },
      { direction: 'column', matrix: [1, 1, 2] },
      { direction: 'row', matrix: [1, 1, 2] },
    ],
    5: [
      { direction: 'column', matrix: [1, 2, 2] },
      { direction: 'row', matrix: [1, 2, 2] },
      { direction: 'column', matrix: [2, 1, 2] },
      { direction: 'row', matrix: [2, 1, 2] },
    ],
    6: [
      { direction: 'column', matrix: [2, 2, 2] },
      { direction: 'row', matrix: [2, 2, 2] },
      { direction: 'column', matrix: [1, 1, 1, 3] },
      { direction: 'row', matrix: [1, 1, 1, 3] },
    ],
    8: [
      { direction: 'column', matrix: [2, 2, 2, 2] },
      { direction: 'row', matrix: [2, 2, 2, 2] },
      { direction: 'column', matrix: [1, 1, 1, 1, 4] },
      { direction: 'row', matrix: [1, 1, 1, 1, 4] },
    ],
  };
  