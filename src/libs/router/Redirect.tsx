import { FC, useEffect } from 'react';
import { PartialPath, State } from 'history';

import { useHistory, useLocation } from 'libs/router';

interface RedirectProps {
    path: string;
    to: string | PartialPath;
    state?: State;
    expect?: boolean;
}

const Redirect: FC<RedirectProps> = ({
    path,
    to,
    state,
    expect = false
}: RedirectProps) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (expect && location.pathname === path) {
            history.push(to, state);
            return;
        }

        if (!expect && location.pathname.startsWith(path)) {
            history.push(to, state);
            return;
        }
    }, [expect, location, history, path, to, state]);

    return null;
};

export default Redirect;
