# 🎨 Padrão de Layout e Navegação - FEI

**Versão:** 1.0
**Última atualização:** Janeiro 2025
**Aplicável a:** Todas as páginas do site FEI (Home, Níveis, Módulos)

---

## 🎯 Visão Geral

Este documento define a **estrutura global de layout, navegação e componentes visuais** usados em todo o site FEI - Formação em Engenharia de Intenção.

Use esta especificação para manter **consistência visual e funcional** em todas as páginas do projeto.

---

## 📌 Resumo Executivo (TL;DR)

**Toda página do FEI DEVE ter:**
- ✅ Navbar sticky no topo (logo, links, dark mode)
- ✅ Breadcrumb (exceto homepage)
- ✅ Hero section com gradiente colorido
- ✅ Footer com 3 colunas (sobre, níveis, links)
- ✅ Dark mode completo (class-based)
- ✅ Tailwind CSS + config customizado
- ✅ Font: Inter (Google Fonts)
- ✅ Responsivo mobile-first

**Sistema de cores por nível:**
- 🔵 Nível 1: `#3B82F6` (azul)
- 🟣 Nível 2: `#9b59b6` (roxo)
- 🟢 Nível 3A: `#10B981` (verde)
- 🟠 Nível 4S: `#F59E0B` (laranja)

---

## 📐 Estrutura HTML Base

Toda página deve seguir esta estrutura:

```html
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <!-- Meta tags -->
  <!-- Tailwind CSS CDN -->
  <!-- Google Fonts (Inter) -->
  <!-- Estilos customizados -->
</head>
<body class="preload bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">

  <!-- 1. Navbar -->
  <nav>...</nav>

  <!-- 2. Breadcrumb (opcional, exceto home) -->
  <div class="breadcrumb">...</div>

  <!-- 3. Hero Section -->
  <section class="hero">...</section>

  <!-- 4. Conteúdo Principal -->
  <section class="content">...</section>

  <!-- 5. Footer -->
  <footer>...</footer>

  <!-- 6. JavaScript -->
  <script src="..."></script>
</body>
</html>
```

---

## 🧩 Componentes Globais

### 1. Navbar (Navegação Principal)

**Posição:** Fixo no topo (sticky)
**Altura:** 64px (h-16)
**Background:** Branco semi-transparente com blur

```html
<nav class="sticky top-0 z-50 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">

      <!-- Logo -->
      <div class="flex items-center">
        <a href="/index.html" class="text-2xl font-bold bg-gradient-to-r from-nivel-1 to-nivel-2 bg-clip-text text-transparent">
          🎓 FEI - Engenharia de Intenção
        </a>
      </div>

      <!-- Links Desktop -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="/index.html" class="text-neutral-700 dark:text-neutral-300 hover:text-nivel-1">Início</a>
        <a href="/index.html#niveis" class="text-neutral-700 dark:text-neutral-300 hover:text-nivel-1">Níveis</a>

        <!-- Dark Mode Toggle -->
        <button id="theme-toggle" class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
          <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Menu Mobile Toggle -->
      <button id="mobile-menu-btn" class="md:hidden text-neutral-700 dark:text-neutral-300">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </div>

  <!-- Menu Mobile (escondido por padrão) -->
  <div id="mobile-menu" class="hidden md:hidden bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
    <div class="px-4 py-2 space-y-1">
      <a href="/index.html" class="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">Início</a>
      <a href="/index.html#niveis" class="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">Níveis</a>
    </div>
  </div>
</nav>
```

**Características obrigatórias:**
- ✅ Position: `sticky top-0`
- ✅ Z-index: `z-50` (sempre acima do conteúdo)
- ✅ Backdrop blur: `backdrop-blur-sm`
- ✅ Logo com gradiente: `from-nivel-1 to-nivel-2`
- ✅ Links com hover effect
- ✅ Botão de dark mode
- ✅ Menu mobile responsivo
- ✅ Largura máxima: `max-w-7xl`

