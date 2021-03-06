import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  WingBlank, WhiteSpace, List, InputItem, Button
} from 'antd-mobile';
import { to } from 'await-to-js';

import { Logo } from '../../components';
import { userActionCreator } from '../../store/user';

const mapStateToProps = ({
  userState: { company, position }
}) => ({
  company,
  position
});
const mapDispatchToProps = dispatch => ({
  login: param => dispatch(userActionCreator.loginAsync(param))
});

@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired
  };

  state = {
    name: '',
    password: ''
  };

  onChange(field, val) {
    this.setState({ [field]: val });
  }

  onLogin = async () => {
    const {
      history,
      company,
      position,
      login
    } = this.props;

    const [err] = await to(login(this.state));
    if (err) return;

    const { location: { state: { from } } } = history;
    let toURL = '/dashboard/mine';
    if (!company && !position) toURL = '/perfect-info';
    if (from) toURL = from;
    history.push(toURL, history.location.state);
  }

  render() {
    const { name, password } = this.state;

    return (
      <div className="layout">
        {/* content */}
        <WingBlank>
          {/* logo */}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Logo />
          {/* input */}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <List>
            <InputItem value={name} maxLength={16} onChange={this.onChange.bind(this, 'name')}>用户名</InputItem>
            <InputItem value={password} maxLength={6} onChange={this.onChange.bind(this, 'password')}>密码</InputItem>
          </List>
          {/* button */}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Button type="primary" onClick={this.onLogin}>登录</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
