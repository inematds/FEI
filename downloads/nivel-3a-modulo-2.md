# Módulo 2: Engenharia de Intenção Aplicada a Agentes
## Nível 3A - Agentes e Sistemas Autônomos na Engenharia de Intenção

**FEI - Formação em Engenharia de Intenção**

---

## Introdução

No módulo anterior, você entendeu o que são agentes e como eles funcionam. Agora vamos para a parte crítica: **como criar agentes que realmente funcionam usando Engenharia de Intenção**.

A diferença entre um agente que funciona 50% das vezes e um que funciona 95% das vezes está na clareza de intenção. Este módulo vai te ensinar os 8 elementos fundamentais que todo agente precisa ter.

### Por Que Agentes Falham

A maioria dos agentes falha por problemas de design, não de tecnologia:

```
Agente mal projetado:
"Você é um assistente de marketing. Ajude o usuário."

Problema: O que significa "ajudar"? Quais limites? Que formato de saída?
Resultado: Agente confuso, saídas inconsistentes, não sabe quando parar.

Agente bem projetado com Engenharia de Intenção:
"Você é o Agente Analista de Campanhas. Sua missão é avaliar
performance de campanhas de marketing digital. Você SEMPRE analisa
estes 5 KPIs: CTR, CPC, conversões, ROI, engajamento. Você NUNCA
dá recomendações criativas (isso é responsabilidade do Agente
Criativo). Sua saída é SEMPRE uma tabela comparativa + lista
ranqueada de campanhas + 3 insights principais."

Resultado: Agente focado, consistente, colabora bem com outros.
```

---

## Os 8 Elementos Que Cada Agente Precisa

### 1. Objetivo Primário

**O que é:**
A razão de existir do agente. O que ele está tentando alcançar?

**Por que importa:**
Sem objetivo claro, agente não consegue avaliar se está tendo sucesso.

**Como definir:**

```markdown
Template:
O objetivo deste agente é: [VERBO DE AÇÃO] + [O QUÊ] + [PARA QUEM/ONDE]

Exemplos ruins:
❌ "Ajudar com vendas"
❌ "Ser útil ao time de marketing"
❌ "Processar informações"

Por quê são ruins?
- Muito vago
- Não mensurável
- Não tem escopo claro

Exemplos bons:
✅ "Analisar performance de campanhas de email marketing e identificar
    as 3 mais efetivas baseado em taxa de conversão"

✅ "Gerar 5 variações de copy para anúncios de Facebook otimizadas
    para público 25-35 anos interessado em fitness"

✅ "Revisar documentos técnicos e garantir que todos os requisitos
    de segurança da empresa estejam presentes"

Por quê são bons?
- Ação específica (analisar, gerar, revisar)
- Escopo claro (email marketing, anúncios Facebook, docs técnicos)
- Critério de sucesso embutido (top 3, 5 variações, todos requisitos)
```

**Exemplo completo:**

```
Agente: Pesquisador de Mercado

Objetivo Primário:
"Coletar e sintetizar informações sobre concorrentes no mercado de
SaaS B2B, focando em: precificação, features principais, público-alvo,
e estratégia de posicionamento. Entregar análise comparativa que permita
tomada de decisão estratégica sobre entrada no mercado."

Medida de sucesso:
- Mínimo 5 concorrentes analisados
- Todas as 4 dimensões cobertas para cada um
- Análise comparativa em formato de tabela
- Pelo menos 3 insights estratégicos identificados
```

---

### 2. Intenção (Qual o Papel no Sistema)

**O que é:**
Como este agente se encaixa no ecossistema maior. Qual sua função no fluxo de trabalho.

**Por que importa:**
Agentes não trabalham sozinhos. Precisam saber onde começam e onde terminam suas responsabilidades.

**Como definir:**

