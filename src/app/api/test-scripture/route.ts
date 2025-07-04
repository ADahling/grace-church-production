import { getScriptureReferencesForTheme } from "@/lib/openscripture";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get("theme") || "peace";
    const language = searchParams.get("language") || "en";
    const liturgicalSeason = searchParams.get("season") || "Ordinary Time";

    const scriptureReferences = await getScriptureReferencesForTheme(
      theme,
      liturgicalSeason,
      language,
    );

    return NextResponse.json({
      success: true,
      theme,
      language,
      liturgicalSeason,
      scriptureReferences: scriptureReferences.slice(0, 5),
      totalFound: scriptureReferences.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error testing scripture database:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
