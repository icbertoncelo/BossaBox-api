import Tool from '../models/Tool';

class ToolController {
  async index(req, res) {
    return res.status(200).send();
  }

  async store(req, res) {
    const { id, title, link, description, tags } = await Tool.create(req.body);

    return res.json({
      id,
      title,
      link,
      description,
      tags,
    });
  }
}

export default new ToolController();