```markdown
Template:
Este agente atua como [PAPEL] no processo de [PROCESSO].
Ele recebe [INPUT] de [FONTE] e entrega [OUTPUT] para [DESTINO].

Exemplo - Sistema de Criação de Conteúdo:

Agente 1: Pesquisador
Intenção: "Atua como INICIADOR do pipeline de conteúdo.
Recebe tópico do usuário e entrega dados brutos + fontes para
o Agente Estruturador."

Agente 2: Estruturador
Intenção: "Atua como ORGANIZADOR intermediário.
Recebe dados brutos do Pesquisador e entrega outline estruturado
para o Agente Escritor."

Agente 3: Escritor
Intenção: "Atua como EXECUTOR criativo.
Recebe outline do Estruturador e entrega rascunho completo para
o Agente Revisor."

Agente 4: Revisor
Intenção: "Atua como FINALIZADOR de qualidade.
Recebe rascunho do Escritor e entrega versão final polida para
o usuário."
```

**Exemplo com fluxo visual:**

```
Sistema: Análise e Resposta de Tickets de Suporte

┌─────────────────────────────────────────────────────────┐
│  AGENTE CLASSIFICADOR                                   │
│  Intenção: Porta de entrada. Triagem de todos tickets. │
│  Input: Ticket bruto do cliente                         │
│  Output: Ticket + tags (urgência, categoria, sentimento)│
└────────────┬────────────────────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼──────────┐  ┌──▼─────────────┐
│ AGENTE       │  │ AGENTE         │
│ RESOLVEDOR   │  │ ESCALADOR      │
│ Intenção:    │  │ Intenção:      │
│ Solucionar   │  │ Encaminhar     │
│ tickets      │  │ tickets        │
│ simples      │  │ complexos      │
│ (FAQ)        │  │ para humano    │
└──────────────┘  └────────────────┘
```

---

### 3. Critérios de Qualidade

**O que é:**
Como o agente sabe se o trabalho dele está bom. Quais são os padrões.

**Por que importa:**
Sem critérios claros, agente não consegue se auto-avaliar e melhorar.

**Como definir:**

```markdown
Template:
Uma saída de qualidade deste agente DEVE:
1. [Critério objetivo 1]
2. [Critério objetivo 2]
3. [Critério objetivo 3]

Uma saída NUNCA deve:
1. [Anti-padrão 1]
2. [Anti-padrão 2]

Exemplo - Agente Escritor de Blog Posts:

Critérios de qualidade OBRIGATÓRIOS:
✅ Entre 800-1200 palavras
✅ Mínimo 3 subtítulos (H2)
✅ Pelo menos 1 exemplo prático por seção
✅ Tom conversacional mas profissional
✅ Chamada para ação clara no final
✅ Todas as afirmações técnicas com fonte

Critérios PROIBIDOS (nunca fazer):
❌ Jargões não explicados
❌ Parágrafos com mais de 5 linhas
❌ Começar com "Você já parou para pensar..."
❌ Usar chavões de marketing vazio ("revolucionário", "único")
❌ Deixar promessas sem suporte de dados
```

**Exemplo avançado com checklist:**

```
Agente: Analista de Dados Financeiros

Checklist de qualidade:
┌──────────────────────────────────────────┬─────┐
│ CRITÉRIO                                 │ OK? │
├──────────────────────────────────────────┼─────┤
│ Dados dos últimos 12 meses incluídos     │ [ ] │
│ Mínimo 3 métricas analisadas             │ [ ] │
│ Comparação com período anterior          │ [ ] │
│ Tendências identificadas                 │ [ ] │
│ Outliers explicados                      │ [ ] │
│ Visualização (gráfico) incluída          │ [ ] │
│ Conclusão com próximos passos            │ [ ] │
│ Fontes de dados citadas                  │ [ ] │
│ Margens de erro especificadas            │ [ ] │
│ Nenhuma informação sensível exposta      │ [ ] │
└──────────────────────────────────────────┴─────┘

Se QUALQUER item não for marcado → output é REJEITADO
```

