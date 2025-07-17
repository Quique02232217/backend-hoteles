const reservaModel = require('../models/reservaModel');

async function registrarReserva(data) {
  return await reservaModel.crearReservaCompleta(data);
}

module.exports = { registrarReserva };
