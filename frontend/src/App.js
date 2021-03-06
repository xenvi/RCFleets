import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { Provider } from 'react-redux';
// util
import store from './redux/store';
import theme from './util/theme';
// hoc
import Layout from './hoc/Layout';
// containers
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import SignupSuccess from './containers/SignupSuccess';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import ResetPasswordSuccess from './containers/ResetPasswordSuccess';
import Profile from './containers/Profile';
import Settings from './containers/Settings';

const GlobalStyles = css`
    /*
        Hide focus indicator if element receives focus via the mouse,
        else show up on keyboard focus
    */
    .js-focus-visible :focus:not([data-focus-visible-added]) {
        outline: none;
        box-shadow: none;
    }
`;

const App = () => (
    <Provider store={store}>
        <Router>
            <ChakraProvider theme={theme}>
                <Global styles={GlobalStyles} />
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signup/success" component={SignupSuccess} />
                        <Route exact path="/activate/:uid/:token" component={Activate} />
                        <Route exact path="/reset-password" component={ResetPassword} />
                        <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
                        <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
                        <Route exact path="/user/:handle" component={Profile} />
                    </Switch>
                </Layout>
            </ChakraProvider>
        </Router>
    </Provider>
);

export default App;
