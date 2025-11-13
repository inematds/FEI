# Módulo 4: 5 Modelos de Sistemas Multiagentes
## Nível 3A - Agentes e Sistemas Autônomos na Engenharia de Intenção

**FEI - Formação em Engenharia de Intenção**

---

## Introdução

Você já sabe como criar agentes individuais. Agora vamos para o próximo nível: **sistemas multiagentes**.

A diferença é como a diferença entre um músico solo e uma orquestra. Um bom violinista pode fazer coisas incríveis sozinho. Mas quando você quer uma sinfonia completa, precisa de múltiplos músicos especializados trabalhando em harmonia.

### Por Que Multiagentes?

**Limitação de agentes únicos:**
```
Tarefa: "Crie estratégia completa de marketing para novo produto"

Agente único:
- Tenta fazer tudo (pesquisa + estratégia + criativo + análise)
- Resultado: Medíocre em tudo, excelente em nada
- Tempo: 2-3 horas
- Qualidade: 6/10
```

**Poder de multiagentes:**
```
Mesma tarefa com sistema de 4 agentes:

Agente 1 (Pesquisador): 30 min de pesquisa profunda
Agente 2 (Estrategista): 20 min criando estratégia baseada em dados
Agente 3 (Criativo): 40 min gerando campanhas múltiplas
Agente 4 (Analista): 15 min definindo métricas e KPIs

Resultado:
- Cada agente faz sua especialização MUITO BEM
- Tempo total: ~1h45min (paralelo)
- Qualidade: 9/10
```

---

## Os 5 Modelos Fundamentais

Existem 5 arquiteturas principais de sistemas multiagentes:

1. **Pipeline Linear** - Sequencial, cada agente passa para o próximo
2. **Pipeline Paralelo** - Múltiplos agentes rodando simultaneamente
3. **Hierárquico** - Um coordenador gerencia especialistas
4. **Iterativo** - Ciclos de melhoria contínua
5. **Cruzado** - Agentes se consultam mutuamente

Vamos explorar cada um em profundidade.

---

## MODELO 1: PIPELINE LINEAR

### O Que É

Sistema onde agentes trabalham em sequência: A → B → C → D

Cada agente:
- Recebe output do anterior
- Processa
- Passa para o próximo

Como uma linha de produção.

### Quando Usar

✅ **Ideal para:**
- Processos com etapas bem definidas
- Cada etapa depende da anterior
- Ordem importa
- Qualidade de cada etapa é crítica

❌ **Evite quando:**
- Etapas podem rodar em paralelo
- Feedback loops são necessários
- Processo é muito exploratório

### Estrutura Visual

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   AGENTE 1   │─────▶│   AGENTE 2   │─────▶│   AGENTE 3   │─────▶│   AGENTE 4   │
│  Pesquisador │      │ Estruturador │      │   Escritor   │      │   Revisor    │
└──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
     Input                                                              Output
   (Tópico)                                                          (Artigo final)
```

---

### EXEMPLO COMPLETO: Sistema de Criação de Artigos

**Objetivo:** Transformar tópico em artigo publicável de alta qualidade

#### Agente 1: Pesquisador

```markdown
# AGENTE PESQUISADOR

## Responsabilidade
Coletar informações confiáveis sobre o tópico solicitado

## Input esperado
{
  "tópico": "string",
  "profundidade": "rápida|média|profunda",
  "fontes_preferenciais": ["lista de sites"]
}

## Processo
1. Gerar 10+ termos de busca relacionados
2. Buscar em múltiplas fontes (Google, Scholar, sites especializados)
3. Validar credibilidade de cada fonte
4. Extrair fatos, estatísticas, citações relevantes
5. Organizar por subtópicos

## Output para Agente 2
{
  "tópico_original": "string",
  "descobertas": [
    {
      "subtópico": "string",
      "fatos": ["lista de fatos"],
      "estatísticas": [{"valor": "string", "fonte": "string"}],
      "citações": [{"texto": "string", "autor": "string", "fonte": "string"}]
    }
  ],
  "fontes": [
    {
      "url": "string",
      "credibilidade": 0-1,
      "data_acesso": "timestamp"
    }
  ],
  "gaps_identificados": ["informações que não encontrou"]
}

## Critérios de validação
✓ Mínimo 15 fatos descobertos
✓ Pelo menos 5 fontes de alta credibilidade
✓ Todas as estatísticas com fonte
✓ Cobertura de 3+ subtópicos
```

**Implementação:**

```python
class AgentePesquisador:
    def __init__(self, llm, ferramentas_busca):
        self.llm = llm
        self.ferramentas = ferramentas_busca
        self.fontes_confiáveis = [
            "scholar.google.com",
            "arxiv.org",
            "nature.com",
            # ... mais fontes
        ]

    def executar(self, input_data):
        """
        Executa pesquisa completa
        """
        tópico = input_data['tópico']
        profundidade = input_data.get('profundidade', 'média')

        # Passo 1: Gerar termos de busca
        termos = self._gerar_termos(tópico)

        # Passo 2: Buscar
        resultados_brutos = []
        for termo in termos:
            resultados = self.ferramentas['google'].search(
                query=termo,
                num_results=10
            )
            resultados_brutos.extend(resultados)

        # Passo 3: Filtrar por credibilidade
        resultados_filtrados = [
            r for r in resultados_brutos
            if self._avaliar_credibilidade(r['url']) > 0.7
        ]

        # Passo 4: Extrair informações
        descobertas = []
        for resultado in resultados_filtrados:
            conteúdo = self.ferramentas['scraper'].extract(resultado['url'])

            # LLM extrai fatos estruturados
            fatos_extraídos = self.llm.generate(f"""
            Extraia fatos, estatísticas e citações relevantes sobre {tópico}:

            Conteúdo: {conteúdo}

            Retorne JSON:
            {{
              "fatos": ["lista de fatos objetivos"],
              "estatísticas": [{{"valor": "...", "contexto": "..."}}],
              "citações": [{{"texto": "...", "autor": "..."}}]
            }}
            """)

            descobertas.append(fatos_extraídos)

        # Passo 5: Organizar por subtópicos
        output = self._organizar_descobertas(descobertas, tópico)

        # Validação final
        if not self._validar_output(output):
            raise Exception("Output não atende critérios mínimos")

        return output

    def _avaliar_credibilidade(self, url):
        score = 0.5  # baseline

        # Fonte acadêmica
        if any(fonte in url for fonte in self.fontes_confiáveis):
            score += 0.3

        # HTTPS
        if url.startswith('https://'):
            score += 0.1

        # Domínio .edu ou .gov
        if '.edu' in url or '.gov' in url:
            score += 0.1

        return min(score, 1.0)

    def _validar_output(self, output):
        total_fatos = sum(
            len(d.get('fatos', []))
            for d in output['descobertas']
        )

        fontes_alta_cred = sum(
            1 for f in output['fontes']
            if f['credibilidade'] > 0.8
        )

        return (
            total_fatos >= 15 and
            fontes_alta_cred >= 5 and
            len(output['descobertas']) >= 3
        )
```

---

#### Agente 2: Estruturador

```markdown
# AGENTE ESTRUTURADOR

## Responsabilidade
Transformar descobertas brutas em outline estruturado e lógico

## Input esperado
Output do Agente 1 (descobertas de pesquisa)

## Processo
1. Analisar todas as descobertas
2. Identificar narrativa lógica
3. Agrupar fatos relacionados
4. Criar hierarquia de informações (H1, H2, H3)
5. Definir ordem pedagógica
6. Alocar fatos/stats para cada seção

