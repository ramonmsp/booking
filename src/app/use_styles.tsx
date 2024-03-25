import React, { CSSProperties } from 'react';

type StylesType = {
  layout: {
    header: {
        base: CSSProperties;
        row: CSSProperties;
        title: CSSProperties;
        menu: {
            base: CSSProperties;
            option: CSSProperties;
        };
        
    };
    footer: CSSProperties;
  };
  content: CSSProperties;
  container: CSSProperties;
};

const useStyles = (): StylesType => {
  return React.useMemo(() => {
    return {
      layout: {
        header: {
          base: {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          },
          row: {
            width: '100%',
          },
          title: {
            margin: 0,
            cursor: 'pointer',
            color: '#adadad',
          },
          menu: {
            base: {
              flex: 1,
              minWidth: 0,
              justifyContent: 'end',
            },
            option: {
              color: '#adadad',
            },
          },
        },
        footer: {
            backgroundColor: '#001529',
            color: "#adadad",
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '15px 50px',
        },
      },
      content: {
        padding: 48,
        minHeight: 'calc(100vh - 110px)',
      },
      container: {
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
  }, []);
};

export default useStyles;
