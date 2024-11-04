import { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';

import { getLoggers, changeLogLevel } from '../administration.reducer';
import { useAppDispatch, useAppSelector } from '../../../config/store';

export const LogsPage = () => {
  const [filter, setFilter] = useState('');
  const logs = useAppSelector((state) => state.administration.logs);
  const isFetching = useAppSelector((state) => state.administration.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoggers());
  }, []);

  const changeLevel = (loggerName, level) => () =>
    dispatch(changeLogLevel(loggerName, level));

  const changeFilter = (evt) => setFilter(evt.target.value);

  const getClassName = (level, check, className) =>
    level === check ? `btn btn-sm btn-${className}` : 'btn btn-sm btn-light';

  const filterFn = (l) => l.name.toUpperCase().includes(filter.toUpperCase());

  const loggers = logs
    ? Object.entries(logs.loggers).map((e: any) => ({
        name: e[0],
        level: e[1].effectiveLevel,
      }))
    : [];

  return (
    <div>
      <h2 data-cy="logsPageHeading" id="logs-page-heading">
        <Translate contentKey="logs.title">Logs</Translate>
      </h2>
      <p>
        <Translate
          contentKey="logs.nbloggers"
          interpolate={{ total: loggers.length }}
        >
          There are {loggers.length.toString()} loggers.
        </Translate>
      </p>

      <span>
        <Translate contentKey="logs.filter">Filter</Translate>
      </span>
      <input
        className="form-control"
        disabled={isFetching}
        onChange={changeFilter}
        type="text"
        value={filter}
      />

      <table
        aria-describedby="logs-page-heading"
        className="table table-sm table-striped table-bordered"
      >
        <thead>
          <tr title="click to order">
            <th>
              <span>
                <Translate contentKey="logs.table.name">Name</Translate>
              </span>
            </th>
            <th>
              <span>
                <Translate contentKey="logs.table.level">Level</Translate>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loggers.filter(filterFn).map((logger, i) => (
            <tr key={`log-row-${i}`}>
              <td>
                <small>{logger.name}</small>
              </td>
              <td>
                <button
                  className={getClassName(logger.level, 'TRACE', 'primary')}
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'TRACE')}
                >
                  TRACE
                </button>
                <button
                  className={getClassName(logger.level, 'DEBUG', 'success')}
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'DEBUG')}
                >
                  DEBUG
                </button>
                <button
                  className={getClassName(logger.level, 'INFO', 'info')}
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'INFO')}
                >
                  INFO
                </button>
                <button
                  className={getClassName(logger.level, 'WARN', 'warning')}
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'WARN')}
                >
                  WARN
                </button>
                <button
                  className={getClassName(logger.level, 'ERROR', 'danger')}
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'ERROR')}
                >
                  ERROR
                </button>
                <button
                  className={getClassName(logger.level, 'OFF', 'secondary')}
                  disabled={isFetching}
                  onClick={changeLevel(logger.name, 'OFF')}
                >
                  OFF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;
