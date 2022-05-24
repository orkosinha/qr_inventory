import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
};

function Iconify({ icon, sx, ...other }) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

function AppWidgetSummary({ title, total, icon, color = 'primary', sx, variant = 'h3', ...other }) {
  return (
    <Paper elevation={5}>
        <Card
        sx={{
          py: 5,
          boxShadow: 0,
          textAlign: 'center',
          color: (theme) => theme.palette[color].darker,
          bgcolor: (theme) => theme.palette[color].lighter,
          ...sx,
        }}
        {...other}
      >
        <IconWrapperStyle
          sx={{
            color: (theme) => theme.palette[color].dark,
          }}
        >
          <Iconify icon={icon} width={48} height={48} />
        </IconWrapperStyle>

        <Typography variant={variant}>{total}</Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {title}
        </Typography>
      </Card>
    </Paper>
    
  );
}

export default AppWidgetSummary;