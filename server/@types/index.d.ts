declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPRESS_APP_PORT: number;
      DATABASE_URL: string;
    }
  }
}

export {};