---

### 4. Contexto Funcional

**O que é:**
As informações de fundo que o agente precisa para funcionar bem.

**Por que importa:**
Agente sem contexto toma decisões genéricas. Com contexto, decisões são relevantes.

**Como definir:**

```markdown
Template:
Contexto de operação:
- Indústria: [setor]
- Público-alvo: [demografia/perfil]
- Restrições: [limitações conhecidas]
- Preferências: [estilo/abordagem]
- Conhecimento prévio: [o que agente já deve saber]

Exemplo - Agente de Recomendação de Produtos:

Contexto funcional:
Indústria: E-commerce de moda feminina
Público-alvo: Mulheres 25-40 anos, classe média-alta, urbanas
Restrições:
  - Não recomendar produtos fora de estoque
  - Não sugerir itens com avaliação < 3.5 estrelas
  - Respeitar preferências de estilo salvas no perfil
Preferências:
  - Tom amigável e inclusivo
  - Explicar POR QUÊ está recomendando
  - Máximo 5 recomendações por vez
Conhecimento prévio:
  - Histórico de compras do cliente
  - Itens no carrinho atual
  - Navegação recente
  - Preferências de tamanho/cor
```

**Exemplo com contexto rico:**

```
Agente: Consultor de Vendas B2B

Contexto funcional completo:

1. INDÚSTRIA E PRODUTO
   Vendemos: Software de gestão de projetos para empresas médias
   Ticket médio: R$15k-50k/ano
   Ciclo de venda: 30-90 dias
   Principais concorrentes: Asana, Monday.com, ClickUp

2. PÚBLICO-ALVO
   Persona principal: Gerente de Projetos / PMO
   Dores típicas:
     - Equipes desorganizadas
     - Falta de visibilidade de progresso
     - Comunicação fragmentada
     - Relatórios manuais demorados

3. CONTEXTO DE CONVERSA
   Você está atuando em: Fase de descoberta (primeiro contato)
   Objetivo desta fase: Qualificar lead e agendar demo
   NÃO tente: Fechar venda ainda (muito cedo)

4. RESTRIÇÕES IMPORTANTES
   - Nunca dar desconto sem aprovação (mencionar "posso consultar")
   - Não fazer promessas de features que não existem
   - Se pergunta técnica complexa → "Deixa eu trazer nosso especialista"

5. TOM E ESTILO
   Ser: Consultivo, não "vendedor agressivo"
   Fazer: Perguntas sobre processo atual deles
   Evitar: Falar só de features, ignorar contexto do prospect
```

---

### 5. Responsabilidades Claras

**O que é:**
Lista específica do que o agente DEVE fazer e o que está sob sua alçada.

**Por que importa:**
Evita sobreposição com outros agentes e garante cobertura completa do processo.

**Como definir:**

```markdown
Template:
Este agente É responsável por:
1. [Responsabilidade específica 1]
2. [Responsabilidade específica 2]
3. [Responsabilidade específica 3]

Este agente NÃO é responsável por:
1. [O que não deve fazer 1]
2. [O que não deve fazer 2]

Exemplo - Sistema de Criação de Curso Online:

Agente Estruturador de Currículo:

É RESPONSÁVEL POR:
✅ Dividir tópico em módulos lógicos
✅ Sequenciar módulos em ordem pedagógica
✅ Definir objetivos de aprendizagem por módulo
✅ Estimar tempo necessário por módulo
✅ Criar estrutura de pré-requisitos
✅ Identificar pontos de avaliação

NÃO É RESPONSÁVEL POR:
❌ Escrever conteúdo das aulas (isso é do Agente Escritor)
❌ Criar exercícios práticos (isso é do Agente de Atividades)
❌ Gravar vídeos (isso é produção)
❌ Validar qualidade técnica do conteúdo (isso é do Agente Revisor)
```

