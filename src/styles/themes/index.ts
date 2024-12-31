import { ThemeConfig } from '../../types/theme';

export const themes: Record<string, ThemeConfig> = {
  solar: {
    colors: {
      primary: '#FF6B35',
      secondary: '#F7C59F',
      background: '#FFFAF7',
      surface: '#FFFFFF',
      text: {
        primary: '#2A2A2A',
        secondary: '#666666'
      },
      accent: {
        primary: '#FF6B35',
        secondary: '#F7C59F'
      },
      status: {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
      }
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.1)',
      focus: '0 0 0 3px rgba(255,107,53,0.5)'
    }
  },
  midnight: {
    colors: {
      primary: '#6B66FF',
      secondary: '#4B4DDB',
      background: '#0A0B1E',
      surface: '#141537',
      text: {
        primary: '#F0F7FF',
        secondary: 'rgba(240,247,255,0.7)'
      },
      accent: {
        primary: '#00F0FF',
        secondary: '#B829F7'
      },
      status: {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
      }
    },
    shadows: {
      sm: '0 2px 4px rgba(0,240,255,0.1)',
      md: '0 4px 8px rgba(0,240,255,0.2)',
      lg: '0 8px 16px rgba(0,240,255,0.2)',
      focus: '0 0 0 3px rgba(0,240,255,0.5)'
    }
  },
  ocean: {
    colors: {
      primary: '#0288D1',
      secondary: '#03A9F4',
      background: '#F5F9FC',
      surface: '#FFFFFF',
      text: {
        primary: '#1A237E',
        secondary: '#455A64'
      },
      accent: {
        primary: '#00BCD4',
        secondary: '#4DD0E1'
      },
      status: {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
      }
    },
    shadows: {
      sm: '0 1px 3px rgba(2,136,209,0.1)',
      md: '0 4px 6px rgba(2,136,209,0.1)',
      lg: '0 8px 12px rgba(2,136,209,0.1)',
      focus: '0 0 0 3px rgba(2,136,209,0.5)'
    }
  },
  forest: {
    colors: {
      primary: '#2E7D32',
      secondary: '#4CAF50',
      background: '#F9FBF9',
      surface: '#FFFFFF',
      text: {
        primary: '#1B5E20',
        secondary: '#33691E'
      },
      accent: {
        primary: '#66BB6A',
        secondary: '#81C784'
      },
      status: {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
      }
    },
    shadows: {
      sm: '0 1px 3px rgba(46,125,50,0.1)',
      md: '0 4px 6px rgba(46,125,50,0.1)',
      lg: '0 8px 12px rgba(46,125,50,0.1)',
      focus: '0 0 0 3px rgba(46,125,50,0.5)'
    }
  }
};