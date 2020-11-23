import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import { GlobalTheme } from 'styles/Themes';

import { Link } from 'libs/router';
import styled from 'libs/styled';

export enum ButtonType {
    FULLED,
    OUTLINE,
    ICON
}

interface ButtonStyledProps {
    styleType: ButtonType;
}

// 기본 버튼
const FulledButton = (theme: GlobalTheme) => css`
    border: none;
    padding: 8px 15px;
    transition: background-color 0.3s;
    background-color: ${theme.colors.primary};
    border-radius: 4px;
    color: #fff;
    font-weight: bold;

    &:hover {
        background-color: ${theme.colors.primaryDark};
    }
`;

// 외각선 버튼
const OutLineButton = (theme: GlobalTheme) => css`
    border: 1px solid #dadce0;
    padding: 8px 15px;
    transition: background-color 0.3s;
    border-radius: 4px;

    &:hover {
        background-color: ${theme.colors.hoverBackground};
    }
`;

// 아이콘 버튼
const IconButton = (theme: GlobalTheme) => css`
    border: none;
    border-radius: 50%;
    padding: 4px;

    &:hover {
        background-color: ${theme.colors.hoverBackground};
    }
`;

const ButtonStyled = styled.button<ButtonStyledProps>`
    color: ${({ theme }) => theme.colors.primaryText};
    ${({ styleType, theme }) => {
        switch (styleType) {
            case ButtonType.FULLED:
                return FulledButton(theme);

            case ButtonType.ICON:
                return IconButton(theme);

            case ButtonType.OUTLINE:
            default:
                return OutLineButton(theme);
        }
    }};
`;

const ButtonLinkStyled = styled(Link, {
    shouldForwardProp: isPropValid
})<ButtonStyledProps>`
    color: ${({ theme }) => theme.colors.primaryText};

    &:hover {
        text-decoration: none;
    }

    ${({ styleType, theme }) => {
        switch (styleType) {
            case ButtonType.FULLED:
                return FulledButton(theme);

            case ButtonType.ICON:
                return IconButton(theme);

            case ButtonType.OUTLINE:
            default:
                return OutLineButton(theme);
        }
    }};
`;

export interface ButtonProps {
    onClick?:
        | HTMLAttributes<HTMLButtonElement>['onClick']
        | HTMLAttributes<HTMLAnchorElement>['onClick'];
    className?: string;
    type?: ButtonType;
    to?: string;
}

const Button: FC<ButtonProps> = ({
    children,
    type = ButtonType.FULLED,
    to,
    onClick,
    ...props
}: PropsWithChildren<ButtonProps>) => (
    <>
        {!to && (
            <ButtonStyled
                styleType={type}
                type="button"
                onClick={
                    onClick as HTMLAttributes<HTMLButtonElement>['onClick']
                }
                {...props}>
                {children}
            </ButtonStyled>
        )}
        {to && (
            <ButtonLinkStyled
                styleType={type}
                to={to}
                onClick={
                    onClick as HTMLAttributes<HTMLAnchorElement>['onClick']
                }
                {...props}>
                {children}
            </ButtonLinkStyled>
        )}
    </>
);

export default Button;
