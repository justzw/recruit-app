import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import {
  Flex, WingBlank, WhiteSpace, List, InputItem, Button
} from 'antd-mobile';
import { to } from 'await-to-js';

import { Logo } from '../../components';
import styles from './index.less';
import { userActionCreator } from '../../store/user';

const types = [
  { key: 'genius', label: '牛人' },
  { key: 'boss', label: 'Boss' }
];
const mapStateToProps = ({
  userState: { company, position }
}) => ({
  company,
  position
});
const mapDispatchToProps = dispatch => ({
  register: param => dispatch(userActionCreator.registerAsync(param))
});

@connect(mapStateToProps, mapDispatchToProps)
@CSSModules(styles)
class Register extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    password: '',
    repeatPwd: '',
    type: 'genius'
  };

  onChange = (field, val) => {
    this.setState({ [field]: val });
  }

  onSelectType = (type) => {
    this.setState({ type });
  }

  onRegister = async () => {
    const { history, register } = this.props;
    const [err] = await to(register({ ...this.state }));
    if (err) return;
    history.push('/perfect-info', history.location.state);
  }

  render() {
    const {
      name, password, repeatPwd, type
    } = this.state;

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
            <InputItem value={repeatPwd} maxLength={6} onChange={this.onChange.bind(this, 'repeatPwd')}>重复密码</InputItem>
            <List.Item>
              <Flex>
                <div>用户类型</div>
                <Flex styleName="radio-list">
                  {types.map(item => (
                    <Flex.Item key={item.key}>
                      <div styleName="radio-list-item" onClick={this.onSelectType.bind(this, item.key)}>
                        {type === item.key && <span styleName="rli-core" />}
                        <span styleName="rli-label">{item.label}</span>
                      </div>
                    </Flex.Item>
                  ))}
                </Flex>
              </Flex>
            </List.Item>
          </List>
          {/* button */}
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <Button type="primary" onClick={this.onRegister}>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
