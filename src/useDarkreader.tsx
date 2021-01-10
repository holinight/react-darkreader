import { useState, useEffect } from 'react';
import { useUnmount } from 'ahooks';
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
  setFetchMethod,
} from 'darkreader';
import { getTargetElement, BasicTarget } from './dom';

export type Options = {
  brightness?: number;
  contrast?: number;
  sepia?: number;
  target?: BasicTarget;
};

const defaultOptions = {
  brightness: 100,
  contrast: 90,
  sepia: 10,
  target: document.body,
};

export default function useDarkreader(
  defaultDarken: boolean = false,
  { brightness, contrast, sepia }: Options = defaultOptions,
): [boolean, () => void, () => Promise<string>] {
  const [isDark, setIsDark] = useState(defaultDarken);

  useEffect(() => {
    setFetchMethod(window.fetch);

    isDark
      ? enableDarkMode({
          brightness,
          contrast,
          sepia,
        })
      : disableDarkMode();

    // followSystemColorScheme();
  }, [isDark]);

  useUnmount(() => {
    disableDarkMode();
  });

  return [isDark, () => setIsDark(prevState => !prevState), collectCSS];
}
