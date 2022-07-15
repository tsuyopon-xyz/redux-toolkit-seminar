import { TodoEntity, TodoInput, TodoId } from './todo.entity';
import { getCurrentDateTime } from '@/src/utils/date';

export class TodoCollection {
  private _entities: TodoEntity[] = [];

  add(input: TodoInput) {
    const entity = new TodoEntity(input);
    this._entities.push(entity);
  }

  findById(id: TodoId): TodoEntity | undefined {
    const entity = this._entities.find((_entity) => _entity.id === id);
    if (!entity) return;
    if (entity.deleteAt) return;

    return new TodoEntity({
      id: entity.id,
      title: entity.title,
      body: entity.body,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deleteAt,
    });
  }

  findAll(): TodoEntity[] {
    return this._entities.filter((_entity) => _entity.deleteAt === undefined);
  }

  updateById(id: TodoId, input: Partial<TodoInput>): TodoEntity | undefined {
    const index = this._entities.findIndex((_entity) => _entity.id === id);

    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#%E8%BF%94%E5%80%A4
    if (index === -1) return;

    const entity = this._entities[index];
    const updatedEntity = new TodoEntity({
      ...entity,
      title: input.title || entity.title,
      body: input.body || entity.body,
      status: input.status || entity.status,
      updatedAt: getCurrentDateTime(),
    });
    this._entities[index] = updatedEntity;

    // 外部からthis._entitiesの値変更を行わせないようにするためにコピーを返す
    return new TodoEntity({ ...updatedEntity });
  }

  removeById(id: TodoId): TodoEntity | undefined {
    const index = this._entities.findIndex((_entity) => _entity.id === id);

    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#%E8%BF%94%E5%80%A4
    if (index === -1) return;

    const entity = this._entities[index];

    // 既に論理削除されている場合は処理を中断する
    if (entity.deleteAt) return;

    const deletedEntity = new TodoEntity({
      ...entity,
      deletedAt: getCurrentDateTime(),
    });
    this._entities[index] = deletedEntity;

    // 外部からthis._entitiesの値変更を行わせないようにするためにコピーを返す
    return new TodoEntity({ ...deletedEntity });
  }
}
