import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik';
import { Button, Form, Input } from 'antd';
import * as Yup from 'yup';
import { registerUser } from '../../../../_actions/user_actions';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
      <Formik
        initialValues={{
          loginId: '',
          name: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          loginId: Yup.string().required('ID를 입력해주세요.'),
          name: Yup.string().required('이름을 입력해주세요.'),
          password: Yup.string()
            .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
            .required('비밀번호를 입력해주세요.'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호를 재확인 해주세요.')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              loginId: values.loginId,
              name: values.name,
              password: values.password,
              image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
            };

            dispatch(registerUser(dataToSubmit)).then(response => {
              if (response.payload.success) {
                navigate('/login');
              } else {
                alert(response.payload.err.errmsg)
              }
            })

            setSubmitting(false)
          }, 500)
        }}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props;
          return (
            <div className='app'>
              <h2>회원가입</h2>
              <Form style={{ minWidth: '375px' }}  onSubmit={handleSubmit} >
                <Form.Item required label="ID">
                  <Input 
                    id='loginId'
                    placeholder='ID를 입력해 주세요.'
                    type="text"
                    value={values.loginId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.loginId && touched.loginId ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.loginId && touched.loginId && (
                    <div className='input-feedback'>{errors.loginId}</div>
                  )}
                </Form.Item>

                <Form.Item required label="이름">
                  <Input 
                    id='name'
                    placeholder='이름을 입력해 주세요.'
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.name && touched.name ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.name && touched.name && (
                    <div className='input-feedback'>{errors.name}</div>
                  )}
                </Form.Item>

                <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                  <Input 
                    id='password'
                    placeholder='비밀번호를 입력해 주세요.'
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className='input-feedback'>{errors.password}</div>
                  )}
                </Form.Item>

                <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호를 다시한번 입력해 주세요."
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                  <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                    회원가입
                  </Button>
              </Form.Item>

              </Form>
            </div>
          )
        }}
      </Formik>
    )
}

export default RegisterPage