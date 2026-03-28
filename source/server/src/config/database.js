import { env } from './env.js';

let mysqlModulePromise = null;
let poolPromise = null;

/**
 * Lazy-load `mysql2` để project vẫn parse được code ngay cả khi dependency chưa được cài.
 */
async function loadMysqlModule() {
  if (!mysqlModulePromise) {
    mysqlModulePromise = import('mysql2/promise');
  }

  try {
    return await mysqlModulePromise;
  } catch (error) {
    if (error?.code === 'ERR_MODULE_NOT_FOUND' && String(error.message || '').includes('mysql2')) {
      const dependencyError = new Error(
        'Chưa tìm thấy dependency "mysql2". Hãy chạy "npm install mysql2" trong thư mục source để backend kết nối MySQL.',
      );
      dependencyError.cause = error;
      throw dependencyError;
    }

    throw error;
  }
}

/**
 * Tạo pool duy nhất cho toàn bộ backend, dùng chung cho mọi model query SQL.
 */
async function createPool() {
  const mysqlModule = await loadMysqlModule();
  const mysql = mysqlModule.default;

  return mysql.createPool({
    charset: 'utf8mb4',
    database: env.dbName,
    dateStrings: true,
    decimalNumbers: true,
    host: env.dbHost,
    namedPlaceholders: false,
    password: env.dbPassword,
    port: env.dbPort,
    user: env.dbUser,
    waitForConnections: true,
  });
}

/**
 * Trả về pool singleton để tránh tạo nhiều kết nối MySQL không cần thiết.
 */
export async function getPool() {
  if (!poolPromise) {
    poolPromise = createPool();
  }

  return poolPromise;
}

/**
 * Nếu đang nằm trong transaction thì ưu tiên dùng connection hiện tại,
 * nếu không thì query sẽ đi qua pool mặc định.
 */
async function getExecutor(connection) {
  if (connection) {
    return connection;
  }

  return getPool();
}

/**
 * Chạy `SELECT` và trả về mảng rows đã được `mysql2` parse.
 */
export async function select(sql, params = [], connection = null) {
  const executor = await getExecutor(connection);
  const [rows] = await executor.execute(sql, params);
  return rows;
}

/**
 * Chạy `INSERT/UPDATE/DELETE` và trả về result object của MySQL.
 */
export async function execute(sql, params = [], connection = null) {
  const executor = await getExecutor(connection);
  const [result] = await executor.execute(sql, params);
  return result;
}

/**
 * Gom một nhóm thao tác DB vào cùng transaction để booking/payment không bị lệch trạng thái.
 */
export async function withTransaction(handler) {
  const pool = await getPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await handler(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
