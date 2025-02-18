import { AppRouter } from './router/app-router';
import { AppTheme } from './theme';
import { MainLayout } from './shared/ui/layout/main-layout';

export const App = () => {
  return (
    <AppTheme>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </AppTheme>
  )
}