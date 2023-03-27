"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUser1679686038587 = void 0;
var _typeorm = require("typeorm");
class CreateUser1679686038587 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }), true);
  }
  async down(queryRunner) {
    await queryRunner.dropTable('user');
  }
}
exports.CreateUser1679686038587 = CreateUser1679686038587;