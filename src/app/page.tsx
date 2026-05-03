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
      const res = await fetch(`/api/sales?range=${range}`);
      const data = await res.json();
      setStores(data.stores || []);
      setLoading(false);
    }

    load();

    const interval = setInterval(() => {
      load();
    }, 15000); // ⏱️ รีเฟรชทุก 15 วิ

    return () => clearInterval(interval);
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

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-white text-black rounded-xl px-4 py-2"
        >
          <option value="today">วันนี้</option>
          <option value="7days">7 วันที่ผ่านมา</option>
          <option value="month">เดือนนี้</option>
        </select>
      </header>

      <main className="p-6">
        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            กำลังโหลดข้อมูล...
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card title="ยอดขายรวม" value={`฿${totalSales.toLocaleString()}`} />
              <Card title="จำนวนบิลรวม" value={`${totalReceipts.toLocaleString()} บิล`} />
              <Card title="ภาษีรวม" value={`฿${totalTax.toLocaleString()}`} />
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-xl shadow mb-6">
              <h2 className="text-xl font-bold mb-4">กราฟยอดขาย</h2>
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

            {/* Stores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stores.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-lg font-bold mb-2">{s.name}</h3>
                  <p>ยอดขาย: ฿{s.sales.toLocaleString()}</p>
                  <p>จำนวนบิล: {s.receipts}</p>
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
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
