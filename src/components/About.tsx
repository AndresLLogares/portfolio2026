import { Container, Typography, Box, Grid } from '@mui/material';
import { AboutMeInfo, ButtonsInfo } from '../data/portfolio';

export const About = () => {
    return (
        <Box
            id="about"
            sx={{
                py: 10,
                backgroundColor: 'rgb(254, 252, 254, 0.4)',
                backdropFilter: 'blur(10px)',
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
                    {ButtonsInfo.aboutMe}
                </Typography>
                <Grid container spacing={6}>
                    <Grid size={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                            dangerouslySetInnerHTML={{ __html: AboutMeInfo?.info }}
                        >
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                            dangerouslySetInnerHTML={{ __html: AboutMeInfo?.info_2 }}
                        >
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                        >
                            {AboutMeInfo?.info_3}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.primary',
                                marginBottom: '16px',
                            }}
                        >
                            {AboutMeInfo?.info_4}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};