## Output para Agente 3
{
  "título": "string (otimizado para engajamento)",
  "subtítulo": "string (complementa título)",
  "hook": "string (primeira frase do artigo)",
  "tese": "string (mensagem principal)",
  "outline": [
    {
      "tipo": "introdução",
      "key_points": ["pontos a cobrir"],
      "fatos_alocar": ["ids dos fatos a incluir"],
      "tom": "string"
    },
    {
      "tipo": "seção",
      "heading": "string (H2)",
      "subheadings": ["strings (H3)"],
      "key_points": ["pontos principais"],
      "fatos_alocar": ["ids"],
      "exemplos_sugeridos": ["tipos de exemplos a incluir"]
    },
    // ... mais seções
    {
      "tipo": "conclusão",
      "key_points": ["pontos de fechamento"],
      "call_to_action": "string"
    }
  ],
  "target_words": 1200,
  "estimativa_tempo_leitura": "6 minutos"
}

## Critérios de validação
✓ Título tem < 60 caracteres
✓ Outline tem 3-7 seções principais
✓ Cada seção tem 2-4 key points
✓ Fluxo lógico (introdução → desenvolvimento → conclusão)
✓ Todos os fatos da pesquisa foram alocados
```

**Implementação:**

```python
class AgenteEstruturador:
    def __init__(self, llm):
        self.llm = llm

    def executar(self, pesquisa_output):
        """
        Cria outline estruturado
        """
        descobertas = pesquisa_output['descobertas']
        tópico = pesquisa_output['tópico_original']

        # Passo 1: Gerar título otimizado
        título = self._gerar_título(tópico, descobertas)

        # Passo 2: Identificar narrativa
        narrativa = self._identificar_narrativa(descobertas)

        # Passo 3: Criar estrutura de seções
        seções = self._criar_seções(narrativa, descobertas)

        # Passo 4: Alocar fatos para cada seção
        seções_com_fatos = self._alocar_fatos(seções, descobertas)

        # Passo 5: Adicionar introdução e conclusão
        outline_completo = self._adicionar_intro_conclusao(
            seções_com_fatos,
            tópico
        )

        output = {
            "título": título,
            "subtítulo": self._gerar_subtítulo(título),
            "hook": self._gerar_hook(descobertas),
            "tese": self._extrair_tese(narrativa),
            "outline": outline_completo,
            "target_words": self._calcular_target(len(seções_com_fatos)),
            "estimativa_tempo_leitura": f"{self._estimar_tempo_leitura(len(seções_com_fatos))} minutos"
        }

        if not self._validar_output(output):
            raise Exception("Outline não atende critérios")

        return output

    def _identificar_narrativa(self, descobertas):
        """
        LLM identifica melhor narrativa baseado nos dados
        """
        prompt = f"""
        Baseado nestas descobertas, identifique a narrativa mais forte:

        Descobertas: {json.dumps(descobertas, indent=2)}

        Opções de narrativa:
        1. Cronológica (evolução temporal)
        2. Problema-Solução (desafio → como resolver)
        3. Comparativa (A vs B vs C)
        4. Tutorial (passo a passo)
        5. Insights (descobertas surpreendentes)

        Retorne JSON:
        {{
          "narrativa_escolhida": "string",
          "justificativa": "por que essa narrativa funciona",
          "estrutura_recomendada": ["seção 1", "seção 2", ...]
        }}
        """

        return self.llm.generate(prompt)

    def _criar_seções(self, narrativa, descobertas):
        """
        Cria seções baseado na narrativa escolhida
        """
        estrutura = narrativa['estrutura_recomendada']

        seções = []
        for i, nome_seção in enumerate(estrutura):
            seção = {
                "tipo": "seção",
                "ordem": i + 1,
                "heading": nome_seção,
                "key_points": self._extrair_key_points(
                    nome_seção,
                    descobertas
                )
            }
            seções.append(seção)

        return seções

    def _validar_output(self, output):
        return (
            len(output['título']) <= 60 and
            3 <= len(output['outline']) <= 7 and
            all(
                2 <= len(s.get('key_points', [])) <= 4
                for s in output['outline']
                if s['tipo'] == 'seção'
            )
        )
```

---

#### Agente 3: Escritor

```markdown
# AGENTE ESCRITOR

## Responsabilidade
Transformar outline em artigo completo e engajante

## Input esperado
Output do Agente 2 (outline estruturado)

## Processo
1. Analisar outline e diretrizes
2. Escrever introdução com hook forte
3. Desenvolver cada seção seguindo key points
4. Adicionar exemplos práticos
5. Inserir transições entre seções
6. Escrever conclusão com call-to-action
7. Auto-revisar comprimento e tom

## Output para Agente 4
{
  "artigo_markdown": "string (artigo completo)",
  "metadados": {
    "word_count": integer,
    "tempo_leitura": "string",
    "seções_desenvolvidas": integer,
    "exemplos_incluídos": integer
  },
  "notas_revisor": ["pontos que autor tem dúvida e quer revisão especial"]
}

## Critérios de validação
✓ Word count dentro de ±10% do target
✓ Cada seção tem pelo menos 1 exemplo
✓ Máximo 5 linhas por parágrafo
✓ Tom consistente em todo artigo
✓ Hook engajante nos primeiros 50 palavras
```

**Implementação:**

```python
class AgenteEscritor:
    def __init__(self, llm):
        self.llm = llm

    def executar(self, outline_output):
        """
        Escreve artigo completo
        """
        outline = outline_output['outline']
        target_words = outline_output['target_words']

        # Passo 1: Escrever introdução
        introdução = self._escrever_introdução(
            outline_output['hook'],
            outline_output['tese']
        )

        # Passo 2: Desenvolver cada seção
        seções_desenvolvidas = []
        for seção in outline:
            if seção['tipo'] == 'seção':
                conteúdo = self._desenvolver_seção(seção)
                seções_desenvolvidas.append(conteúdo)

        # Passo 3: Escrever conclusão
        conclusão = self._escrever_conclusão(
            seções_desenvolvidas,
            outline[-1] if outline else None
        )

        # Passo 4: Montar artigo completo
        artigo = self._montar_artigo(
            outline_output['título'],
            outline_output['subtítulo'],
            introdução,
            seções_desenvolvidas,
            conclusão
        )

        # Passo 5: Auto-revisão
        artigo_revisado = self._auto_revisar(artigo, target_words)

        output = {
            "artigo_markdown": artigo_revisado,
            "metadados": {
                "word_count": len(artigo_revisado.split()),
                "tempo_leitura": outline_output['estimativa_tempo_leitura'],
                "seções_desenvolvidas": len(seções_desenvolvidas),
                "exemplos_incluídos": artigo_revisado.count("**Exemplo:")
            },
            "notas_revisor": self._gerar_notas_revisão(artigo_revisado)
        }

        return output

    def _desenvolver_seção(self, seção):
        """
        Transforma key points em prosa
        """
        prompt = f"""
        Desenvolva esta seção do artigo:

        Heading: {seção['heading']}
        Key points a cobrir:
        {chr(10).join(f"- {kp}" for kp in seção['key_points'])}

        Fatos para incluir:
        {seção.get('fatos_alocar', [])}

        Diretrizes:
        - Tom conversacional mas profissional
        - Máximo 5 linhas por parágrafo
        - Incluir pelo menos 1 exemplo prático
        - 200-300 palavras para esta seção

        Escreva a seção completa:
        """

        return self.llm.generate(prompt)

    def _auto_revisar(self, artigo, target_words):
        """
        Revisa artigo antes de enviar para revisor humano/especializado
        """
        word_count = len(artigo.split())

        # Se muito longo, condensar
        if word_count > target_words * 1.1:
            artigo = self._condensar(artigo, target_words)

        # Se muito curto, expandir
        elif word_count < target_words * 0.9:
            artigo = self._expandir(artigo, target_words)

        # Quebrar parágrafos longos
        artigo = self._quebrar_parágrafos_longos(artigo)

        return artigo
