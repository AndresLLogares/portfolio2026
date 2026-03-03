import { type ReactNode, useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

export const AnimatedSection = ({ children, delay = 0 }: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [children]);

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Box>
  );
};
