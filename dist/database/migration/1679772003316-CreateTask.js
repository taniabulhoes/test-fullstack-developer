"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTask1679718259548 = void 0;
var _typeorm = require("typeorm");
class CreateTask1679718259548 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'task',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'completed',
        type: 'boolean',
        default: false
      }, {
        name: 'title',
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
    }));
    await queryRunner.createForeignKey('task', new _typeorm.TableForeignKey({
      name: 'TaskFK',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('task', 'TaskFK');
    await queryRunner.dropTable('task');
  }
}
exports.CreateTask1679718259548 = CreateTask1679718259548;