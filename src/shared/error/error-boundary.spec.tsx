import { render } from '@testing-library/react';

import ErrorBoundary from './error-boundary';

const ErrorComp = () => {
  throw new Error('test');
};

describe('error component', () => {
  beforeEach(() => {
    // ignore console and jsdom errors
    vitest
      .spyOn((window as any)._virtualConsole, 'emit')
      .mockImplementation(() => false);
    vitest
      .spyOn((window as any).console, 'error')
      .mockImplementation(() => false);
  });

  it('Should throw an error when component is not enclosed in Error Boundary', () => {
    expect(() => render(<ErrorComp />)).throw(Error);
  });

  it('Should call Error Boundary componentDidCatch method', () => {
    const spy = vitest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    render(
      <ErrorBoundary>
        <ErrorComp />
      </ErrorBoundary>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(spy).calledOnce;
  });
});
