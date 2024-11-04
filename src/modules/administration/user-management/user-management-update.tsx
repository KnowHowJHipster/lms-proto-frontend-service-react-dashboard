import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import {
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  isEmail,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from '../../../config/translation';
import {
  getUser,
  getRoles,
  updateUser,
  createUser,
  reset,
} from './user-management.reducer';
import { useAppDispatch, useAppSelector } from '../../../config/store';

export const UserManagementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { login } = useParams<'login'>();
  const isNew = login === undefined;

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/user-management');
  };

  const saveUser = (values) => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector((state) => state.userManagement.user);
  const loading = useAppSelector((state) => state.userManagement.loading);
  const updating = useAppSelector((state) => state.userManagement.updating);
  const authorities = useAppSelector(
    (state) => state.userManagement.authorities
  );

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="userManagement.home.createOrEditLabel">
              Create or edit a User
            </Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={user} onSubmit={saveUser}>
              {user.id ? (
                <ValidatedField
                  label={translate('global.field.id')}
                  name="id"
                  readOnly
                  required
                  type="text"
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('userManagement.login')}
                name="login"
                type="text"
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
                label={translate('userManagement.firstName')}
                name="firstName"
                type="text"
                validate={{
                  maxLength: {
                    value: 50,
                    message: translate('entity.validation.maxlength', {
                      max: 50,
                    }),
                  },
                }}
              />
              <ValidatedField
                label={translate('userManagement.lastName')}
                name="lastName"
                type="text"
                validate={{
                  maxLength: {
                    value: 50,
                    message: translate('entity.validation.maxlength', {
                      max: 50,
                    }),
                  },
                }}
              />
              <FormText>
                This field cannot be longer than 50 characters.
              </FormText>
              <ValidatedField
                label={translate('global.form.email.label')}
                name="email"
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: translate(
                      'global.messages.validate.email.required'
                    ),
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
                check
                disabled={!user.id}
                label={translate('userManagement.activated')}
                name="activated"
                type="checkbox"
                value
              />
              <ValidatedField
                label={translate('userManagement.langKey')}
                name="langKey"
                type="select"
              >
                {locales.map((locale) => (
                  <option key={locale} value={locale}>
                    {languages[locale].name}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('userManagement.profiles')}
                multiple
                name="authorities"
                type="select"
              >
                {authorities.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button
                color="info"
                replace
                tag={Link}
                to="/admin/user-management"
              >
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button
                color="primary"
                disabled={isInvalid || updating}
                type="submit"
              >
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserManagementUpdate;
