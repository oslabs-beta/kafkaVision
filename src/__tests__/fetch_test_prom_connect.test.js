import ConnectClusterPage from '../ConnectClusterPage';
import { render, screen} from '@testing-library/react';
import { appContext } from '../App';
import { providerProps } from '../__mocks__/DefaultContext';
import userEvent from '@testing-libray/user-event' // INSTALL THIS?


describe("PROM CONNECT TESTS", () => {
    beforeEach(() => {
        render (
          <appContext.Provider value={providerProps}>
            <ConnectClusterPage />
          </appContext.Provider>
        );
      });

    it('If bad Prom URL, should render Error message', async () => {
        // make a fake fetch request...
        fetch.mockResponseOnce()
        expect(screen.getByText('...', {exact:true}))
    });

    it('If it\'s a good Prom URL... what should happen?', async () => {
        // make a fake fetch request...

    });

});
