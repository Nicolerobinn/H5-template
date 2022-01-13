const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const ProcessNode = JSON.stringify(process.env.NODE_ENV);
const ProcessApi = JSON.stringify(process.env.API_ENV) || JSON.stringify(process.env.NODE_ENV);

module.exports = {
  isDevelopment,
  isProduction,
  NODE_ENV: ProcessNode,
  API_ENV: ProcessApi
};
