import { createClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: intentions, error } = await supabase
      .from('prayer_intentions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prayer intentions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch prayer intentions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ intentions });
  } catch (error) {
    console.error('Error in prayer intentions GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      priority,
      is_private,
      saint_intercession,
      tags
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const intention = {
      user_id: user.id,
      title: title.trim(),
      description: description?.trim() || null,
      category: category || 'spiritual_growth' as const,
      priority: priority || 'medium' as const,
      status: 'active' as const,
      is_private: is_private !== false, // Default to private
      saint_intercession: saint_intercession?.trim() || null,
      tags: tags || [],
      prayer_count: 0,
    };

    const { data, error } = await supabase
      .from('prayer_intentions')
      .insert(intention)
      .select()
      .single();

    if (error) {
      console.error('Error creating prayer intention:', error);
      return NextResponse.json(
        { error: 'Failed to create prayer intention' },
        { status: 500 }
      );
    }

    return NextResponse.json({ intention: data }, { status: 201 });
  } catch (error) {
    console.error('Error in prayer intentions POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, action, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Intention ID is required' },
        { status: 400 }
      );
    }

    let updateData: any = {
      updated_at: new Date().toISOString(),
      ...updates
    };

    // Handle specific actions
    if (action === 'pray') {
      // Increment prayer count and update last prayed time
      const { data: currentIntention } = await supabase
        .from('prayer_intentions')
        .select('prayer_count')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      updateData = {
        prayer_count: (currentIntention?.prayer_count || 0) + 1,
        last_prayed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    } else if (action === 'mark_answered') {
      updateData = {
        status: 'answered',
        answered_at: new Date().toISOString(),
        answer_description: updates.answer_description || '',
        updated_at: new Date().toISOString(),
      };
    }

    const { data, error } = await supabase
      .from('prayer_intentions')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating prayer intention:', error);
      return NextResponse.json(
        { error: 'Failed to update prayer intention' },
        { status: 500 }
      );
    }

    return NextResponse.json({ intention: data });
  } catch (error) {
    console.error('Error in prayer intentions PUT:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Intention ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('prayer_intentions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting prayer intention:', error);
      return NextResponse.json(
        { error: 'Failed to delete prayer intention' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in prayer intentions DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