**Exemplo com matriz de responsabilidades:**

```
Sistema: Pipeline de Conteúdo para Redes Sociais

┌──────────────────┬────────────┬──────────┬──────────┬──────────┐
│ RESPONSABILIDADE │ PESQUISADOR│ CRIATIVO │ COPYWRITER│ OTIMIZADOR│
├──────────────────┼────────────┼──────────┼──────────┼──────────┤
│ Encontrar trends │     ✓      │    -     │    -     │    -     │
│ Gerar ideias     │     -      │    ✓     │    -     │    -     │
│ Escrever copy    │     -      │    -     │    ✓     │    -     │
│ Escolher hashtags│     -      │    -     │    -     │    ✓     │
│ Definir horário  │     -      │    -     │    -     │    ✓     │
│ Revisar tom      │     -      │    ✓     │    ✓     │    -     │
│ Validar dados    │     ✓      │    -     │    -     │    -     │
└──────────────────┴────────────┴──────────┴──────────┴──────────┘

Legenda:
✓ = Responsável primário
✓✓ = Responsável secundário (apoia)
- = Não tem responsabilidade
```

---

### 6. Limites de Atuação

**O que é:**
As fronteiras que o agente não pode cruzar. O que está fora do escopo.

**Por que importa:**
Evita que agente tente fazer coisas que não deveria ou tome decisões perigosas.

**Como definir:**

```markdown
Template:
Limites deste agente:

ESCOPO:
- Pode atuar em: [domínios permitidos]
- NÃO pode atuar em: [domínios proibidos]

DECISÕES:
- Pode decidir autonomamente: [tipos de decisão]
- DEVE consultar humano para: [decisões críticas]

DADOS:
- Pode acessar: [fontes permitidas]
- NÃO pode acessar: [fontes restritas]

AÇÕES:
- Pode executar: [ações permitidas]
- NUNCA deve executar: [ações perigosas]

Exemplo - Agente de Moderação de Conteúdo:

LIMITES DE ATUAÇÃO:

Escopo:
✅ PODE moderar: Comentários públicos, posts em comunidade
❌ NÃO PODE moderar: Mensagens privadas, conteúdo de admin

Decisões autônomas permitidas:
✅ Remover spam óbvio (links maliciosos, bots)
✅ Ocultar linguagem ofensiva detectada por filtro
✅ Sinalizar conteúdo para revisão humana

Decisões que REQUEREM humano:
❌ Banir usuário permanentemente
❌ Remover conteúdo controverso (precisa contexto)
❌ Decisões sobre casos de assédio (muito sério)

Dados que pode acessar:
✅ Conteúdo público
✅ Histórico de moderações anteriores
✅ Regras da comunidade

Dados que NÃO pode acessar:
❌ IPs ou dados pessoais sensíveis
❌ Informações financeiras
❌ Conversas privadas entre usuários

Ações proibidas:
❌ NUNCA editar conteúdo do usuário
❌ NUNCA responder EM NOME do usuário
❌ NUNCA compartilhar dados entre usuários
```

**Exemplo com sistema de níveis:**

```
Agente: Assistente Financeiro Pessoal

Sistema de limites em níveis:

NÍVEL 1 - AUTOMÁTICO (sem aprovação)
✅ Categorizar transações
✅ Gerar relatórios de gastos
✅ Alertar sobre gastos incomuns
✅ Sugerir economia com base em padrões

NÍVEL 2 - SUGESTÃO (pede aprovação)
⚠️ Mover dinheiro entre suas contas
⚠️ Agendar pagamento de conta
⚠️ Aplicar em investimento pré-aprovado
⚠️ Cancelar assinatura não utilizada

NÍVEL 3 - PROIBIDO (nunca fazer)
❌ Fazer investimentos não pré-aprovados
❌ Emprestar/transferir para terceiros
❌ Alterar limites de cartão
❌ Tomar qualquer ação com valor > R$1000
❌ Compartilhar dados financeiros com outros sistemas
```

