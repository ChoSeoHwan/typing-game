import { useSelector } from 'react-redux';
import { Location } from 'history';

import { useHistory } from 'libs/router';

import { RootReducerState } from 'modules';

// get location object
const useLocation = (): Location => {
    const history = useHistory();

    const location = useSelector<
        RootReducerState,
        RootReducerState['routerReducer']['location']
    >(({ routerReducer }) => routerReducer.location);

    return location || history.location;
};

export default useLocation;
