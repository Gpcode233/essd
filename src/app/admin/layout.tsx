import AdminAuthGate from "@/components/admin-auth-gate";

export const metadata = {
  title: "Admin Portal | ESSD 2026",
  description: "Official administrative dashboard for the Enugu State Secondary Schools Debate Championship.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthGate>{children}</AdminAuthGate>;
}
