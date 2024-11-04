import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table, Badge } from 'reactstrap';
import {
  Translate,
  TextFormat,
  JhiPagination,
  JhiItemCount,
  getPaginationState,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_FORMAT } from '../../../config/constants';
import {
  ASC,
  DESC,
  ITEMS_PER_PAGE,
  SORT,
} from '../../../shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from '../../../shared/util/entity-utils';
import { getUsersAsAdmin, updateUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from '../../../config/store';

export const UserManagement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(
      getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'),
      pageLocation.search
    )
  );

  const getUsersFromProps = () => {
    dispatch(
      getUsersAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      })
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getUsersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = (p) => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = (currentPage) =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getUsersFromProps();
  };

  const toggleActive = (user) => () => {
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      })
    );
  };

  const account = useAppSelector((state) => state.authentication.account);
  const users = useAppSelector((state) => state.userManagement.users);
  const totalItems = useAppSelector((state) => state.userManagement.totalItems);
  const loading = useAppSelector((state) => state.userManagement.loading);
  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = pagination.sort;
    const { order } = pagination;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 data-cy="userManagementPageHeading" id="user-management-page-heading">
        <Translate contentKey="userManagement.home.title">Users</Translate>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            color="info"
            disabled={loading}
            onClick={handleSyncList}
          >
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="userManagement.home.refreshListLabel">
              Refresh List
            </Translate>
          </Button>
          <Link className="btn btn-primary jh-create-entity" to="new">
            <FontAwesomeIcon icon="plus" />{' '}
            <Translate contentKey="userManagement.home.createLabel">
              Create a new user
            </Translate>
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              <Translate contentKey="global.field.id">ID</Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
            </th>
            <th className="hand" onClick={sort('login')}>
              <Translate contentKey="userManagement.login">Login</Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('login')} />
            </th>
            <th className="hand" onClick={sort('email')}>
              <Translate contentKey="userManagement.email">Email</Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
            </th>
            <th />
            <th className="hand" onClick={sort('langKey')}>
              <Translate contentKey="userManagement.langKey">
                Lang Key
              </Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('langKey')} />
            </th>
            <th>
              <Translate contentKey="userManagement.profiles">
                Profiles
              </Translate>
            </th>
            <th className="hand" onClick={sort('createdDate')}>
              <Translate contentKey="userManagement.createdDate">
                Created Date
              </Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
            </th>
            <th className="hand" onClick={sort('lastModifiedBy')}>
              <Translate contentKey="userManagement.lastModifiedBy">
                Last Modified By
              </Translate>{' '}
              <FontAwesomeIcon
                icon={getSortIconByFieldName('lastModifiedBy')}
              />
            </th>
            <th
              className="hand"
              id="modified-date-sort"
              onClick={sort('lastModifiedDate')}
            >
              <Translate contentKey="userManagement.lastModifiedDate">
                Last Modified Date
              </Translate>{' '}
              <FontAwesomeIcon
                icon={getSortIconByFieldName('lastModifiedDate')}
              />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={`user-${i}`} id={user.login}>
              <td>
                <Button color="link" size="sm" tag={Link} to={user.login}>
                  {user.id}
                </Button>
              </td>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>
                {user.activated ? (
                  <Button color="success" onClick={toggleActive(user)}>
                    <Translate contentKey="userManagement.activated">
                      Activated
                    </Translate>
                  </Button>
                ) : (
                  <Button color="danger" onClick={toggleActive(user)}>
                    <Translate contentKey="userManagement.deactivated">
                      Deactivated
                    </Translate>
                  </Button>
                )}
              </td>
              <td>{user.langKey}</td>
              <td>
                {user.authorities
                  ? user.authorities.map((authority, j) => (
                      <div key={`user-auth-${i}-${j}`}>
                        <Badge color="info">{authority}</Badge>
                      </div>
                    ))
                  : null}
              </td>
              <td>
                {user.createdDate ? (
                  <TextFormat
                    blankOnInvalid
                    format={APP_DATE_FORMAT}
                    type="date"
                    value={user.createdDate}
                  />
                ) : null}
              </td>
              <td>{user.lastModifiedBy}</td>
              <td>
                {user.lastModifiedDate ? (
                  <TextFormat
                    blankOnInvalid
                    format={APP_DATE_FORMAT}
                    type="date"
                    value={user.lastModifiedDate}
                  />
                ) : null}
              </td>
              <td className="text-end">
                <div className="btn-group flex-btn-group-container">
                  <Button color="info" size="sm" tag={Link} to={user.login}>
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">
                        View
                      </Translate>
                    </span>
                  </Button>
                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={`${user.login}/edit`}
                  >
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">
                        Edit
                      </Translate>
                    </span>
                  </Button>
                  <Button
                    color="danger"
                    disabled={account.login === user.login}
                    size="sm"
                    tag={Link}
                    to={`${user.login}/delete`}
                  >
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.delete">
                        Delete
                      </Translate>
                    </span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={users?.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount
              i18nEnabled
              itemsPerPage={pagination.itemsPerPage}
              page={pagination.activePage}
              total={totalItems}
            />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={pagination.activePage}
              itemsPerPage={pagination.itemsPerPage}
              maxButtons={5}
              onSelect={handlePagination}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserManagement;