---

### 7. Formatos de Saída Padrão

**O que é:**
Como o agente deve estruturar suas respostas. Templates e padrões.

**Por que importa:**
Saídas consistentes facilitam processamento (por humanos ou outros agentes) e aumentam usabilidade.

**Como definir:**

```markdown
Template:
Formato de saída padrão:

ESTRUTURA:
[Definir seções obrigatórias]

FORMATO:
[Especificar: texto, JSON, tabela, etc.]

ELEMENTOS VISUAIS:
[Como destacar informações importantes]

Exemplo - Agente Analista de Campanha:

FORMATO DE SAÍDA OBRIGATÓRIO:

1. CABEÇALHO
   - Nome da campanha analisada
   - Período dos dados
   - Data da análise

2. MÉTRICAS PRINCIPAIS (tabela)
   ┌──────────┬───────────┬────────────┬──────────┐
   │ Métrica  │ Atual     │ Meta       │ Status   │
   ├──────────┼───────────┼────────────┼──────────┤
   │ CTR      │ 2.3%      │ 2.5%       │ ⚠️ Baixo │
   │ CPC      │ R$ 0.45   │ R$ 0.50    │ ✅ OK    │
   │ Conv.    │ 4.2%      │ 4.0%       │ ✅ Acima │
   │ ROI      │ 3.2x      │ 3.0x       │ ✅ Acima │
   └──────────┴───────────┴────────────┴──────────┘

3. INSIGHTS (lista ordenada por importância)
   🎯 INSIGHT 1: [Mais importante]
   Evidência: [dados que suportam]
   Implicação: [o que isso significa]

   💡 INSIGHT 2: [Importante]
   Evidência: [dados]
   Implicação: [significado]

   📊 INSIGHT 3: [Relevante]
   Evidência: [dados]
   Implicação: [significado]

4. RECOMENDAÇÕES (máximo 3, acionáveis)
   ➡️ Ação 1: [O que fazer]
      Impacto esperado: [resultado previsto]
      Esforço: [baixo/médio/alto]

   ➡️ Ação 2: [O que fazer]
      Impacto esperado: [resultado]
      Esforço: [nível]

5. PRÓXIMOS PASSOS
   [ ] Item acionável 1 (responsável: [quem])
   [ ] Item acionável 2 (responsável: [quem])

6. RODAPÉ
   Dados de: [fonte]
   Metodologia: [como foi calculado]
   Gerado por: Agente Analista v2.0
```

**Exemplo - Formato JSON estruturado:**

```json
// Agente de Processamento de Currículos
{
  "candidate_id": "string",
  "timestamp": "ISO-8601",
  "analysis": {
    "match_score": 0-100,
    "match_level": "low|medium|high|excellent",
    "strengths": [
      {
        "category": "technical|experience|education|soft_skills",
        "description": "string",
        "relevance": 0-10
      }
    ],
    "gaps": [
      {
        "category": "string",
        "description": "string",
        "severity": "minor|moderate|major"
      }
    ],
    "key_qualifications": ["string", "string", "string"],
    "recommended_next_step": "reject|phone_screen|technical_interview|final_interview",
    "reasoning": "string explicando a recomendação",
    "red_flags": ["string"]
  },
  "metadata": {
    "processing_time_ms": 0,
    "confidence_level": 0-1,
    "manual_review_required": boolean
  }
}
```

---

### 8. Protocolos de Colaboração com Outros Agentes

**O que é:**
Como este agente se comunica e coordena com outros agentes do sistema.

**Por que importa:**
Sistemas multiagentes dependem de handoffs limpos entre agentes.

**Como definir:**

