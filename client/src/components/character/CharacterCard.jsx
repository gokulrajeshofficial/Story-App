import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Stack,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon } from '@mui/icons-material';

const CharacterCard = ({ character, onEdit, onDelete, onSelect, isSelected }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        border: isSelected ? '2px solid' : '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: isSelected ? 3 : 1,
        },
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: -12,
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2,
          }}
        >
          <CheckIcon sx={{ color: 'white', fontSize: 16 }} />
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Checkbox
                checked={isSelected}
                onChange={() => onSelect(character)}
                color="primary"
                size="small"
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              />
              <Typography variant="h5" component="h2">
                {character.name}
              </Typography>
            </Box>
            {isSelected && (
              <Tooltip title="Selected Character">
                <Chip
                  icon={<CheckIcon />}
                  label="Active"
                  color="primary"
                  size="small"
                  variant="outlined"
                  sx={{ 
                    backgroundColor: 'primary.light',
                    '& .MuiChip-label': {
                      color: 'primary.contrastText',
                    },
                  }}
                />
              </Tooltip>
            )}
          </Box>

          <Typography variant="body1" color="text.secondary">
            {character.description}
          </Typography>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Traits:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {character.traits.map((trait, index) => (
                <Chip 
                  key={index} 
                  label={trait} 
                  size="small"
                  sx={{
                    backgroundColor: isSelected ? 'primary.light' : 'default',
                    color: isSelected ? 'primary.contrastText' : 'inherit',
                  }}
                />
              ))}
            </Box>
          </Box>

          {character.backstory && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Backstory:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {character.backstory}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>

      <CardActions>
        <Tooltip title="Edit Character">
          <IconButton
            onClick={() => onEdit(character)}
            size="small"
            color={isSelected ? "primary" : "default"}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Character">
          <IconButton
            onClick={() => onDelete(character._id)}
            size="small"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default CharacterCard; 