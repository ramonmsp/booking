import React, { CSSProperties } from 'react';

type StylesType = {

  container: CSSProperties;
};

const useStyles = (): StylesType => {
  return React.useMemo(() => {
    return {
      container: {
        minHeight: 'calc(100vh - 110px)',
      },
    };
  }, []);
};

export default useStyles;
