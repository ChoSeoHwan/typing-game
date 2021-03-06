export const globalTheme = {
    colors: {
        bodyBackground: '#f9f9f9',
        contentBackground: '#fff',
        hoverBackground: 'rgba(32,33,36,0.039)',

        primaryText: '#3c4043',
        secondaryText: '#5f6368',

        lightText: '#dfdfdf',

        contentShadow: 'rgba(0, 0, 0, 0.2)',

        primary: '#4285f4',
        primaryDark: '#3C75D3'
    },
    size: {
        headerHeight: '64px',

        leftPanelWidth: '250px'
    },
    effect: {
        contentLoadingOpacity: 0.25,

        shadow: '0 0 0.7rem #dbdbdb'
    }
};

export type GlobalTheme = typeof globalTheme;
