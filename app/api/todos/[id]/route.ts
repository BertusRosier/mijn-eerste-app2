import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";


const idSchema = z.coerce.number().int().positive();
const patchSchema = z.object({
  done: z.boolean(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // jouw bestaande logica hier

  return NextResponse.json({ success: true });
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