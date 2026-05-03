export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5E6D3] flex flex-col">
      
      {/* Header */}
      <div className="bg-[#6B4F3B] text-white py-12 flex flex-col items-center">
        <div className="text-4xl font-bold tracking-wide">
          Vanillabean
        </div>
        <div className="text-lg mt-2 tracking-[0.4em] opacity-90">
          DASHBOARD
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

          <div className="mb-5">
            <label className="block text-gray-600 mb-1">อีเมล</label>
            <input
              type="email"
              className="w-full border-b-2 border-gray-300 outline-none py-2 text-lg focus:border-[#6B4F3B]"
              placeholder="example@email.com"
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-600 mb-1">รหัสผ่าน</label>
            <input
              type="password"
              className="w-full border-b-2 border-gray-300 outline-none py-2 text-lg focus:border-[#6B4F3B]"
              placeholder="••••••••"
            />
          </div>

          {/* 🔥 ปุ่ม OAuth */}
          <a
            href="/api/auth/loyverse"
            className="block text-center w-full bg-[#6B4F3B] text-white py-3 rounded-xl text-lg hover:bg-[#4B3621] transition"
          >
            เข้าสู่ระบบด้วย Loyverse
          </a>

          <div className="text-center mt-6 text-gray-600">
            ลืมรหัสผ่าน?
          </div>

          <div className="text-center mt-4 text-gray-600">
            พึ่งรู้จัก Vanillabean?
          </div>

        </div>
      </div>
    </div>
  );
}