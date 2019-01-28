import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Routes from './routes';
import store from './store';
import AppTheme from './static/themes';
import './static/styles/index.scss';

ReactDOM.render(
	<MuiThemeProvider theme={AppTheme}>
		<Provider store={store}>
			<Routes />
		</Provider>
	</MuiThemeProvider>, document.getElementById('root')
);
