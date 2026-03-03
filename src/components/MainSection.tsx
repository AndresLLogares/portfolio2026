import { Typography, Grid, Box } from '@mui/material';
import { ButtonsInfo, personalInfo, timelineEvents } from '../data/portfolio';
import { useState, useCallback, useTransition } from 'react';
import { About, AnimatedSection, Contact, ModernButton, MyJourney, ProfessionalEthos } from '.';
import useMediaQuery from '@mui/material/useMediaQuery';

export const MainSection = () => {
  const [activeView, setActiveView] = useState<'about' | 'journey' | 'ethos' | 'contact'>('about');
  const [isPending, startTransition] = useTransition();
  const isSmallScreen = useMediaQuery('(max-width:1024px)');

  const handleViewChange = useCallback((view: 'about' | 'journey' | 'ethos' | 'contact') => {
    startTransition(() => {
      setActiveView(view);
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        width: '100%', // Esto asegura que ocupe todo el ancho disponible
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        py: 8,
        // Opcional: añade padding horizontal para que el contenido no toque los bordes en móviles
        px: { xs: 2, md: 4 },
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justifyContent="flex-start"
        direction={isSmallScreen ? 'column' : 'row'}
        // Asegúrate de que el contenedor de la grilla ocupe el 100% del Box padre
        sx={{ width: '100%' }}
      >
        <Grid size={isSmallScreen ? 12 : 6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h2"
            sx={{
              mb: 0,
              color: 'text.secondary',
            }}
          >
            {personalInfo.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: 'text.secondary',
            }}
          >
            {personalInfo.title}
          </Typography>

          <ModernButton onClick={() => handleViewChange('about')} isActive={activeView === 'about'}>
            {ButtonsInfo?.aboutMe}
          </ModernButton>

          <ModernButton onClick={() => handleViewChange('journey')} isActive={activeView === 'journey'}>
            {ButtonsInfo?.myJourney}
          </ModernButton>

          <ModernButton onClick={() => handleViewChange('ethos')} isActive={activeView === 'ethos'}>
            {ButtonsInfo?.professionalEthos}
          </ModernButton>

          <ModernButton onClick={() => handleViewChange('contact')} isActive={activeView === 'contact'}>
            {ButtonsInfo?.contactMe}
          </ModernButton>
        </Grid>
        <Grid size={isSmallScreen ? 12 : 6} sx={{ flexDirection: 'column' }}>
          <AnimatedSection key={activeView}>
            {activeView === 'about' && <About />}
            {activeView === 'journey' && <MyJourney events={timelineEvents} />}
            {activeView === 'ethos' && <ProfessionalEthos />}
            {activeView === 'contact' && <Contact />}
            {/* Puedes agregar más vistas aquí si lo deseas */}
          </AnimatedSection>
        </Grid>
      </Grid>
    </Box>
  );
};
