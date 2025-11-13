# Módulo 1: Fundamentos de Agentes Modernos
## Nível 3A - Agentes e Sistemas Autônomos na Engenharia de Intenção

**FEI - Formação em Engenharia de Intenção**

---

## Introdução

Você está prestes a entrar no universo mais avançado e transformador da IA moderna: **agentes autônomos**. Este não é apenas mais um módulo teórico sobre inteligência artificial. É uma mudança fundamental de paradigma sobre como você interage com IA e, mais importante, como você constrói sistemas que trabalham para você.

### O Que Torna Este Módulo Diferente

Até agora, você aprendeu a criar prompts excelentes que geram resultados excelentes. Mas há uma limitação fundamental: você ainda está **pedindo** coisas para a IA, uma interação por vez.

Agentes mudam isso completamente. Com agentes, você não pede tarefas - você **delega processos inteiros**.

### Por Que Agentes São a Próxima Fronteira

Em 2022-2023, a revolução foi: "IA pode responder perguntas incrivelmente bem."

Em 2024-2025, a revolução é: "IA pode executar tarefas complexas de ponta a ponta, com autonomia."

A diferença entre essas duas frases é a diferença entre um assistente inteligente e um colaborador autônomo.

### Estrutura Deste Módulo

Este módulo vai cobrir:
1. **Evolução da IA:** Do respondente ao autônomo
2. **Taxonomia clara:** Chatbots vs Assistentes vs Agentes vs Sistemas
3. **Arquitetura de agentes:** Como funcionam por dentro
4. **Primeiros princípios:** O que define um agente de verdade
5. **Casos práticos iniciais:** Suas primeiras implementações

**Meta de profundidade:** ~30KB de conteúdo rico, exemplos completos, código, exercícios.

---

## 1. A Evolução da IA: Do Respondente ao Autônomo

### 1.1 A Linha do Tempo da Interação com IA

#### Era 1: Busca (1990-2010)
**Paradigma:** "Eu pergunto, sistema me dá links"

Você digitava no Google: "como fazer bolo de chocolate"
Sistema retornava: milhões de links
Você fazia: o trabalho de ler, filtrar, sintetizar

**Limitação fundamental:** Zero síntese, zero execução.

---

#### Era 2: Assistentes Simples (2011-2020)
**Paradigma:** "Eu comando, sistema executa ação simples"

Você dizia para Siri: "Coloca alarme para 7h"
Sistema executava: ação direta e pontual
Você fazia: todo o resto

**Limitação fundamental:** Apenas comandos diretos, sem raciocínio.

Exemplos de limitação:
```
Você: "Me acorde para a reunião de amanhã"
Siri: "Desculpe, não encontrei 'reunião de amanhã' na sua agenda"

[Porque Siri não conseguia:
1. Checar calendário
2. Identificar próxima reunião
3. Calcular tempo de preparo
4. Colocar alarme apropriado]
```

---

#### Era 3: LLMs Conversacionais (2022-2023)
**Paradigma:** "Eu pergunto complexo, sistema responde complexo"

Você pergunta para ChatGPT: "Explique mecânica quântica para criança de 10 anos"
Sistema responde: explicação clara, adaptada, bem estruturada
Você faz: as perguntas de follow-up

**Avanço:** Síntese inteligente, adaptação ao contexto, raciocínio básico.

**Limitação fundamental:** Apenas responde. Não age, não usa ferramentas, não executa.

Exemplo de limitação:
```
Você: "Analise os últimos 100 emails da minha caixa de entrada e me
diga quais exigem resposta urgente"

ChatGPT: "Desculpe, não tenho acesso aos seus emails. Mas posso te
ensinar como fazer isso manualmente..."

[Consegue explicar COMO fazer, mas não consegue FAZER]
```

---

#### Era 4: Agentes Autônomos (2024-2025+)
**Paradigma:** "Eu delego objetivo, agente executa processo"

