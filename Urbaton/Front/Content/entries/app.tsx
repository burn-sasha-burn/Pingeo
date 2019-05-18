import {App} from 'components/App/App';
import {ConnectedRouter} from 'connected-react-router';
import {createAppStore} from 'entries/createAppStore';
import {createBrowserHistory} from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'leaflet/dist/leaflet.css';
import 'Styles/layout/layout.scss';

const history = createBrowserHistory({
    basename: '/',
});
const root = document.getElementById('root');
const store = createAppStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    root,
);
