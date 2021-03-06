/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export function App(props) {
  const muiTheme = getMuiTheme({}, {
    fontFamily: 'Roboto, sans-serif',
    palette: {
      accent1Color: '#039BE5',
      primary1Color: '#4990E1',
      pickerHeaderColor: '#4990E1',
    },
    menuItem: {
      selectedTextColor: '#039BE5',
    },
  });

  return (
    <div>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Helmet
            titleTemplate="%s - React.js Boilerplate"
            defaultTitle="React.js Boilerplate"
            meta={[
              { name: 'description', content: 'A React.js Boilerplate application' },
            ]}
          />
          <Header />
          {React.Children.toArray(props.children)}
          <Footer />
        </div>
      </MuiThemeProvider>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
