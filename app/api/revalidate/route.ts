import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret } = body;

    // Təhlükəsizlik üçün secret yoxlaması (isteğe bağlı)
    if (secret && secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Gizli açar yanlışdır" },
        { status: 401 }
      );
    }

    // Path yoxlaması
    if (!path) {
      return NextResponse.json(
        { message: "Path parametri tələb olunur" },
        { status: 400 }
      );
    }

    // Səhifəni yenilə
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path: path,
      timestamp: new Date().toISOString(),
      message: "Səhifə uğurla yeniləndi"
    });

  } catch (error) {
    console.error("Revalidation xətası:", error);
    return NextResponse.json(
      { 
        revalidated: false, 
        error: "Revalidation uğursuz oldu",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET metodu - API istifadəsi haqqında məlumat
export async function GET() {
  return NextResponse.json({
    message: "ISR On-Demand Revalidation API",
    usage: {
      method: "POST",
      body: {
        path: "Yenilənəcək səhifənin yolu (məsələn: '/isr')",
        secret: "Təhlükəsizlik üçün gizli açar (isteğe bağlı)"
      }
    },
    example: {
      curl: "curl -X POST http://localhost:3000/api/revalidate -H 'Content-Type: application/json' -d '{\"path\":\"/isr\"}'"
    }
  });
}