**Links principais:**
- Início (`/index.html`)
- Níveis (`/index.html#niveis`)
- *Adicionar mais conforme necessário*

---

### 2. Breadcrumb (Migalhas de Pão)

**Quando usar:** Em todas as páginas EXCETO homepage
**Posição:** Logo abaixo do navbar

```html
<div class="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <nav class="flex text-sm" aria-label="Breadcrumb">
      <a href="/index.html" class="text-[COR-DO-NIVEL] hover:text-[COR-ESCURA]">Início</a>
      <span class="mx-2 text-neutral-400">/</span>
      <a href="/niveis/nivel-X.html" class="text-[COR-DO-NIVEL] hover:text-[COR-ESCURA]">Nível X</a>
      <span class="mx-2 text-neutral-400">/</span>
      <span class="text-neutral-600 dark:text-neutral-400">Página Atual</span>
    </nav>
  </div>
</div>
```

**Regras:**
- Sempre começa com "Início"
- Separador: `/` com cor neutra
- Último item (página atual): não clicável, cor mais suave
- Links anteriores: cor do nível com hover
- Máximo 4 níveis de profundidade recomendado

**Exemplos de breadcrumbs:**
- Homepage: *Sem breadcrumb*
- Página de nível: `Início / Nível 2`
- Página de módulo: `Início / Nível 2 / Módulo 1`

---

### 3. Hero Section

**Posição:** Logo após navbar/breadcrumb
**Background:** Gradiente na cor do nível
**Altura:** Variável (mínimo py-16)

```html
<section class="bg-gradient-to-r from-[COR-DO-NIVEL] to-[COR-ESCURA] py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">

    <!-- Badges/Tags -->
    <div class="flex items-center gap-4 mb-4">
      <span class="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
        Badge 1
      </span>
      <span class="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
        Badge 2
      </span>
    </div>

    <!-- Título Principal -->
    <h1 class="text-4xl lg:text-5xl font-bold mb-4">
      [Emoji] Título da Página
    </h1>

    <!-- Subtítulo -->
    <p class="text-xl text-white/90 mb-6">
      Descrição ou subtítulo da página
    </p>

    <!-- Estatísticas (opcional) -->
    <div class="grid md:grid-cols-4 gap-4 mt-8">
      <div class="bg-white/10 backdrop-blur p-4 rounded-lg">
        <div class="text-2xl font-bold">X</div>
        <div class="text-sm text-[COR]-100">Métrica 1</div>
      </div>
      <!-- Mais cards de estatísticas -->
    </div>
  </div>
</section>
```

**Gradientes por nível:**
- Nível 1: `from-nivel-1 to-blue-600`
- Nível 2: `from-nivel-2 to-purple-700`
- Nível 3A: `from-nivel-3a to-green-600`
- Nível 4S: `from-nivel-4s to-orange-600`

**Elementos obrigatórios:**
- ✅ Gradiente de cor
- ✅ Texto branco (`text-white`)
- ✅ Título grande (h1) com emoji
- ✅ Subtítulo com opacidade (`text-white/90`)
- ✅ Padding vertical: mínimo `py-16`
- ✅ Largura máxima: `max-w-7xl`

**Elementos opcionais:**
- Badges/tags no topo
- Grid de estatísticas
- CTAs (Call-to-Actions)

---

### 4. Content Area (Área de Conteúdo)

**Background:** Neutro claro/escuro
**Padding:** Generoso (py-12)

```html
<section class="py-12 bg-neutral-50 dark:bg-neutral-900">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Conteúdo da página -->

  </div>
</section>
```

**Características:**
- ✅ Background: `bg-neutral-50 dark:bg-neutral-900`
- ✅ Padding vertical: `py-12` (mínimo)
- ✅ Container: `max-w-7xl mx-auto`
- ✅ Padding horizontal responsivo: `px-4 sm:px-6 lg:px-8`

---

### 5. Footer (Rodapé)

**Posição:** Final de todas as páginas
**Background:** Escuro (`bg-neutral-900 dark:bg-black`)
**Estrutura:** 3 colunas em desktop, empilhadas em mobile

