import Organizacion from '../models/organization';

export const exiteOrganizacionPorId = async (id: number) => {
  const organizacion = await Organizacion.findOne({ where: { id_organizacion: id, status: 1 } });
  if (!organizacion) {
    throw new Error(`El id no existe ${id}`);
  }
}



