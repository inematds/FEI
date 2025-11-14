# 📋 Padrão de Módulos Interativos

**Versão:** 1.0
**Última atualização:** Janeiro 2025
**Aplicável a:** Páginas de níveis, cursos, documentação educacional

---

## 🎯 Visão Geral

Este documento define o **padrão completo** para criar páginas de módulos educacionais interativos com tópicos expandíveis, modais, links para conteúdo completo e downloads.

Use esta especificação sempre que precisar criar uma página de nível/curso com múltiplos módulos.

## 📌 Resumo Executivo (TL;DR)

**Na página do nível (ex: nivel-2.html) - Cada módulo DEVE ter:**
- ✅ 3 botões: Modal (resumo), Completo (página full), Download (MD)
- ✅ 5-10 tópicos clicáveis expandíveis
- ✅ Cada tópico: 3 respostas (O que é, Por que, Conceitos)
- ✅ 1 modal com resumo de 300-500 palavras

**Na página completa do módulo (ex: nivel-2-modulo-1.html) - DEVE ter:**
- ✅ Navbar no topo (com link para início e nível)
- ✅ Breadcrumb (Início / Nível X / Módulo Y)
- ✅ Botão "Download MD" no topo do conteúdo
- ✅ Navegação no rodapé: "← Voltar ao Nível" + "Próximo Módulo →"
- ✅ Footer com links para todos os níveis

---

## 📐 Estrutura de Cards de Módulos

### Visual e Layout

Cada módulo deve ser apresentado como um **card completo** com:

```html
<div class="chapter-card bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 mb-8 border-2 border-transparent hover:border-[COR-DO-NIVEL] transition-all">
  <!-- Conteúdo do módulo -->
</div>
```

**Classes CSS obrigatórias:**
- `.chapter-card` - Identificador do card de módulo
- `bg-white dark:bg-neutral-800` - Fundo claro/escuro
- `rounded-2xl` - Bordas arredondadas
- `shadow-lg` - Sombra
- `p-8` - Padding interno
- `mb-8` - Margem inferior entre cards
- `border-2 border-transparent` - Borda transparente por padrão
- `hover:border-[COR]` - Borda colorida no hover
- `transition-all` - Transição suave