Você delega para Agente: "Organize minha semana priorizando projetos que vencem primeiro"
Agente:
1. Acessa calendário
2. Checa lista de tarefas
3. Identifica deadlines
4. Reorganiza eventos
5. Te manda plano proposto
6. Implementa após aprovação

**Avanço:** Autonomia, uso de ferramentas, raciocínio multi-etapas, auto-correção.

**Paradigma fundamental:** Você define INTENÇÃO, não comandos.

---

### 1.2 Comparação Visual das Eras

```
┌─────────────────────────────────────────────────────────────────┐
│                    EVOLUÇÃO DO CONTROLE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BUSCA (Google)                                                │
│  ════════════                                                  │
│  Você: 100% do trabalho                                        │
│  IA:   0% do trabalho                                          │
│  ████████████████████████████████████████████ (você)          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ASSISTENTE SIMPLES (Siri)                                     │
│  ══════════════════════                                        │
│  Você: 90% do trabalho                                         │
│  IA:   10% do trabalho                                         │
│  ████████████████████████████████████████ (você)              │
│  ████ (IA)                                                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  LLM CONVERSACIONAL (ChatGPT)                                  │
│  ══════════════════════════════                            │
│  Você: 60% do trabalho                                         │
│  IA:   40% do trabalho                                         │
│  ██████████████████████████ (você)                            │
│  █████████████████ (IA)                                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  AGENTE AUTÔNOMO (Claude/GPT-4 + Tools)                       │
│  ════════════════════════════════════════                      │
│  Você: 20% do trabalho (direção + supervisão)                 │
│  IA:   80% do trabalho (execução + raciocínio)                │
│  █████████ (você)                                              │
│  ████████████████████████████████████ (IA)                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 O Que Mudou Tecnicamente

**Era 3 → Era 4: As mudanças fundamentais**

#### Mudança 1: Function Calling (Uso de Ferramentas)

**Era 3 (LLM puro):**
```
Usuário: "Quanto está Bitcoin agora?"

LLM: "Desculpe, meus dados vão até janeiro de 2024. Não tenho
informação em tempo real."
```

**Era 4 (Agente com ferramentas):**
```
Usuário: "Quanto está Bitcoin agora?"

Agente (processo interno):
1. Reconhece: preciso de dado em tempo real
2. Identifica ferramenta: API de criptomoedas
3. Chama: get_crypto_price("BTC")
4. Recebe: {"price": 42350, "change_24h": +2.3%}
5. Responde: "Bitcoin está a $42,350, alta de 2.3% nas últimas 24h"
```

**Implementação técnica:**
```python
# Era 3: Apenas texto
response = llm.chat("Quanto está Bitcoin?")
# → "Não tenho dados em tempo real"

# Era 4: Agente com ferramentas
tools = [
    {
        "name": "get_crypto_price",
        "description": "Retorna preço atual de criptomoeda",
        "parameters": {
            "symbol": {"type": "string", "description": "BTC, ETH, etc"}
        }
    }
]

agent = Agent(llm=llm, tools=tools)
response = agent.run("Quanto está Bitcoin?")
# → Agente chama ferramenta, processa resultado, responde com dado atual
```

---

#### Mudança 2: Memória de Trabalho (Context Management)

**Era 3 (Memória limitada):**
```
Conversa 1:
Você: "Me ajuda a planejar uma viagem para Paris?"
LLM: [resposta completa]

Conversa 2 (nova sessão):
Você: "Adiciona museus ao roteiro"
LLM: "Qual roteiro? Por favor me dê mais contexto"
```

**Era 4 (Agente com memória):**
```
Conversa 1:
Você: "Me ajuda a planejar viagem para Paris?"
Agente: [salva: destino=Paris, contexto=planejamento_viagem]

Conversa 2 (mesma sessão ou persistida):
Você: "Adiciona museus ao roteiro"
Agente: [recupera contexto: Paris, roteiro anterior]
Agente: "Adicionei Louvre, Musée d'Orsay e Rodin ao seu roteiro de Paris"
```

**Implementação:**
```python
# Agente com memória
class Agent:
    def __init__(self):
        self.memory = ConversationMemory()

    def run(self, user_input):
        # Recupera contexto relevante
        context = self.memory.get_relevant_context(user_input)

        # Processa com contexto
        response = self.llm.chat(
            messages=[context, user_input]
        )

        # Salva nova informação
        self.memory.add(user_input, response)

        return response
