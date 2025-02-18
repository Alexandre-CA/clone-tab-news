import { Client, QueryResult } from 'pg'

async function query(queryObject: string | { text: string, values?: any[] }) {
    let result: QueryResult<any> = { rows: [] } as any
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
    })
    try {
        await client.connect()
        result = await client.query(queryObject)

    } catch (error) {
        console.error(error)
    } finally {
        await client.end()
    }
    return result

}

const database = {
    query
}

export default database