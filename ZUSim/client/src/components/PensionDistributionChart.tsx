import { Box, Typography, Tooltip } from '@mui/material';
import { PensionGroup } from '@shared/schema';
import watermark from '../components/logo-zus.png'; // 🔹 import obrazu

interface PensionDistributionChartProps {
  groups: PensionGroup[];
}

export default function PensionDistributionChart({ groups }: PensionDistributionChartProps) {
  const maxAmount = Math.max(...groups.map(g => g.amount));

  return (
    <Box
      sx={{
        position: 'relative',
        px: 4,
        py: 3,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* 🔹 Watermark w tle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '70%',
          height: '70%',
          backgroundImage: `url(${watermark})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.08,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 🔹 Cała zawartość (tekst + kolumny) */}
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: 'rgb(0, 65, 110)',
            textAlign: 'center',
          }}
        >
          Rozkład emerytur w Polsce
        </Typography>

        {/* 🔹 Sekcja z kolumnami */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            gap: 2,
            pb: 2,
          }}
        >
          {groups.map((group, index) => {
            const heightPercentage = (group.amount / maxAmount) * 120;

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
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: `${heightPercentage}px`,
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
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
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
                      lineHeight: 1.2,
                    }}
                  >
                    {group.name}
                  </Typography>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
