import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

    PORT: get('PORT').default(3100).asPortNumber(),
    // POSTGRES_URL: get('POSTGRES_URL').required().asString(),
    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),
    POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
    POSTGRES_HOST: get('POSTGRES_HOST').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),

    // WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),

    // STRIPE_PUBLIC_KEY: get('STRIPE_PUBLIC_KEY').required().asString(),
    // STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),

}
