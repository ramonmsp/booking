import React, { CSSProperties } from 'react';

type StylesType = {
  header: {
    base: CSSProperties;
    title: CSSProperties;
    menu: {
      base: CSSProperties;
      option: CSSProperties;
    };
  };
  content: CSSProperties;
  contentInner: CSSProperties;
};

const useStyles = (): StylesType => {
  return React.useMemo(() => {
    return {
      header: {
        base: {
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fefefe',
        },

        title: {
          margin: 0,
        },
        menu: {
          base: {
            flex: 1,
            flexDirection: 'row-reverse',
            minWidth: 0,
            backgroundColor: '#fefefe',
          },
          option: {
            color: '#00000073',
          },
        },
      },
      content: {
        padding: '0 48px',
      },
      contentInner: {
        padding: 24,
        minHeight: 380,
        flex: 1,
      },
    };
  }, []);
};

export default useStyles;
