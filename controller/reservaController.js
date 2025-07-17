const reservaService = require('../services/reservaService');

async function crear(req, res) {
  try {
    const resultado = await reservaService.registrarReserva(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Error al registrar reserva:', err);
    res.status(500).json({ error: 'Error interno al registrar la reserva' });
  }
}

module.exports = { crear };
