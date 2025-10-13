import { NextResponse } from 'next/server';

/**
 * Diagnostic endpoint to check API configuration
 * Remove this file in production!
 */
export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {
      openrouterApiKey: {
        configured: !!process.env.OPENROUTER_API_KEY,
        length: process.env.OPENROUTER_API_KEY?.length || 0,
        preview: process.env.OPENROUTER_API_KEY 
          ? `${process.env.OPENROUTER_API_KEY.slice(0, 8)}...${process.env.OPENROUTER_API_KEY.slice(-4)}`
          : 'NOT SET'
      },
      supabaseUrl: {
        configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        value: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'
      },
      supabaseAnonKey: {
        configured: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      },
      siteUrl: {
        configured: !!process.env.NEXT_PUBLIC_SITE_URL,
        value: process.env.NEXT_PUBLIC_SITE_URL || 'NOT SET (defaulting to localhost)'
      }
    },
    recommendations: [] as string[]
  };

  // Add recommendations based on checks
  if (!diagnostics.checks.openrouterApiKey.configured) {
    diagnostics.recommendations.push('❌ CRITICAL: Set OPENROUTER_API_KEY in Vercel environment variables');
  }
  
  if (!diagnostics.checks.supabaseUrl.configured) {
    diagnostics.recommendations.push('⚠️ WARNING: Set NEXT_PUBLIC_SUPABASE_URL');
  }
  
  if (!diagnostics.checks.supabaseAnonKey.configured) {
    diagnostics.recommendations.push('⚠️ WARNING: Set NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (diagnostics.recommendations.length === 0) {
    diagnostics.recommendations.push('✅ All environment variables are configured!');
  }

  return NextResponse.json(diagnostics, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    }
  });
}