```

---

#### Agente 4: Revisor

```markdown
# AGENTE REVISOR

## Responsabilidade
Revisar artigo para garantir qualidade final antes de publicação

## Input esperado
Output do Agente 3 (artigo completo)

## Processo
1. Verificar gramática e ortografia
2. Validar clareza e coesão
3. Checar se todos os fatos têm fonte
4. Confirmar tom consistente
5. Validar estrutura (headings corretos)
6. Verificar legibilidade (Flesch score)
7. Sugerir melhorias pontuais
8. Aprovar ou devolver para Escritor

## Output final
{
  "artigo_final": "string (versão aprovada)",
  "score_qualidade": {
    "gramática": 0-100,
    "clareza": 0-100,
    "engajamento": 0-100,
    "legibilidade": 0-100,
    "overall": 0-100
  },
  "mudanças_aplicadas": [
    {
      "tipo": "correção|melhoria|ajuste",
      "descrição": "string",
      "antes": "string",
      "depois": "string"
    }
  ],
  "status": "aprovado|requer_revisão"
}
```

**Implementação:**

```python
class AgenteRevisor:
    def __init__(self, llm, ferramentas_análise):
        self.llm = llm
        self.ferramentas = ferramentas_análise

    def executar(self, escritor_output):
        """
        Revisa e finaliza artigo
        """
        artigo = escritor_output['artigo_markdown']

        # Passo 1: Análise gramatical
        gramática_issues = self.ferramentas['grammar'].check(artigo)

        # Passo 2: Análise de legibilidade
        legibilidade_score = self.ferramentas['readability'].analyze(artigo)

        # Passo 3: Validação de estrutura
        estrutura_ok = self._validar_estrutura(artigo)

        # Passo 4: Revisão de conteúdo pelo LLM
        revisão_conteúdo = self._revisar_conteúdo(artigo)

        # Passo 5: Aplicar correções
        artigo_corrigido = self._aplicar_correções(
            artigo,
            gramática_issues,
            revisão_conteúdo
        )

        # Passo 6: Calcular score de qualidade
        scores = {
            "gramática": 100 - len(gramática_issues),
            "clareza": revisão_conteúdo['clareza_score'],
            "engajamento": revisão_conteúdo['engajamento_score'],
            "legibilidade": legibilidade_score
        }
        scores['overall'] = sum(scores.values()) / len(scores)

        output = {
            "artigo_final": artigo_corrigido,
            "score_qualidade": scores,
            "mudanças_aplicadas": self._listar_mudanças(
                artigo,
                artigo_corrigido
            ),
            "status": "aprovado" if scores['overall'] >= 85 else "requer_revisão"
        }

        return output

    def _revisar_conteúdo(self, artigo):
        """
        LLM faz revisão de qualidade de conteúdo
        """
        prompt = f"""
        Revise este artigo em 3 dimensões:

        1. CLAREZA (0-100): Ideias estão claras? Há ambiguidades?
        2. ENGAJAMENTO (0-100): É interessante de ler? Mantém atenção?
        3. COESÃO (0-100): Transições fluem bem? Narrativa coerente?

        Artigo:
        {artigo}

        Retorne JSON:
        {{
          "clareza_score": 0-100,
          "engajamento_score": 0-100,
          "coesão_score": 0-100,
          "problemas_identificados": [
            {{"tipo": "...", "localização": "...", "sugestão": "..."}}
          ],
          "pontos_fortes": ["..."]
        }}
        """

        return self.llm.generate(prompt)
```

---

### Coordenador do Pipeline Linear

```python
class PipelineLinearCriacaoArtigo:
    """
    Orquestra os 4 agentes em sequência
    """
    def __init__(self, llm, ferramentas):
        self.agente_1 = AgentePesquisador(llm, ferramentas['busca'])
        self.agente_2 = AgenteEstruturador(llm)
        self.agente_3 = AgenteEscritor(llm)
        self.agente_4 = AgenteRevisor(llm, ferramentas['análise'])

    def executar(self, tópico):
        """
        Executa pipeline completo: tópico → artigo final
        """
        print(f"🔍 Agente 1 (Pesquisador) iniciando...")
        pesquisa = self.agente_1.executar({
            "tópico": tópico,
            "profundidade": "média"
        })
        print(f"✓ Pesquisa concluída: {len(pesquisa['descobertas'])} subtópicos")

        print(f"📋 Agente 2 (Estruturador) iniciando...")
        outline = self.agente_2.executar(pesquisa)
        print(f"✓ Outline criado: {outline['título']}")

        print(f"✍️ Agente 3 (Escritor) iniciando...")
        rascunho = self.agente_3.executar(outline)
        print(f"✓ Artigo escrito: {rascunho['metadados']['word_count']} palavras")

        print(f"🔍 Agente 4 (Revisor) iniciando...")
        final = self.agente_4.executar(rascunho)
        print(f"✓ Revisão concluída: Score {final['score_qualidade']['overall']}/100")

        if final['status'] == "requer_revisão":
            print("⚠️ Artigo requer nova rodada de revisão")
            # Poderia enviar de volta para Agente 3
        else:
            print("✅ Artigo aprovado e pronto para publicação!")

        return final

