import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const AUTH_CONFIG_KEY = 'auth';

export const AuthEnvSchema = {
  JWT_SECRET: Joi.string().required(),
};

export const AuthConfig = registerAs(AUTH_CONFIG_KEY, () => ({
  jwtSecret: process.env.JWT_SECRET,
}));
