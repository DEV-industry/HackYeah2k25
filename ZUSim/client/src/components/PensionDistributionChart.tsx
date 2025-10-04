import { Box, Typography, Paper, Tooltip } from '@mui/material';
import { PensionGroup } from '@shared/schema';

interface PensionDistributionChartProps {
  groups: PensionGroup[];
}

export default function PensionDistributionChart({ groups }: PensionDistributionChartProps) {
  const maxAmount = Math.max(...groups.map(g => g.amount));

  return (
    <Box sx={{ px: 4, py: 3, height: '100%' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 700, 
          mb: 3,
          color: 'rgb(0, 65, 110)',
          textAlign: 'center'
        }}
        data-testid="text-chart-title"
      >
        Rozkład emerytur w Polsce
      </Typography>
      
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'flex-end', 
          justifyContent: 'space-around',
          height: 'calc(100% - 60px)',
          pb: 2
        }}
      >
        {groups.map((group, index) => {
          const heightPercentage = (group.amount / maxAmount) * 100;
          
          return (
            <Tooltip
              key={index}
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    {group.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Średnia: {group.amount.toLocaleString('pl-PL')} zł
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    {group.description}
                  </Typography>
                </Box>
              }
              placement="top"
              arrow
              data-testid={`tooltip-group-${index}`}
            >
              <Box
                sx={{
                  flex: 1,
                  maxWidth: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
                data-testid={`bar-group-${index}`}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: `${heightPercentage}%`,
                    bgcolor: group.color,
                    borderRadius: '4px 4px 0 0',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    pt: 1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    {group.amount.toLocaleString('pl-PL')} zł
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'rgb(0, 65, 110)',
                    textAlign: 'center',
                    lineHeight: 1.2
                  }}
                  data-testid={`text-group-name-${index}`}
                >
                  {group.name}
                </Typography>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
