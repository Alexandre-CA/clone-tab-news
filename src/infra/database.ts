import { Client } from 'pg'

async function query(queryObject: string | { text: string, values?: object[] }) {
    let result = { rows: [] }
    let client;
    try {
        client = await getNewClient()

        result = await client.query(queryObject)

    } catch (error) {
        console.error(error)
    } finally {
        await client?.end()
    }
    return result

}

async function getNewClient() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl: process.env.NODE_ENV == "production" ? true : false

    })
    await client.connect()
    return client
}


const database = {
    query,
    getNewClient
}

export default database