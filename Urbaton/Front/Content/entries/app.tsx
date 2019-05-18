import {App} from 'components/App/App';
import {createAppStore} from 'entries/createAppStore';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'leaflet/dist/leaflet.css';
import 'Styles/layout/layout.scss';

const root = document.getElementById('root');
const store = createAppStore();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root,
);
