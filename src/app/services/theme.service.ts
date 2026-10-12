import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly STORAGE_KEY = 'chat_app_theme';

  readonly currentTheme = signal<ThemeMode>('system');

  readonly isDark = computed(() => {
    const theme = this.currentTheme();
    if (theme === 'dark') return true;
    if (theme === 'light') return false;

    if (this.isBrowser && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  constructor() {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        this.currentTheme.set(savedTheme);
      } else {
        this.currentTheme.set('system');
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.currentTheme() === 'system') {
          this.applyTheme(this.isDark());
        }
      });

      this.applyTheme(this.isDark());

      effect(() => {
        const isDarkMode = this.isDark();
        this.applyTheme(isDarkMode);
      });
    }
  }

  setTheme(mode: ThemeMode) {
    this.currentTheme.set(mode);
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, mode);
    }
  }

  toggleTheme() {
    const nextMode: ThemeMode = this.isDark() ? 'light' : 'dark';
    this.setTheme(nextMode);
  }

  private applyTheme(dark: boolean) {
    if (!this.isBrowser) return;

    const root = document.documentElement;
    const body = document.body;
    if (dark) {
      root.classList.add('dark');
      body?.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      body?.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }
}
