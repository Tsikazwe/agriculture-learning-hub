export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-amber-800 relative">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-md w-full">{children}</div>
    </div>
  );
}