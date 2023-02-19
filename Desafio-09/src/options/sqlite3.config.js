const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './src/db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

export default sqliteOptions;