```html
<footer class="bg-neutral-900 dark:bg-black text-neutral-300 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Grid de 3 colunas -->
    <div class="grid md:grid-cols-3 gap-8">

      <!-- Coluna 1: Sobre -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">FEI - Engenharia de Intenção</h3>
        <p class="text-sm">Formação completa para dominar a nova era da IA</p>
      </div>

      <!-- Coluna 2: Níveis -->
      <div>
        <h4 class="font-semibold text-white mb-4">Níveis</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="/niveis/nivel-1.html" class="hover:text-white">Nível 1: Fundamentos</a></li>
          <li><a href="/niveis/nivel-2.html" class="hover:text-white">Nível 2: Programa Completo</a></li>
          <li><a href="/niveis/nivel-3a.html" class="hover:text-white">Nível 3A: Agentes</a></li>
          <li><a href="/niveis/nivel-4s.html" class="hover:text-white">Nível 4S: Sistemas 2026</a></li>
        </ul>
      </div>

      <!-- Coluna 3: Links -->
      <div>
        <h4 class="font-semibold text-white mb-4">Links</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="/index.html" class="hover:text-white">Início</a></li>
          <li><a href="/index.html#niveis" class="hover:text-white">Todos os Níveis</a></li>
        </ul>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
      <p>&copy; 2025 FEI - Formação em Engenharia de Intenção.</p>
    </div>
  </div>
</footer>
```

**Características obrigatórias:**
- ✅ Background escuro: `bg-neutral-900 dark:bg-black`
- ✅ Texto claro: `text-neutral-300`
- ✅ 3 colunas em desktop (`md:grid-cols-3`)
- ✅ Links para TODOS os níveis
- ✅ Hover effect nos links: `hover:text-white`
- ✅ Copyright com ano atual
- ✅ Linha separadora antes do copyright

---

## 🎨 Sistema de Cores

### Cores dos Níveis

```javascript
// Tailwind Config
colors: {
  'nivel-1': '#3B82F6',    // Azul
  'nivel-2': '#9b59b6',    // Roxo
  'nivel-3a': '#10B981',   // Verde
  'nivel-4s': '#F59E0B',   // Laranja
  'success': '#22C55E',    // Verde sucesso
  'warning': '#F59E0B',    // Laranja aviso
  'error': '#EF4444',      // Vermelho erro
}
```

### Cores Neutras (Tailwind Padrão)

- **Backgrounds claros:** `bg-neutral-50`, `bg-neutral-100`
- **Backgrounds escuros:** `bg-neutral-800`, `bg-neutral-900`, `bg-black`
- **Textos claros:** `text-neutral-700`, `text-neutral-900`
- **Textos escuros:** `text-neutral-300`, `text-neutral-100`
- **Bordas:** `border-neutral-200 dark:border-neutral-700`

### Uso de Cores por Contexto

**Página de Nível 1:**
- Hero: `from-nivel-1 to-blue-600`
- Links: `text-nivel-1 hover:text-blue-700`
- Botões primários: `bg-nivel-1`
- Bordas de destaque: `border-nivel-1`

**Página de Nível 2:**
- Hero: `from-nivel-2 to-purple-700`
- Links: `text-nivel-2 hover:text-purple-700`
- Botões primários: `bg-nivel-2`
- Bordas de destaque: `border-nivel-2`

*E assim por diante para 3A e 3S...*

---

## 📱 Responsividade

### Breakpoints Tailwind

- **sm:** 640px (tablets pequenos)
- **md:** 768px (tablets)
- **lg:** 1024px (laptops)
- **xl:** 1280px (desktops)
- **2xl:** 1536px (monitores grandes)

### Padrões Mobile-First

**Navbar:**
- Mobile: Menu hambúrguer
- Desktop (md+): Links horizontais

**Grid de conteúdo:**
- Mobile: 1 coluna
- Tablet (md): 2 colunas
- Desktop (lg): 3-4 colunas

