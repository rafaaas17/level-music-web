import { AppRouter } from './router/app-router';
import { AppTheme } from './theme';
import { MainLayout } from './shared/ui/layout/main-layout';
import { logCurrentUserToken } from './modules/auth/firebase/config';

export const App = () => {
  logCurrentUserToken();
  return (
    <AppTheme>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </AppTheme>
  )
}