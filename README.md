# IEEE IDP — Frontend

![IEEE IDP Banner](public/placeholder-logo.png)

## Sobre

Este é o frontend do site do Ramo Estudantil IEEE da faculdade IDP. Uma aplicação web moderna construída com Next.js 15 e React 19, oferecendo uma experiência premium e responsiva para visualização e inscrição em eventos, autenticação de usuários e gestão de perfis, com design inspirado em Material Design 3 Expressive.

## Tecnologias

<p>
	<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="40" alt="Next.js" title="Next.js" />
	<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="React" title="React" />
	<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="TypeScript" title="TypeScript" />
	<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="40" alt="Tailwind CSS" title="Tailwind CSS" />
	<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg" height="40" alt="Three.js" title="Three.js"/>
</p>

**Stack Principal:**
- ⚛️ **Next.js 15** - Framework React com App Router
- 🎨 **Tailwind CSS** - Estilização utilitária
- 🎭 **Framer Motion** - Animações fluidas
- 🎬 **GSAP** - Animações avançadas
- 🎮 **Three.js** - Gráficos 3D interativos
- 🧩 **shadcn/ui** - Componentes UI reutilizáveis
- 🎯 **Radix UI** - Primitivas de UI acessíveis
- 📅 **React Hook Form** - Gerenciamento de formulários
- 🔄 **Lenis** - Smooth scrolling
- 🎲 **DiceBear** - Geração de avatares

## Propósito

Fornecer uma interface web moderna, acessível e performática para o ecossistema IEEE IDP, permitindo que estudantes e membros visualizem eventos, façam inscrições, gerenciem seus perfis e interajam com a comunidade de forma intuitiva e agradável.

## Features Implementadas

### 🎨 Design e UX
- ✅ Design System baseado em Material Design 3 Expressive
- ✅ Tema claro/escuro com transições suaves
- ✅ Animações fluidas com GSAP e Framer Motion
- ✅ Smooth scrolling com Lenis
- ✅ Design totalmente responsivo
- ✅ Acessibilidade (ARIA labels, keyboard navigation)

### 🏠 Páginas Principais
- ✅ **Home** - Hero interativo com animações Three.js + Event Slider premium
- ✅ **Eventos** - Listagem com filtros, busca e paginação
- ✅ **Detalhes do Evento** - Página completa com galeria, comentários e inscrição
- ✅ **Autenticação** - Login e registro com validação em tempo real
- ✅ **Perfil** - Gerenciamento de dados pessoais e inscrições
- ✅ **Admin** - Painel para criação e gestão de eventos

### 🔐 Autenticação e Autorização
- ✅ Sistema completo de login/registro
- ✅ Validação de senha em tempo real
- ✅ Recuperação de senha
- ✅ Proteção de rotas privadas
- ✅ Guards para admin
- ✅ Context API para gestão de estado

### 🎯 Componentes Principais
- ✅ **Navbar** - Navegação adaptativa com detecção de fundo
- ✅ **EventCard** - Card de evento com animações hover
- ✅ **EventSlider** - Slider premium com parallax
- ✅ **InteractiveCircuitHero** - Hero 3D com partículas
- ✅ **GeneratedAvatar** - Avatares abstratos únicos
- ✅ **EventFilters** - Sistema de filtros avançado
- ✅ **Forms** - Formulários com validação visual

### 🎨 Animações e Efeitos
- ✅ Animações de entrada (fade-in, slide-in)
- ✅ Parallax scrolling
- ✅ Glassmorphism
- ✅ Hover effects elaborados
- ✅ Loading states
- ✅ Skeleton screens

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ ou superior
- pnpm (recomendado) ou npm
- Backend rodando em `http://localhost:3002`

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/IDP-Student-Brack-Team/IEEE-WEB.git
cd IEEE-WEB

# 2. Instale as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o .env.local com suas configurações

