
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

let tasks: Task[] = [];


export async function GET() {
  return NextResponse.json(tasks);
}


export async function POST(req: Request) {
  const body = await req.json();

  const newTask: Task = {
    id: uuidv4(),
    title: body.title,
    description: body.description,
    completed: false,
  };

  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, completed, title, description } = body;

  const task = tasks.find((t) => t.id === id);
  if (!task) return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });

  if (typeof completed === 'boolean') task.completed = completed;
  if (title) task.title = title;
  if (description) task.description = description;

  return NextResponse.json(task);
}

// DELETE: Remover tarefa
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });

  tasks = tasks.filter((t) => t.id !== id);

  return NextResponse.json({ message: 'Tarefa removida com sucesso' });
}
