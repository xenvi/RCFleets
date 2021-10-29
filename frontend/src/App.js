import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './util/store';
import theme from './util/theme';
// hoc
import Layout from './hoc/Layout';
// containers
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';

const App = () => (
    <Provider store={store}>
        <Router>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/activate/:uid/:token" component={Activate} />
                        <Route exact path="/reset-password" component={ResetPassword} />
                        <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
                    </Switch>
                </Layout>
            </ChakraProvider>
        </Router>
    </Provider>
);

export default App;
