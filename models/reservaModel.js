const pool = require("../models/db"); // Tu conexión a MySQL

async function crearReservaCompleta(data) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Insertar persona si no existe
    const [personaExistente] = await conn.query(
      "SELECT * FROM personas WHERE id_persona = ?",
      [data.titular.id]
    );
    if (personaExistente.length === 0) {
      await conn.query(
        `
        INSERT INTO personas (id_persona, tipo_id, razon_social, nombre1, fecha_nacimiento, ref_genero, nacionalidad)
        VALUES (?, 'C', ?, ?, CURDATE(), 'GENERO_MASCULINO', 1)
      `,
        [data.titular.id, data.titular.nombre, data.titular.nombre]
      );

      await conn.query(
        `
        INSERT INTO personas_det (id_persona, direccion, email, telefono)
        VALUES (?, 'Sin dirección', ?, ?)
      `,
        [data.titular.id, data.titular.email, data.titular.telefono]
      );
    }

    // Insertar solicitud
    await conn.query(
      `
      INSERT INTO solicitudes_alojamiento
      (num_solicitud, id_titular, fecha_check_in, fecha_check_out, noches, hora_estimada_llegada, total_pago, monto_pagado, estado, fecha_creacion)
      VALUES (?, ?, ?, ?, DATEDIFF(?, ?), ?, ?, ?, ?, NOW())
    `,
      [
        data.numReserva,
        data.titular.id,
        data.fecha,
        data.fecha_salida,
        data.fecha_salida,
        data.fecha,
        data.hora_estimada_llegada,
        data.totalPago,
        0,
        data.estado,
      ]
    );
    const cantidadPersonas = parseInt(data.cuposReservados) || 0;
    const precioNoche =
      cantidadPersonas > 0 ? data.totalPago / cantidadPersonas : 0;

    // Insertar detalle
    await conn.query(
      `
  INSERT INTO solicitudes_alojamiento_det
  (id_acomodacion, num_solicitud, cantidad_personas, precio_noche_actual, subtotal, notas, fecha_creacion)
  VALUES (?, ?, ?, ?, ?, ?, NOW())
  `,
      [
        data.id_acomodacion,
        data.numReserva,
        data.cuposReservados,
        precioNoche,
        data.totalPago,
        data.detalle || "sin nota",
      ]
    );

    await conn.commit();
    return { success: true, message: "Reserva creada correctamente" };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

module.exports = { crearReservaCompleta };
