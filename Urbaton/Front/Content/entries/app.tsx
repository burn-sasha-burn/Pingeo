import {AppContainer} from 'containers/AppContainer';
import {createAppStore} from 'entries/createAppStore';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'Styles/layout/layout.scss';

const root = document.getElementById('root');
const store = createAppStore();

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    root,
);
