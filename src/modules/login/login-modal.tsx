import { Translate, translate, ValidatedField } from 'react-jhipster';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Row,
  Col,
  Form,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { type FieldError, useForm } from 'react-hook-form';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  // @ts-ignore
  const login = ({ username, password, rememberMe }) => {
    props.handleLogin(username, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError, handleClose } = props;

  const handleLoginSubmit = (e) => {
    handleSubmit(login)(e);
  };

  return (
    <Modal
      autoFocus={false}
      backdrop="static"
      id="login-page"
      isOpen={props.showModal}
      toggle={handleClose}
    >
      <Form onSubmit={handleLoginSubmit}>
        <ModalHeader data-cy="loginTitle" id="login-title" toggle={handleClose}>
          <Translate contentKey="login.title">Sign in</Translate>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              {loginError ? (
                <Alert color="danger" data-cy="loginError">
                  <Translate contentKey="login.messages.error.authentication">
                    <strong>Failed to sign in!</strong> Please check your
                    credentials and try again.
                  </Translate>
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <ValidatedField
                autoFocus
                data-cy="username"
                error={errors.username as FieldError}
                isTouched={touchedFields.username}
                label={translate('global.form.username.label')}
                name="username"
                placeholder={translate('global.form.username.placeholder')}
                register={register}
                required
                validate={{ required: 'Username cannot be empty!' }}
              />
              <ValidatedField
                data-cy="password"
                error={errors.password as FieldError}
                isTouched={touchedFields.password}
                label={translate('login.form.password')}
                name="password"
                placeholder={translate('login.form.password.placeholder')}
                register={register}
                required
                type="password"
                validate={{ required: 'Password cannot be empty!' }}
              />
              <ValidatedField
                check
                label={translate('login.form.rememberme')}
                name="rememberMe"
                register={register}
                type="checkbox"
                value
              />
            </Col>
          </Row>
          <div className="mt-1">&nbsp;</div>
          <Alert color="warning">
            <Link
              data-cy="forgetYourPasswordSelector"
              to="/account/reset/request"
            >
              <Translate contentKey="login.password.forgot">
                Did you forget your password?
              </Translate>
            </Link>
          </Alert>
          <Alert color="warning">
            <span>
              <Translate contentKey="global.messages.info.register.noaccount">
                You don&apos;t have an account yet?
              </Translate>
            </span>{' '}
            <Link to="/account/register">
              <Translate contentKey="global.messages.info.register.link">
                Register a new account
              </Translate>
            </Link>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose} tabIndex={1}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>{' '}
          <Button color="primary" data-cy="submit" type="submit">
            <Translate contentKey="login.form.button">Sign in</Translate>
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default LoginModal;