**Tipografia:**
- Mobile: `text-3xl` para h1
- Desktop: `lg:text-5xl` para h1

**Spacing:**
- Mobile: `px-4`
- Tablet: `sm:px-6`
- Desktop: `lg:px-8`

### Container Padrão

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Conteúdo -->
</div>
```

**Sempre usar:**
- `max-w-7xl` - Largura máxima (1280px)
- `mx-auto` - Centralizado
- `px-4 sm:px-6 lg:px-8` - Padding responsivo

---

## 🌓 Dark Mode

### Implementação

**Sistema:** Class-based (`.dark` no `<html>`)
**Storage:** localStorage (`theme`)
**Fallback:** Detecta preferência do sistema

### Classes Dark Mode

Sempre incluir variante dark:

```html
<!-- Background -->
<div class="bg-white dark:bg-neutral-800">

<!-- Texto -->
<p class="text-neutral-900 dark:text-neutral-100">

<!-- Borda -->
<div class="border border-neutral-200 dark:border-neutral-700">
```

### JavaScript Necessário

```javascript
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  html.classList.add('dark');
} else if (currentTheme === 'light') {
  html.classList.remove('dark');
} else {
  // System preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Toggle on click
themeToggle.addEventListener('click', function() {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
```

**Incluir em:** `app.js` ou inline na página

---

## ✏️ Tipografia

### Fonte Principal: Inter

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Pesos de Fonte

- **400 (Regular):** Texto normal
- **500 (Medium):** Ênfase leve
- **600 (Semibold):** Subtítulos
- **700 (Bold):** Títulos
- **800 (Extrabold):** Títulos de destaque

### Hierarquia de Títulos

```html
<!-- H1 - Título da Página -->
<h1 class="text-4xl lg:text-5xl font-bold">

<!-- H2 - Seções Principais -->
<h2 class="text-3xl font-bold">

<!-- H3 - Subseções -->
<h3 class="text-xl font-bold">

<!-- H4 - Sub-subseções -->
<h4 class="text-lg font-semibold">

<!-- Texto normal -->
<p class="text-neutral-700 dark:text-neutral-300">
```

---

## 🎯 Componentes Reutilizáveis

### Card Padrão

```html
<div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 border-2 border-transparent hover:border-[COR] transition-all">
  <!-- Conteúdo do card -->
</div>
```

**Características:**
- Background: branco/escuro
- Bordas arredondadas: `rounded-xl`
- Sombra: `shadow-lg`
- Padding: `p-8`
- Hover com borda colorida
- Transições suaves

### Botão Primário

```html
<button class="px-6 py-3 bg-[COR] text-white rounded-lg font-semibold hover:opacity-90 transition-all">
  Texto do Botão
</button>
```

### Botão Secundário (Outline)

```html
<button class="px-6 py-3 bg-transparent border-2 border-[COR] text-[COR] rounded-lg font-semibold hover:bg-[COR] hover:text-white transition-all">
  Texto do Botão
</button>
```

### Badge/Tag

```html
<span class="inline-block px-3 py-1 bg-[COR]/10 text-[COR] rounded-full text-sm font-semibold">
  Badge
</span>
```

### Alert/Destaque

```html
<div class="bg-[COR]/10 border-l-4 border-[COR] p-6 rounded-lg">
  <h3 class="font-bold text-[COR] mb-2">Título</h3>
  <p class="text-neutral-700 dark:text-neutral-300">Conteúdo</p>
</div>
```

---

## 🔧 Configuração Obrigatória

### Tailwind CSS CDN + Config

```html
<script src="https://cdn.tailwindcss.com"></script>

<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'nivel-1': '#3B82F6',
          'nivel-2': '#9b59b6',
          'nivel-3a': '#10B981',
          'nivel-4s': '#F59E0B',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        fontFamily: {
          sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        },
      }
    }
  }
</script>
```

### CSS Global

```html
<style>
  * {
    transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out, color 200ms ease-in-out;
  }
  .preload * {
    transition: none !important;
  }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
