import { useState, FC } from 'react';
import type { TodoInput } from '../todo.entity';

type Props = {
  onSubmit: (input: TodoInput) => void;
};

export const TodoForm: FC<Props> = ({ onSubmit }) => {
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: '',
    body: '',
  });

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodoInput({
      ...todoInput,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      onSubmit(todoInput);
      setTodoInput({
        title: '',
        body: '',
      });
      // input:textにあたっているフォーカスを解除
      // エンターキーでTodoを追加したときの対処
      const activeElement = document.activeElement;
      if (!activeElement) return;
      (activeElement as HTMLInputElement).blur();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} method="post">
      <div>
        <label>
          タイトル :{' '}
          <input
            onChange={onChangeHandler}
            type="text"
            name="title"
            value={todoInput.title}
          />
        </label>
      </div>
      <div>
        <label>
          本文 :{' '}
          <input
            onChange={onChangeHandler}
            type="text"
            name="body"
            value={todoInput.body}
          />
        </label>
      </div>
      <div>
        <input type="submit" value="作成" />
      </div>
    </form>
  );
};

export default TodoForm;