```

---

#### Mudança 3: Raciocínio Multi-Etapas (Chain of Thought + Loops)

**Era 3 (Resposta direta):**
```
Você: "Preciso aumentar vendas do e-commerce em 30% nos próximos 3 meses"

LLM: "Aqui estão 10 estratégias para aumentar vendas:
1. Otimize SEO
2. Invista em anúncios
3. Melhore UX do site
[...]"
```

**Era 4 (Agente que raciocina):**
```
Você: "Preciso aumentar vendas do e-commerce em 30% nos próximos 3 meses"

Agente (raciocínio interno):
Etapa 1: "Preciso entender situação atual"
  → Pergunta: "Qual seu faturamento atual mensal?"

Etapa 2: "30% de quanto? Preciso do número base"
  → Você responde: "R$100k/mês"
  → Calcula: meta = R$130k/mês

Etapa 3: "Quais são as alavancas disponíveis?"
  → Pergunta: "Qual sua margem média? Orcamento de marketing?
               Taxa de conversão atual?"

Etapa 4: "Análise de cenários"
  → Cenário A: Aumentar tráfego 30% (mantém conversão)
  → Cenário B: Aumentar conversão de 2% → 2.6% (mantém tráfego)
  → Cenário C: Híbrido (15% tráfego + 13% conversão)

Etapa 5: "Baseado nas suas respostas..."
  → Recomenda cenário mais viável dado suas restrições
  → Cria plano de ação específico
```

**Implementação (ReAct pattern):**
```python
class ReasoningAgent:
    def run(self, goal):
        thought = self.think(goal)

        while not self.is_complete(thought):
            # Ciclo: Pensar → Agir → Observar
            action = self.decide_action(thought)
            observation = self.execute(action)
            thought = self.update_thinking(thought, observation)

        return self.final_answer(thought)

# Exemplo de execução
agent = ReasoningAgent()
result = agent.run("Aumentar vendas 30% em 3 meses")

# Internamente:
# Thought 1: "Preciso de dados atuais"
# Action 1: ask_user("Faturamento mensal atual?")
# Observation 1: "R$100k"
# Thought 2: "Meta = R$130k. Preciso saber alavancas disponíveis"
# Action 2: ask_user("Margem e budget marketing?")
# [continua até ter resposta completa]
```

---

### 1.4 O Que Isso Significa na Prática

#### Antes (Era 3): Você era o orquestrador
```
Tarefa: "Escrever artigo sobre IA"

Você faz:
1. Pede para IA: "Me dê outline de artigo sobre IA"
2. Revisa outline
3. Pede para IA: "Escreva intro baseado neste outline"
4. Revisa intro
5. Pede para IA: "Agora seção 1"
6. Revisa seção 1
[... 15 interações depois ...]
17. Pede para IA: "Revise o artigo completo"

Tempo total: 2-3 horas (você gerenciando cada etapa)
```

#### Agora (Era 4): Agente é o orquestrador
```
Tarefa: "Escrever artigo sobre IA"

Você delega:
"Escreva artigo de 1500 palavras sobre impacto da IA na educação.
Público: professores de ensino médio.
Tom: acessível mas informado.
Inclua 3 exemplos práticos de uso em sala de aula."

Agente faz:
1. Planeja estrutura
2. Pesquisa exemplos relevantes (se tem acesso a ferramentas)
3. Escreve rascunho
4. Auto-revisa (checando: bateu 1500 palavras? Tom adequado? 3 exemplos?)
5. Te entrega versão final