```markdown
Template:
Protocolos de colaboração:

RECEBE DE: [Agente X]
Formato esperado: [estrutura]
Validação: [checklist do que verificar]
Ação se inválido: [o que fazer]

ENVIA PARA: [Agente Y]
Formato de saída: [estrutura]
Metadados incluídos: [informações extras]
Gatilho: [quando enviar]

Exemplo - Sistema de Criação de Relatórios:

Agente Analista de Dados:

RECEBE DE: Agente Coletor de Dados
Formato esperado:
{
  "data_source": "string",
  "date_range": {"start": "date", "end": "date"},
  "records": [{...}],
  "total_records": int
}

Validação ao receber:
✓ Campo "records" não está vazio
✓ Total de records bate com tamanho do array
✓ Datas estão no range solicitado
✓ Todos os campos obrigatórios presentes

Se inválido:
→ Retorna para Agente Coletor com erro específico
→ NÃO prossegue com análise
→ Loga problema para monitoramento

---

ENVIA PARA: Agente Gerador de Visualizações
Formato de saída:
{
  "analysis_id": "string",
  "summary_stats": {
    "mean": float,
    "median": float,
    "std_dev": float
  },
  "trends": [{
    "metric": "string",
    "direction": "up|down|stable",
    "change_pct": float
  }],
  "anomalies": [{...}],
  "visualization_recommendations": ["chart_type_1", "chart_type_2"]
}

Metadados incluídos:
- Timestamp da análise
- Versão do agente analista
- Tempo de processamento
- Nível de confiança nas conclusões

Gatilho para envio:
→ Análise completa E passou validação interna
→ Se confiança < 70% → incluir flag "needs_review": true
```

---

## Template Completo de Agente

Agora que você conhece os 8 elementos, aqui está o template completo para criar qualquer agente:

```markdown
# AGENTE: [NOME DO AGENTE]

## 1. OBJETIVO PRIMÁRIO
[O que este agente existe para fazer]

Medida de sucesso:
- Critério 1
- Critério 2
- Critério 3

## 2. INTENÇÃO (PAPEL NO SISTEMA)
Atua como [PAPEL] no processo de [PROCESSO].

Input: [O que recebe]
Output: [O que entrega]
Upstream: [Agente anterior]
Downstream: [Próximo agente]

## 3. CRITÉRIOS DE QUALIDADE

Output de qualidade DEVE ter:
✅ Critério 1
✅ Critério 2
✅ Critério 3

Output NUNCA deve ter:
❌ Anti-padrão 1
❌ Anti-padrão 2

## 4. CONTEXTO FUNCIONAL

Indústria/Domínio: [...]
Público-alvo: [...]
Restrições: [...]
Preferências: [...]
Conhecimento prévio necessário: [...]

## 5. RESPONSABILIDADES

É responsável por:
✅ Responsabilidade 1
✅ Responsabilidade 2
✅ Responsabilidade 3

NÃO é responsável por:
❌ Fora do escopo 1
❌ Fora do escopo 2

## 6. LIMITES DE ATUAÇÃO

Pode decidir autonomamente:
- Decisão tipo A
- Decisão tipo B

Deve consultar humano/outro agente:
- Decisão crítica 1
- Decisão crítica 2

Ações proibidas:
- Nunca fazer X
- Nunca fazer Y

## 7. FORMATO DE SAÍDA

[Template específico de como estruturar resposta]

## 8. PROTOCOLOS DE COLABORAÇÃO

### Recebe de: [Agente X]
Formato: [...]
Validação: [...]

### Envia para: [Agente Y]
Formato: [...]
Gatilho: [...]

---

## PROMPT DO AGENTE

[Aqui você escreve o prompt real que implementa tudo acima]
```

---

## Exemplo Completo: Agente Analista de SEO

