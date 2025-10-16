import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, StyledEngineProvider } from '@mui/material';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { createAppTheme } from './theme/theme';
import { MainLayout } from './components/Layout/MainLayout';
import { Dashboard } from './screens/Dashboard';
import { Assets } from './screens/Assets';
import { WorkOrders } from './screens/WorkOrders';
import { FinancialReports } from './screens/FinancialReports';
import { PredictiveAnalytics } from './screens/PredictiveAnalytics';
import { Settings } from './screens/Settings';

const screens: { [key: string]: React.ComponentType } = {
  'dashboard': Dashboard,
  'assets': Assets,
  'work-orders': WorkOrders,
  'financial-reports': FinancialReports,
  'predictive-analytics': PredictiveAnalytics,
  'settings': Settings,
};

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const { language } = useLanguage();

  const theme = createAppTheme(language === 'ar' ? 'rtl' : 'ltr');

  const CurrentScreenComponent = screens[currentScreen] || Dashboard;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout 
          currentScreen={currentScreen} 
          onScreenChange={setCurrentScreen}
        >
          <CurrentScreenComponent />
        </MainLayout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;