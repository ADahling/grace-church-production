import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Parse request body
    const feedback = await request.json();
    
    // Validate required fields
    if (!feedback.name || !feedback.email || !feedback.cellPhone || !feedback.message || !feedback.rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Insert feedback into database
    const { data, error } = await supabase
      .from('beta_feedback')
      .insert([
        {
          name: feedback.name,
          email: feedback.email,
          cell_phone: feedback.cellPhone,
          feedback_type: feedback.feedbackType || 'general',
          rating: feedback.rating,
          message: feedback.message,
          current_page: feedback.currentPage,
          user_agent: feedback.userAgent,
          follow_up_requested: feedback.followUpRequested || false,
          priority: feedback.priority || 'medium',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save feedback' },
        { status: 500, headers: corsHeaders }
      );
    }

    // Send notification email (optional - implement if needed)
    // await sendFeedbackNotification(feedback);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Feedback submitted successfully',
        id: data.id 
      },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const url = new URL(request.url);
    const statsOnly = url.searchParams.get('stats') === 'true';

    if (statsOnly) {
      // Get feedback statistics
      const { data: feedbackData, error } = await supabase
        .from('beta_feedback')
        .select('rating, feedback_type, created_at');

      if (error) {
        throw error;
      }

      const totalFeedback = feedbackData.length;
      const averageRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / totalFeedback;
      
      const feedbackByType = feedbackData.reduce((acc, item) => {
        acc[item.feedback_type] = (acc[item.feedback_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Get recent feedback (last 10)
      const { data: recentFeedback } = await supabase
        .from('beta_feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      return NextResponse.json(
        {
          totalFeedback,
          averageRating: Math.round(averageRating * 100) / 100,
          feedbackByType,
          recentFeedback: recentFeedback || [],
        },
        { headers: corsHeaders }
      );
    }

    // Get all feedback (admin only - add authentication if needed)
    const { data: allFeedback, error } = await supabase
      .from('beta_feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { feedback: allFeedback },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500, headers: corsHeaders }
    );
  }
}

