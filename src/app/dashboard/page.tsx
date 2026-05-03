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

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/sales?range=${range}`);
      const data = await res.json();
      setStores(data.stores || []);
    }

    load();
  }, [range]);

  const totalSales = stores.reduce((sum, s) => sum + s.sales, 0);
  const totalReceipts = stores.reduce((sum, s) => sum + s.receipts, 0);
  const totalTax = stores.reduce((sum, s) => sum + s.tax, 0);

  return (
    <div className="min-h-screen bg-[#F5E6D3] p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#6B4F3B]">
          Vanillabean Dashboard
        </h1>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-white border rounded-xl px-4 py-3 shadow"
        >
          <option value="today">วันนี้</option>
          <option value="7days">7 วันที่ผ่านมา</option>
          <option value="month">เดือนนี้</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-2">ยอดขายรวม</h2>
          <p className="text-3xl font-bold text-[#6B4F3B]">
            ฿{totalSales.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-2">จำนวนบิลรวม</h2>
          <p className="text-3xl font-bold text-[#6B4F3B]">
            {totalReceipts.toLocaleString()} บิล
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-2">ภาษีรวม</h2>
          <p className="text-3xl font-bold text-[#6B4F3B]">
            ฿{totalTax.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-[#6B4F3B] mb-4">
          กราฟยอดขายแยกตามสาขา
        </h2>

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

      <h2 className="text-2xl font-bold text-[#6B4F3B] mb-4">
        ยอดขายแยกตามสาขา
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-3">{s.name}</h3>
            <p>ยอดขาย: ฿{s.sales.toLocaleString()}</p>
            <p>จำนวนบิล: {s.receipts.toLocaleString()} บิล</p>
            <p>ภาษี: ฿{s.tax.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}