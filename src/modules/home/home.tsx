import './home.scss';

import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from '../../config/store';

export const Home = () => {
  const account = useAppSelector((state) => state.authentication.account);

  return (
    <Row>
      <Col className="pad" md="3" />
      <Col md="9">
        <h1 className="display-4">
          <Translate contentKey="home.title">Welcome, Java Hipster!</Translate>
        </h1>
        <p className="lead">
          <Translate contentKey="home.subtitle">
            This is your homepage
          </Translate>
        </p>
        {account?.login ? (
          <div>
            <Alert color="success">
              <Translate
                contentKey="home.logged.message"
                interpolate={{ username: account.login }}
              >
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">
                If you want to{' '}
              </Translate>

              <Link className="alert-link" to="/login">
                <Translate contentKey="global.messages.info.authenticated.link">
                  {' '}
                  sign in
                </Translate>
              </Link>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and
                password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and
                password=&quot;user&quot;).
              </Translate>
            </Alert>

            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">
                You do not have an account yet?
              </Translate>
              &nbsp;
              <Link className="alert-link" to="/account/register">
                <Translate contentKey="global.messages.info.register.link">
                  Register a new account
                </Translate>
              </Link>
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Home;
