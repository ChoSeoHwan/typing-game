import { css } from '@emotion/core';

import { GlobalTheme } from 'styles/Themes';

export const GlobalStyle = (theme: GlobalTheme): ReturnType<typeof css> => css`
    /* 
 * Nanum Gothic (Korean) http://www.google.com/webfonts/earlyaccess
 */
    @font-face {
        font-family: 'Nanum Gothic';
        font-style: normal;
        font-weight: 700;
        src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.eot);
        src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.eot?#iefix)
                format('embedded-opentype'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.woff2)
                format('woff2'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.woff)
                format('woff'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Bold.ttf)
                format('truetype');
    }
    @font-face {
        font-family: 'Nanum Gothic';
        font-style: normal;
        font-weight: 400;
        src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.eot);
        src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.eot?#iefix)
                format('embedded-opentype'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.woff2)
                format('woff2'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.woff)
                format('woff'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-Regular.ttf)
                format('truetype');
    }
    @font-face {
        font-family: 'Nanum Gothic';
        font-style: normal;
        font-weight: 800;
        src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-ExtraBold.eot);
        src: url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-ExtraBold.eot?#iefix)
                format('embedded-opentype'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-ExtraBold.woff2)
                format('woff2'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-ExtraBold.woff)
                format('woff'),
            url(//themes.googleusercontent.com/static/fonts/earlyaccess/nanumgothic/v3/NanumGothic-ExtraBold.ttf)
                format('truetype');
    }

    html {
        font-size: 10px;
        font-family: 'Nanum Gothic', 'Product Sans Regular', Roboto, Arial,
            serif;
    }

    body {
        font-size: 1.4rem;
        background: ${theme.colors.bodyBackground};
        color: ${theme.colors.primaryText};
        margin: 0;
        padding: 0;
        line-height: 1.34;
    }

    p,
    a,
    h1,
    h2,
    h3,
    h4,
    h5,
    span,
    button,
    input,
    ul,
    li {
        margin: 0;
        padding: 0;
        font: inherit;
        color: inherit;
    }

    li {
        list-style: none;
    }

    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    button {
        cursor: pointer;
        background: inherit;
    }
`;
