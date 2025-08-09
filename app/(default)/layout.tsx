import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function DefaultLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative flex min-h-screen flex-col bg-white text-gray-900">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
