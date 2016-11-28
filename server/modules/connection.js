var connectionString = 'postgres://localhost:5432/primerDB';

if(process.env.DATABASE_URL !== undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
  console.log('fuck prime');
    connectionString =
    'postgres://pzycofpzsxekhq:U8BIrxQyWUoagknLPqmYgSs4_5@ec2-54-243-200-159.compute-1.amazonaws.com:5432/d5eo9mo48rhsrt';
    // 'postgres://localhost:5432/primerDB';
}

module.exports = connectionString;
