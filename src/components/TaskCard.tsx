'use client';

import { Task } from '@/types/task';
import { useTransition } from 'react';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = async () => {
    startTransition(async () => {
      await fetch('/api/tasks', {
        method: 'PATCH',
        body: JSON.stringify({ id: task.id, completed: !task.completed }),
      });
      window.location.reload();
    });
  };

  const handleDelete = async () => {
    startTransition(async () => {
      await fetch(`/api/tasks?id=${task.id}`, {
        method: 'DELETE',
      });
      window.location.reload();
    });
  };

  return (
    <div className="p-4 rounded border bg-white text-gray-800 shadow flex flex-col sm:flex-row justify-between gap-4 sm:items-start">
      <div className="flex-1">
        <h2 className={`font-bold text-lg break-words ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h2>
        <p className={`text-sm break-words ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.description}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Status: {task.completed ? 'Concluída' : 'Pendente'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleComplete}
          disabled={isPending}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {task.completed ? 'Desfazer' : 'Concluir'}
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
