"use client";

import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Username atau password salah!");
    }
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body,html {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex; justify-content: center; align-items: center;
          color: #fff;
        }
        .container {
          background: rgba(255 255 255 / 0.1);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 3rem 2.5rem;
          width: 360px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          text-align: center;
        }
        h1 {
          margin: 0 0 0.5rem;
          font-weight: 700;
          font-size: 1.9rem;
          letter-spacing: 1.2px;
          color: #fff;
          text-shadow: 0 0 6px rgba(255,255,255,0.6);
        }
        p.subtitle {
          font-weight: 300;
          margin: 0 0 2rem;
          color: #dcdcdcaa;
          font-style: italic;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        input {
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border-radius: 12px;
          border: none;
          outline: none;
          background: rgba(255 255 255 / 0.3);
          color: #fff;
          box-shadow: inset 0 0 6px rgba(255,255,255,0.4);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        input::placeholder {
          color: #e6e6e6aa;
        }
        input:focus {
          background: rgba(255 255 255 / 0.6);
          box-shadow: inset 0 0 10px rgba(255,255,255,0.8);
          color: #333;
        }
        button {
          background: #fff;
          color: #764ba2;
          font-weight: 700;
          border-radius: 12px;
          padding: 0.75rem 0;
          font-size: 1.1rem;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 14px rgba(255 255 255 / 0.6);
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        button:hover:not(:disabled) {
          background: #6b3b97;
          color: #fff;
          box-shadow: 0 4px 20px rgba(107,59,151,0.8);
        }
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .error-message {
          background: #f44336;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          font-weight: 600;
          box-shadow: 0 3px 8px #d32f2faa;
          color: white;
          user-select: none;
          animation: shake 0.3s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) }
          25% { transform: translateX(-6px) }
          50% { transform: translateX(6px) }
          75% { transform: translateX(-6px) }
        }
      `}</style>

      <div className="container" role="main">
        <h1>Penerimaan Mahasiswa Baru 2025</h1>
        <p className="subtitle">Universitas Ma'soem</p>

        {error && (
          <div className="error-message">
            {error === "CredentialsSignin"
              ? "Username atau password salah."
              : `Login gagal: ${error}`}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
