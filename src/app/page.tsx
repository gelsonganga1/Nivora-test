
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { Task } from '@/types/task';

export default async function HomePage() {
  const res = await fetch('http://localhost:3000/api/tasks', {
    cache: 'no-store', 
  });
  const tasks: Task[] = await res.json();

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="  justify-center text-center text-3xl font-bold mb-4 mt-6 ">Nivora List</h1>

      <TaskForm />

      <div className="mt-6 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-gray-500 text-center mt-24">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </main>
  );
}
