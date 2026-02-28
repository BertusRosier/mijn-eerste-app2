import { z } from "zod";
import { prisma } from "../../../../lib/prisma";

const idSchema = z.coerce.number().int().positive();
const patchSchema = z.object({
  done: z.boolean(),
});

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const id = idSchema.parse(context.params.id);

  const body = await req.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const updated = await prisma.todo.update({
      where: { id },
      data: { done: parsed.data.done },
    });

    return Response.json(updated, { status: 200 });
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  const id = idSchema.parse(context.params.id);

  try {
    await prisma.todo.delete({
      where: { id },
    });

    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}