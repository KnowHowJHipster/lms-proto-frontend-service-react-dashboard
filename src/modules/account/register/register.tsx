import { useState, useEffect } from 'react';
import {
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  isEmail,
} from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PasswordStrengthBar from '../../../shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { handleRegister, reset } from './register.reducer';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    []
  );

  const currentLocale = useAppSelector((state) => state.locale.currentLocale);

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    dispatch(
      handleRegister({
        login: username,
        email,
        password: firstPassword,
        langKey: currentLocale,
      })
    );
  };

  const updatePassword = (event) => setPassword(event.target.value);

  const successMessage = useAppSelector(
    (state) => state.register.successMessage
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 data-cy="registerTitle" id="register-title">
            <Translate contentKey="register.title">Registration</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              data-cy="username"
              label={translate('global.form.username.label')}
              name="username"
              placeholder={translate('global.form.username.placeholder')}
              validate={{
                required: {
                  value: true,
                  message: translate(
                    'register.messages.validate.login.required'
                  ),
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: translate(
                    'register.messages.validate.login.pattern'
                  ),
                },
                minLength: {
                  value: 1,
                  message: translate(
                    'register.messages.validate.login.minlength'
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    'register.messages.validate.login.maxlength'
                  ),
                },
              }}
            />
            <ValidatedField
              data-cy="email"
              label={translate('global.form.email.label')}
              name="email"
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: {
                  value: true,
                  message: translate('global.messages.validate.email.required'),
                },
                minLength: {
                  value: 5,
                  message: translate(
                    'global.messages.validate.email.minlength'
                  ),
                },
                maxLength: {
                  value: 254,
                  message: translate(
                    'global.messages.validate.email.maxlength'
                  ),
                },
                validate: (v) =>
                  isEmail(v) ||
                  translate('global.messages.validate.email.invalid'),
              }}
            />
            <ValidatedField
              data-cy="firstPassword"
              label={translate('global.form.newpassword.label')}
              name="firstPassword"
              onChange={updatePassword}
              placeholder={translate('global.form.newpassword.placeholder')}
              type="password"
              validate={{
                required: {
                  value: true,
                  message: translate(
                    'global.messages.validate.newpassword.required'
                  ),
                },
                minLength: {
                  value: 4,
                  message: translate(
                    'global.messages.validate.newpassword.minlength'
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    'global.messages.validate.newpassword.maxlength'
                  ),
                },
              }}
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              data-cy="secondPassword"
              label={translate('global.form.confirmpassword.label')}
              name="secondPassword"
              placeholder={translate('global.form.confirmpassword.placeholder')}
              type="password"
              validate={{
                required: {
                  value: true,
                  message: translate(
                    'global.messages.validate.confirmpassword.required'
                  ),
                },
                minLength: {
                  value: 4,
                  message: translate(
                    'global.messages.validate.confirmpassword.minlength'
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    'global.messages.validate.confirmpassword.maxlength'
                  ),
                },
                validate: (v) =>
                  v === password ||
                  translate('global.messages.error.dontmatch'),
              }}
            />
            <Button
              color="primary"
              data-cy="submit"
              id="register-submit"
              type="submit"
            >
              <Translate contentKey="register.form.button">Register</Translate>
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>
              <Translate contentKey="global.messages.info.authenticated.prefix">
                If you want to
              </Translate>{' '}
            </span>
            <Link className="alert-link" to="/login">
              <Translate contentKey="global.messages.info.authenticated.link">
                sign in
              </Translate>
            </Link>
            <span>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and
                password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and
                password=&quot;user&quot;).
              </Translate>
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
