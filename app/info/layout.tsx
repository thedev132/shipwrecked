import ContentWrapper from "@/components/docs/ContentWrapper";
import Sidebar from "@/components/docs/Sidebar";

export default function MDInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-white">
        <div className="max-w-3xl mx-0">
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </main>
    </div>
  );
}
