import { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import {
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  isEmail,
} from 'react-jhipster';
import { toast } from 'react-toastify';

import { locales, languages } from '../../../config/translation';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getSession } from '../../../shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(
    (state: { authentication: { account: any } }) =>
      state.authentication.account
  );
  const successMessage = useAppSelector(
    (state: { settings: { successMessage: any } }) =>
      state.settings.successMessage
  );

  useEffect(() => {
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  const handleValidSubmit = (values: any) => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">
            <Translate
              contentKey="settings.title"
              interpolate={{ username: account.login }}
            >
              User settings for {account.login}
            </Translate>
          </h2>
          <ValidatedForm
            defaultValues={account}
            id="settings-form"
            onSubmit={handleValidSubmit}
          >
            <ValidatedField
              data-cy="firstname"
              id="firstName"
              label={translate('settings.form.firstname')}
              name="firstName"
              placeholder={translate('settings.form.firstname.placeholder')}
              validate={{
                required: {
                  value: true,
                  message: translate(
                    'settings.messages.validate.firstname.required'
                  ),
                },
                minLength: {
                  value: 1,
                  message: translate(
                    'settings.messages.validate.firstname.minlength'
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    'settings.messages.validate.firstname.maxlength'
                  ),
                },
              }}
            />
            <ValidatedField
              data-cy="lastname"
              id="lastName"
              label={translate('settings.form.lastname')}
              name="lastName"
              placeholder={translate('settings.form.lastname.placeholder')}
              validate={{
                required: {
                  value: true,
                  message: translate(
                    'settings.messages.validate.lastname.required'
                  ),
                },
                minLength: {
                  value: 1,
                  message: translate(
                    'settings.messages.validate.lastname.minlength'
                  ),
                },
                maxLength: {
                  value: 50,
                  message: translate(
                    'settings.messages.validate.lastname.maxlength'
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
              data-cy="langKey"
              id="langKey"
              label={translate('settings.form.language')}
              name="langKey"
              type="select"
            >
              {locales.map((locale) => (
                <option key={locale} value={locale}>
                  {languages[locale].name}
                </option>
              ))}
            </ValidatedField>
            <Button color="primary" data-cy="submit" type="submit">
              <Translate contentKey="settings.form.button">Save</Translate>
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