Tempo total: 15 minutos (você só revisa resultado final)
```

**Diferença fundamental:**
- Antes: 17 iterações com você comandando cada uma
- Agora: 1 delegação com agente executando processo completo

---

## 2. Taxonomia Clara: Entendendo as Categorias

Um dos maiores problemas no mercado atual é a confusão terminológica. Todo mundo chama tudo de "agente". Vamos estabelecer definições claras.

### 2.1 Chatbot

**Definição:**
Sistema que responde perguntas baseado em scripts pré-definidos ou regras simples.

**Características:**
- Reativo (não proativo)
- Sem raciocínio (árvore de decisão)
- Sem memória entre sessões
- Não usa ferramentas externas

**Exemplo típico:**
```
Usuário: "Qual horário de atendimento?"
Chatbot: "Nosso horário é 9h-18h de segunda a sexta"

Usuário: "E no sábado?"
Chatbot: "Nosso horário é 9h-18h de segunda a sexta"
[Repete porque não entendeu contexto]
```

**Implementação básica:**
```python
class Chatbot:
    def __init__(self):
        self.responses = {
            "horario": "Atendemos 9h-18h seg-sex",
            "preço": "Planos a partir de R$99/mês",
            "contato": "Email: contato@empresa.com"
        }

    def respond(self, user_input):
        # Busca palavra-chave
        for keyword, response in self.responses.items():
            if keyword in user_input.lower():
                return response

        return "Desculpe, não entendi. Fale com atendente."
```

**Quando usar:**
- Atendimento ultra-simples (FAQ)
- Budget extremamente limitado
- Perguntas 100% previsíveis

**Quando NÃO usar:**
- Qualquer coisa que exija compreensão de contexto
- Conversas multi-turn
- Tarefas que precisam de raciocínio

---

### 2.2 Assistente de IA

**Definição:**
Sistema baseado em LLM que responde perguntas complexas e mantém contexto conversacional.

**Características:**
- Compreende linguagem natural
- Mantém contexto dentro de uma sessão
- Raciocínio básico
- Pode usar algumas ferramentas simples (ex: busca)

**Exemplo típico:**
```
Usuário: "Qual a capital da França?"
Assistente: "Paris"

Usuário: "Qual a população de lá?"
Assistente: "Paris tem aproximadamente 2,1 milhões de habitantes
             na cidade, e 12 milhões na região metropolitana"
[Entendeu que "lá" = Paris]

Usuário: "Me recomende 3 restaurantes"
Assistente: "Aqui estão 3 excelentes restaurantes em Paris:
1. Le Jules Verne (alta gastronomia, Torre Eiffel)
2. L'Ami Jean (bistro tradicional)
3. Septime (moderno, preço médio)"
```

**Implementação:**
```python
class AIAssistant:
    def __init__(self, llm):
        self.llm = llm
        self.conversation_history = []

    def chat(self, user_message):
        # Adiciona mensagem do usuário ao histórico
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        # LLM processa com todo o contexto
        response = self.llm.generate(
            messages=self.conversation_history
        )

        # Salva resposta no histórico
        self.conversation_history.append({
            "role": "assistant",
            "content": response
        })

        return response
```

**Quando usar:**
- Atendimento ao cliente que precisa entender nuances
- Tutoria / educação
- Busca de informação complexa
- Brainstorming

**Limitação fundamental:**
Assistente RESPONDE coisas. Não EXECUTA processos.

---

### 2.3 Agente de IA

**Definição:**
Sistema autônomo que recebe objetivo, planeja etapas, usa ferramentas, e executa tarefas até completar.

**Características fundamentais:**
- **Autonomia:** Decide próximos passos sem comando constante
- **Ferramentas:** Usa APIs, bancos de dados, código
- **Raciocínio multi-etapas:** Planeja, executa, revisa
- **Orientado a objetivo:** Não apenas responde - completa tarefa

**Exemplo típico:**
```
Usuário: "Analise os últimos 50 emails e crie resumo dos action items"

Agente (processo interno):
1. PLANEJA:
   - Preciso acessar emails
   - Filtrar últimos 50
   - Identificar action items em cada um
   - Categorizar por urgência
   - Gerar resumo estruturado