# 4. Execute em modo desenvolvimento
pnpm dev
```

### 🎯 Acessar a Aplicação

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **API Backend**: http://localhost:3002/api/v1
- 📚 **Docs API**: http://localhost:3002/api/docs

## 📁 Estrutura do Projeto

```
ieee-frontend/
├── app/                      # App Router (Next.js 15)
│   ├── (auth)/              # Grupo de rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── admin/               # Painel administrativo
│   ├── events/              # Listagem de eventos
│   ├── eventos/[id]/        # Detalhes do evento
│   ├── profile/             # Perfil do usuário
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Página inicial
│   └── globals.css          # Estilos globais
│
├── components/              # Componentes React
│   ├── ui/                  # Componentes shadcn/ui
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── event-card.tsx
│   ├── event-slider-section.tsx
│   ├── interactive-circuit-hero.tsx
│   ├── generated-avatar.tsx
│   └── ...
│
├── lib/                     # Utilitários e configurações
│   ├── api.ts              # Cliente API
│   ├── auth-context.tsx    # Context de autenticação
│   ├── types.ts            # TypeScript types
│   ├── utils.ts            # Funções utilitárias
│   └── mock-data.ts        # Dados mock para desenvolvimento
│
├── hooks/                   # Custom React Hooks
│   ├── use-toast.ts
│   └── use-mobile.ts
│
├── public/                  # Arquivos estáticos
│   ├── images/
│   └── icons/
│
├── .env.example            # Exemplo de variáveis de ambiente
├── .env.local              # Variáveis de ambiente (não commitado)
├── next.config.mjs         # Configuração do Next.js
├── tailwind.config.ts      # Configuração do Tailwind
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências do projeto
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia o servidor de desenvolvimento
pnpm build            # Build de produção
pnpm start            # Inicia o servidor de produção
pnpm lint             # Executa o linter

# Utilitários
pnpm type-check       # Verifica tipos TypeScript
```

## 🌐 Variáveis de Ambiente

Veja o arquivo `.env.example` para todas as variáveis necessárias.

**Principais variáveis:**

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3002/api/v1

# Analytics (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS=false
```

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env.local` com credenciais reais!

## 🎨 Guia de Estilo

### Design Tokens

- **Primary Color**: `hsl(221, 100%, 50%)` - Azul IEEE
- **Border Radius**:
  - Small: `0.5rem`
  - Medium: `0.75rem`
  - Large: `1rem`
  - XL: `1.5rem`
- **Shadows**: Sombras suaves com cor primary
- **Animations**: Duração padrão de 0.3s com ease-out

### Componentes

Seguimos o padrão **shadcn/ui** para componentes base, com customizações para match do design system IEEE.

## 🔐 Autenticação

O sistema usa **Context API** para gerenciar o estado de autenticação globalmente:

```tsx
import { useAuth } from '@/lib/auth-context'

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth()

  // Use as funções e estado conforme necessário
}
```

### Fluxo de Autenticação

1. Usuário faz login/registro
2. Backend retorna JWT token
3. Token armazenado no localStorage
4. Requests subsequentes incluem token no header
5. Context mantém estado do usuário

## 🎯 Integração com Backend

Todas as chamadas à API são feitas através do cliente centralizado em `lib/api.ts`:

```typescript
import { apiClient } from '@/lib/api'

// Exemplo de uso
const events = await apiClient.get('/events')
const newEvent = await apiClient.post('/events', eventData)
```

### Endpoints Principais

- `POST /auth/login` - Autenticação
- `POST /auth/register` - Registro
- `GET /events` - Listar eventos
- `GET /events/:id` - Detalhes do evento
- `POST /registrations` - Inscrever em evento
- `GET /users/me` - Perfil do usuário

## 🚧 Roadmap

### Em Desenvolvimento
- 🔨 Integração completa com todos endpoints do backend
- 🔨 Sistema de comentários real-time
- 🔨 Upload de imagens de perfil
- 🔨 Notificações push
- 🔨 PWA (Progressive Web App)

### Futuras Features
- 📱 App mobile com React Native
- 🔔 WebSockets para notificações real-time
- 🎫 Sistema de QR Code para check-in
- 📊 Dashboard analytics para admins
- 🌐 Internacionalização (PT/EN)
- 🔍 Busca avançada com filtros

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
2. Commit suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
3. Push para a branch (`git push origin feature/MinhaFeature`)
4. Abra um Pull Request

### Commit Convention

Seguimos o padrão **Conventional Commits**:

- `feat:` - Nova feature
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, estilos
- `refactor:` - Refatoração de código
- `test:` - Testes
- `chore:` - Manutenção

## 📚 Recursos de Aprendizado

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [GSAP Documentation](https://gsap.com/docs/)
- [Three.js Fundamentals](https://threejs.org/manual/)

## 🆘 Precisa de Ajuda?

- 📖 Consulte a documentação do projeto
- 🐛 Abra uma issue no GitHub
- 💬 Pergunte no chat da equipe
- 📧 Entre em contato com o líder técnico

## 📄 Licença

MIT License - Veja o arquivo [LICENSE](./LICENSE) para detalhes.

## 🎊 Agradecimentos

Desenvolvido com ❤️ pela equipe IEEE IDP.

---

**Última atualização:** Novembro 2025
**Versão:** 1.0.0
**Status:** 🟢 Ativo

═══════════════════════════════════════════════════════════════════════════════

💻 Pronto para começar? Execute: `pnpm dev`

═══════════════════════════════════════════════════════════════════════════════
