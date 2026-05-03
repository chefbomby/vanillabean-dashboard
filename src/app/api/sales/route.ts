import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("loyverse_access_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "ยังไม่ได้ login" }, { status: 401 });
  }

  const range = request.nextUrl.searchParams.get("range") || "today";

  const now = new Date();
  const start = new Date();

  if (range === "today") {
    start.setHours(0, 0, 0, 0);
  }

  if (range === "7days") {
    start.setDate(now.getDate() - 7);
    start.setHours(0, 0, 0, 0);
  }

  if (range === "month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }

  const url = new URL("https://api.loyverse.com/v1.0/receipts");
  url.searchParams.set("created_at_min", start.toISOString());
  url.searchParams.set("created_at_max", now.toISOString());

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "ดึงข้อมูลไม่สำเร็จ", detail: data },
      { status: 400 }
    );
  }

  const receipts = data.receipts || [];

  const byStore: Record<string, any> = {};

  receipts.forEach((r: any) => {
    const store = r.store_name || "ไม่ระบุสาขา";

    if (!byStore[store]) {
      byStore[store] = {
        name: store,
        sales: 0,
        receipts: 0,
        tax: 0,
      };
    }

    const taxTotal = (r.taxes || []).reduce(
      (sum: number, t: any) => sum + Number(t.money_amount || 0),
      0
    );

    byStore[store].sales += Number(r.total_money || 0);
    byStore[store].receipts += 1;
    byStore[store].tax += taxTotal;
  });

  return NextResponse.json({
    stores: Object.values(byStore),
  });
}