2. EXECUTA:
   - Chama API de email: get_emails(limit=50)
   - Para cada email:
     * Analisa conteúdo
     * Identifica se tem action item
     * Extrai: o quê, para quando, de quem
   - Organiza em lista estruturada

3. REVISA:
   - Checa: peguei todos os 50?
   - Validação: action items fazem sentido?
   - Formatação: está claro?

4. ENTREGA:
   "Encontrei 12 action items nos últimos 50 emails:

   URGENTE (hoje):
   - Aprovar proposta do cliente X (email de João, 2h atrás)
   - Enviar relatório para diretoria (email de Maria, ontem)

   ESTA SEMANA:
   - Revisar contrato fornecedor Y (email de Pedro, 3 dias)
   [...]"
```

**Implementação (estrutura básica):**
```python
class Agent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.memory = []

    def run(self, goal):
        # 1. PLANEJAMENTO
        plan = self.create_plan(goal)

        # 2. EXECUÇÃO COM LOOP
        for step in plan:
            # Decide qual ferramenta usar
            tool_choice = self.llm.decide_tool(step, self.tools)

            # Executa ferramenta
            result = self.execute_tool(tool_choice)

            # Atualiza memória
            self.memory.append({
                "step": step,
                "tool": tool_choice,
                "result": result
            })

            # Auto-avaliação: preciso revisar o plano?
            if not self.is_on_track(result, goal):
                plan = self.revise_plan(plan, result)

        # 3. SÍNTESE FINAL
        return self.synthesize_results(self.memory, goal)

    def create_plan(self, goal):
        prompt = f"""
        Objetivo: {goal}

        Crie plano de etapas para alcançar este objetivo.
        Ferramentas disponíveis: {self.tools}
        """
        return self.llm.generate(prompt)

    def execute_tool(self, tool_choice):
        tool_name = tool_choice["name"]
        parameters = tool_choice["parameters"]

        # Executa a ferramenta real
        tool_function = self.tools[tool_name]
        return tool_function(**parameters)
```

**Quando usar:**
- Tarefas que exigem múltiplas etapas
- Processos que você repete frequentemente
- Quando precisa de acesso a dados/ferramentas externas
- Quando quer delegar, não apenas consultar

---

### 2.4 Sistema Multiagente

**Definição:**
Múltiplos agentes especializados trabalhando juntos, cada um com papel específico.

**Características:**
- Especialização (cada agente faz uma coisa muito bem)
- Colaboração (agentes passam informação entre si)
- Orquestração (um agente coordenador ou pipeline definido)
- Escalabilidade (adiciona agentes conforme necessidade)

**Exemplo típico:**
```
Tarefa: "Criar estratégia completa de lançamento de produto"

Sistema com 4 agentes especializados:

┌─────────────────────────────────────────────────────────┐
│  AGENTE COORDENADOR                                     │
│  (orquestra os outros 3)                                │
└─────────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┬────────────────┐
        │               │               │                │
┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐
│ AGENTE       │ │ AGENTE      │ │ AGENTE     │ │ AGENTE      │
│ PESQUISADOR  │ │ ESTRATEGISTA│ │ CRIATIVO   │ │ ANALISTA    │
└──────────────┘ └─────────────┘ └────────────┘ └─────────────┘

Fluxo:
1. Coordenador recebe objetivo: "Lançamento de produto X"

2. Coordenador delega para Pesquisador:
   "Analise concorrência e mercado"
   → Pesquisador retorna: relatório de 10 páginas

3. Coordenador passa para Estrategista:
   "Com base nesta pesquisa, crie estratégia de posicionamento"
   → Estrategista retorna: documento estratégico

4. Coordenador delega em PARALELO:
   - Para Criativo: "Crie 5 opções de mensagem baseadas nesta estratégia"
   - Para Analista: "Defina KPIs para medir sucesso desta estratégia"

5. Coordenador sintetiza tudo:
   - Pesquisa de mercado
   - Estratégia de posicionamento
   - Opções de mensagem
   - Framework de métricas

   → Entrega pacote completo
