export default function MDInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "100vw",
            flexDirection: "column",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
