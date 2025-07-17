const express = require("express");
const router = express.Router();
const reservaController = require("../controller/reservaController");

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crea una nueva reserva de alojamiento
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numReserva:
 *                 type: string
 *               titular:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *               detalle:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               fecha_salida:
 *                 type: string
 *                 format: date
 *               hora_estimada_llegada:
 *                 type: string
 *               cuposReservados:
 *                 type: integer
 *               totalPago:
 *                 type: number
 *               estado:
 *                 type: string
 *               id_acomodacion:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post("/reservas", reservaController.crear);

module.exports = router;
