import Sequelize, { Model } from 'sequelize';

class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        link: Sequelize.STRING,
        description: Sequelize.STRING,
        tags: {
          type: Sequelize.STRING,
          allowNull: false,
          get() {
            return this.getDataValue('tags').split(',');
          },
          set(val) {
            this.setDataValue('tags', val.join(','));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Tool;
