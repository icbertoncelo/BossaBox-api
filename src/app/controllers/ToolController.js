import * as Yup from 'yup';
import { Op } from 'sequelize';
import Tool from '../models/Tool';

class ToolController {
  async index(req, res) {
    const { tag } = req.query;
    let tools;

    if (tag) {
      tools = await Tool.findAll({
        where: {
          tags: {
            [Op.like]: `%${tag}%`,
          },
        },
        attributes: ['id', 'title', 'link', 'description', 'tags'],
      });
    } else {
      tools = await Tool.findAll({
        attributes: ['id', 'title', 'link', 'description', 'tags'],
      });
    }

    return res.json(tools);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, link, description, tags } = await Tool.create(req.body);

    return res.json({
      id,
      title,
      link,
      description,
      tags,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const checkTool = await Tool.findByPk(id);

    if (!checkTool) {
      return res.status(400).json({ error: 'Tool is not exist' });
    }

    await Tool.destroy({ where: { id } });

    return res.status(204).send();
  }
}

export default new ToolController();