</style>
```

### Meta Tags Obrigatórias

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Título da Página] | FEI</title>
  <meta name="description" content="[Descrição da página]">
</head>
```

---

## 📁 Estrutura de Arquivos

```
projeto/
├── index.html              # Homepage
├── niveis/
│   ├── nivel-1.html        # Página do Nível 1
│   ├── nivel-2.html        # Página do Nível 2
│   ├── nivel-3a.html       # Página do Nível 3A
│   └── nivel-4s.html       # Página do Nível 4S
├── modulos/
│   ├── nivel-1-modulo-1.html
│   ├── nivel-2-modulo-1.html
│   └── ...
├── downloads/
│   ├── nivel-1-modulo-1.md
│   └── ...
├── js/
│   └── app.js              # JavaScript global
└── assets/                 # Imagens, ícones, etc. (opcional)
```

---

## ✅ Checklist de Implementação

Use ao criar uma nova página:

### Estrutura Base
- [ ] DOCTYPE e html lang="pt-BR"
- [ ] Meta tags (charset, viewport, title, description)
- [ ] Tailwind CSS CDN incluído
- [ ] Tailwind config customizado
- [ ] Google Fonts (Inter) incluído
- [ ] CSS global com transições
- [ ] Body com class `preload`
- [ ] Dark mode classes (`dark:`)

### Componentes
- [ ] Navbar sticky com logo e links
- [ ] Botão de dark mode funcionando
- [ ] Menu mobile responsivo
- [ ] Breadcrumb (se aplicável)
- [ ] Hero section com gradiente correto
- [ ] Content area com container padrão
- [ ] Footer com 3 colunas e copyright
- [ ] JavaScript incluído (app.js)

### Responsividade
- [ ] Layout mobile-first
- [ ] Breakpoints responsivos (sm, md, lg)
- [ ] Container: max-w-7xl mx-auto
- [ ] Padding responsivo: px-4 sm:px-6 lg:px-8
- [ ] Tipografia responsiva
- [ ] Grid responsivo

### Acessibilidade
- [ ] aria-label nos componentes de navegação
- [ ] Links com hover states
- [ ] Contraste adequado (WCAG AA)
- [ ] Scroll suave (scroll-smooth)

### Cores e Estilos
- [ ] Cor do nível aplicada corretamente
- [ ] Dark mode em todos os componentes
- [ ] Transições suaves
- [ ] Sombras e bordas arredondadas consistentes

---

## 🎯 Regras de Ouro

1. **Consistência Visual:** Mesma estrutura em todas as páginas
2. **Mobile-First:** Sempre desenvolver para mobile primeiro
3. **Dark Mode:** Sempre incluir variante `dark:`
4. **Container Padrão:** Sempre `max-w-7xl mx-auto`
5. **Cores do Nível:** Use a cor específica do nível
6. **Navbar Sticky:** Sempre fixo no topo
7. **Footer Completo:** Sempre com links para todos os níveis
8. **Transições:** Sempre suaves (200ms ease-in-out)
9. **Tipografia:** Sempre Inter com pesos variados
10. **Acessibilidade:** Sempre pensar em contraste e semântica

---

## 💡 Exemplo de Página Completa

Ver arquivos de referência:
- `/index.html` - Homepage
- `/niveis/nivel-1.html` - Página de nível
- `/modulos/nivel-2-modulo-1.html` - Página de módulo

---

## 📝 Como Usar Este Documento

**Para criar uma nova página:**

1. Copie a estrutura base de uma página existente
2. Ajuste as cores para o nível apropriado
3. Implemente navbar, hero, content, footer
4. Valide com o checklist acima
5. Teste responsividade e dark mode
6. Teste navegação mobile

**Para dar instruções:**

*"Crie uma nova página seguindo PADRAO_LAYOUT_NAVEGACAO.md usando cor verde (Nível 3A)"*

---

**Versão:** 1.0
**Criado por:** Claude Code
**Projeto:** FEI - Formação em Engenharia de Intenção
**Data:** Janeiro 2025
