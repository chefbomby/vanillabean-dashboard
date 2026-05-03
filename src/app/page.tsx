export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5E6D3] flex flex-col">
      <div className="bg-[#6B4F3B] text-white py-14 text-center">
        <h1 className="text-4xl font-bold">Vanillabean</h1>
        <p className="tracking-[0.4em] mt-2">DASHBOARD</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-[#6B4F3B] mb-3">
            เข้าสู่ระบบ
          </h2>

          <p className="text-gray-600 mb-8">
            เชื่อมต่อบัญชี Loyverse เพื่อดูยอดขาย ภาษี และข้อมูลสาขา
          </p>

          <a
            href="/api/auth/loyverse"
            className="block w-full bg-[#6B4F3B] text-white py-4 rounded-2xl text-lg font-bold hover:bg-[#4B3621] transition"
          >
            เชื่อมต่อ Loyverse
          </a>

          <p className="text-sm text-gray-500 mt-6">
            สำหรับเจ้าของร้านและแฟรนไชส์ Vanillabean
          </p>
        </div>
      </div>
    </div>
  );
}