```

**Implementação (estrutura conceitual):**
```python
class MultiAgentSystem:
    def __init__(self):
        # Agentes especializados
        self.researcher = ResearchAgent()
        self.strategist = StrategyAgent()
        self.creative = CreativeAgent()
        self.analyst = AnalystAgent()

        # Coordenador
        self.coordinator = CoordinatorAgent([
            self.researcher,
            self.strategist,
            self.creative,
            self.analyst
        ])

    def run(self, objective):
        # Coordenador decide fluxo
        plan = self.coordinator.create_plan(objective)

        # Execução orquestrada
        results = {}

        # Passo 1: Pesquisa (bloqueante)
        results['research'] = self.researcher.run(
            "Analise mercado para " + objective
        )

        # Passo 2: Estratégia (depende de pesquisa)
        results['strategy'] = self.strategist.run(
            research_data=results['research']
        )

        # Passo 3: Criativo + Analista (paralelo)
        import concurrent.futures
        with concurrent.futures.ThreadPoolExecutor() as executor:
            creative_future = executor.submit(
                self.creative.run,
                strategy=results['strategy']
            )
            analyst_future = executor.submit(
                self.analyst.run,
                strategy=results['strategy']
            )

            results['creative'] = creative_future.result()
            results['analytics'] = analyst_future.result()

        # Síntese final
        return self.coordinator.synthesize(results)
```

**Quando usar:**
- Projetos muito complexos (muitas dimensões)
- Quando qualidade exige especialização profunda
- Quando partes podem rodar em paralelo
- Quando quer escalabilidade (adiciona agentes conforme cresce)

---

### 2.5 Worker (Trabalhador Automatizado)

**Definição:**
Agente especializado em tarefa repetitiva específica que roda continuamente.

**Características:**
- Tarefa única e bem definida
- Execução contínua (não on-demand)
- Gatilhos automáticos (tempo, evento)
- Foco em velocidade e confiabilidade

**Exemplo típico:**
```
Worker: "Monitor de Menções de Marca"

Tarefa:
A cada 1 hora:
1. Busca menções da marca em redes sociais
2. Classifica sentimento (positivo/negativo/neutro)
3. Identifica menções que precisam de resposta
4. Notifica time de social media
5. Salva em banco de dados para análise

Execução:
┌─────────────────────────────────────────┐
│  Loop infinito (a cada 1h)              │
├─────────────────────────────────────────┤
│  09:00 → Busca → Analisa → Notifica    │
│  10:00 → Busca → Analisa → Notifica    │
│  11:00 → Busca → Analisa → Notifica    │
│  [...]                                  │
└─────────────────────────────────────────┘
```

**Implementação:**
```python
class SocialMonitorWorker:
    def __init__(self, brand_name):
        self.brand_name = brand_name
        self.social_api = SocialMediaAPI()
        self.sentiment_model = SentimentAnalyzer()
        self.notification_service = NotificationService()

    def run_forever(self):
        while True:
            # 1. Coleta
            mentions = self.social_api.search_mentions(
                query=self.brand_name,
                since=datetime.now() - timedelta(hours=1)
            )

            # 2. Análise
            for mention in mentions:
                sentiment = self.sentiment_model.analyze(mention.text)

                # 3. Decisão
                if self.needs_response(mention, sentiment):
                    # 4. Ação
                    self.notification_service.alert(
                        team="social_media",
                        message=f"Menção negativa de @{mention.author}: {mention.text}",
                        priority="high" if sentiment == "very_negative" else "medium"
                    )

                # 5. Log
                self.save_to_database(mention, sentiment)

            # Aguarda próxima execução
            time.sleep(3600)  # 1 hora

    def needs_response(self, mention, sentiment):
        # Lógica de decisão
        if sentiment in ["negative", "very_negative"]:
            return True
        if mention.followers > 10000:  # Influencer
            return True
        if "urgente" in mention.text.lower():
            return True
        return False