# Uso
pipeline = PipelineLinearCriacaoArtigo(llm, ferramentas)
resultado = pipeline.executar("Impacto da IA na educação")
```

---

## MODELO 2: PIPELINE PARALELO

### O Que É

Sistema onde múltiplos agentes trabalham simultaneamente em partes independentes, depois resultados são combinados.

```
                    ┌─────────────┐
                    │ DISTRIBUIDOR│
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
     ┌────▼────┐      ┌────▼────┐     ┌────▼────┐
     │AGENTE A │      │AGENTE B │     │AGENTE C │
     │(Paralelo│      │(Paralelo│     │(Paralelo│
     └────┬────┘      └────┬────┘     └────┬────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
                    ┌──────▼──────┐
                    │  AGREGADOR  │
                    └─────────────┘
```

### Quando Usar

✅ **Ideal para:**
- Tarefas que podem ser divididas em partes independentes
- Quando velocidade é crítica (50% mais rápido que linear)
- Quando diferentes perspectivas enriquecem resultado
- Múltiplas análises do mesmo input

❌ **Evite quando:**
- Etapas são interdependentes
- Ordem importa
- Coordenação entre agentes é complexa

---

### EXEMPLO COMPLETO: Análise Multiângulo de Produto

**Objetivo:** Analisar produto de todos os ângulos simultaneamente

```python
class PipelineParaleloAnáliseProduto:
    """
    4 agentes analisam produto em paralelo:
    - Analista de Mercado
    - Analista Técnico
    - Analista de UX
    - Analista Financeiro
    """
    def __init__(self, llm):
        self.analista_mercado = AnalistaMercado(llm)
        self.analista_técnico = AnalistaTécnico(llm)
        self.analista_ux = AnalistaUX(llm)
        self.analista_financeiro = AnalistaFinanceiro(llm)
        self.agregador = AgregadorAnálises(llm)

    def executar(self, produto_info):
        """
        Executa análises em paralelo
        """
        import concurrent.futures

        print("🚀 Iniciando análises paralelas...")

        # Executar 4 agentes simultaneamente
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
            # Submeter todas as tarefas
            future_mercado = executor.submit(
                self.analista_mercado.analisar,
                produto_info
            )
            future_técnico = executor.submit(
                self.analista_técnico.analisar,
                produto_info
            )
            future_ux = executor.submit(
                self.analista_ux.analisar,
                produto_info
            )
            future_financeiro = executor.submit(
                self.analista_financeiro.analisar,
                produto_info
            )

            # Coletar resultados conforme completam
            análise_mercado = future_mercado.result()
            print("✓ Análise de Mercado concluída")

            análise_técnica = future_técnico.result()
            print("✓ Análise Técnica concluída")

            análise_ux = future_ux.result()
            print("✓ Análise de UX concluída")

            análise_financeira = future_financeiro.result()
            print("✓ Análise Financeira concluída")

        # Agregar todas as análises
        print("🔗 Agregando análises...")
        relatório_final = self.agregador.agregar({
            "mercado": análise_mercado,
            "técnico": análise_técnica,
            "ux": análise_ux,
            "financeiro": análise_financeira
        })

        print("✅ Relatório completo gerado")
        return relatório_final


class AnalistaMercado:
    def __init__(self, llm):
        self.llm = llm

    def analisar(self, produto_info):
        """
        Análise de mercado: concorrência, posicionamento, oportunidades
        """
        prompt = f"""
        Analise este produto do ponto de vista de MERCADO:

        Produto: {produto_info['nome']}
        Descrição: {produto_info['descrição']}
        Público-alvo: {produto_info['público']}

        Analise:
        1. Tamanho do mercado endereçável
        2. Principais concorrentes e seus pontos fortes
        3. Posicionamento recomendado
        4. Oportunidades de diferenciação
        5. Riscos de mercado

        Retorne JSON estruturado com essas 5 dimensões.
        """

        return self.llm.generate(prompt)


class AnalistaTécnico:
    def __init__(self, llm):
        self.llm = llm

    def analisar(self, produto_info):
        """
        Análise técnica: arquitetura, escalabilidade, tech stack
        """
        prompt = f"""
        Analise este produto do ponto de vista TÉCNICO:

        Produto: {produto_info['nome']}
        Features planejadas: {produto_info['features']}
        Escala esperada: {produto_info.get('escala', 'não especificada')}

        Analise:
        1. Arquitetura recomendada
        2. Tech stack apropriado
        3. Desafios técnicos principais
        4. Escalabilidade e performance
        5. Segurança e compliance

        Retorne JSON estruturado.
        """

        return self.llm.generate(prompt)


class AnalistaUX:
    def __init__(self, llm):
        self.llm = llm

    def analisar(self, produto_info):
        """
        Análise de UX: usabilidade, jornada, fricções
        """
        prompt = f"""
        Analise este produto do ponto de vista de EXPERIÊNCIA DO USUÁRIO:

        Produto: {produto_info['nome']}
        Público: {produto_info['público']}
        Features: {produto_info['features']}

        Analise:
        1. Jornada do usuário principal
        2. Pontos de fricção potenciais
        3. Oportunidades de delight
        4. Acessibilidade
        5. Mobile vs Desktop (prioridade)

        Retorne JSON estruturado.
        """

        return self.llm.generate(prompt)


class AnalistaFinanceiro:
    def __init__(self, llm):
        self.llm = llm

    def analisar(self, produto_info):
        """
        Análise financeira: modelo de receita, custos, viabilidade
        """
        prompt = f"""
        Analise este produto do ponto de vista FINANCEIRO:

        Produto: {produto_info['nome']}
        Modelo de negócio: {produto_info.get('modelo', 'não especificado')}

        Analise:
        1. Modelo de monetização recomendado
        2. Estrutura de custos estimada
        3. Break-even esperado
        4. LTV vs CAC projetado
        5. Riscos financeiros

        Retorne JSON estruturado.
        """

        return self.llm.generate(prompt)


class AgregadorAnálises:
    def __init__(self, llm):
        self.llm = llm

    def agregar(self, análises):
        """
        Combina as 4 análises em relatório executivo único
        """
        prompt = f"""
        Você recebeu 4 análises especializadas do mesmo produto:

        MERCADO:
        {json.dumps(análises['mercado'], indent=2)}

        TÉCNICO:
        {json.dumps(análises['técnico'], indent=2)}

        UX:
        {json.dumps(análises['ux'], indent=2)}

        FINANCEIRO:
        {json.dumps(análises['financeiro'], indent=2)}

        Crie um RELATÓRIO EXECUTIVO que:
        1. Sintetize os pontos principais de cada análise
        2. Identifique CONFLITOS entre as análises (ex: UX quer feature cara que Finance acha inviável)
        3. Priorize recomendações por impacto
        4. Dê veredicto final: GO / NO-GO / GO COM AJUSTES

        Formato: Markdown, máximo 1000 palavras, executivo (não técnico).
        """

        return self.llm.generate(prompt)


# Uso
pipeline = PipelineParaleloAnáliseProduto(llm)

produto = {
    "nome": "TaskFlow AI",
    "descrição": "Gerenciador de projetos com IA que auto-organiza tarefas",
    "público": "Startups e pequenas empresas (5-50 pessoas)",
    "features": [
        "Auto-priorização de tarefas baseada em IA",
        "Integração com Slack/Discord",
        "Dashboards customizáveis",
        "Relatórios automáticos"
    ],
    "modelo": "SaaS - assinatura mensal",
    "escala": "10k usuários no primeiro ano"
}

relatório = pipeline.executar(produto)
print(relatório)
```

**Vantagem:** 4 análises que levariam 2 horas sequencialmente são feitas em ~30 minutos.

---

## MODELO 3: HIERÁRQUICO (Coordenador + Especialistas)

### O Que É

Sistema com um agente coordenador que gerencia especialistas, delegando tarefas e integrando resultados.

```
                 ┌─────────────────────┐
                 │  AGENTE COORDENADOR │
                 │  (Toma decisões)    │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
     ┌────▼────┐      ┌─────▼────┐      ┌────▼────┐
     │ESPECIALISTA   │ESPECIALISTA│    │ESPECIALISTA
     │     A    │      │     B    │      │     C    │
     └─────────┘      └──────────┘      └─────────┘
```

### Quando Usar

✅ **Ideal para:**
- Projetos complexos que precisam de orquestração inteligente
- Quando ordem de execução depende de resultados intermediários
- Quando especialistas precisam de direcionamento específico
- Quando há decisões a tomar durante execução

❌ **Evite quando:**
- Fluxo é totalmente previsível (use Pipeline Linear)
- Todas as tarefas são independentes (use Paralelo)
- Simplicidade é prioridade

---

### EXEMPLO COMPLETO: Sistema de Estratégia de Marketing

```python
class SistemaHierárquicoMarketing:
    """
    Coordenador inteligente gerencia 5 especialistas
    """
    def __init__(self, llm, ferramentas):
        # Coordenador
        self.coordenador = AgenteCoordenadorMarketing(llm)

        # Especialistas
        self.pesquisador = AgentePesquisadorMercado(llm, ferramentas)
        self.estrategista = AgenteEstrategista(llm)
        self.criativo = AgenteCriativo(llm)
        self.analista_dados = AgenteAnalistaDados(llm)
        self.copywriter = AgenteCopywriter(llm)

        # Mapeamento
        self.especialistas = {
            "pesquisador": self.pesquisador,
            "estrategista": self.estrategista,
            "criativo": self.criativo,
            "analista": self.analista_dados,
            "copywriter": self.copywriter
        }

    def executar(self, objetivo):
        """
        Coordenador decide dinamicamente o que fazer
        """
        print(f"🎯 Objetivo recebido: {objetivo}")

        # Coordenador cria plano
        plano = self.coordenador.criar_plano(objetivo, self.especialistas.keys())
        print(f"📋 Plano criado: {len(plano['etapas'])} etapas")

        contexto = {"objetivo_original": objetivo}

        # Executar etapas conforme plano
        for i, etapa in enumerate(plano['etapas'], 1):
            print(f"\n--- ETAPA {i}/{len(plano['etapas'])} ---")
            print(f"Ação: {etapa['ação']}")

            # Coordenador decide qual especialista usar
            especialista_nome = etapa['especialista']
            especialista = self.especialistas[especialista_nome]

            # Preparar input específico para especialista
            input_especialista = self.coordenador.preparar_input(
                etapa,
                contexto
            )

            # Executar
            print(f"🤖 Delegando para {especialista_nome}...")
            resultado = especialista.executar(input_especialista)
            print(f"✓ Concluído")

            # Atualizar contexto
            contexto[etapa['output_key']] = resultado

            # Coordenador avalia se precisa ajustar plano
            ajuste = self.coordenador.avaliar_progresso(
                contexto,
                plano,
                i
            )

            if ajuste['requer_ajuste']:
                print(f"⚠️ Plano ajustado: {ajuste['razão']}")
                plano = ajuste['novo_plano']

        # Coordenador sintetiza resultado final
        print("\n🔗 Sintetizando resultados...")
        resultado_final = self.coordenador.sintetizar(contexto)

        return resultado_final


class AgenteCoordenadorMarketing:
    """
    Agente que toma decisões e gerencia outros agentes
    """
    def __init__(self, llm):
        self.llm = llm

    def criar_plano(self, objetivo, especialistas_disponíveis):
        """
        Cria plano dinâmico baseado no objetivo
        """
        prompt = f"""
        Você é o Coordenador de um time de marketing.

        OBJETIVO: {objetivo}

        ESPECIALISTAS DISPONÍVEIS:
        - pesquisador: Pesquisa de mercado, concorrentes, público
        - estrategista: Cria estratégias baseadas em dados
        - criativo: Gera ideias criativas, conceitos de campanha
        - analista: Define KPIs, métricas, análise de dados
        - copywriter: Escreve copies de anúncios, emails, landing pages

        Crie um PLANO DE EXECUÇÃO com etapas sequenciais.

        Cada etapa deve ter:
        - ação: O que fazer
        - especialista: Qual especialista é responsável
        - input_necessário: Que informação precisa (de etapas anteriores ou do objetivo)
        - output_key: Como salvar o resultado (para usar em etapas futuras)
        - critério_sucesso: Como saber se foi bem sucedido

        Retorne JSON:
        {{
          "etapas": [
            {{
              "ação": "...",
              "especialista": "pesquisador|estrategista|...",
              "input_necessário": ["..."],
              "output_key": "string",
              "critério_sucesso": "..."
            }}
          ],
          "resultado_esperado": "O que deve ser entregue no final"
        }}
        """

        return json.loads(self.llm.generate(prompt))

    def preparar_input(self, etapa, contexto):
        """
        Prepara input específico para especialista baseado no contexto acumulado
        """
        input_data = {
            "tarefa": etapa['ação'],
            "critério_sucesso": etapa['critério_sucesso']
        }

        # Adiciona dados necessários do contexto
        for key in etapa['input_necessário']:
            if key in contexto:
                input_data[key] = contexto[key]

        return input_data

    def avaliar_progresso(self, contexto, plano_atual, etapa_atual):
        """
        Avalia se está no caminho certo ou se precisa ajustar
        """
        prompt = f"""
        Você é o Coordenador. Avalie o progresso:

        PLANO ORIGINAL:
        {json.dumps(plano_atual, indent=2)}

        ETAPA ATUAL: {etapa_atual}/{len(plano_atual['etapas'])}

        CONTEXTO ACUMULADO (resultados até agora):
        {json.dumps(contexto, indent=2)}

        Perguntas:
        1. O progresso está alinhado com objetivo?
        2. Algum resultado inesperado que exige mudança de plano?
        3. Precisamos de etapas adicionais? Ou pular alguma?

        Retorne JSON:
        {{
          "requer_ajuste": true|false,
          "razão": "string explicando por quê",
          "novo_plano": {{...}} (só se requer_ajuste = true)
        }}
        """

        return json.loads(self.llm.generate(prompt))

    def sintetizar(self, contexto):
        """
        Combina todos os outputs dos especialistas em entrega final
        """
        prompt = f"""
        Você é o Coordenador. Todos os especialistas terminaram.

        OUTPUTS DOS ESPECIALISTAS:
        {json.dumps(contexto, indent=2)}

        Crie o DOCUMENTO FINAL integrando tudo:

        Formato:
        # ESTRATÉGIA DE MARKETING COMPLETA

        ## 1. RESEARCH & INSIGHTS
        [Sintetize achados do pesquisador]

        ## 2. ESTRATÉGIA
        [Estratégia do estrategista]

        ## 3. CONCEITO CRIATIVO
        [Ideias do criativo]

        ## 4. EXECUÇÃO
        [Copies do copywriter]

        ## 5. MÉTRICAS DE SUCESSO
        [KPIs do analista]

        ## 6. PLANO DE AÇÃO
        [Timeline integrado de tudo]
        """

        return self.llm.generate(prompt)


# Especialistas (implementação simplificada)

class AgentePesquisadorMercado:
    def __init__(self, llm, ferramentas):
        self.llm = llm
        self.ferramentas = ferramentas

    def executar(self, input_data):
        # Pesquisa mercado conforme tarefa
        return {
            "público_alvo": "...",
            "concorrentes": [...],
            "insights": [...]
        }


class AgenteEstrategista:
    def __init__(self, llm):
        self.llm = llm

    def executar(self, input_data):
        # Cria estratégia baseada em research
        return {
            "posicionamento": "...",
            "mensagem_chave": "...",
            "canais": [...],
            "timeline": "..."
        }


class AgenteCriativo:
    def __init__(self, llm):
        self.llm = llm

    def executar(self, input_data):
        # Gera conceitos criativos
        return {
            "conceito_principal": "...",
            "variações": [...],
            "elementos_visuais": [...]
        }


class AgenteCopywriter:
    def __init__(self, llm):
        self.llm = llm

    def executar(self, input_data):
        # Escreve copies
        return {
            "headline": "...",
            "subheadline": "...",
            "body_copy": "...",
            "cta": "..."
        }


class AgenteAnalistaDados:
    def __init__(self, llm):
        self.llm = llm

    def executar(self, input_data):
        # Define KPIs
        return {
            "kpis_primários": [...],
            "kpis_secundários": [...],
            "targets": {...}
        }


# Uso
sistema = SistemaHierárquicoMarketing(llm, ferramentas)

resultado = sistema.executar(
    "Lançar produto SaaS de gestão de projetos para startups, meta de 1000 usuários pagantes em 3 meses"
)
```

**Vantagem:** Coordenador adapta plano baseado em resultados intermediários (não é rígido como pipeline linear).

---

## MODELO 4: ITERATIVO (Loop de Melhoria Contínua)

### O Que É

Sistema onde agentes trabalham em ciclos de melhoria: criar → avaliar → melhorar → avaliar → melhorar...

```
   ┌─────────────┐
   │   CRIADOR   │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  AVALIADOR  │◄─────┐
   └──────┬──────┘      │
          │             │
          ▼             │
   ┌─────────────┐      │
   │  MELHORADOR │──────┘
   └─────────────┘

   (Loop até atingir critério de parada)
```

### Quando Usar

✅ **Ideal para:**
- Tarefas criativas que precisam de refinamento
- Quando qualidade é mais importante que velocidade
- Otimização de textos, código, designs
- Quando critérios de sucesso são claros

❌ **Evite quando:**
- Prazo apertado (loops podem ser lentos)
- Primeira versão "boa o suficiente"
- Critérios de qualidade são subjetivos demais

---

### EXEMPLO COMPLETO: Sistema de Otimização de Copy

```python
class SistemaIterativoOtimizaçãoCopy:
    """
    Loop: Escreve copy → Avalia → Melhora → Avalia → Melhora...
    Até atingir score mínimo ou max iterações
    """
    def __init__(self, llm):
        self.criador = AgenteCriadorCopy(llm)
        self.avaliador = AgenteAvaliadorCopy(llm)
        self.melhorador = AgenteMelhoradorCopy(llm)

        # Critérios de parada
        self.score_mínimo = 85
        self.max_iterações = 5

    def executar(self, briefing):
        """
        Executa loop de melhoria contínua
        """
        print(f"🎯 Briefing recebido: {briefing['objetivo']}")

        # Iteração 0: Criar primeira versão
        print("\n--- ITERAÇÃO 0 (Criação inicial) ---")
        copy_atual = self.criador.criar(briefing)
        print(f"✓ Copy inicial criada: {len(copy_atual.split())} palavras")

        histórico = []
        iteração = 1

        while iteração <= self.max_iterações:
            print(f"\n--- ITERAÇÃO {iteração} ---")

            # Avaliar versão atual
            print("📊 Avaliando copy...")
            avaliação = self.avaliador.avaliar(copy_atual, briefing)

            print(f"Score: {avaliação['score_total']}/100")
            print(f"Pontos fracos: {', '.join(avaliação['pontos_fracos'])}")

            # Salvar no histórico
            histórico.append({
                "iteração": iteração - 1,
                "copy": copy_atual,
                "score": avaliação['score_total'],
                "feedback": avaliação
            })

            # Verificar critério de parada
            if avaliação['score_total'] >= self.score_mínimo:
                print(f"✅ Score alvo atingido! ({avaliação['score_total']} >= {self.score_mínimo})")
                break

            if iteração == self.max_iterações:
                print(f"⚠️ Máximo de iterações atingido ({self.max_iterações})")
                break

            # Melhorar
            print("🔧 Melhorando copy...")
            copy_atual = self.melhorador.melhorar(
                copy_atual,
                avaliação,
                briefing
            )
            print("✓ Nova versão gerada")

            iteração += 1

        # Resultado final
        print("\n" + "="*50)
        print("📈 EVOLUÇÃO:")
        for h in histórico:
            print(f"  Iteração {h['iteração']}: Score {h['score']}/100")

        melhoria = histórico[-1]['score'] - histórico[0]['score']
        print(f"\n📊 Melhoria total: +{melhoria} pontos")

        return {
            "copy_final": copy_atual,
            "score_final": histórico[-1]['score'],
            "iterações_necessárias": len(histórico),
            "histórico_completo": histórico
        }


class AgenteCriadorCopy:
    def __init__(self, llm):
        self.llm = llm

    def criar(self, briefing):
        """
        Cria primeira versão da copy
        """
        prompt = f"""
        Crie copy de anúncio seguindo este briefing:

        PRODUTO: {briefing['produto']}
        PÚBLICO-ALVO: {briefing['público']}
        OBJETIVO: {briefing['objetivo']}
        TOM: {briefing['tom']}
        RESTRIÇÕES: {briefing.get('restrições', 'Nenhuma')}

        Estrutura obrigatória:
        - Headline (max 60 caracteres)
        - Subheadline (max 100 caracteres)
        - Body (150-200 palavras)
        - CTA (call-to-action)

        Escreva a copy:
        """

        return self.llm.generate(prompt)


class AgenteAvaliadorCopy:
    def __init__(self, llm):
        self.llm = llm

        # Critérios e pesos
        self.critérios = {
            "clareza": 20,  # Mensagem clara?
            "relevância": 20,  # Relevante para público?
            "persuasão": 20,  # Convence a agir?
            "criatividade": 15,  # Original e interessante?
            "aderência_briefing": 15,  # Segue o briefing?
            "gramática": 10  # Sem erros?
        }

    def avaliar(self, copy, briefing):
        """
        Avalia copy em múltiplas dimensões
        """
        prompt = f"""
        Avalie esta copy de anúncio:

        BRIEFING ORIGINAL:
        {json.dumps(briefing, indent=2)}

        COPY A AVALIAR:
        {copy}

        Avalie de 0-100 em cada critério:

        1. CLAREZA (peso 20): A mensagem é clara e fácil de entender?
        2. RELEVÂNCIA (peso 20): É relevante para o público-alvo?
        3. PERSUASÃO (peso 20): Convence o leitor a agir?
        4. CRIATIVIDADE (peso 15): É original e cativante?
        5. ADERÊNCIA AO BRIEFING (peso 15): Segue todas as diretrizes?
        6. GRAMÁTICA (peso 10): Sem erros de português?

        Para cada critério, dê:
        - Score (0-100)
        - Justificativa (por que esse score)
        - Sugestão (como melhorar especificamente)

        Retorne JSON:
        {{
          "scores": {{
            "clareza": 0-100,
            "relevância": 0-100,
            "persuasão": 0-100,
            "criatividade": 0-100,
            "aderência_briefing": 0-100,
            "gramática": 0-100
          }},
          "justificativas": {{
            "clareza": "...",
            "relevância": "...",
            ...
          }},
          "sugestões": {{
            "clareza": "...",
            "relevância": "...",
            ...
          }},
          "score_total": 0-100,  # Média ponderada
          "pontos_fortes": ["...", "...", "..."],
          "pontos_fracos": ["...", "...", "..."]
        }}
        """

        avaliação = json.loads(self.llm.generate(prompt))

        # Calcular score total ponderado
        score_total = sum(
            avaliação['scores'][critério] * peso / 100
            for critério, peso in self.critérios.items()
        )

        avaliação['score_total'] = round(score_total)

        return avaliação


class AgenteMelhoradorCopy:
    def __init__(self, llm):
        self.llm = llm

    def melhorar(self, copy_atual, avaliação, briefing):
        """
        Melhora copy focando nos pontos fracos identificados
        """
        prompt = f"""
        Você recebeu uma copy de anúncio e feedback de avaliação.
        Sua tarefa: MELHORAR a copy focando nos pontos fracos.

        COPY ATUAL:
        {copy_atual}

        BRIEFING:
        {json.dumps(briefing, indent=2)}

        AVALIAÇÃO:
        Score total: {avaliação['score_total']}/100

        Pontos fortes (manter):
        {chr(10).join(f"- {pf}" for pf in avaliação['pontos_fortes'])}

        Pontos fracos (FOCAR AQUI):
        {chr(10).join(f"- {pf}" for pf in avaliação['pontos_fracos'])}

        Sugestões específicas:
        {json.dumps(avaliação['sugestões'], indent=2)}

        IMPORTANTE:
        - MANTENHA o que está funcionando (pontos fortes)
        - MELHORE DRASTICAMENTE os pontos fracos
        - NÃO mude completamente (é iteração, não reescrita do zero)
        - Foque nas sugestões com maior impacto no score

        Escreva a VERSÃO MELHORADA da copy:
        """

        return self.llm.generate(prompt)


# Uso
sistema = SistemaIterativoOtimizaçãoCopy(llm)

briefing = {
    "produto": "App de meditação guiada com IA personalizada",
    "público": "Profissionais estressados, 28-45 anos, urbanos",
    "objetivo": "Conseguir download gratuito do app",
    "tom": "Empático mas moderno, não 'hippie'",
    "restrições": "Não usar palavras: revolucionário, único, incrível"
}

resultado = sistema.executar(briefing)

print("\n" + "="*50)
print("COPY FINAL:")
print(resultado['copy_final'])
print(f"\nScore final: {resultado['score_final']}/100")
print(f"Iterações necessárias: {resultado['iterações_necessárias']}")
```

**Saída exemplo:**
```
🎯 Briefing recebido: Conseguir download gratuito do app

--- ITERAÇÃO 0 (Criação inicial) ---
✓ Copy inicial criada: 187 palavras

--- ITERAÇÃO 1 ---
📊 Avaliando copy...
Score: 72/100
Pontos fracos: persuasão, criatividade

🔧 Melhorando copy...
✓ Nova versão gerada

--- ITERAÇÃO 2 ---
📊 Avaliando copy...
Score: 81/100
Pontos fracos: relevância

🔧 Melhorando copy...
✓ Nova versão gerada

--- ITERAÇÃO 3 ---
📊 Avaliando copy...
Score: 88/100
Pontos fracos: nenhum significativo

✅ Score alvo atingido! (88 >= 85)

==================================================
📈 EVOLUÇÃO:
  Iteração 0: Score 72/100
  Iteração 1: Score 81/100
  Iteração 2: Score 88/100

📊 Melhoria total: +16 pontos
```

---

## MODELO 5: CRUZADO (Agentes se Consultam)

### O Que É

Sistema onde agentes podem consultar uns aos outros de forma dinâmica, não seguindo hierarquia rígida.

```
     ┌─────────┐
  ┌─▶│AGENTE A │──┐
  │  └─────────┘  │
  │       ▲       │
  │       │       ▼
┌─┴───────┴─┐  ┌─────────┐
│ AGENTE C  │◄─│AGENTE B │
└───────────┘  └─────────┘
     ▲            │
     └────────────┘
```

### Quando Usar

✅ **Ideal para:**
- Problemas complexos sem solução linear óbvia
- Quando expertise de múltiplos agentes é necessária iterativamente
- Brainstorming ou design colaborativo
- Tomada de decisão com múltiplas perspectivas

❌ **Evite quando:**
- Processo é bem definido (use Pipeline)
- Precisa de velocidade (cruzado pode ter muitas idas e vindas)
- Risco de loops infinitos

---

### EXEMPLO COMPLETO: Design de Produto por Comitê de Agentes

```python
class SistemaCruzadoDesignProduto:
    """
    4 agentes (PM, Designer, Engineer, Marketer) discutem design de feature
    Cada um pode consultar outros até chegarem em consenso
    """
    def __init__(self, llm):
        self.pm = AgenteProductManager(llm, self)
        self.designer = AgenteDesigner(llm, self)
        self.engineer = AgenteEngineer(llm, self)
        self.marketer = AgenteMarketer(llm, self)

        self.agentes = {
            "PM": self.pm,
            "Designer": self.designer,
            "Engineer": self.engineer,
            "Marketer": self.marketer
        }

        # Histórico de discussão
        self.discussão = []

        # Critério de parada
        self.max_rodadas = 10

    def executar(self, proposta_inicial):
        """
        Agentes discutem até chegarem em consenso
        """
        print(f"💡 Proposta inicial: {proposta_inicial}")

        # PM inicia a discussão
        print("\n" + "="*50)
        print("RODADA 1 - PM apresenta proposta")
        print("="*50)

        contexto = {
            "proposta_inicial": proposta_inicial,
            "versão_atual": proposta_inicial
        }

        proposta_pm = self.pm.analisar_e_propor(contexto)
        self.discussão.append({
            "rodada": 1,
            "agente": "PM",
            "contribuição": proposta_pm
        })

        contexto["versão_atual"] = proposta_pm["proposta_refinada"]

        rodada = 2
        consenso_atingido = False

        while rodada <= self.max_rodadas and not consenso_atingido:
            print(f"\n" + "="*50)
            print(f"RODADA {rodada}")
            print("="*50)

            # Cada agente pode se manifestar
            contribuições_rodada = []

            for nome_agente, agente in self.agentes.items():
                if nome_agente == "PM":
                    continue  # PM já falou na rodada 1

                print(f"\n{nome_agente} analisando...")
                contribuição = agente.analisar_e_contribuir(
                    contexto,
                    self.discussão
                )

                if contribuição["tem_feedback"]:
                    print(f"✋ {nome_agente}: {contribuição['feedback_resumo']}")
                    contribuições_rodada.append({
                        "agente": nome_agente,
                        "contribuição": contribuição
                    })
                else:
                    print(f"✓ {nome_agente}: Sem objeções")

            # Salvar contribuições
            self.discussão.extend([
                {
                    "rodada": rodada,
                    "agente": c["agente"],
                    "contribuição": c["contribuição"]
                }
                for c in contribuições_rodada
            ])

            # Verificar consenso
            if len(contribuições_rodada) == 0:
                print("\n✅ CONSENSO ATINGIDO! Todos aprovaram.")
                consenso_atingido = True
                break

            # PM integra feedbacks
            print(f"\nPM integrando {len(contribuições_rodada)} feedbacks...")
            nova_proposta = self.pm.integrar_feedbacks(
                contexto["versão_atual"],
                contribuições_rodada
            )

            contexto["versão_atual"] = nova_proposta

            rodada += 1

        if not consenso_atingido:
            print(f"\n⚠️ Máximo de rodadas atingido. Forçando decisão final...")
            # PM toma decisão final
            decisão_final = self.pm.decisão_final(contexto, self.discussão)
            contexto["versão_atual"] = decisão_final

        # Documentar decisão
        print("\n" + "="*50)
        print("DOCUMENTANDO DECISÃO")
        print("="*50)

        documento_final = self._documentar_decisão(
            contexto["versão_atual"],
            self.discussão,
            consenso_atingido
        )

        return {
            "decisão_final": contexto["versão_atual"],
            "documento": documento_final,
            "rodadas": rodada - 1,
            "consenso": consenso_atingido,
            "histórico_discussão": self.discussão
        }

    def _documentar_decisão(self, decisão, discussão, consenso):
        """
        Cria documento final com decisão e contexto
        """
        doc = f"""
# DECISÃO DE DESIGN: {decisão.get('nome_feature', 'Feature')}

## DECISÃO FINAL

{decisão.get('descrição', '')}

### Especificações
{json.dumps(decisão.get('specs', {}), indent=2)}

## PROCESSO DE DECISÃO

Total de rodadas: {max(d['rodada'] for d in discussão)}
Consenso atingido: {"Sim" if consenso else "Não (decisão do PM)"}

### Principais Discussões

"""

        for d in discussão:
            if d['contribuição'].get('tem_feedback'):
                doc += f"""
**Rodada {d['rodada']} - {d['agente']}:**
{d['contribuição'].get('feedback_resumo', '')}
"""

        return doc


class AgenteProductManager:
    def __init__(self, llm, sistema):
        self.llm = llm
        self.sistema = sistema
        self.role = "Product Manager"

    def analisar_e_propor(self, contexto):
        """
        PM analisa proposta inicial e refina
        """
        prompt = f"""
        Você é o Product Manager do time.

        PROPOSTA INICIAL:
        {contexto['proposta_inicial']}

        Sua tarefa:
        1. Refinar a proposta com foco em valor pro usuário
        2. Definir escopo claro (o que entra, o que não entra)
        3. Listar perguntas para outros especialistas

        Retorne JSON:
        {{
          "proposta_refinada": {{
            "nome_feature": "...",
            "descrição": "...",
            "user_stories": ["...", "..."],
            "escopo": {{
              "incluído": ["...", "..."],
              "excluído": ["...", "..."]
            }}
          }},
          "perguntas_designer": ["...", "..."],
          "perguntas_engineer": ["...", "..."],
          "perguntas_marketer": ["...", "..."]
        }}
        """

        return json.loads(self.llm.generate(prompt))

    def integrar_feedbacks(self, proposta_atual, feedbacks):
        """
        Integra feedbacks de múltiplos agentes
        """
        feedbacks_text = "\n\n".join([
            f"{f['agente']}:\n{json.dumps(f['contribuição'], indent=2)}"
            for f in feedbacks
        ])

        prompt = f"""
        Você é o PM. Recebeu feedbacks de {len(feedbacks)} especialistas.

        PROPOSTA ATUAL:
        {json.dumps(proposta_atual, indent=2)}

        FEEDBACKS:
        {feedbacks_text}

        Integre os feedbacks criando NOVA VERSÃO da proposta que:
        - Endereça preocupações válidas
        - Mantém escopo gerenciável
        - Busca compromisso quando há conflito

        Retorne JSON com nova versão completa da proposta.
        """

        return json.loads(self.llm.generate(prompt))


class AgenteDesigner:
    def __init__(self, llm, sistema):
        self.llm = llm
        self.sistema = sistema
        self.role = "UX/UI Designer"

    def analisar_e_contribuir(self, contexto, discussão):
        """
        Designer analisa do ponto de vista de UX
        """
        # Pode consultar Engineer se necessário
        consulta_engineer = self._consultar_se_necessário(
            "Engineer",
            contexto
        )

        prompt = f"""
        Você é o Designer UX/UI do time.

        PROPOSTA ATUAL:
        {json.dumps(contexto['versão_atual'], indent=2)}

        HISTÓRICO DE DISCUSSÃO:
        {json.dumps(discussão[-3:], indent=2)}  # Últimas 3 contribuições

        {f"RESPOSTA DO ENGINEER: {consulta_engineer}" if consulta_engineer else ""}

        Analise do ponto de vista de UX:
        1. É intuitivo para usuário?
        2. Fluxo faz sentido?
        3. Há fricções desnecessárias?
        4. É acessível?

        Retorne JSON:
        {{
          "tem_feedback": true|false,
          "feedback_resumo": "string (se tem feedback)",
          "preocupações": ["...", "..."],
          "sugestões": ["...", "..."],
          "aprovado": true|false
        }}
        """

        return json.loads(self.llm.generate(prompt))

    def _consultar_se_necessário(self, agente_nome, contexto):
        """
        Designer pode consultar Engineer para validar viabilidade técnica
        """
        # Implementação simplificada
        # Em sistema real, faria chamada real ao outro agente
        return None


class AgenteEngineer:
    def __init__(self, llm, sistema):
        self.llm = llm
        self.sistema = sistema
        self.role = "Tech Lead"

    def analisar_e_contribuir(self, contexto, discussão):
        """
        Engineer analisa viabilidade técnica
        """
        prompt = f"""
        Você é o Tech Lead do time.

        PROPOSTA ATUAL:
        {json.dumps(contexto['versão_atual'], indent=2)}

        Analise do ponto de vista técnico:
        1. É tecnicamente viável?
        2. Complexidade de implementação?
        3. Riscos técnicos?
        4. Estimativa de esforço?

        Retorne JSON:
        {{
          "tem_feedback": true|false,
          "feedback_resumo": "string",
          "viabilidade": "fácil|médio|difícil|inviável",
          "estimativa_semanas": integer,
          "riscos_técnicos": ["...", "..."],
          "sugestões_técnicas": ["...", "..."],
          "aprovado": true|false
        }}
        """

        return json.loads(self.llm.generate(prompt))


class AgenteMarketer:
    def __init__(self, llm, sistema):
        self.llm = llm
        self.sistema = sistema
        self.role = "Marketing Lead"

    def analisar_e_contribuir(self, contexto, discussão):
        """
        Marketer analisa posicionamento e go-to-market
        """
        prompt = f"""
        Você é o Marketing Lead do time.

        PROPOSTA ATUAL:
        {json.dumps(contexto['versão_atual'], indent=2)}

        Analise do ponto de vista de marketing:
        1. É diferenciado competitivamente?
        2. Mensagem clara pro mercado?
        3. Podemos comunicar os benefícios facilmente?
        4. Há demanda?

        Retorne JSON:
        {{
          "tem_feedback": true|false,
          "feedback_resumo": "string",
          "diferenciação": "forte|média|fraca",
          "clareza_mensagem": "clara|confusa",
          "sugestões_posicionamento": ["...", "..."],
          "aprovado": true|false
        }}
        """

        return json.loads(self.llm.generate(prompt))


# Uso
sistema = SistemaCruzadoDesignProduto(llm)

proposta = """
Adicionar feature de 'Smart Scheduling' no app de gestão de projetos:
IA analisa tarefas do time e sugere automaticamente melhor ordem de execução
baseado em dependências, deadlines e disponibilidade do time.
"""

resultado = sistema.executar(proposta)

print("\n" + "="*70)
print("RESULTADO FINAL:")
print(resultado['documento'])
```

---

## Comparação dos 5 Modelos

```
┌─────────────┬──────────────┬─────────────┬────────────┬───────────────┐
│ MODELO      │ VELOCIDADE   │ QUALIDADE   │ FLEXIBILIDADE │ COMPLEXIDADE │
├─────────────┼──────────────┼─────────────┼────────────┼───────────────┤
│ Linear      │ Média        │ Alta        │ Baixa      │ Baixa         │
│ Paralelo    │ Muito Alta   │ Média-Alta  │ Baixa      │ Média         │
│ Hierárquico │ Média-Alta   │ Muito Alta  │ Alta       │ Alta          │
│ Iterativo   │ Baixa        │ Muito Alta  │ Média      │ Média         │
│ Cruzado     │ Baixa-Média  │ Alta        │ Muito Alta │ Muito Alta    │
└─────────────┴──────────────┴─────────────┴────────────┴───────────────┘
```

### Quando Usar Cada Um

**Pipeline Linear:** Processo bem definido, etapas sequenciais claras
- Ex: Pesquisa → Estruturação → Escrita → Revisão

**Pipeline Paralelo:** Múltiplas análises independentes do mesmo input
- Ex: Analisar produto por 4 ângulos diferentes simultaneamente

**Hierárquico:** Projetos complexos que precisam de coordenação inteligente
- Ex: Campanha de marketing completa com múltiplos especialistas

**Iterativo:** Otimização de qualidade por refinamento
- Ex: Melhorar copy até atingir score alvo

**Cruzado:** Problemas sem solução óbvia, requer múltiplas perspectivas
- Ex: Design de produto novo com trade-offs complexos

---

## Exercícios Práticos

### Exercício 1: Identificar o Modelo Certo

Para cada cenário, identifique qual modelo é mais adequado:

**Cenário A:** Criar relatório mensal automatizado (sempre a mesma estrutura)
**Resposta:** _____________

**Cenário B:** Avaliar ideia de startup de todos os ângulos (técnico, mercado, financeiro)
**Resposta:** _____________

**Cenário C:** Escrever o melhor headline possível para landing page
**Resposta:** _____________

### Exercício 2: Desenhar Seu Sistema

Desenhe um sistema multiagente para: "Criar curso online completo"

Defina:
1. Modelo escolhido
2. Agentes necessários
3. Responsabilidade de cada um
4. Fluxo de informação

### Exercício 3: Implementar Mini-Pipeline

Implemente um pipeline linear simples com 2 agentes:
1. Gerador de Ideias
2. Avaliador de Ideias

---

## Conclusão do Módulo 4

Você agora domina os 5 modelos fundamentais de sistemas multiagentes!

### Checklist de Conhecimento

```
[ ] Entendo diferença entre os 5 modelos
[ ] Sei quando usar cada um
[ ] Consegui implementar exemplo de cada
[ ] Sei combinar modelos (ex: hierárquico + iterativo)
[ ] Entendo trade-offs (velocidade vs qualidade vs complexidade)
```

**Próximo módulo:** Como criar um agente do zero - 9 elementos essenciais com template completo.

---

**Tamanho deste arquivo:** ~28KB
**Status:** Módulo 4 completo

© 2025 FEI - Formação em Engenharia de Intenção
