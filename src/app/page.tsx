"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stores, setStores] = useState<any[]>([]);
  const [range, setRange] = useState("today");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/sales?range=${range}`);
      const data = await res.json();
      setStores(data.stores || []);
      setLoading(false);
    }

    load();
  }, [range]);

  const totalSales = stores.reduce((sum, s) => sum + s.sales, 0);
  const totalReceipts = stores.reduce((sum, s) => sum + s.receipts, 0);
  const totalTax = stores.reduce((sum, s) => sum + s.tax, 0);

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      <header className="bg-[#6B4F3B] text-white px-6 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Vanillabean Dashboard</h1>
          <p className="text-sm opacity-80">ระบบรายงานยอดขายแฟรนไชส์</p>
        </div>

        <a
          href="/api/auth/loyverse"
          className="bg-white text-[#6B4F3B] px-4 py-2 rounded-xl font-bold"
        >
          เชื่อมต่อใหม่
        </a>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#6B4F3B]">
            ภาพรวมธุรกิจ
          </h2>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-white rounded-xl px-4 py-3 shadow"
          >
            <option value="today">วันนี้</option>
            <option value="7days">7 วันที่ผ่านมา</option>
            <option value="month">เดือนนี้</option>
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-8 shadow text-center">
            กำลังโหลดข้อมูล...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card title="ยอดขายรวม" value={`฿${totalSales.toLocaleString()}`} />
              <Card title="จำนวนบิลรวม" value={`${totalReceipts.toLocaleString()} บิล`} />
              <Card title="ภาษีรวม" value={`฿${totalTax.toLocaleString()}`} />
            </div>

            <div className="bg-white rounded-3xl shadow p-6 mb-6">
              <h3 className="text-xl font-bold text-[#6B4F3B] mb-4">
                กราฟยอดขายแยกตามสาขา
              </h3>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stores}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#6B4F3B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stores.map((s, i) => (
                <div key={i} className="bg-white rounded-3xl shadow p-6">
                  <h3 className="text-xl font-bold text-[#6B4F3B] mb-4">
                    {s.name}
                  </h3>
                  <p>ยอดขาย: ฿{s.sales.toLocaleString()}</p>
                  <p>จำนวนบิล: {s.receipts.toLocaleString()} บิล</p>
                  <p>ภาษี: ฿{s.tax.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">
      <p className="text-gray-500 mb-2">{title}</p>
      <p className="text-3xl font-bold text-[#6B4F3B]">{value}</p>
    </div>
  );
}
