import { getUser, login, register } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, Form, message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const currentUser = await getUser();
    if (currentUser) {
      await setInitialState((s) => ({
        ...s,
        currentUser,
      }));
    }
  };

  const handleLogin = async (loginValues: API.LoginParams) => {
    try {
      const msg = await login(loginValues);
      localStorage.setItem('@userToken', msg.Authorization);
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: 'pages.login.success',
        defaultMessage: '登录成功！',
      });
      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleRegister = async (registerValues: API.LoginParams) => {
    try {
      const registrationMsg = await register({
        name: registerValues.name,
        password: registerValues.password,
        login: registerValues.login,
        role: 'ADMIN',
      });
      if (registrationMsg.success) {
        await handleLogin({ password: registerValues.password, login: registerValues.login });
      } else {
        const defaultRegistrationFailureMessage = intl.formatMessage({
          id: 'pages.register.failure',
          defaultMessage: '登录失败，请重试！',
        });
        message.error(defaultRegistrationFailureMessage);
      }
    } catch (error) {
      let errorMessageId = 'pages.register.failure';
      let errorMessageDefault = '登录失败，请重试！';

      // @ts-ignore
      if (error.response?.data.status === 409) {
        errorMessageId = 'pages.register.fail';
        errorMessageDefault = 'Email Já Registrado!!';
      }

      const defaultRegistrationFailureMessage = intl.formatMessage({
        id: errorMessageId,
        defaultMessage: errorMessageDefault,
      });

      message.error(defaultRegistrationFailureMessage);

      // @ts-ignore
      if (error.response?.data.status === 409) {
        const defaultRegistrationInfoMessage = intl.formatMessage({
          id: 'pages.register.info',
        });
        message.info(defaultRegistrationInfoMessage);
      }
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    const loginValues = { ...values, type };
    if (type === 'register') {
      await handleRegister(loginValues);
    } else {
      await handleLogin(loginValues);
    }
  };

  const validatePasswords = async (_, value: string): Promise<void> => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error(intl.formatMessage({ id: 'pages.register.password.error' })));
    }
    return Promise.resolve();
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          form={form}
          logo={<img alt="logo" src="/logo.svg" />}
          title="ENADE"
          subTitle={''}
          initialValues={{
            autoLogin: true,
          }}
          // actions={[
          //   <FormattedMessage
          //     key="loginWith"
          //     id="pages.login.loginWith"
          //     defaultMessage="其他登录方式"
          //   />,
          //   <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
          //   <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
          //   <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          // ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
          // disabled={true}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账户密码登录',
              })}
            />
            <Tabs.TabPane
              key="register"
              tab={intl.formatMessage({
                id: 'pages.register.accountLogin.tab',
                defaultMessage: '手机号登录',
              })}
            />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="login"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'register' && (
            <>
              <ProFormText
                name="name"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText
                name="login"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.mail.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.mail.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="confirmPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                  {
                    validator: validatePasswords,
                  },
                ]}
              />
            </>
          )}
          {/*<div*/}
          {/*  style={{*/}
          {/*    marginBottom: 24,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <ProFormCheckbox noStyle name="autoLogin">*/}
          {/*    <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />*/}
          {/*  </ProFormCheckbox>*/}
          {/*  <a*/}
          {/*    style={{*/}
          {/*      float: 'right',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />*/}
          {/*  </a>*/}
          {/*</div>*/}
        </LoginForm>
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default Login;
