import { Container, Typography, Box, Grid, useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
// Asegúrate de que estos imports sean correctos para tu proyecto
import { ButtonsInfo, personalInfo } from '../data/portfolio';
import ContactButton from './ContactButton';

export const Contact = () => {
  const isMobile = useMediaQuery('(max-width:1024px)');

  return (
    <Box
      id="contact"
      sx={{
        py: 10,
        backgroundColor: isMobile ? 'rgb(254, 252, 254, 1)' : 'rgb(254, 252, 254, 0.4)',
        backdropFilter: isMobile ? 'none' : 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            fontWeight: 600,
          }}
        >
          {ButtonsInfo.contactMe}
        </Typography>
        <Box sx={{ width: '60px', height: '4px', bgcolor: 'primary.main', mb: 5 }} />

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {/* El tamaño del Grid item es correcto */}
          <Grid container >
            {/* Este es el Box contenedor con flexWrap: 'wrap' */}
            <Box sx={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'wrap', // Esto habilita el wrap de los botones
              gap: 3, // Añade espacio entre los botones
              mb: 3, // Añade un margen inferior para separar del texto del email
            }}>

              <ContactButton
                onClick={() => window.open(personalInfo.social.github, '_blank')}
              >
                <GitHubIcon fontSize="large" />
              </ContactButton>
              <ContactButton
                onClick={() => window.open(personalInfo.social.linkedin, '_blank')}
              >
                <LinkedInIcon fontSize="large" />
              </ContactButton>
              <ContactButton
                onClick={() => window.open(personalInfo.social.whatsapp, '_blank')}
              >
                <WhatsAppIcon fontSize="large" />
              </ContactButton>
              <ContactButton
                onClick={() => window.location.href = `mailto:${personalInfo.email}`}
              >
                <EmailIcon fontSize="large" />
              </ContactButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
