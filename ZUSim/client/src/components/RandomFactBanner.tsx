import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { PensionFact } from '@shared/schema';

interface RandomFactBannerProps {
  facts: PensionFact[];
}

export default function RandomFactBanner({ facts }: RandomFactBannerProps) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const rotateFact = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
      setIsRotating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(rotateFact, 8000);
    return () => clearInterval(interval);
  }, [facts.length]);

  return (
    <Box
      sx={{
        bgcolor: 'rgb(63, 132, 210)',
        px: 4,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        minHeight: '80px'
      }}
      data-testid="banner-fact"
    >
      <Lightbulb size={24} color="white" />
      <Typography
        sx={{
          color: 'white',
          fontSize: '1rem',
          fontWeight: 500,
          flex: 1,
          textAlign: 'center',
          opacity: isRotating ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        data-testid="text-fact-content"
      >
        {facts[currentFactIndex]?.text}
      </Typography>
      <IconButton
        onClick={rotateFact}
        sx={{
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
        data-testid="button-refresh-fact"
      >
        <RefreshCw size={20} />
      </IconButton>
    </Box>
  );
}
