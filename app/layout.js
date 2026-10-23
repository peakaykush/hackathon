import "./globals.css";

export const metadata = {
  title: "AzurePrep Pro — Smart AZ-900 Quiz Builder",
  description: "Master the Microsoft Azure Fundamentals (AZ-900) exam with smart quizzes, instant feedback, and detailed explanations. Built for the #1MillionDevs Movement.",
  keywords: "AZ-900, Azure Fundamentals, exam prep, quiz, cloud computing, Microsoft Azure, study tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230078d4'/><text x='50%' y='65%' font-family='sans-serif' font-weight='800' font-size='48' fill='white' text-anchor='middle'>AP</text></svg>" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
