import { useEffect } from "react";
import { supabase } from "./lib/supabase";

function SupabaseTest() {
  useEffect(() => {
    async function testSupabase() {
      const { data, error } = await supabase.auth.getSession();

      console.log("========== SUPABASE TEST ==========");

      if (error) {
        console.error("❌ Supabase connection failed");
        console.error(error);
        return;
      }

      console.log("✅ Supabase connection successful!");
      console.log("Session:", data.session);

      console.log("===================================");
    }

    testSupabase();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50">
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <div className="text-4xl">🌸</div>

        <h1 className="mt-3 text-xl font-bold text-gray-800">Supabase Test</h1>

        <p className="mt-2 text-sm text-gray-500">
          Open your browser console to see the result.
        </p>
      </div>
    </div>
  );
}

export default SupabaseTest;
