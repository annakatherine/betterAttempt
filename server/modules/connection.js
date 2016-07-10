var connectionString = 'postgres://localhost:5432/primerDB';

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/primerDB';
}

module.exports = connectionString;
