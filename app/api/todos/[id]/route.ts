import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { id } = await context.params;

    if (!id) return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });

    const { data, error } = await supabase.from('todos').select('*').eq('id', id).single();

    if (error) return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const body = await req.json();
    const { id } = await context.params;
    const { title, description, completed } = body;

    if (!id) return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });

    const { data, error } = await supabase
        .from('todos')
        .update({ title, description, completed })
        .eq('id', id)
        .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const supabase = await createClient();

    const todoId = Number(id);

    if (!Number.isInteger(todoId)) {
        return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", todoId);

    if (error) {
        console.error(error);
        return Response.json({ error: error.message }, { status: 500 });
    }

    return new Response(null, { status: 204 });
}
