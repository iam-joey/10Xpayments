import { Navbar } from "../_components/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Navbar /> <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
