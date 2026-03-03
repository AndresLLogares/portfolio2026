import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import { Background3D } from './Background3D';
import { Footer } from './Footer';

interface LayoutProps {
    children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'transparent' }}>
            <Background3D />

            {/* Overlay oscuro para mejorar contraste de botones */}
            <Box sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), radial-gradient(circle at 15% 50%, rgba(0,0,0,0.3) 0%, transparent 40%)',
                backdropFilter: 'blur(2px)',
            }} />


            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Box component="main" sx={{ flex: 1 }}>
                    {children}
                </Box>
                <Footer />
            </Box>
        </Box>
    );
};
