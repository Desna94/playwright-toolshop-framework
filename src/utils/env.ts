function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  userEmail: getRequiredEnv("USER_EMAIL"),
  userPassword: getRequiredEnv("USER_PASSWORD"),
  apiBaseUrl: getRequiredEnv("API_BASE_URL"),
};
