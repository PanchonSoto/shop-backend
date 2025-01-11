import { Sequelize }  from 'sequelize';


interface Options {
    database: string;
    username: string;
    password: string;
    host: string;
    port?: number;
}


export class PostgresDatabase {

    private sequelize: Sequelize;


    constructor(options: Options){

        const { database, username, password, host, port = 5432 } = options;

        this.sequelize = new Sequelize(database, username, password, {
            host: host,
            port: port,
            dialect: 'postgres',
        });

    }

    async connect(): Promise<void> {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');

        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }


    async close(): Promise<void> {
        try {
            await this.sequelize.close();
            console.log('Connection has been established successfully.');

        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }

    getSequelize(): Sequelize {
        return this.sequelize;
    }

    // static async connect(options: Options) {

    //     const { database, username, password, host, port = 5432 } = options;

    //     const sequelize = new Sequelize(database, username, password, {
    //         host: host,
    //         port: port,
    //         dialect: 'postgres',
    //     });

    //     try {

    //         await sequelize.authenticate();
    //         console.log('Connection has been established successfully.');

    //     } catch (error) {

    //         console.error('Unable to connect to the database:', error);
    //         throw error;

    //     }

    // }

}
