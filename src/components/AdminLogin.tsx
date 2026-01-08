import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export function AdminLogin() {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-4">
      <input
        className="border p-2 w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="admin@email.com"
      />

      <button
        onClick={() =>
          signIn("email", { email })
        }
        className="border px-4 py-2"
      >
        Войти
      </button>
    </div>
  );
}
