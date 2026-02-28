import { z } from "zod";
import { prisma } from "@/lib/prisma";

const todoSchema = z.object({
  title: z.string().min(1).max(200),
});

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(todos, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = todoSchema.parse(body);

    const todo = await prisma.todo.create({
      data: { title: parsed.title },
    });

    return Response.json(todo, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }
}