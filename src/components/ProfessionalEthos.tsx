import { Container, Typography, Box, Grid, useMediaQuery } from '@mui/material';
import { ButtonsInfo, professionalEthos } from '../data/portfolio';

export const ProfessionalEthos = () => {
    const isMobile = useMediaQuery('(max-width:1024px)');
    return (
        <Box
            id="professional-ethos"
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
                    {ButtonsInfo.professionalEthos}
                </Typography>
                <Grid container spacing={6}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                            dangerouslySetInnerHTML={{ __html: professionalEthos?.ethos_1 }}
                        >
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                            dangerouslySetInnerHTML={{ __html: professionalEthos?.ethos_2 }}
                        >
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                        >
                            {professionalEthos?.ethos_3}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                        >
                            {professionalEthos?.ethos_4}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};
