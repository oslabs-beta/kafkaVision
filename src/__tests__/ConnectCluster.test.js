import React from 'react';
import { render, screen } from '@testing-library/react';
import ConnectClusterPage from '../ConnectClusterPage';
import { providerProps } from '../__mocks__/DefaultContext';
import { appContext } from '../App';

describe('ConnectCluster Page Tests', () => {
  beforeEach(() => {
    render(
      <appContext.Provider value={providerProps}>
        <ConnectClusterPage />
      </appContext.Provider>
    );
  });

  it('Kafka input has correct placeholder text', () => {
    expect(screen.getByPlaceholderText('Kafka Broker Port'))
  })

  it('Connect page has Kafka URL input box', () => {
    expect(screen.getByRole('input_kafka'));
  })

  it('Prometheus input has correct placeholder text', () => {
    expect(screen.getByPlaceholderText('Prometheus Port'))
  })

  it('Connect page has Kafka URL input box', () => {
    expect(screen.getByRole('input_prometheus'));
  });

  it('renders two buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });


});
