import {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 - Página não encontrada | VEXXA App",
  description: "A página que você está procurando não foi encontrada.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="30" fill="#793fdf" />
              <circle cx="22" cy="25" r="3" fill="white" />
              <circle cx="42" cy="25" r="3" fill="white" />
              <path
                d="M20 45 Q32 35 44 45"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M25 40 L27 42 M37 42 L39 40"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Página não encontrada
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
          <p className="text-sm text-muted-foreground">
            Verifique se o endereço está correto ou navegue para a página
            inicial.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
