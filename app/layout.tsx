import "./globals.css";
import TheHeader from "@/components/TheHeader";
export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover remarable developer projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TheHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
