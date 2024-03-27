import React, { CSSProperties } from 'react';

type StylesType = {
  container: CSSProperties;
};

const useStyles = (): StylesType => {
  return React.useMemo(() => {
    return {
      container: {
        padding: '1rem',
      },
    };
  }, []);
};

export default useStyles;
