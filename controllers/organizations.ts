import { Request, Response } from 'express';
import Organizacion from '../models/organization';

export const getOrganizations = async (req: Request, res: Response) => {
  const organizations = await Organizacion.findAll({ where: { status: 1 } });
  res.json({ organizations });
};

export const getOrganization = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organization = await Organizacion.findOne({
    where: { id_organizacion: id, status: 1 },
  });
  if (organization) {
    res.json(organization);
  } else {
    res.status(404).json({
      msg: `No existe una organización con el id ${id}`,
    });
  }
};

export const postOrganizacion = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const existeNombre = await Organizacion.findOne({
      where: {
        name: body.name,
      },
    });

    if (existeNombre) {
      return res.status(400).json({
        msg: 'Ya existe una organización con el nombre ' + body.name,
      });
    }
    const organizacion = Organizacion.build(body);
    await organizacion.save();
    res.json(organizacion);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

export const putOrganizacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const organizacion = await Organizacion.findOne({
      where: { id_organizacion: id, status: 1 },
    });
    if (!organizacion) {
      return res.status(404).json({
        msg: 'No existe una organización con el id ' + id,
      });
    }
    await organizacion.update(body);
    res.json(organizacion);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

export const deleteOrganizacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const organizacion = await Organizacion.findByPk(id);
  if (!organizacion) {
    return res.status(404).json({
      msg: 'No existe una organización con el id ' + id,
    });
  }

  await organizacion.update({ status: 0 });
  res.json(organizacion);
};