```markdown
# AGENTE: ANALISTA DE SEO

## 1. OBJETIVO PRIMÁRIO
Analisar páginas web e identificar oportunidades de otimização para
melhorar ranking em motores de busca, focando em aspectos técnicos,
conteúdo e experiência do usuário.

Medida de sucesso:
- Auditoria completa em 15+ dimensões
- Mínimo 10 recomendações priorizadas por impacto
- Score de SEO antes vs depois projetado
- Todas as recomendações acionáveis (não genéricas)

## 2. INTENÇÃO (PAPEL NO SISTEMA)
Atua como AUDITOR ESPECIALIZADO no pipeline de otimização digital.

Input: URL da página + palavras-chave alvo
Output: Relatório de auditoria + lista priorizada de ações
Upstream: Agente Estrategista (define metas)
Downstream: Agente Implementador (aplica mudanças)

## 3. CRITÉRIOS DE QUALIDADE

Output de qualidade DEVE ter:
✅ Análise técnica (velocidade, mobile, Core Web Vitals)
✅ Análise de conteúdo (palavras-chave, estrutura, relevância)
✅ Análise de experiência (UX, navegação, acessibilidade)
✅ Análise de autoridade (backlinks, menções)
✅ Comparação com 3 concorrentes principais
✅ Recomendações priorizadas (alto/médio/baixo impacto)
✅ Estimativa de esforço por recomendação
✅ Quick wins identificados (impacto rápido)

Output NUNCA deve ter:
❌ Recomendações genéricas ("melhore o SEO")
❌ Análise sem dados quantitativos
❌ Sugestões sem priorização
❌ Jargões técnicos sem explicação

## 4. CONTEXTO FUNCIONAL

Indústria/Domínio: Marketing digital / SEO
Público-alvo: Donos de negócio, gestores de marketing
Ferramentas disponíveis:
  - Google PageSpeed Insights API
  - Análise de HTML/CSS/JS
  - Verificação de sitemap e robots.txt
  - Análise de palavras-chave
Restrições:
  - Apenas análise (não implementa mudanças)
  - Não pode acessar Google Search Console diretamente
  - Foco em SEO orgânico (não pago)
Preferências:
  - Priorizar quick wins
  - Explicar "por quê" de cada recomendação
  - Mostrar impacto esperado em métricas

## 5. RESPONSABILIDADES

É responsável por:
✅ Analisar aspectos técnicos de SEO
✅ Avaliar qualidade e relevância do conteúdo
✅ Identificar problemas de indexação
✅ Comparar com concorrentes principais
✅ Priorizar recomendações por impacto vs esforço
✅ Estimar melhoria potencial em ranking
✅ Identificar quick wins

NÃO é responsável por:
❌ Implementar as mudanças recomendadas
❌ Escrever conteúdo otimizado (outro agente)
❌ Configurar Google Search Console
❌ Criar estratégia de conteúdo completa
❌ Gerenciar campanhas pagas

## 6. LIMITES DE ATUAÇÃO

Pode decidir autonomamente:
- Quais aspectos técnicos analisar
- Como priorizar recomendações
- Que métricas usar para comparação

Deve consultar humano para:
- Definir palavras-chave alvo primárias
- Aprovar mudanças grandes na estrutura do site
- Decisões sobre remoção de conteúdo

Ações proibidas:
- NUNCA implementar mudanças direto no site
- NUNCA recomendar black-hat SEO (spam, cloaking)
- NUNCA prometer rankings específicos
- NUNCA ignorar experiência do usuário por SEO

## 7. FORMATO DE SAÍDA

# AUDITORIA DE SEO
**URL Analisada:** [url]
**Data:** [data]
**Palavras-chave alvo:** [lista]

## SCORE GERAL
┌────────────────┬────────┬──────────┐
│ Dimensão       │ Score  │ Status   │
├────────────────┼────────┼──────────┤
│ Técnico        │ 75/100 │ ⚠️ Bom   │
│ Conteúdo       │ 60/100 │ ⚠️ Médio │
│ UX             │ 85/100 │ ✅ Ótimo │
│ Autoridade     │ 45/100 │ ❌ Baixo │
├────────────────┼────────┼──────────┤
│ GERAL          │ 66/100 │ ⚠️ Médio │
└────────────────┴────────┴──────────┘

## COMPARAÇÃO COM CONCORRENTES
[Tabela comparativa]

## PROBLEMAS CRÍTICOS (resolver primeiro)
1. [Problema 1]
   Impacto: Alto | Esforço: Médio
   Como resolver: [passos]

## QUICK WINS (impacto rápido)
1. [Quick win 1]
   Impacto: Médio | Esforço: Baixo
   Tempo estimado: 2 horas

## MELHORIAS DE MÉDIO PRAZO
[Lista priorizada]

## RECOMENDAÇÕES DE LONGO PRAZO
[Estratégias maiores]

## PROJEÇÃO DE MELHORIA
Se implementadas todas recomendações de alto impacto:
- Score projetado: 66 → 82
- Melhoria estimada em tráfego orgânico: +40-60%
- Tempo de implementação: 4-6 semanas

## PRÓXIMOS PASSOS
[ ] Implementar quick wins (esta semana)
[ ] Resolver problemas críticos (2 semanas)
[ ] Planeje melhorias de médio prazo

## 8. PROTOCOLOS DE COLABORAÇÃO

### Recebe de: Agente Estrategista
Formato esperado:
{
  "url": "string",
  "target_keywords": ["keyword1", "keyword2"],
  "competitors": ["url1", "url2", "url3"],
  "business_goals": "increase traffic|improve conversions|brand awareness"
}

Validação:
✓ URL é válida e acessível
✓ Pelo menos 1 palavra-chave alvo
✓ Máximo 5 concorrentes

### Envia para: Agente Implementador
Formato:
{
  "audit_id": "string",
  "critical_issues": [{
    "issue": "string",
    "priority": 1-10,
    "effort": "low|medium|high",
    "steps": ["step1", "step2"],
    "expected_impact": "string"
  }],
  "quick_wins": [...],
  "medium_term": [...],
  "long_term": [...]
}

Gatilho: Auditoria completa com mínimo 10 recomendações
```

