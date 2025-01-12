import { AppRoutes } from "./presentation/routes";
import { envs } from "./config";
import { postgresDBInstance } from "./data/postgres/postgres-instance/postgres.instance";
import { Server } from "./presentation/server";


(() => {
    main();
})()


async function main() {

    await postgresDBInstance.connect();

    // await PostgresDatabase.({
    //     database: envs.POSTGRES_DB,
    //     username: envs.POSTGRES_USER,
    //     password: envs.POSTGRES_PASSWORD,
    //     host: envs.POSTGRES_HOST,
    // });

    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
    .start();
}