**Cores por nível:**
- Nível 1: `hover:border-nivel-1` (#3B82F6 - azul)
- Nível 2: `hover:border-nivel-2` (#9b59b6 - roxo)
- Nível 3A: `hover:border-nivel-3a` (#10B981 - verde)
- Nível 3S: `hover:border-nivel-3s` (#F59E0B - laranja)

---

## 🏷️ Cabeçalho do Módulo

Cada card deve ter:

1. **Badge do módulo** (número)
2. **Título principal**
3. **Subtítulo descritivo**

```html
<div class="mb-6">
  <span class="inline-block px-3 py-1 bg-[COR]/10 text-[COR] rounded-full text-sm font-semibold mb-3">
    Módulo X
  </span>
  <h2 class="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
    📘 [Título do Módulo]
  </h2>
  <p class="text-neutral-600 dark:text-neutral-400">
    [Subtítulo/Descrição]
  </p>
</div>
```

**Substitua `[COR]` pela cor do nível:**
- `nivel-1`, `nivel-2`, `nivel-3a`, ou `nivel-3s`

---

## 🔘 Botões de Ação (3 obrigatórios)

Cada módulo DEVE ter exatamente **3 botões**:

### 1. Botão "Ver em Modal" (PRIMARY)

```html
<button onclick="openModal('modulo-X')" class="px-6 py-3 bg-[COR] text-white rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2">
  <span>📖</span>
  <span>Ver em Modal</span>
</button>
```

**Função:** Abre modal com resumo do módulo
**Cor:** Background na cor do nível
**Texto:** Branco sempre
**Ícone:** 📖 (livro aberto)

### 2. Botão "Abrir Página Completa" (SECONDARY)

```html
<a href="../modulos/[nivel]-modulo-X.html" class="px-6 py-3 bg-transparent border-2 border-[COR] text-[COR] dark:text-[COR] rounded-lg font-semibold hover:bg-[COR] hover:text-white transition-all flex items-center gap-2">
  <span>📄</span>
  <span>Abrir Página Completa</span>
</a>
```

**Função:** Link para HTML expandido do módulo
**Estilo:** Borda colorida, background transparente
**Hover:** Inverte para background colorido com texto branco
**Ícone:** 📄 (documento)

### 3. Botão "Download MD" (TERTIARY)

```html
<a href="../downloads/[nivel]-modulo-X.md" download class="px-6 py-3 bg-transparent border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all flex items-center gap-2">
  <span>📥</span>
  <span>Download MD</span>
</a>
```

**Função:** Download do arquivo Markdown
**Estilo:** Cinza neutro, sem cor do nível
**Atributo:** `download` para forçar download
**Ícone:** 📥 (seta para baixo)

### Container dos Botões

```html
<div class="flex flex-wrap gap-3 mb-6">
  <!-- 3 botões aqui -->
</div>
```

**Classes obrigatórias:**
- `flex flex-wrap` - Layout flexível que quebra linha
- `gap-3` - Espaçamento entre botões
- `mb-6` - Margem inferior

---

## 📚 Tópicos Clicáveis (Expandíveis)

### Estrutura Geral

Cada módulo deve ter **mínimo 5 a 10 tópicos** principais:

```html
<div class="mb-4">
  <h3 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-3 text-lg">
    📚 Tópicos-chave do módulo:
  </h3>

  <ul class="topics-list space-y-0.5">
    <!-- Tópicos aqui -->
  </ul>
</div>
```

### Estrutura de Cada Tópico

```html
<li class="topic-item" data-topic="mX-Y">
  <button class="topic-button w-full text-left px-4 py-1 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg transition-colors font-medium text-neutral-800 dark:text-neutral-200">
    [Ícone] [Nome do Tópico]
  </button>
  <div class="topic-explanation hidden ml-6 mt-2 p-4 bg-[COR]-50 dark:bg-[COR]-900/20 rounded-lg border-l-4 border-[COR]">
    <p class="text-sm mb-1.5 text-neutral-700 dark:text-neutral-300">
      <strong class="text-[COR]">O que é:</strong> [Definição clara do conceito]
    </p>
    <p class="text-sm mb-1.5 text-neutral-700 dark:text-neutral-300">
      <strong class="text-[COR]">Por que aprender:</strong> [Relevância prática]
    </p>
    <p class="text-sm text-neutral-700 dark:text-neutral-300">
      <strong class="text-[COR]">Conceitos chave:</strong> [Lista de termos separados por vírgula]
    </p>
  </div>
</li>
```

**Substitua:**
- `X` = número do módulo
- `Y` = número do tópico
- `[COR]` = cor do nível (blue/purple/green/orange)
- `[Ícone]` = emoji relevante ao tópico
- `[Nome do Tópico]` = título do tópico

### ⚠️ REGRAS PARA TÍTULOS DOS TÓPICOS

**OBRIGATÓRIO: Títulos devem ser CURTOS e diretos (1 linha)**

**Formato:**
```
[Emoji] [Título curto e objetivo]
```

**Tamanho máximo:**
- 3 a 6 palavras no máximo
- Deve caber em 1 linha em telas de celular
- Objetivo e direto ao ponto

**✅ Exemplos CORRETOS:**

- `🔥 Exemplo: Criar um plano de marketing`
- `📅 A história completa: De GPT-3 a GPT-5`
- `🧠 O que mudou nos modelos modernos`
- `❌ Técnicas obsoletas que não funcionam`
- `📊 Agentes de Informação (3 tipos)`
- `🎯 Elemento 1: Objetivo Primário`
- `💻 Seus Primeiros Agentes na Prática`
- `🚀 Multiagentes > Agente Único`

**❌ Exemplos ERRADOS (muito longos):**

- ❌ `A Evolução da IA: Do Respondente ao Autônomo` (muito longo!)
- ❌ `Taxonomia: Chatbots vs Assistentes vs Agentes vs Sistemas` (muito longo!)
- ❌ `Por Que Especialização Importa em Sistemas de Agentes` (muito longo!)
- ❌ `Elementos 4-8: Validação, Ações, Comunicação com Usuário e Comunicação Inter-agentes` (muito longo!)

**Regra de ouro:** Se o título tem mais de 50 caracteres, está muito longo. Encurte!

**Dica:** Use abreviações, símbolos ou agrupe conceitos:
- Em vez de: "A Evolução da IA: Do Respondente ao Autônomo"
- Use: "📅 Da IA Respondente à IA Autônoma"

- Em vez de: "Taxonomia: Chatbots vs Assistentes vs Agentes"
- Use: "🏷️ Chatbots vs Assistentes vs Agentes"

- Em vez de: "Por Que Especialização Importa em Sistemas"
- Use: "🎭 Especialista vs Generalista"

### Cores de Fundo da Explicação

**Para cada nível, use:**
- Nível 1: `bg-blue-50 dark:bg-blue-900/20` + `border-nivel-1`
- Nível 2: `bg-purple-50 dark:bg-purple-900/20` + `border-nivel-2`
- Nível 3A: `bg-green-50 dark:bg-green-900/20` + `border-nivel-3a`
- Nível 3S: `bg-orange-50 dark:bg-orange-900/20` + `border-nivel-3s`

### Conteúdo Obrigatório em Cada Tópico

Cada explicação DEVE ter exatamente **3 parágrafos**:

1. **"O que é:"** - Definição clara e objetiva (1-2 linhas)
2. **"Por que aprender:"** - Relevância prática/profissional (1-2 linhas)
3. **"Conceitos chave:"** - Lista de termos separados por vírgula

### Comportamento de Expansão

- Por padrão: explicação `.hidden` (escondida)
- Ao clicar no botão: remove `.hidden` da explicação
- Sistema **accordion**: fecha outros tópicos do mesmo módulo
- JavaScript necessário (já incluído em `app.js`)

---

## 🪟 Modais (Pop-ups)

### Estrutura de Cada Modal

Cada módulo DEVE ter um modal correspondente:

```html
<!-- Modal Módulo X -->
<div id="modulo-X" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        📘 Módulo X: [Título do Módulo]
      </h2>
      <span class="close-modal">&times;</span>
    </div>
    <div class="modal-body">
      <!-- Conteúdo resumido do módulo -->
      <h3 class="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
        [Subtítulo da Seção]
      </h3>
      <p class="text-neutral-700 dark:text-neutral-300 mb-4">
        [Parágrafo explicativo]
      </p>
      <!-- Mais seções conforme necessário -->
    </div>
  </div>
</div>
```

### CSS Obrigatório no `<style>`

```css
.modal {
  display: none;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
}

.modal.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px rgba(0,0,0,0.3);
}

.dark .modal-content {
  background-color: #1f2937;
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .modal-header {
  border-bottom-color: #374151;
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

.close-modal {
  color: #9ca3af;
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
}

.close-modal:hover {
  color: #ef4444;
}
```

### Conteúdo do Modal

O modal deve conter:

1. **Resumo geral** do módulo (2-3 parágrafos)
2. **Seções principais** com `<h3>` (2-4 seções)
3. **Listas ou exemplos** quando aplicável
4. **Sem código completo** - apenas conceitos resumidos

**Tamanho ideal:** 300-500 palavras (resumo executivo)

### JavaScript Necessário

Incluir no arquivo ou usar `app.js` existente:

```javascript
// Open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Event listeners
document.addEventListener('click', function(e) {
  // Close on X button
  if (e.target.classList.contains('close-modal')) {
    const modal = e.target.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  // Close on backdrop click
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});
```

---

## 🧭 Navegação nas Páginas Completas dos Módulos

Cada página completa de módulo (ex: `nivel-2-modulo-1.html`) DEVE ter navegação completa.

### 1. Navbar no Topo

```html
<nav class="sticky top-0 z-50 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex items-center">
        <a href="../index.html" class="text-2xl font-bold bg-gradient-to-r from-nivel-1 to-nivel-2 bg-clip-text text-transparent">
          FEI - Engenharia de Intencao
        </a>
      </div>
      <div class="hidden md:flex items-center space-x-8">
        <a href="../index.html" class="text-neutral-700 dark:text-neutral-300 hover:text-nivel-2">Inicio</a>
        <a href="../niveis/nivel-2.html" class="text-neutral-700 dark:text-neutral-300 hover:text-nivel-2">Nivel 2</a>
        <button id="theme-toggle" class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
          <!-- SVG icons -->
        </button>
      </div>
    </div>
  </div>
</nav>
```

**Obrigatório:**
- Link para `../index.html` (Início)
- Link para `../niveis/nivel-X.html` (Nível atual)
- Botão de dark mode toggle
- Sticky no topo (position sticky)

### 2. Breadcrumb (Migalhas de Pão)

```html
<div class="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <nav class="flex text-sm" aria-label="Breadcrumb">
      <a href="../index.html" class="text-nivel-2 hover:text-purple-700">Inicio</a>
      <span class="mx-2 text-neutral-400">/</span>
      <a href="../niveis/nivel-2.html" class="text-nivel-2 hover:text-purple-700">Nivel 2</a>
      <span class="mx-2 text-neutral-400">/</span>
      <span class="text-neutral-600 dark:text-neutral-400">Modulo X</span>
    </nav>
  </div>
</div>
```

**Caminho obrigatório:**
1. Início (clicável)
2. Nível X (clicável)
3. Módulo Y (não clicável - página atual)

### 3. Botão de Download no Topo do Conteúdo

Logo após o hero/cabeçalho do módulo:

```html
<div class="flex justify-end mb-6">
  <a href="../downloads/nivel-2-modulo-1.md" download class="px-6 py-3 bg-nivel-2 text-white rounded-lg font-semibold hover:bg-purple-600 inline-flex items-center gap-2">
    <span>Download MD</span>
  </a>
</div>
```

**Posicionamento:** Canto superior direito, antes do conteúdo principal

### 4. Navegação Entre Módulos (Rodapé do Conteúdo)

Após todo o conteúdo, antes do footer:

```html
<div class="bg-gradient-to-r from-nivel-2 to-purple-600 text-white rounded-xl p-8">
  <h2 class="text-3xl font-bold mb-4">Conclusao do Modulo</h2>
  <p class="text-lg mb-6">
    Voce dominou os conceitos essenciais de [Título do Módulo].
  </p>
  <div class="flex gap-4">
    <a href="../niveis/nivel-2.html" class="px-6 py-3 bg-white dark:bg-neutral-800 text-nivel-2 rounded-lg font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700">
      ← Voltar ao Nível 2
    </a>
    <a href="nivel-2-modulo-2.html" class="px-6 py-3 bg-nivel-2 text-white rounded-lg font-semibold hover:opacity-90">
      Módulo 2 →
    </a>
  </div>
</div>
```

**Regras de navegação:**

**Para o primeiro módulo (módulo 1):**
- Botão esquerdo: "← Voltar ao Nível X" (link para página do nível)
- Botão direito: "Módulo 2 →" (próximo módulo)

**Para módulos intermediários (2 até N-1):**
- Botão esquerdo: "← Módulo X" (módulo anterior)
- Botão direito: "Módulo Y →" (próximo módulo)

**Para o último módulo (módulo N):**
- Botão esquerdo: "← Módulo X" (módulo anterior)
- Botão direito: "Voltar ao Nível →" (link para página do nível)

### 5. Footer com Links para Todos os Níveis

```html
<footer class="bg-neutral-900 dark:bg-black text-neutral-300 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-xl font-bold text-white mb-4">FEI - Engenharia de Intencao</h3>
        <p class="text-sm">Formacao completa para dominar a nova era da IA</p>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-4">Niveis</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="../niveis/nivel-1.html" class="hover:text-white">Nivel 1: Fundamentos</a></li>
          <li><a href="../niveis/nivel-2.html" class="hover:text-white">Nivel 2: Programa Completo</a></li>
          <li><a href="../niveis/nivel-3a.html" class="hover:text-white">Nivel 3A: Agentes</a></li>
          <li><a href="../niveis/nivel-3s.html" class="hover:text-white">Nivel 3S: Sistemas 2026</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-4">Links</h4>
        <ul class="space-y-2 text-sm">
          <li><a href="../index.html" class="hover:text-white">Inicio</a></li>
          <li><a href="../niveis/nivel-X.html" class="hover:text-white">Voltar ao Nivel X</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
      <p>&copy; 2025 FEI - Formacao em Engenharia de Intencao.</p>
    </div>
  </div>
</footer>
```

**Obrigatório:**
- Links para TODOS os níveis do curso
- Link "Voltar ao Nível X" específico
- Copyright e ano atual

### Resumo dos Pontos de Navegação

Uma página completa de módulo tem **5 pontos de navegação**:

1. **Navbar** → Início + Nível atual
2. **Breadcrumb** → Início / Nível / Módulo
3. **Download MD** → Download do conteúdo
4. **Navegação entre módulos** → Anterior ← | → Próximo
5. **Footer** → Links para todos os níveis

---

## 🎨 Tailwind Config Obrigatório

Incluir no `<script>` da página:

```javascript
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'nivel-1': '#3B82F6',
        'nivel-2': '#9b59b6',
        'nivel-3a': '#10B981',
        'nivel-3s': '#F59E0B',
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
```

---

## 📁 Estrutura de Arquivos Necessária

Para que tudo funcione, você precisa ter:

```
projeto/
├── niveis/
│   └── nivel-X.html          ← Página principal (esta especificação)
├── modulos/
│   ├── nivel-X-modulo-1.html ← Páginas completas dos módulos
│   ├── nivel-X-modulo-2.html
│   └── ...
├── downloads/
│   ├── nivel-X-modulo-1.md   ← Arquivos Markdown para download
│   ├── nivel-X-modulo-2.md
│   └── ...
└── js/
    └── app.js                 ← JavaScript compartilhado
```

**Arquivos obrigatórios:**
- ✅ Página HTML do nível (ex: `nivel-2.html`)
- ✅ HTMLs completos de cada módulo (ex: `nivel-2-modulo-1.html`)
- ✅ Arquivos MD de cada módulo (ex: `nivel-2-modulo-1.md`)
- ✅ Arquivo `app.js` com funções de modal e tópicos

---

## ✅ Checklist de Implementação

Use este checklist ao criar uma nova página de nível:

### Por Módulo

- [ ] Card com `.chapter-card` e hover effect na cor do nível
- [ ] Badge do módulo com número
- [ ] Título principal (h2) com emoji 📘
- [ ] Subtítulo descritivo
- [ ] **3 botões de ação:**
  - [ ] Botão "Ver em Modal" (onclick)
  - [ ] Botão "Abrir Página Completa" (link HTML)
  - [ ] Botão "Download MD" (link com download)
- [ ] **5-10 tópicos clicáveis:**
  - [ ] Cada tópico com emoji relevante
  - [ ] Sistema de expansão/accordion
  - [ ] 3 parágrafos por explicação (O que é, Por que, Conceitos)
  - [ ] Cores corretas do nível
- [ ] **Modal correspondente:**
  - [ ] ID correto (`modulo-X`)
  - [ ] Header com título e botão fechar
  - [ ] Body com conteúdo resumido (300-500 palavras)
  - [ ] Seções com h3 e parágrafos

### Por Página

- [ ] Hero section com título, subtítulo e estatísticas
- [ ] Breadcrumb navigation
- [ ] Navbar com dark mode toggle
- [ ] Footer com links para outros níveis
- [ ] CSS de modais incluído no `<style>`
- [ ] Tailwind config com cores dos níveis
- [ ] JavaScript incluído (`<script src="../js/app.js"></script>`)
- [ ] Todos os modais posicionados antes do `</body>`

---

## 🎯 Regras de Ouro

1. **Consistência Visual:** Todos os módulos devem seguir exatamente o mesmo padrão
2. **Sempre 3 Botões:** Nunca menos, nunca mais
3. **Mínimo 5 Tópicos:** Cada módulo deve ter pelo menos 5 tópicos clicáveis
4. **Explicação Tripla:** Sempre "O que é" + "Por que" + "Conceitos chave"
5. **Modal Resumido:** 300-500 palavras, não o conteúdo completo
6. **Cores do Nível:** Use consistentemente a cor definida para o nível
7. **Dark Mode:** Sempre incluir variantes dark: para todos os componentes
8. **Responsivo:** Layout deve funcionar em mobile (flex-wrap nos botões)

---

## 🔧 Detalhes Técnicos

### IDs e Classes Importantes

- `.chapter-card` - Container do módulo
- `.topic-item` - Item da lista de tópicos
- `.topic-button` - Botão clicável do tópico
- `.topic-explanation` - Div da explicação (inicialmente hidden)
- `.topics-list` - Lista (ul) de tópicos
- `.modal` - Container do modal
- `.modal-content` - Conteúdo interno do modal
- `.close-modal` - Botão X de fechar

### Atributos Data

- `data-topic="mX-Y"` - Identificador único do tópico (módulo X, tópico Y)

### Funções JavaScript

- `openModal(modalId)` - Abre modal por ID
- `closeModal(modalId)` - Fecha modal por ID
- Event listener de clique em `.topic-button` (accordion behavior)

---

## 💡 Exemplo Completo de Referência

Ver arquivo: `/niveis/nivel-1.html` ou `/niveis/nivel-2.html` para implementação completa seguindo este padrão.

---

## 📝 Como Usar Este Documento

**Para criar uma nova página:**

1. Copie a estrutura HTML de `nivel-1.html` ou `nivel-2.html`
2. Substitua as cores (`nivel-X`) pela cor do seu nível
3. Para cada módulo:
   - Atualize número, título, subtítulo
   - Crie 3 botões (modal, completo, download)
   - Liste 5-10 tópicos com explicações triplas
   - Crie modal correspondente com resumo
4. Valide com o checklist acima
5. Teste:
   - Clique em cada tópico (deve expandir/recolher)
   - Abra cada modal (botão, backdrop, ESC devem fechar)
   - Teste dark mode
   - Teste em mobile

**Para dar instruções a outra pessoa (ou IA):**

Diga: *"Implemente a estrutura conforme o documento PADRAO_MODULOS_INTERATIVOS.md, usando [cor do nível] e criando [número] módulos."*

---

**Versão:** 1.0
**Criado por:** Claude Code
**Projeto:** FEI - Formação em Engenharia de Intenção
**Data:** Janeiro 2025