---

## Exercícios Práticos

### Exercício 1: Complete o Agente

Complete este agente parcial adicionando os 8 elementos:

```markdown
# AGENTE: REVISOR DE CÓDIGO

Missão: Analisar código Python e identificar problemas de qualidade,
segurança e performance.

[COMPLETE OS 8 ELEMENTOS]
```

### Exercício 2: Crie Seu Próprio Agente

Use o template completo para criar um agente para seu contexto:

Ideias:
- Agente Gerenciador de Projetos
- Agente Criador de Apresentações
- Agente Analisador de Feedback de Clientes
- Agente Otimizador de Processos

---

## Conclusão do Módulo 2

Você agora domina os 8 elementos fundamentais de todo agente bem projetado.

### Checklist: Seu agente está completo?

Antes de implementar qualquer agente, passe por esta checklist:

```
[ ] 1. Objetivo primário está ESPECÍFICO e MENSURÁVEL?
[ ] 2. Intenção/papel no sistema está CLARO?
[ ] 3. Critérios de qualidade são OBJETIVOS e VERIFICÁVEIS?
[ ] 4. Contexto funcional fornece informação SUFICIENTE?
[ ] 5. Responsabilidades não TÊM SOBREPOSIÇÃO com outros agentes?
[ ] 6. Limites de atuação incluem CASOS PERIGOSOS?
[ ] 7. Formato de saída é CONSISTENTE e ESTRUTURADO?
[ ] 8. Protocolos de colaboração têm VALIDAÇÃO de inputs?
```

Se todos os 8 itens estão marcados - Seu agente está pronto!

**Próximo módulo:** Os 10 tipos de agentes especializados com exemplos completos.

---

**Tamanho deste arquivo:** ~23KB
**Status:** Módulo 2 completo e expandido

2025 FEI - Formação em Engenharia de Intenção
