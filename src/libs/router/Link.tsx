import React, {
    FC,
    HTMLAttributes,
    PropsWithChildren,
    useCallback
} from 'react';
import { useSelector } from 'react-redux';
import { Location } from 'history';

import { RootReducerState } from 'modules';

interface LinkProps
    extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href' | 'target'> {
    to: string | Location;
}

const Link: FC<LinkProps> = ({
    to,
    children,
    onClick,
    ...anchorProps
}: PropsWithChildren<LinkProps>) => {
    const history = useSelector<
        RootReducerState,
        RootReducerState['routerReducer']['history']
    >(({ routerReducer }) => routerReducer.history);

    // 페이지 이동 이벤트
    const handleClickLink = useCallback(
        (event) => {
            event.preventDefault();

            // 사용자 정의 onClick 이벤트 실행
            onClick && onClick(event);

            // 페이지 이동
            if (history) {
                history.push(to);
            }
        },
        [onClick, history, to]
    );

    return (
        <a {...anchorProps} onClick={handleClickLink}>
            {children}
        </a>
    );
};

export default Link;
