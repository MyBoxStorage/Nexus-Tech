# Nexus Tech Solutions

![Nexus Tech Solutions](https://img.shields.io/badge/Nexus-Tech%20Solutions-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

Um website premium de múltiplas páginas para a Nexus Tech Solutions, uma empresa brasileira de soluções de Inteligência Artificial. Desenvolvido com React 18, Vite, GSAP, React Three Fiber e tsParticles.

## 📸 Screenshots

O website inclui as seguintes páginas e seções:

- **Home**: Hero com vídeo background, rede neural 3D, prova social, problemas que resolvemos, destaque de serviços (bento grid), como funciona, preços, cases de sucesso, sobre nós e contato
- **Serviços**: Catálogo completo com 45 soluções de IA organizadas por categoria
- **Cases**: Casos de sucesso detalhados com métricas e depoimentos
- **Produto**: Página dinâmica de detalhes do produto com FAQ

## 🚀 Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Animations**: GSAP + ScrollTrigger
- **3D Graphics**: React Three Fiber + @react-three/drei
- **Particles**: @tsparticles/react + @tsparticles/slim
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Syne, DM Sans, JetBrains Mono)
- **Styling**: CSS Modules + CSS Variables

## 📋 Prerequisites

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nexus-tech-solutions.git
cd nexus-tech-solutions
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos de build serão gerados na pasta `dist/`.

## 🌐 Deploy na Vercel

1. Conecte sua conta do GitHub na Vercel
2. Importe o repositório
3. A Vercel detectará automaticamente o Vite e configurará o deploy
4. Cada push na branch principal acionará um novo deploy automaticamente

## Assets

### OG Image
Replace `public/og-image.png` with a real 1200×630px PNG before production deploy.
Recommended: export a screenshot of the hero section or create a branded image with the Nexus Tech Solutions logo, headline, and dark background.
The file is currently a placeholder. Social media previews will not render correctly until this is replaced.

## 📁 File Structure

```
nexus-tech/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── Layout.jsx
│   │   ├── ui/
│   │   │   ├── CircuitBackground/
│   │   │   ├── ThemeToggle/
│   │   │   ├── ScrollIndicator/
│   │   │   ├── GlassCard/
│   │   │   ├── SectionBadge/
│   │   │   └── WhatsAppButton/
│   │   └── sections/
│   │       ├── Hero/
│   │       ├── ServicesHighlight/
│   │       ├── HowItWorks/
│   │       ├── Pricing/
│   │       ├── SocialProof/
│   │       ├── About/
│   │       ├── Contact/
│   │       ├── CaseHighlight/
│   │       └── TheProblem/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Services/
│   │   ├── Cases/
│   │   └── Product/
│   ├── styles/
│   │   ├── global.css
│   │   └── animations.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Customização

### Cores

As cores são definidas em `src/styles/global.css` usando CSS Variables:

```css
:root {
  --bg-primary: #08080F;
  --bg-secondary: #0D0D1A;
  --accent-blue: #2563EB;
  --accent-purple: #7C3AED;
  --accent-green: #22C55E;
  /* ... */
}
```

### Textos

Todos os textos estão nos componentes em português (PT-BR). Para alterar, edite diretamente nos arquivos JSX.

### Preços

Os preços estão definidos em `src/components/sections/Pricing/Pricing.jsx` e `src/pages/Services/Services.jsx`.

## ➕ Como Adicionar Novos Serviços

1. Adicione o serviço no array `servicesData` em `src/pages/Services/Services.jsx`
2. Adicione os detalhes do produto em `src/pages/Product/Product.jsx` no objeto `productsData`
3. O slug deve seguir o formato: `nome-do-servico-em-kebab-case`

Exemplo:
```javascript
{
  id: 'meu-novo-servico',
  name: 'Meu Novo Serviço',
  category: 'categoria',
  price: 'R$ X.XXX/mês',
  description: 'Descrição do serviço'
}
```

## 🌙 Dark/Light Mode

O tema é controlado via atributo `data-theme` no elemento `<html>`. A preferência é salva no localStorage.

- Padrão: Dark mode
- Toggle: Botão flutuante no canto superior direito

## 📱 Responsividade

O website é totalmente responsivo com breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎭 Animações

- **GSAP ScrollTrigger**: Animações de entrada nas seções
- **React Three Fiber**: Rede neural 3D no hero
- **CSS Animations**: Background de circuito, hover effects
- **tsParticles**: Partículas no background (opcional)

## 📞 Contato

- WhatsApp: [+55 (24) 98131-3689](https://wa.me/5524981313689)
- Email: contato@nexustech.com.br
- Endereço: Av. Paulista, 1374 — 12º andar, São Paulo/SP

## 📝 License

Este projeto é licenciado sob a licença MIT.

---

Desenvolvido por [Global Landing](https://globallanding.com.br)
