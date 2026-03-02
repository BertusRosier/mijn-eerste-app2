import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const idSchema = z.coerce.number().int().positive();

const patchSchema = z.object({
  done: z.boolean(),
});

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const todoId = idSchema.parse(id);

  const body = await request.json().catch(() => null);
  const data = patchSchema.parse(body);

  const updated = await prisma.todo.update({
    where: { id: todoId },
    data: { done: data.done },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { id } = await params;
  const todoId = idSchema.parse(id);

  try {
    await prisma.todo.delete({
      where: { id: todoId },
    });

    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}