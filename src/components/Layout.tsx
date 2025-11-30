import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import { Background3D } from './Background3D';
import { Footer } from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Background3D />
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        transition: 'opacity 0.4s ease-in-out',
                    }}
                >
                    {children}
                </Box>
                <Footer />
            </Box>
        </Box>
    );
};
