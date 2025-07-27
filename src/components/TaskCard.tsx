// src/components/TaskCard.tsx
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
    <div className="p-4 rounded border bg-white text-gray-800 shadow flex justify-between items-start">
  <div>
    <h2 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
      {task.title}
    </h2>
    <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
      {task.description}
    </p>
    <p className="text-xs text-gray-500 mt-1">
      Status: {task.completed ? 'Concluída' : 'Pendente'}
    </p>
  </div>
  <div className="flex gap-2">
    <button
      onClick={handleComplete}
      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {task.completed ? 'Desfazer' : 'Concluir'}
    </button>
    <button
      onClick={handleDelete}
      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
    >
      Remover
    </button>
  </div>
</div>

  );
}