import { Box, Container, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <FontAwesomeIcon icon={faCopyright} /> {currentYear} Andres Luis Logares
        </Typography>
      </Container>
    </Box>
  );
};
