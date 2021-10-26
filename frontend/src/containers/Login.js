import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();

        login(email, password);
    };

    // is user authenticated? redirect to homepage

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                </div>
                <div>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      minLength="6"
                      required
                    />
                </div>
                <button type="submit">
                    Log In
                </button>
            </form>
            <p>
                Don&apos;t have an account?
                <Link to="signup">Sign Up</Link>
            </p>
            <p>
                Forgot your Password?
                <Link to="reset-password">Reset Password</Link>
            </p>
        </div>
    );
};

// const mapStateToProps = state => ({
//     // is authenticated
// });

export default connect(null, { login })(Login);
