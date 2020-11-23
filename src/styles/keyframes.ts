import { keyframes } from '@emotion/core';

export const changeColor = (
    startColor: string,
    endColor: string
): ReturnType<typeof keyframes> => keyframes`
    from {
        color: ${startColor};
    }
    
    to {
        color: ${endColor};
    }
`;
