---
name: create-page
description: Cria uma nova página usando templates Blips
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: [page-type] [page-name]
---

# Criar Página com Template Blips

Esta skill cria páginas usando templates pré-definidos do Blips UI.

## Argumentos

`$ARGUMENTS` deve conter:
1. Tipo de página: `landing`, `dashboard`, `auth`, `settings`, `404`
2. Nome da página (opcional): nome do arquivo/rota

Exemplo: `/blips-templates:create-page landing home`

## 1. Detectar Estrutura do Projeto

```bash
# Next.js App Router
ls app/layout.tsx 2>/dev/null && echo "APP_ROUTER"

# Next.js Pages Router
ls pages/_app.tsx 2>/dev/null && echo "PAGES_ROUTER"
```

## 2. Templates Disponíveis

### Landing Page (`landing`)

Uma página de apresentação com hero, features e CTA.

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Your Amazing Product
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-[600px]">
          A brief description of what your product does and why people should use it.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Feature {i}</CardTitle>
                  <CardDescription>
                    Description of feature {i}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    More details about this feature and how it helps users.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

### Dashboard Page (`dashboard`)

Uma página de dashboard com sidebar e grid de cards.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-6">
        <nav className="space-y-2">
          <a href="#" className="block px-3 py-2 rounded-md bg-accent">Dashboard</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-accent">Settings</a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-accent">Profile</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Users", "Revenue", "Orders", "Growth"].map((title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
```

### Auth Page (`auth`)

Página de autenticação com formulário de login/registro.

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Sign In</Button>
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
```

### 404 Page (`404`)

Página de erro 404.

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page not found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
```

## 3. Criar Arquivo

Determine o caminho baseado na estrutura do projeto:

- **App Router**: `app/[page-name]/page.tsx`
- **Pages Router**: `pages/[page-name].tsx`

## 4. Verificar Componentes Necessários

Certifique-se de que os componentes necessários estão instalados:

```bash
ls components/ui/button.tsx components/ui/card.tsx components/ui/input.tsx
```

Se não estiverem, sugira usar `/blips-ui:add-component`.

## 5. Mensagem de Sucesso

```
✓ Página criada: app/[name]/page.tsx

Componentes utilizados:
- Button
- Card
- Input (se auth)

Próximos passos:
1. Customize o conteúdo da página
2. Adicione sua lógica de negócio
```