```

**Quando usar:**
- Monitoramento contínuo (preços, menções, status)
- Processamento de filas (emails, tickets, pedidos)
- Tarefas agendadas (relatórios diários, backups)
- Automações operacionais

---

### 2.6 Tabela Comparativa Completa

```
┌────────────────┬──────────┬────────────┬─────────┬─────────────┬─────────┐
│                │ CHATBOT  │ ASSISTENTE │ AGENTE  │ MULTIAGENTE │ WORKER  │
├────────────────┼──────────┼────────────┼─────────┼─────────────┼─────────┤
│ Raciocínio     │ ✗        │ Básico     │ ✓✓      │ ✓✓✓         │ ✓       │
│ Ferramentas    │ ✗        │ Limitado   │ ✓✓      │ ✓✓✓         │ ✓✓      │
│ Autonomia      │ ✗        │ ✗          │ ✓✓      │ ✓✓✓         │ ✓✓✓     │
│ Memória        │ ✗        │ Sessão     │ ✓✓      │ ✓✓          │ ✓       │
│ Multi-etapas   │ ✗        │ ✗          │ ✓✓      │ ✓✓✓         │ ✓       │
│ Especialização │ ✗        │ ✗          │ ✓       │ ✓✓✓         │ ✓✓✓     │
│ Custo          │ $        │ $$         │ $$$     │ $$$$        │ $$      │
│ Complexidade   │ Baixa    │ Média      │ Alta    │ Muito Alta  │ Média   │
└────────────────┴──────────┴────────────┴─────────┴─────────────┴─────────┘

Legenda:
✗ = Não tem
✓ = Básico
✓✓ = Bom
✓✓✓ = Excelente
```

---

## 3. Arquitetura de Agentes: Como Funcionam Por Dentro

### 3.1 Os 4 Componentes Fundamentais

Todo agente de verdade tem 4 componentes:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────┐      ┌──────────────┐      ┌───────────┐  │
│  │   BRAIN     │ ←──→ │   MEMORY     │ ←──→ │   TOOLS   │  │
│  │  (LLM)      │      │  (Context)   │      │  (Actions)│  │
│  └─────────────┘      └──────────────┘      └───────────┘  │
│         ↑                                          ↓        │
│         │                                          │        │
│         └────────────┐              ┌──────────────┘        │
│                      │              │                       │
│                ┌─────▼──────────────▼─────┐                 │
│                │   REASONING ENGINE       │                 │
│                │   (Plan → Act → Reflect) │                 │
│                └──────────────────────────┘                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Componente 1: Brain (Cérebro - LLM)

O modelo de linguagem que faz o raciocínio.

**Funções:**
- Compreender intenção do usuário
- Planejar etapas para alcançar objetivo
- Decidir qual ferramenta usar
- Sintetizar resultados

**Exemplos de LLMs usados:**
- GPT-4 / GPT-4 Turbo (OpenAI)
- Claude 3 Opus / Sonnet (Anthropic)
- Gemini Ultra (Google)
- Llama 2 70B (Meta - open source)

**Escolha do LLM impacta:**
```
Tarefa simples (classificar email):
→ GPT-3.5 funciona (barato, rápido)

Tarefa complexa (análise estratégica multi-dimensional):
→ GPT-4 ou Claude Opus necessário (raciocínio profundo)

Tarefa sensível (dados confidenciais):
→ Llama 2 local (privacidade total)
```

---

## Conclusão do Módulo 1

Você completou o módulo fundamental de agentes!

### O Que Você Aprendeu

1. **Evolução da IA:** Como chegamos de busca simples até agentes autônomos
2. **Taxonomia clara:** Diferença entre chatbot, assistente, agente e sistema multiagente
3. **Arquitetura:** Os 4 componentes (Brain, Memory, Tools, Reasoning)
4. **Primeiros princípios:** Autonomia, verificabilidade, especialização, resiliência
5. **Implementação prática:** Estruturas fundamentais de agentes

**Próximo módulo:** Engenharia de Intenção aplicada a agentes especializados.

---

**Tamanho deste arquivo:** ~32KB
**Status:** Módulo 1 completo e expandido

© 2025 FEI - Formação em Engenharia de Intenção
