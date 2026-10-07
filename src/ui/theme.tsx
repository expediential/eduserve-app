import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
export const palette = { light: { bg: '#F6F8FC', surface: '#FFFFFF', elevated: '#EFF3FA', text: '#172033', muted: '#69758A', border: '#E2E7F0', accent: '#315EEC', accentSoft: '#E9EEFF', positive: '#177B58', warning: '#A96200', danger: '#BF3A4B' }, dark: { bg: '#10141D', surface: '#181F2B', elevated: '#222B3A', text: '#F3F6FC', muted: '#A4AEC0', border: '#2B3546', accent: '#9AAFFF', accentSoft: '#25365E', positive: '#58C89E', warning: '#FFB860', danger: '#FF8E9A' } };
export type ThemePreference = 'system' | 'light' | 'dark';
type Theme = { scheme: 'light' | 'dark'; preference: ThemePreference; colors: typeof palette.light; toggle: () => void; setPreference: (preference: ThemePreference) => void };
const ThemeContext = createContext<Theme | null>(null);
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>('system');
  const scheme: 'light' | 'dark' = (preference === 'system' ? system : preference) === 'dark' ? 'dark' : 'light';
  const value = useMemo<Theme>(() => ({
    scheme,
    preference,
    colors: palette[scheme],
    toggle: () => setPreference(scheme === 'dark' ? 'light' : 'dark'),
    setPreference,
  }), [preference, scheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const value = useContext(ThemeContext); if (!value) throw new Error('ThemeProvider is required'); return value; }
