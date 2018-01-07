import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from 'components/Header';
import Search from 'components/Search';
import ContributorsList from 'components/ContributorsList';
import Statistics from 'components/statistics/Statistics';

const store = createStore(reducers);

render(
	<Provider store={store}>
		<MuiThemeProvider>
			<div className="wrapper">
				<Header/>
				<div className="container-fluid">
					<Search/>
					<div className="row">
						<div className="col-md-3">
							<ContributorsList/>
						</div>
						<div className="col-md-9">
							<Statistics/>
						</div>
					</div>
				</div>
			</div>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);