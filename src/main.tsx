import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { Layout } from './components/Layout';
import { MainSection } from './components';
import './style.css';
import '../index.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <MainSection />
      </Layout>
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById('app')!);
root.render(<App />);
