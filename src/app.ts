import { AppRoutes } from "./presentation/routes";
import { envs } from "./config";
import { PostgresDatabase } from "./data/postgres/postgres-database";
import { Server } from "./presentation/server";


(()=>{
    main();
})()


async function main() {


    const db = new PostgresDatabase({
        database: envs.POSTGRES_DB,
        username: envs.POSTGRES_USER,
        password: envs.POSTGRES_PASSWORD,
        host: envs.POSTGRES_HOST,
    });

    await db.connect();

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
