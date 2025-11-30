import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { projects } from '../data/portfolio';

export const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        py: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(5px)',
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
          Proyectos
        </Typography>
        <Box sx={{ width: '60px', height: '4px', bgcolor: 'primary.main', mb: 5 }} />

        <Grid container spacing={4}>
          {projects.map((project: import('../data/portfolio').Project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 2,
                      minHeight: '60px',
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.technologies.map((tech: string) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'background.default',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  {project.githubUrl && (
                    <Button
                      size="small"
                      startIcon={<GitHubIcon />}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Código
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      size="small"
                      startIcon={<LaunchIcon />}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demo
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
