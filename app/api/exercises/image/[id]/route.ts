import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { searchParams } = new URL(request.url);
  const resolution = searchParams.get('res') || '180';

  const { id } = await params;
  const res = await fetch(
    `https://exercisedb.p.rapidapi.com/image?resolution=${resolution}&exerciseId=${id}`,
    {
      headers: {
        'X-RapidAPI-Key': process.env.EXERCISES_API_KEY!,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error('RapidAPI Error:', res.status, errorText);

    return new NextResponse(`API Error: ${res.status}`, { status: res.status });
  }

  const imageBlob = await res.blob();

  return new NextResponse(imageBlob, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
