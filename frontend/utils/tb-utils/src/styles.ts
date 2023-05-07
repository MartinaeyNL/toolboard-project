import { css } from "lit";

export const globalStyle = css`
    :host {
      
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
      color: white;

      /* Very complex, totally not manually created, color palette. */
      --tb-color-background-50: rgb(75, 75, 85);
      --tb-color-background-100: rgb(70, 70, 80);
      --tb-color-background-200: rgb(65, 65, 75);
      --tb-color-background-300: rgb(60, 60, 70);
      --tb-color-background-400: rgb(55, 55, 65);
      --tb-color-background-500: rgb(50, 50, 60);
      --tb-color-background-600: rgb(45, 45, 55);
      --tb-color-background-700: rgb(40, 40, 50);
      --tb-color-background-800: rgb(35, 35, 45); /*original idea: #3C4043;*/
      --tb-color-background-900: rgb(30, 30, 40); /*original idea: #35363A;*/
      --tb-color-background-950: rgb(25, 25, 35); /*original idea: #202124;*/
      
      
      /* Icon sizes */
      --tb-icon-size-xl: 36px;
      --tb-icon-size-lg: 24px;
      --tb-icon-size-md: 16px;
      --tb-icon-size-sm: 12px;

      /* Font sizes */
      --tb-font-size-xl: 28px;
      --tb-font-size-lg: 22px;
      --tb-font-size-md: 18px;
      --tb-font-size-sm: 14px;
    }
    
    h1 {
      font-size: var(--tb-font-size-xl);
      font-weight: normal;
      margin: 0;
    }
    h2 {
      font-size: var(--tb-font-size-lg);
      font-weight: normal;
      margin: 0;
    } 
    h3 {
      font-size: var(--tb-font-size-md);
      font-weight: normal;
      margin: 0;
    }
    p {
      font-size: var(--tb-font-size-sm);
      font-weight: normal;
      margin: 0;
    }
    span {
      font-size: var(--tb-font-size-sm);
      font-weight: normal;
      margin: 0;
    }
`