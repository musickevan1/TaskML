export type Theme = 'solar' | 'midnight' | 'ocean' | 'forest';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
    accent: {
      primary: string;
      secondary: string;
    };
    status: {
      success: string;
      error: string;
      warning: string;
      info: string;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    focus: string;
  };
}