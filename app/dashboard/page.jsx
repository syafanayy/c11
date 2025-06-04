"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  const { role, username } = session.user;

  const stats = {
    totalMahasiswa: 420,
    totalDosen: 35,
    pendaftaranBaru: 58,
  };

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Pendaftaran Baru",
        data: [10, 15, 8, 20, 5, 10],
        backgroundColor: "#4f46e5",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pendaftaran Mahasiswa Baru 6 Bulan Terakhir" },
    },
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html {
          margin: 0; padding: 0; font-family: 'Poppins', sans-serif; background: #f0f4f8;
          color: #222;
          min-height: 100vh;
        }
        .container {
          max-width: 900px;
          margin: 40px auto;
          padding: 0 20px;
        }
        h1 {
          font-weight: 700;
          color: #3b82f6;
          text-align: center;
          margin-bottom: 12px;
        }
        .welcome {
          text-align: center;
          font-size: 1.25rem;
          margin-bottom: 32px;
          color: #374151;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        .card {
          background: white;
          padding: 24px 20px;
          border-radius: 12px;
          box-shadow: 0 10px 15px rgba(0,0,0,0.05);
          text-align: center;
          transition: box-shadow 0.3s ease;
          cursor: default;
        }
        .card:hover {
          box-shadow: 0 12px 24px rgba(59,130,246,0.25);
        }
        .card h2 {
          font-size: 2.5rem;
          margin: 0 0 8px;
          color: #2563eb;
        }
        .card p {
          font-weight: 600;
          color: #6b7280;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .chart-wrapper {
          background: white;
          padding: 28px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 15px rgba(0,0,0,0.05);
          max-width: 720px;
          margin: 0 auto 40px;
        }
        .student-status {
          background: #d1fae5;
          color: #065f46;
          padding: 24px;
          border-radius: 12px;
          max-width: 400px;
          margin: 0 auto 40px;
          box-shadow: 0 10px 15px rgba(6,95,70,0.15);
          font-size: 1.1rem;
          line-height: 1.6;
          text-align: center;
        }
        button.logout-btn {
          display: block;
          margin: 0 auto;
          background: #ef4444;
          border: none;
          color: white;
          padding: 14px 36px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button.logout-btn:hover {
          background: #b91c1c;
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.75rem;
          }
          .card h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <main className="container" role="main" aria-label="Dashboard utama">
        <h1>Dashboard {role === "admin" ? "Admin" : role === "mhs" ? "Mahasiswa" : "User"}</h1>
        <p className="welcome">
          Selamat datang, <strong>{username}</strong>!
        </p>

        {role === "admin" && (
          <>
            <div className="stats-grid" aria-label="Statistik Admin">
              <div className="card" tabIndex={0}>
                <h2>{stats.totalMahasiswa}</h2>
                <p>Mahasiswa Terdaftar</p>
              </div>
              <div className="card" tabIndex={0}>
                <h2>{stats.totalDosen}</h2>
                <p>Dosen Aktif</p>
              </div>
              <div className="card" tabIndex={0}>
                <h2>{stats.pendaftaranBaru}</h2>
                <p>Pendaftaran Baru</p>
              </div>
            </div>

            <section className="chart-wrapper" aria-label="Grafik Pendaftaran Mahasiswa Baru">
              <Bar data={chartData} options={chartOptions} />
            </section>
          </>
        )}

        {role === "mhs" && (
          <section className="student-status" aria-label="Status pendaftaran mahasiswa">
            <h3>Status Pendaftaran Kamu:</h3>
            <p>✅ Terdaftar</p>
            <p>📅 Jadwal Seleksi: 10 Juli 2025</p>
            <p>📍 Lokasi Tes: Gedung A, Kampus Ma'soem</p>
          </section>
        )}

        <button
          className="logout-btn"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          aria-label="Logout dari dashboard"
        >
          Logout
        </button>
      </main>
    </>
  );
}
