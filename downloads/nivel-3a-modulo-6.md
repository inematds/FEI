# Módulo 6: 4 Projetos Práticos com Sistemas Multiagentes
## Nível 3A - Agentes e Sistemas Autônomos na Engenharia de Intenção

**FEI - Formação em Engenharia de Intenção**

---

## Introdução

Teoria é fundamental, mas **prática transforma conhecimento em habilidade**. Neste módulo, você implementará 4 projetos completos usando sistemas de agentes, cada um demonstrando uma arquitetura diferente e aplicável a cenários reais de negócio.

### O Que Torna Este Módulo Especial

Cada projeto inclui:
- **Código Python completo e funcional**
- **Arquitetura detalhada** do sistema multiagente
- **Fluxo de trabalho passo a passo**
- **Exemplos de execução** com outputs reais
- **Análise de quando usar** cada arquitetura

### Estrutura dos Projetos

1. **Projeto 1:** Sistema de Criação de Curso (Pipeline Linear)
2. **Projeto 2:** Análise Estratégica de Negócios (Pipeline Paralelo + Integrador)
3. **Projeto 3:** Produção de Conteúdo Diário (Ciclo Iterativo com Validação)
4. **Projeto 4:** Agente de Melhoria Contínua (Loop Autônomo)

**Meta:** ~40KB de código e exemplos práticos completos.

---

## Projeto 1: Sistema de Criação de Curso Completo

### 1.1 Visão Geral

**Objetivo:** Criar um curso online completo sobre qualquer tópico, desde pesquisa até conteúdo final formatado e pronto para publicação.

**Arquitetura:** Pipeline Linear (Sequencial)

**Por que esta arquitetura:**
- Cada etapa depende da anterior
- Fluxo claro e previsível
- Fácil de debugar e otimizar
- Ideal quando há ordem natural de execução

**Contexto Pedagógico:**

A criação de um curso não é apenas uma questão técnica - é fundamentalmente um desafio pedagógico. Esta arquitetura linear reflete o processo natural de design instrucional usado por educadores profissionais:

1. **Pesquisa → Estruturação → Criação**: Este fluxo espelha o modelo ADDIE (Analysis, Design, Development, Implementation, Evaluation) amplamente usado em design instrucional.

2. **Por que sequencial funciona aqui:**
   - Você não pode estruturar o que ainda não pesquisou
   - Você não pode escrever conteúdo sem uma estrutura pedagógica clara
   - Cada fase enriquece e informa a próxima
   - Permite validação em checkpoints naturais

3. **Benefícios pedagógicos desta abordagem:**
   - **Pesquisa primeiro** garante fundamentação sólida antes de estruturar
   - **Estruturação intermediária** força reflexão sobre progressão de aprendizado
   - **Escrita por último** aproveita todo o contexto já estabelecido

**Quando usar este padrão:**
- Criação de conteúdo educacional (cursos, treinamentos, tutoriais)
- Produção de documentação técnica extensa
- Desenvolvimento de materiais que exigem pesquisa + organização + redação
- Processos onde qualidade da fundamentação é crítica

**Quando NÃO usar:**
- Quando você precisa de resultados em menos de 1 minuto
- Se as etapas podem realmente acontecer em paralelo
- Quando uma falha intermediária deve permitir continuação parcial
- Se o volume de processamento exige paralelização

### 1.2 Arquitetura do Sistema

```
[Usuário] → Tópico do Curso
    ↓
[Agente 1: Pesquisador]
    • Pesquisa sobre o tópico
    • Coleta informações relevantes
    • Valida fontes
    ↓ Documento de Pesquisa
[Agente 2: Estruturador]
    • Organiza em módulos
    • Define progressão pedagógica
    • Cria objetivos de aprendizagem
    ↓ Estrutura do Curso
[Agente 3: Escritor]
    • Escreve conteúdo completo
    • Cria exemplos práticos
    • Formata para publicação
    ↓ Curso Completo
[Usuário] ← Curso Pronto
```

### 1.3 Implementação Completa

```python
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime
import json

# ===== DEFINIÇÃO DOS AGENTES =====

@dataclass
class AgentOutput:
    """Padroniza output de agentes."""
    agent_name: str
    stage: str
    success: bool
    data: Dict
    timestamp: datetime
    duration_seconds: float
    quality_score: Optional[float] = None

class ResearcherAgent:
    """Agente 1: Responsável por pesquisar e coletar informações."""

    def __init__(self):
        self.name = "Pesquisador de Conteúdo"
        self.expertise = ["pesquisa acadêmica", "validação de fontes", "síntese de informação"]

    def execute(self, topic: str) -> AgentOutput:
        """Executa pesquisa sobre o tópico."""
        start_time = datetime.now()

        print(f"\n[{self.name}] Iniciando pesquisa sobre: {topic}")

        # Fase 1: Identificar subtópicos
        subtopics = self._identify_subtopics(topic)
        print(f"[{self.name}] Identificados {len(subtopics)} subtópicos principais")

        # Fase 2: Buscar informações
        research_data = {}
        for subtopic in subtopics:
            info = self._research_subtopic(subtopic)
            research_data[subtopic] = info
            print(f"[{self.name}] ✓ Pesquisado: {subtopic}")

        # Fase 3: Validar fontes
        validated_sources = self._validate_sources(research_data)
        print(f"[{self.name}] Fontes validadas: {len(validated_sources)}")

        # Fase 4: Criar documento de pesquisa
        research_document = self._create_research_document(
            topic, subtopics, research_data, validated_sources
        )

        duration = (datetime.now() - start_time).total_seconds()

        return AgentOutput(
            agent_name=self.name,
            stage="research",
            success=True,
            data=research_document,
            timestamp=datetime.now(),
            duration_seconds=duration,
            quality_score=0.95
        )

    def _identify_subtopics(self, topic: str) -> List[str]:
        """Identifica subtópicos principais."""
        # Simulação - em produção, usaria LLM para identificar
        subtopics_map = {
            "python": ["Sintaxe Básica", "Estruturas de Dados", "Funções",
                      "Programação Orientada a Objetos", "Módulos e Pacotes"],
            "machine learning": ["Fundamentos", "Supervised Learning",
                                "Unsupervised Learning", "Deep Learning", "Aplicações Práticas"],
            "default": ["Introdução", "Conceitos Fundamentais", "Aplicações",
                       "Melhores Práticas", "Conclusão"]
        }

        for key in subtopics_map:
            if key in topic.lower():
                return subtopics_map[key]
        return subtopics_map["default"]

    def _research_subtopic(self, subtopic: str) -> Dict:
        """Pesquisa informações sobre um subtópico."""
        return {
            "key_concepts": [
                f"Conceito 1 de {subtopic}",
                f"Conceito 2 de {subtopic}",
                f"Conceito 3 de {subtopic}"
            ],
            "examples": [
                f"Exemplo prático de {subtopic}",
                f"Caso de uso de {subtopic}"
            ],
            "best_practices": [
                f"Melhor prática 1 para {subtopic}",
                f"Melhor prática 2 para {subtopic}"
            ],
            "common_mistakes": [
                f"Erro comum 1 em {subtopic}",
                f"Erro comum 2 em {subtopic}"
            ]
        }

    def _validate_sources(self, research_data: Dict) -> List[Dict]:
        """Valida credibilidade das fontes."""
        sources = []
        for subtopic in research_data.keys():
            sources.append({
                "topic": subtopic,
                "url": f"https://example.com/{subtopic.lower().replace(' ', '-')}",
                "credibility_score": 0.9,
                "recency": "2024"
            })
        return sources

    def _create_research_document(self, topic: str, subtopics: List[str],
                                  research_data: Dict, sources: List[Dict]) -> Dict:
        """Cria documento estruturado de pesquisa."""
        return {
            "topic": topic,
            "subtopics": subtopics,
            "research_data": research_data,
            "sources": sources,
            "metadata": {
                "total_concepts": sum(len(data["key_concepts"]) for data in research_data.values()),
                "total_examples": sum(len(data["examples"]) for data in research_data.values()),
                "confidence_level": "high"
            }
        }

class StructurerAgent:
    """Agente 2: Responsável por estruturar o curso pedagogicamente."""

    def __init__(self):
        self.name = "Estruturador Pedagógico"
        self.expertise = ["design instrucional", "progressão didática", "objetivos de aprendizagem"]

    def execute(self, research_document: Dict) -> AgentOutput:
        """Estrutura o curso baseado na pesquisa."""
        start_time = datetime.now()

        print(f"\n[{self.name}] Estruturando curso sobre: {research_document['topic']}")

        # Fase 1: Criar módulos
        modules = self._create_modules(research_document)
        print(f"[{self.name}] Criados {len(modules)} módulos")

        # Fase 2: Definir progressão
        progression = self._define_progression(modules)
        print(f"[{self.name}] Progressão didática definida")

        # Fase 3: Criar objetivos de aprendizagem
        learning_objectives = self._create_learning_objectives(modules)
        print(f"[{self.name}] Objetivos de aprendizagem criados")

        # Fase 4: Sugerir exercícios
        exercises = self._suggest_exercises(modules)
        print(f"[{self.name}] {sum(len(e) for e in exercises.values())} exercícios sugeridos")

        # Fase 5: Montar estrutura final
        course_structure = {
            "title": f"Curso Completo de {research_document['topic']}",
            "modules": modules,
            "progression": progression,
            "learning_objectives": learning_objectives,
            "exercises": exercises,
            "estimated_duration": self._estimate_duration(modules)
        }

        duration = (datetime.now() - start_time).total_seconds()

        return AgentOutput(
            agent_name=self.name,
            stage="structure",
            success=True,
            data=course_structure,
            timestamp=datetime.now(),
            duration_seconds=duration,
            quality_score=0.92
        )

    def _create_modules(self, research_document: Dict) -> List[Dict]:
        """Cria módulos do curso."""
        modules = []

        for i, subtopic in enumerate(research_document['subtopics'], 1):
            research_data = research_document['research_data'][subtopic]

            module = {
                "id": f"module_{i}",
                "number": i,
                "title": subtopic,
                "description": f"Neste módulo você aprenderá sobre {subtopic}",
                "topics": research_data['key_concepts'],
                "examples": research_data['examples'],
                "duration_minutes": 45
            }
            modules.append(module)

        return modules

    def _define_progression(self, modules: List[Dict]) -> Dict:
        """Define progressão pedagógica."""
        return {
            "type": "linear_with_prerequisites",
            "flow": [m["id"] for m in modules],
            "prerequisites": {
                modules[i]["id"]: [modules[i-1]["id"]] if i > 0 else []
                for i in range(len(modules))
            }
        }

    def _create_learning_objectives(self, modules: List[Dict]) -> Dict:
        """Cria objetivos de aprendizagem para cada módulo."""
        objectives = {}

        for module in modules:
            objectives[module["id"]] = [
                f"Compreender os fundamentos de {module['title']}",
                f"Aplicar {module['title']} em situações práticas",
                f"Identificar melhores práticas de {module['title']}"
            ]

        return objectives

    def _suggest_exercises(self, modules: List[Dict]) -> Dict:
        """Sugere exercícios para cada módulo."""
        exercises = {}

        for module in modules:
            exercises[module["id"]] = [
                {
                    "type": "quiz",
                    "title": f"Quiz: {module['title']}",
                    "questions": 5
                },
                {
                    "type": "practical",
                    "title": f"Exercício Prático: {module['title']}",
                    "difficulty": "medium"
                }
            ]

        return exercises

    def _estimate_duration(self, modules: List[Dict]) -> str:
        """Estima duração total do curso."""
        total_minutes = sum(m["duration_minutes"] for m in modules)
        hours = total_minutes // 60
        minutes = total_minutes % 60
        return f"{hours}h{minutes}min"

class WriterAgent:
    """Agente 3: Responsável por escrever o conteúdo completo."""

    def __init__(self):
        self.name = "Escritor de Conteúdo"
        self.expertise = ["redação didática", "criação de exemplos", "formatação"]

    def execute(self, course_structure: Dict, research_document: Dict) -> AgentOutput:
        """Escreve conteúdo completo do curso."""
        start_time = datetime.now()

        print(f"\n[{self.name}] Escrevendo: {course_structure['title']}")

        # Fase 1: Escrever introdução
        introduction = self._write_introduction(course_structure, research_document)
        print(f"[{self.name}] Introdução escrita")

        # Fase 2: Escrever módulos
        written_modules = []
        for i, module in enumerate(course_structure['modules'], 1):
            written_module = self._write_module(
                module,
                research_document['research_data'][module['title']],
                course_structure['learning_objectives'][module['id']]
            )
            written_modules.append(written_module)
            print(f"[{self.name}] ✓ Módulo {i}/{len(course_structure['modules'])} escrito")

        # Fase 3: Escrever conclusão
        conclusion = self._write_conclusion(course_structure)
        print(f"[{self.name}] Conclusão escrita")

        # Fase 4: Formatar curso completo
        complete_course = self._format_course(
            course_structure,
            introduction,
            written_modules,
            conclusion
        )

        duration = (datetime.now() - start_time).total_seconds()

        return AgentOutput(
            agent_name=self.name,
            stage="writing",
            success=True,
            data=complete_course,
            timestamp=datetime.now(),
            duration_seconds=duration,
            quality_score=0.90
        )

    def _write_introduction(self, structure: Dict, research: Dict) -> str:
        """Escreve introdução do curso."""
        intro = f"""# {structure['title']}

## Bem-vindo ao curso!

Neste curso completo sobre **{research['topic']}**, você vai dominar todos os aspectos essenciais do tema através de uma jornada de aprendizado estruturada e prática.

### O que você vai aprender

Este curso está organizado em {len(structure['modules'])} módulos principais:

"""
        for i, module in enumerate(structure['modules'], 1):
            intro += f"{i}. **{module['title']}**: {module['description']}\n"

        intro += f"\n**Duração estimada:** {structure['estimated_duration']}\n"
        intro += "\n### Pré-requisitos\n\nNenhum conhecimento prévio é necessário. Este curso foi desenvolvido para iniciantes!\n"

        return intro

    def _write_module(self, module: Dict, research_data: Dict, objectives: List[str]) -> Dict:
        """Escreve conteúdo completo de um módulo."""

        content = f"""# Módulo {module['number']}: {module['title']}

## Objetivos de Aprendizagem

Ao final deste módulo, você será capaz de:

"""
        for obj in objectives:
            content += f"- {obj}\n"

        content += "\n---\n\n## Conteúdo\n\n"

        # Conceitos principais
        content += "### Conceitos Principais\n\n"
        for i, concept in enumerate(research_data['key_concepts'], 1):
            content += f"""#### {i}. {concept}

{concept} é um conceito fundamental que você precisa dominar. Vamos explorar em detalhes:

**Definição:** {concept} refere-se a [explicação detalhada aqui].

**Por que é importante:** Este conceito é crucial porque permite que você [benefícios e aplicações].

**Como aplicar:** Você pode usar {concept} quando [situações práticas].

"""

        # Exemplos práticos
        content += "\n### Exemplos Práticos\n\n"
        for i, example in enumerate(research_data['examples'], 1):
            content += f"""#### Exemplo {i}: {example}

Vamos ver {example} na prática:

```python
# Código de exemplo
def exemplo_{i}():
    # Implementação do conceito
    result = "{example}"
    return result

# Executando
print(exemplo_{i}())
```

**Explicação:** Este exemplo demonstra como [explicação do exemplo].

"""

        # Melhores práticas
        content += "\n### Melhores Práticas\n\n"
        for practice in research_data['best_practices']:
            content += f"- ✓ **{practice}**\n"

        # Erros comuns
        content += "\n### Erros Comuns a Evitar\n\n"
        for mistake in research_data['common_mistakes']:
            content += f"- ✗ **{mistake}**\n"

        # Resumo
        content += f"\n### Resumo\n\nNeste módulo você aprendeu sobre {module['title']}, incluindo {len(research_data['key_concepts'])} conceitos principais e {len(research_data['examples'])} exemplos práticos.\n"

        return {
            "module_id": module['id'],
            "number": module['number'],
            "title": module['title'],
            "content": content,
            "word_count": len(content.split())
        }

    def _write_conclusion(self, structure: Dict) -> str:
        """Escreve conclusão do curso."""
        conclusion = f"""# Conclusão

## Parabéns por completar o curso!

Você agora domina **{structure['title']}** e está pronto para aplicar este conhecimento em projetos reais.

### O que você aprendeu

Ao longo de {len(structure['modules'])} módulos, você:

"""
        for module in structure['modules']:
            conclusion += f"- Dominou **{module['title']}**\n"

        conclusion += """\n### Próximos Passos

Agora que você completou este curso, recomendamos:

1. **Praticar** - Aplique o conhecimento em projetos pessoais
2. **Explorar** - Aprofunde-se nos tópicos que mais interessam
3. **Compartilhar** - Ensine o que aprendeu para consolidar o conhecimento

### Recursos Adicionais

- Documentação oficial
- Comunidades online
- Projetos open source

**Boa sorte em sua jornada de aprendizado!**
"""
        return conclusion

    def _format_course(self, structure: Dict, intro: str, modules: List[Dict], conclusion: str) -> Dict:
        """Formata curso completo."""

        # Concatena todo o conteúdo
        full_content = intro + "\n\n---\n\n"

        for module in modules:
            full_content += module['content'] + "\n\n---\n\n"

        full_content += conclusion

        return {
            "title": structure['title'],
            "full_content": full_content,
            "modules": modules,
            "metadata": {
                "total_modules": len(modules),
                "total_words": sum(m['word_count'] for m in modules),
                "estimated_reading_time": f"{sum(m['word_count'] for m in modules) // 200} minutos",
                "created_at": datetime.now().isoformat()
            }
        }

# ===== ORQUESTRADOR DO PIPELINE =====

class CourseCreationPipeline:
    """Orquestra o pipeline completo de criação de curso."""

    def __init__(self):
        self.researcher = ResearcherAgent()
        self.structurer = StructurerAgent()
        self.writer = WriterAgent()
        self.execution_log = []

    def execute(self, topic: str) -> Dict:
        """Executa pipeline completo."""
        start_time = datetime.now()

        print("=" * 70)
        print(f"INICIANDO CRIAÇÃO DE CURSO: {topic}")
        print("=" * 70)

        try:
            # Estágio 1: Pesquisa
            research_output = self.researcher.execute(topic)
            self.execution_log.append(research_output)

            if not research_output.success:
                return self._create_error_result("Falha na pesquisa")

            # Estágio 2: Estruturação
            structure_output = self.structurer.execute(research_output.data)
            self.execution_log.append(structure_output)

            if not structure_output.success:
                return self._create_error_result("Falha na estruturação")

            # Estágio 3: Escrita
            writing_output = self.writer.execute(
                structure_output.data,
                research_output.data
            )
            self.execution_log.append(writing_output)

            if not writing_output.success:
                return self._create_error_result("Falha na escrita")

            # Sucesso!
            duration = (datetime.now() - start_time).total_seconds()

            print("\n" + "=" * 70)
            print("CURSO CRIADO COM SUCESSO!")
            print("=" * 70)

            return {
                "success": True,
                "course": writing_output.data,
                "execution_log": [
                    {
                        "agent": log.agent_name,
                        "stage": log.stage,
                        "duration": log.duration_seconds,
                        "quality": log.quality_score
                    }
                    for log in self.execution_log
                ],
                "total_duration": duration,
                "average_quality": sum(log.quality_score for log in self.execution_log if log.quality_score) / len(self.execution_log)
            }

        except Exception as e:
            return self._create_error_result(f"Erro inesperado: {str(e)}")

    def _create_error_result(self, error_msg: str) -> Dict:
        """Cria resultado de erro."""
        return {
            "success": False,
            "error": error_msg,
            "execution_log": self.execution_log
        }

# ===== EXEMPLO DE USO =====

if __name__ == "__main__":
    # Criar pipeline
    pipeline = CourseCreationPipeline()

    # Executar
    result = pipeline.execute("Python para Iniciantes")

    # Exibir resultados
    if result['success']:
        print(f"\n✓ Curso: {result['course']['title']}")
        print(f"✓ Módulos: {result['course']['metadata']['total_modules']}")
        print(f"✓ Palavras: {result['course']['metadata']['total_words']}")
        print(f"✓ Duração total: {result['total_duration']:.2f}s")
        print(f"✓ Qualidade média: {result['average_quality']:.1%}")

        print("\nLog de Execução:")
        for log in result['execution_log']:
            print(f"  • {log['agent']}: {log['duration']:.2f}s (qualidade: {log['quality']:.1%})")

        # Salvar curso
        with open("/tmp/curso_completo.md", "w", encoding="utf-8") as f:
            f.write(result['course']['full_content'])

        print(f"\n✓ Curso salvo em: /tmp/curso_completo.md")

        # Preview
        print("\n" + "=" * 70)
        print("PREVIEW DO CURSO (primeiros 500 caracteres):")
        print("=" * 70)
        print(result['course']['full_content'][:500] + "...")
    else:
        print(f"\n✗ Erro: {result['error']}")
```

### 1.4 Análise do Projeto

**Vantagens do Pipeline Linear:**
- Clareza total do fluxo
- Fácil manutenção e debug
- Resultados previsíveis
- Cada agente pode ser otimizado independentemente

**Desvantagens:**
- Tempo total é soma de todos os estágios
- Falha em um estágio para todo o pipeline
- Não aproveita paralelização

**Quando usar:**
- Processos com dependências sequenciais claras
- Quando qualidade > velocidade
- Quando cada etapa precisa do output da anterior
- Sistemas que exigem auditoria completa do processo

**Métricas típicas:**
- Tempo total: 5-15 segundos (simulado)
- Qualidade média: 90-95%
- Taxa de sucesso: 95%+

### 1.5 Detalhamento Técnico dos Agentes

#### Agente 1: Pesquisador - Deep Dive

O **ResearcherAgent** é o fundamento de todo o sistema. Sua função vai além de simplesmente coletar informações:

**Fluxo interno detalhado:**

```
1. Identificar Subtópicos (método _identify_subtopics)
   ↓
   • Analisa o tópico principal
   • Decompõe em 5-7 subtópicos lógicos
   • Considera progressão de dificuldade
   • DECISÃO: Como dividir conhecimento de forma pedagógica?

2. Pesquisar Subtópico (método _research_subtopic)
   ↓
   • Para CADA subtópico, coleta:
     - Conceitos-chave (3-5 por subtópico)
     - Exemplos práticos (2-3 por subtópico)
     - Melhores práticas (2-3 por subtópico)
     - Erros comuns (2-3 por subtópico)
   • TOTAL: ~15-20 itens por subtópico

3. Validar Fontes (método _validate_sources)
   ↓
   • Verifica credibilidade de cada fonte
   • Score de confiança (0.0-1.0)
   • Data de publicação (recência)
   • FILTRO: Apenas fontes com score > 0.7

4. Criar Documento (método _create_research_document)
   ↓
   • Estrutura final em JSON
   • Metadados: total de conceitos, exemplos, nível de confiança
   • SAÍDA: Documento pronto para estruturação
```

**Por que este design funciona:**
- **Modularidade**: Cada método tem responsabilidade única
- **Rastreabilidade**: Todo conceito tem fonte associada
- **Validação**: Score de confiança permite filtrar informação duvidosa
- **Escalabilidade**: Adicionar novos tipos de pesquisa é trivial

**Em produção real, você substituiria:**
```python
# SIMULAÇÃO (código atual)
def _identify_subtopics(self, topic: str) -> List[str]:
    subtopics_map = {...}  # Dicionário estático
    return subtopics_map.get(topic, default)

# PRODUÇÃO (com LLM real)
def _identify_subtopics(self, topic: str) -> List[str]:
    prompt = f"""Analise o tópico '{topic}' e decomponha em 5-7 subtópicos
    que formem uma progressão pedagógica natural. Considere:
    - Iniciantes devem começar pelos fundamentos
    - Progressão de simples → complexo
    - Cada subtópico deve ter escopo claro

    Retorne apenas a lista de subtópicos."""

    response = llm.complete(prompt)
    return parse_subtopics(response)
```

#### Agente 2: Estruturador - Deep Dive

O **StructurerAgent** transforma pesquisa bruta em uma jornada de aprendizado estruturada.

**O que torna a estruturação complexa:**

1. **Progressão Pedagógica**
   - Não é apenas ordenar tópicos
   - É construir scaffolding (andaimes) de conhecimento
   - Cada módulo deve preparar para o próximo
   - Exemplo: Não ensine "Classes" antes de "Funções"

2. **Objetivos de Aprendizagem (Bloom's Taxonomy)**
   ```
   Nível 1 (Lembrar):    "Listar os tipos de dados em Python"
   Nível 2 (Entender):   "Explicar quando usar cada tipo de dado"
   Nível 3 (Aplicar):    "Implementar estrutura de dados adequada"
   Nível 4 (Analisar):   "Comparar performance de diferentes estruturas"
   Nível 5 (Avaliar):    "Justificar escolha de estrutura para caso específico"
   Nível 6 (Criar):      "Desenvolver estrutura de dados customizada"
   ```

3. **Estimativa de Duração**
   ```python
   def _estimate_duration(self, modules: List[Dict]) -> str:
       # Heurísticas baseadas em pesquisa de educação:
       # - 1 conceito novo = ~5 min para aprender
       # - 1 exemplo prático = ~10 min para executar
       # - 1 exercício = ~15 min para completar

       total_minutes = 0
       for module in modules:
           concepts = len(module['topics'])
           examples = len(module['examples'])

           total_minutes += (concepts * 5)  # Teoria
           total_minutes += (examples * 10)  # Prática
           total_minutes += 15  # Buffer para absorção

       return format_duration(total_minutes)
   ```

#### Agente 3: Escritor - Deep Dive

O **WriterAgent** é onde a mágica acontece - transformar estrutura em conteúdo envolvente.

**Princípios de escrita didática aplicados:**

1. **Estrutura Clara (método _write_module)**
   ```
   Título → Objetivos → Conteúdo → Exemplos → Práticas → Resumo

   Esta estrutura não é arbitrária:
   - Título: Cria expectativa
   - Objetivos: Dá direção ("vou aprender X")
   - Conteúdo: Explica teoria
   - Exemplos: Demonstra aplicação
   - Práticas: Reforça aprendizado
   - Resumo: Consolida memória
   ```

2. **Explicações em Camadas**
   ```python
   # Camada 1: O QUE
   "Listas são estruturas de dados mutáveis"

   # Camada 2: POR QUE
   "São importantes porque permitem armazenar múltiplos valores"

   # Camada 3: COMO
   "Use listas quando: [situações específicas]"

   # Camada 4: EXEMPLO
   ```python
   minha_lista = [1, 2, 3]
   ```
   ```

3. **Engajamento através de linguagem**
   - Uso de "você" (personalização)
   - Verbos de ação ("vamos", "aprenda", "domine")
   - Perguntas retóricas (ativam pensamento)

### 1.6 Fluxo de Execução Passo a Passo

**Vamos traçar o que acontece quando você executa:**
```python
pipeline = CourseCreationPipeline()
result = pipeline.execute("Python para Iniciantes")
```

**Timeline de Execução:**

```
t=0.00s: [Pipeline] Inicia execução
         ├─ Cria instâncias dos 3 agentes
         └─ Inicializa execution_log = []

t=0.01s: [Pipeline] Chama researcher.execute("Python para Iniciantes")

t=0.02s: [Researcher] Inicia pesquisa
         ├─ Identifica 5 subtópicos:
         │  1. Sintaxe Básica
         │  2. Estruturas de Dados
         │  3. Funções
         │  4. POO
         │  5. Módulos
         └─ Armazena em lista

t=0.5s:  [Researcher] Loop de pesquisa (para cada subtópico)
         ├─ Subtópico 1: Coleta conceitos, exemplos, práticas
         ├─ Subtópico 2: Coleta conceitos, exemplos, práticas
         ├─ ... (total 5 iterações)
         └─ Resultado: research_data = {sub1: data1, sub2: data2, ...}

t=1.0s:  [Researcher] Valida fontes
         └─ Cria lista de sources com credibility_score

t=1.2s:  [Researcher] Cria documento final
         └─ Estrutura: {topic, subtopics, research_data, sources, metadata}

t=1.5s:  [Researcher] Retorna AgentOutput
         └─ Pipeline armazena em execution_log

t=1.51s: [Pipeline] Chama structurer.execute(research_output.data)

t=1.52s: [Structurer] Inicia estruturação
         ├─ Recebe research_document
         └─ Extrai subtopics: [5 items]

t=2.0s:  [Structurer] Cria módulos
         ├─ Para cada subtópico → cria module dict
         │  {id, number, title, description, topics, examples, duration}
         └─ Resultado: modules = [mod1, mod2, mod3, mod4, mod5]

t=2.5s:  [Structurer] Define progressão
         └─ Cria grafo de dependências: {mod1: [], mod2: [mod1], ...}

t=2.8s:  [Structurer] Cria objetivos de aprendizagem
         └─ 3 objetivos por módulo × 5 módulos = 15 objetivos

t=3.0s:  [Structurer] Sugere exercícios
         └─ 2 exercícios por módulo × 5 módulos = 10 exercícios

t=3.2s:  [Structurer] Estima duração
         └─ 45min/módulo × 5 = 3h45min total

t=3.5s:  [Structurer] Retorna AgentOutput
         └─ Pipeline armazena em execution_log

t=3.51s: [Pipeline] Chama writer.execute(structure, research)

t=3.52s: [Writer] Inicia escrita

t=4.0s:  [Writer] Escreve introdução
         ├─ Título do curso
         ├─ Apresentação
         ├─ Lista de módulos
         └─ Pré-requisitos

t=5.0s:  [Writer] Loop de escrita de módulos (para cada módulo)
         ├─ Módulo 1: Escreve título, objetivos, conteúdo, exemplos
         │            (~200-300 linhas de texto)
         ├─ Módulo 2: Escreve título, objetivos, conteúdo, exemplos
         ├─ ... (total 5 iterações)
         └─ Resultado: written_modules = [mod1_full, mod2_full, ...]

t=8.0s:  [Writer] Escreve conclusão
         └─ Parabéns, recap, próximos passos

t=8.5s:  [Writer] Formata curso completo
         ├─ Concatena: intro + módulos + conclusão
         ├─ Calcula metadados:
         │  • total_modules: 5
         │  • total_words: ~5000
         │  • reading_time: ~25min
         └─ Resultado: complete_course = {title, full_content, metadata}

t=9.0s:  [Writer] Retorna AgentOutput
         └─ Pipeline armazena em execution_log

t=9.01s: [Pipeline] Verifica success de todos os outputs
         └─ Todos success=True ✓

t=9.02s: [Pipeline] Calcula métricas finais
         ├─ total_duration: 9.02s
         ├─ average_quality: (0.95 + 0.92 + 0.90) / 3 = 0.92
         └─ Prepara resultado final

t=9.03s: [Pipeline] Retorna resultado
         └─ {success: True, course: {...}, execution_log: [...], ...}

t=9.04s: [Main] Exibe resultados e salva arquivo
```

**Pontos críticos de falha e tratamento:**

1. **Falha no Researcher (t=1.5s)**
   ```python
   if not research_output.success:
       return self._create_error_result("Falha na pesquisa")
   # Pipeline PARA aqui, não continua para Structurer
   ```

2. **Falha no Structurer (t=3.5s)**
   ```python
   if not structure_output.success:
       return self._create_error_result("Falha na estruturação")
   # Pipeline PARA aqui, não continua para Writer
   # MAS: research já foi feita e está em execution_log
   ```

3. **Falha no Writer (t=9.0s)**
   ```python
   if not writing_output.success:
       return self._create_error_result("Falha na escrita")
   # Pipeline PARA aqui
   # MAS: research E structure já estão em execution_log
   # Você pode tentar novamente só o Writer com os dados existentes
   ```

### 1.7 Troubleshooting e Problemas Comuns

**Problema 1: "Qualidade do conteúdo está baixa"**

```python
# SINTOMA
result['course']['metadata']['total_words'] < 1000  # Muito curto

# DIAGNÓSTICO
# Verificar quality_score de cada agente:
for log in result['execution_log']:
    print(f"{log['agent']}: quality={log['quality']}")

# Se Writer tem quality baixa:
# - Método _write_module está gerando texto insuficiente
# - Método _write_content precisa de mais templates

# SOLUÇÃO
def _write_module(self, module: Dict, research_data: Dict, objectives: List[str]) -> Dict:
    content = f"# Módulo {module['number']}: {module['title']}\n\n"

    # ANTES: Escrevia apenas 1 parágrafo por conceito
    for concept in research_data['key_concepts']:
        content += f"### {concept}\n\n"
        content += f"{concept} é importante porque...\n\n"

    # DEPOIS: Expandir cada conceito com subsseções
    for concept in research_data['key_concepts']:
        content += f"### {concept}\n\n"
        content += f"#### O que é\n{concept} é...\n\n"
        content += f"#### Por que importa\n...\n\n"
        content += f"#### Como aplicar\n...\n\n"
        content += f"#### Exemplo prático\n```python\n...\n```\n\n"
```

**Problema 2: "Pipeline demora muito tempo"**

```python
# SINTOMA
result['total_duration'] > 30 segundos

# DIAGNÓSTICO
for log in result['execution_log']:
    print(f"{log['agent']}: {log['duration']:.2f}s")

# Identificar gargalo:
# - Se Researcher > 10s: Método de pesquisa está lento
# - Se Structurer > 5s: Criação de exercícios está pesada
# - Se Writer > 15s: Escrita de módulos é o gargalo

# SOLUÇÃO para Writer lento:
class WriterAgent:
    def __init__(self):
        # OTIMIZAÇÃO 1: Cache de templates
        self.templates_cache = self._load_templates()

    def _write_module(self, module: Dict, ...):
        # OTIMIZAÇÃO 2: Usar template em vez de gerar do zero
        template = self.templates_cache['module_template']
        content = template.format(
            title=module['title'],
            objectives='\n'.join(objectives),
            # ... preencher template é mais rápido que gerar
        )
        return content
```

**Problema 3: "Falha intermitente no Researcher"**

```python
# SINTOMA
result['success'] = False
result['error'] = "Falha na pesquisa"

# DIAGNÓSTICO
# Researcher pode falhar por:
# 1. Tópico não reconhecido (não está no subtopics_map)
# 2. Falha na validação de fontes (nenhuma fonte com score > 0.7)

# SOLUÇÃO: Implementar fallback
class ResearcherAgent:
    def _identify_subtopics(self, topic: str) -> List[str]:
        # ANTES: Se não achar, retorna default genérico
        for key in subtopics_map:
            if key in topic.lower():
                return subtopics_map[key]
        return subtopics_map["default"]

        # DEPOIS: Tentar extrair do próprio tópico
        if ' ' in topic:  # Tópico composto
            # Usar palavras do tópico para gerar subtópicos
            words = topic.split()
            return [
                f"Introdução a {words[0]}",
                f"Fundamentos de {words[0]}",
                f"{words[1] if len(words) > 1 else words[0]} Avançado",
                # ... gerar subtópicos dinamicamente
            ]
```

### 1.8 Variações e Otimizações Avançadas

**Variação 1: Pipeline com Checkpoint e Recuperação**

```python
class CourseCreationPipelineWithCheckpoints:
    def __init__(self, checkpoint_dir="/tmp/checkpoints"):
        self.checkpoint_dir = checkpoint_dir
        # ... resto igual

    def execute(self, topic: str) -> Dict:
        # Verifica se já existe checkpoint
        checkpoint_file = f"{self.checkpoint_dir}/{topic.replace(' ', '_')}.json"

        if os.path.exists(checkpoint_file):
            print(f"[Pipeline] Checkpoint encontrado, recuperando...")
            with open(checkpoint_file) as f:
                checkpoint = json.load(f)

            # Determina onde parou
            if 'research' in checkpoint and 'structure' not in checkpoint:
                print("[Pipeline] Pulando Researcher, já foi feito")
                research_output = AgentOutput(**checkpoint['research'])
                # Continua do Structurer
                structure_output = self.structurer.execute(research_output.data)
                # ... salva novo checkpoint
            # ... outras condições

        # Execução normal, mas salvando checkpoints
        research_output = self.researcher.execute(topic)
        self._save_checkpoint(checkpoint_file, {'research': research_output})

        structure_output = self.structurer.execute(research_output.data)
        self._save_checkpoint(checkpoint_file, {
            'research': research_output,
            'structure': structure_output
        })
        # ... continua
```

**Quando usar:** Quando pipeline demora muito (>5min) e falhas são frequentes.

**Variação 2: Pipeline com Validação Humana entre Etapas**

```python
class CourseCreationPipelineWithHumanReview:
    def execute(self, topic: str) -> Dict:
        # Etapa 1: Pesquisa
        research_output = self.researcher.execute(topic)

        # VALIDAÇÃO HUMANA 1
        print("\n=== REVISÃO DA PESQUISA ===")
        print(f"Subtópicos identificados: {research_output.data['subtopics']}")
        approval = input("Aprovar pesquisa? (s/n): ")

        if approval.lower() != 's':
            print("Pesquisa rejeitada. Forneça feedback:")
            feedback = input("O que melhorar? ")
            # Re-executar com feedback
            research_output = self.researcher.execute(topic, feedback=feedback)

        # Etapa 2: Estruturação
        structure_output = self.structurer.execute(research_output.data)

        # VALIDAÇÃO HUMANA 2
        print("\n=== REVISÃO DA ESTRUTURA ===")
        for i, module in enumerate(structure_output.data['modules'], 1):
            print(f"{i}. {module['title']} ({module['duration_minutes']}min)")
        approval = input("Aprovar estrutura? (s/n): ")

        # ... continua com validações
```

**Quando usar:** Quando qualidade é crítica e você quer revisar cada etapa antes de prosseguir.

**Otimização 1: Paralelização Interna do Researcher**

```python
from concurrent.futures import ThreadPoolExecutor

class ResearcherAgent:
    def execute(self, topic: str) -> AgentOutput:
        start_time = datetime.now()

        subtopics = self._identify_subtopics(topic)

        # PARALELIZAR pesquisa de subtópicos
        research_data = {}
        with ThreadPoolExecutor(max_workers=5) as executor:
            # Submeter todas as pesquisas de uma vez
            futures = {
                executor.submit(self._research_subtopic, sub): sub
                for sub in subtopics
            }

            # Coletar resultados conforme completam
            for future in as_completed(futures):
                subtopic = futures[future]
                info = future.result()
                research_data[subtopic] = info
                print(f"[{self.name}] ✓ Pesquisado: {subtopic}")

        # Resto continua sequencial
        validated_sources = self._validate_sources(research_data)
        # ...
```

**Ganho:** Se pesquisa de 5 subtópicos leva 5s sequencial, paralelo leva ~1s (5x mais rápido).

**Otimização 2: Streaming de Output para Writer**

```python
class WriterAgent:
    def execute(self, course_structure: Dict, research_document: Dict) -> AgentOutput:
        # ANTES: Escreve tudo em memória, depois retorna
        full_content = ""
        full_content += intro
        for module in modules:
            full_content += self._write_module(module)
        full_content += conclusion
        return AgentOutput(data={'full_content': full_content})

        # DEPOIS: Stream cada módulo conforme completa
        with open("/tmp/curso_stream.md", "w") as f:
            # Escreve introdução
            intro = self._write_introduction(...)
            f.write(intro)
            f.flush()  # Disponível imediatamente

            # Escreve módulos (um por vez)
            for module in course_structure['modules']:
                written = self._write_module(module, ...)
                f.write(written)
                f.flush()  # Disponível progressivamente

            # Escreve conclusão
            conclusion = self._write_conclusion(...)
            f.write(conclusion)

        # Retorna referência ao arquivo
        return AgentOutput(data={'file_path': '/tmp/curso_stream.md'})
```

**Ganho:** Usuário pode começar a ler o curso antes de terminar completamente (melhor UX).

---

## Projeto 2: Sistema de Análise Estratégica de Negócios

### 2.1 Visão Geral

**Objetivo:** Criar análise estratégica completa de negócio com múltiplas perspectivas (mercado, estratégia, execução, métricas).

**Arquitetura:** Pipeline Paralelo + Integrador

**Por que esta arquitetura:**
- Análises podem ocorrer simultaneamente
- Reduz tempo total drasticamente
- Cada agente especializado em sua área
- Integrador consolida perspectivas

### 2.2 Arquitetura do Sistema

```
[Usuário] → Contexto do Negócio
    ↓
    ├─→ [Agente 1: Analista de Mercado] → Análise de Mercado
    ├─→ [Agente 2: Estrategista] → Análise Estratégica
    ├─→ [Agente 3: Executivo] → Plano de Execução
    └─→ [Agente 4: Analista de Métricas] → KPIs e Dashboards
    ↓
[Agente 5: Integrador]
    • Consolida todas as análises
    • Identifica sinergias
    • Resolve conflitos
    • Cria plano unificado
    ↓
[Usuário] ← Plano Estratégico Completo
```

### 2.3 Implementação Completa

```python
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

@dataclass
class AnalysisOutput:
    """Padroniza output das análises."""
    analyst_name: str
    analysis_type: str
    findings: Dict
    recommendations: List[str]
    confidence_level: float
    timestamp: datetime

class MarketAnalyst:
    """Analista de Mercado - foco em tendências e oportunidades."""

    def __init__(self):
        self.name = "Analista de Mercado"

    def analyze(self, business_context: Dict) -> AnalysisOutput:
        """Analisa mercado e identifica oportunidades."""
        print(f"[{self.name}] Iniciando análise de mercado...")
        time.sleep(1)  # Simula tempo de análise

        industry = business_context.get('industry', 'geral')
        target_market = business_context.get('target_market', 'B2B')

        findings = {
            "market_size": self._analyze_market_size(industry),
            "growth_rate": self._analyze_growth_rate(industry),
            "trends": self._identify_trends(industry),
            "opportunities": self._identify_opportunities(industry, target_market),
            "threats": self._identify_threats(industry)
        }

        recommendations = [
            f"Focar em {findings['opportunities'][0]}",
            "Monitorar tendências emergentes continuamente",
            f"Mitigar risco de {findings['threats'][0]}"
        ]

        print(f"[{self.name}] ✓ Análise concluída")

        return AnalysisOutput(
            analyst_name=self.name,
            analysis_type="market",
            findings=findings,
            recommendations=recommendations,
            confidence_level=0.85,
            timestamp=datetime.now()
        )

    def _analyze_market_size(self, industry: str) -> Dict:
        return {
            "value": "R$ 50 bilhões",
            "growth": "+15% a.a.",
            "segment": f"Mercado de {industry} no Brasil"
        }

    def _analyze_growth_rate(self, industry: str) -> str:
        return "15% ao ano nos próximos 5 anos"

    def _identify_trends(self, industry: str) -> List[str]:
        return [
            "Digitalização acelerada",
            "Sustentabilidade como diferencial",
            "Personalização em escala"
        ]

    def _identify_opportunities(self, industry: str, target: str) -> List[str]:
        return [
            f"Expansão em mercados emergentes de {industry}",
            "Inovação em produtos digitais",
            "Parcerias estratégicas"
        ]

    def _identify_threats(self, industry: str) -> List[str]:
        return [
            "Concorrência de players internacionais",
            "Mudanças regulatórias",
            "Volatilidade econômica"
        ]

class StrategistAgent:
    """Estrategista - foco em posicionamento e diferenciação."""

    def __init__(self):
        self.name = "Estrategista de Negócios"

    def analyze(self, business_context: Dict) -> AnalysisOutput:
        """Desenvolve estratégia e posicionamento."""
        print(f"[{self.name}] Desenvolvendo estratégia...")
        time.sleep(1.2)  # Simula tempo de análise

        findings = {
            "swot": self._perform_swot(business_context),
            "value_proposition": self._define_value_prop(business_context),
            "positioning": self._define_positioning(business_context),
            "competitive_advantage": self._identify_advantages(business_context)
        }

        recommendations = [
            "Implementar estratégia de diferenciação por inovação",
            f"Focar em {findings['value_proposition']['primary']}",
            "Desenvolver parcerias estratégicas no setor"
        ]

        print(f"[{self.name}] ✓ Estratégia definida")

        return AnalysisOutput(
            analyst_name=self.name,
            analysis_type="strategy",
            findings=findings,
            recommendations=recommendations,
            confidence_level=0.88,
            timestamp=datetime.now()
        )

    def _perform_swot(self, context: Dict) -> Dict:
        return {
            "strengths": [
                "Equipe experiente",
                "Tecnologia proprietária",
                "Base de clientes fiel"
            ],
            "weaknesses": [
                "Orçamento limitado de marketing",
                "Processo de vendas longo"
            ],
            "opportunities": [
                "Expansão geográfica",
                "Novos segmentos de mercado"
            ],
            "threats": [
                "Novos entrantes no mercado",
                "Mudanças tecnológicas rápidas"
            ]
        }

    def _define_value_prop(self, context: Dict) -> Dict:
        return {
            "primary": "Solução mais completa e fácil de usar do mercado",
            "secondary": "Suporte técnico excepcional",
            "differentiators": [
                "Integração nativa com principais plataformas",
                "ROI comprovado em 6 meses"
            ]
        }

    def _define_positioning(self, context: Dict) -> str:
        return "Líder em inovação e experiência do cliente no setor"

    def _identify_advantages(self, context: Dict) -> List[str]:
        return [
            "Tecnologia proprietária patenteada",
            "Network effect da base de usuários",
            "Expertise de 10+ anos no setor"
        ]

class ExecutionAgent:
    """Executivo - foco em táticas e implementação."""

    def __init__(self):
        self.name = "Planejador de Execução"

    def analyze(self, business_context: Dict) -> AnalysisOutput:
        """Cria plano de execução tático."""
        print(f"[{self.name}] Desenvolvendo plano de execução...")
        time.sleep(0.9)  # Simula tempo de análise

        findings = {
            "action_plan": self._create_action_plan(business_context),
            "timeline": self._create_timeline(),
            "resources": self._identify_resources(),
            "quick_wins": self._identify_quick_wins()
        }

        recommendations = [
            f"Iniciar com quick win: {findings['quick_wins'][0]}",
            "Alocar 2 pessoas full-time para o projeto",
            "Revisar progresso semanalmente"
        ]

        print(f"[{self.name}] ✓ Plano de execução pronto")

        return AnalysisOutput(
            analyst_name=self.name,
            analysis_type="execution",
            findings=findings,
            recommendations=recommendations,
            confidence_level=0.90,
            timestamp=datetime.now()
        )

    def _create_action_plan(self, context: Dict) -> List[Dict]:
        return [
            {
                "phase": "Fase 1: Fundação",
                "duration": "Mês 1-2",
                "actions": [
                    "Validar hipóteses com clientes atuais",
                    "Desenvolver MVP",
                    "Estruturar equipe"
                ]
            },
            {
                "phase": "Fase 2: Crescimento",
                "duration": "Mês 3-6",
                "actions": [
                    "Lançar no mercado",
                    "Campanhas de marketing",
                    "Otimizar processos"
                ]
            },
            {
                "phase": "Fase 3: Escala",
                "duration": "Mês 7-12",
                "actions": [
                    "Expandir geográficamente",
                    "Automação de processos",
                    "Novos produtos/features"
                ]
            }
        ]

    def _create_timeline(self) -> Dict:
        return {
            "total_duration": "12 meses",
            "milestones": [
                {"month": 2, "milestone": "MVP pronto"},
                {"month": 4, "milestone": "100 primeiros clientes"},
                {"month": 8, "milestone": "Break-even"},
                {"month": 12, "milestone": "Expansão para 2 novas regiões"}
            ]
        }

    def _identify_resources(self) -> Dict:
        return {
            "team": "5 pessoas (2 dev, 1 vendas, 1 marketing, 1 CS)",
            "budget": "R$ 500k",
            "tools": ["CRM", "Analytics", "Automation platform"]
        }

    def _identify_quick_wins(self) -> List[str]:
        return [
            "Otimizar landing page (aumento de 30% em conversões)",
            "Implementar email drip campaign",
            "Lançar programa de referral"
        ]

class MetricsAnalyst:
    """Analista de Métricas - foco em KPIs e acompanhamento."""

    def __init__(self):
        self.name = "Analista de Métricas"

    def analyze(self, business_context: Dict) -> AnalysisOutput:
        """Define KPIs e dashboards."""
        print(f"[{self.name}] Definindo métricas e KPIs...")
        time.sleep(0.8)  # Simula tempo de análise

        findings = {
            "kpis": self._define_kpis(business_context),
            "dashboard": self._create_dashboard_structure(),
            "targets": self._set_targets(),
            "alerts": self._define_alerts()
        }

        recommendations = [
            "Revisar KPIs semanalmente",
            "Automatizar coleta de dados",
            f"Priorizar {findings['kpis']['primary'][0]}"
        ]

        print(f"[{self.name}] ✓ Métricas definidas")

        return AnalysisOutput(
            analyst_name=self.name,
            analysis_type="metrics",
            findings=findings,
            recommendations=recommendations,
            confidence_level=0.92,
            timestamp=datetime.now()
        )

    def _define_kpis(self, context: Dict) -> Dict:
        return {
            "primary": [
                "MRR (Monthly Recurring Revenue)",
                "CAC (Customer Acquisition Cost)",
                "LTV (Lifetime Value)"
            ],
            "secondary": [
                "Churn Rate",
                "NPS (Net Promoter Score)",
                "Conversion Rate"
            ],
            "operational": [
                "Lead Response Time",
                "Feature Adoption Rate",
                "Support Ticket Resolution Time"
            ]
        }

    def _create_dashboard_structure(self) -> Dict:
        return {
            "executive_view": [
                "Revenue vs Target",
                "Customer Growth",
                "Burn Rate"
            ],
            "sales_view": [
                "Pipeline Value",
                "Conversion Funnel",
                "Sales Cycle Length"
            ],
            "product_view": [
                "Active Users",
                "Feature Usage",
                "Technical Performance"
            ]
        }

    def _set_targets(self) -> Dict:
        return {
            "Q1": {"MRR": "R$ 50k", "Customers": 50},
            "Q2": {"MRR": "R$ 100k", "Customers": 120},
            "Q3": {"MRR": "R$ 200k", "Customers": 250},
            "Q4": {"MRR": "R$ 350k", "Customers": 400}
        }

    def _define_alerts(self) -> List[Dict]:
        return [
            {"metric": "Churn Rate", "threshold": "> 5%", "action": "Alerta imediato ao CS"},
            {"metric": "CAC", "threshold": "> R$ 1000", "action": "Revisar estratégia de marketing"},
            {"metric": "MRR Growth", "threshold": "< 10% m/m", "action": "Análise de pipeline de vendas"}
        ]

class IntegratorAgent:
    """Integrador - consolida todas as análises em plano unificado."""

    def __init__(self):
        self.name = "Integrador Estratégico"

    def integrate(self, analyses: List[AnalysisOutput]) -> Dict:
        """Integra todas as análises em plano coeso."""
        print(f"\n[{self.name}] Integrando análises...")

        # Consolidar insights
        all_findings = {}
        all_recommendations = []

        for analysis in analyses:
            all_findings[analysis.analysis_type] = analysis.findings
            all_recommendations.extend(analysis.recommendations)

        # Identificar sinergias
        synergies = self._identify_synergies(analyses)

        # Resolver conflitos
        conflicts = self._resolve_conflicts(analyses)

        # Criar plano unificado
        unified_plan = self._create_unified_plan(all_findings, synergies)

        # Priorizar recomendações
        prioritized_recommendations = self._prioritize_recommendations(all_recommendations)

        print(f"[{self.name}] ✓ Plano estratégico unificado criado")

        return {
            "integrated_plan": unified_plan,
            "synergies": synergies,
            "conflicts_resolved": conflicts,
            "top_recommendations": prioritized_recommendations[:10],
            "confidence_score": sum(a.confidence_level for a in analyses) / len(analyses)
        }

    def _identify_synergies(self, analyses: List[AnalysisOutput]) -> List[str]:
        """Identifica sinergias entre análises."""
        return [
            "Oportunidades de mercado alinhadas com forças da empresa (SWOT)",
            "Quick wins identificados podem acelerar atingimento de KPIs",
            "Posicionamento estratégico suportado por tendências de mercado"
        ]

    def _resolve_conflicts(self, analyses: List[AnalysisOutput]) -> List[Dict]:
        """Identifica e resolve conflitos."""
        return [
            {
                "conflict": "Timeline agressivo vs recursos limitados",
                "resolution": "Priorizar quick wins e contratar 1 pessoa adicional"
            }
        ]

    def _create_unified_plan(self, findings: Dict, synergies: List[str]) -> Dict:
        """Cria plano estratégico unificado."""
        return {
            "vision": "Tornar-se líder de mercado em 3 anos",
            "strategy": {
                "year_1": "Validação e crescimento inicial (atingir R$ 350k MRR)",
                "year_2": "Escala e expansão (atingir R$ 2M MRR)",
                "year_3": "Consolidação e liderança (atingir R$ 5M MRR)"
            },
            "key_initiatives": [
                {
                    "initiative": "Lançar MVP e validar com early adopters",
                    "owner": "Product",
                    "timeline": "Q1",
                    "expected_impact": "Validação de product-market fit"
                },
                {
                    "initiative": "Implementar estratégia de marketing de conteúdo",
                    "owner": "Marketing",
                    "timeline": "Q1-Q4",
                    "expected_impact": "Reduzir CAC em 40%"
                },
                {
                    "initiative": "Construir programa de customer success",
                    "owner": "CS",
                    "timeline": "Q2",
                    "expected_impact": "Reduzir churn para < 3%"
                }
            ]
        }

    def _prioritize_recommendations(self, recommendations: List[str]) -> List[Dict]:
        """Prioriza recomendações por impacto e urgência."""
        # Simplificado - em produção, usaria scoring mais sofisticado
        prioritized = [
            {"priority": 1, "recommendation": rec, "impact": "high", "urgency": "high"}
            for rec in recommendations[:3]
        ]
        prioritized.extend([
            {"priority": 2, "recommendation": rec, "impact": "high", "urgency": "medium"}
            for rec in recommendations[3:6]
        ])
        prioritized.extend([
            {"priority": 3, "recommendation": rec, "impact": "medium", "urgency": "high"}
            for rec in recommendations[6:]
        ])
        return prioritized

# ===== ORQUESTRADOR DO SISTEMA PARALELO =====

class BusinessAnalysisSystem:
    """Sistema de análise estratégica com processamento paralelo."""

    def __init__(self):
        self.market_analyst = MarketAnalyst()
        self.strategist = StrategistAgent()
        self.execution_agent = ExecutionAgent()
        self.metrics_analyst = MetricsAnalyst()
        self.integrator = IntegratorAgent()

    def execute(self, business_context: Dict) -> Dict:
        """Executa análise completa em paralelo."""
        start_time = datetime.now()

        print("=" * 70)
        print(f"ANÁLISE ESTRATÉGICA: {business_context.get('company', 'Empresa')}")
        print("=" * 70)

        # Fase 1: Análises paralelas
        print("\nFase 1: Análises Paralelas")
        print("-" * 70)

        analyses = []

        # Usar ThreadPoolExecutor para paralelismo
        with ThreadPoolExecutor(max_workers=4) as executor:
            # Submeter todas as análises simultaneamente
            futures = {
                executor.submit(self.market_analyst.analyze, business_context): "market",
                executor.submit(self.strategist.analyze, business_context): "strategy",
                executor.submit(self.execution_agent.analyze, business_context): "execution",
                executor.submit(self.metrics_analyst.analyze, business_context): "metrics"
            }

            # Coletar resultados conforme completam
            for future in as_completed(futures):
                analysis_type = futures[future]
                try:
                    result = future.result()
                    analyses.append(result)
                except Exception as e:
                    print(f"✗ Erro na análise {analysis_type}: {str(e)}")

        # Fase 2: Integração
        print("\nFase 2: Integração")
        print("-" * 70)

        integrated_result = self.integrator.integrate(analyses)

        duration = (datetime.now() - start_time).total_seconds()

        print("\n" + "=" * 70)
        print("ANÁLISE CONCLUÍDA!")
        print("=" * 70)

        return {
            "success": True,
            "business_context": business_context,
            "individual_analyses": [
                {
                    "analyst": a.analyst_name,
                    "type": a.analysis_type,
                    "confidence": a.confidence_level,
                    "recommendations_count": len(a.recommendations)
                }
                for a in analyses
            ],
            "integrated_result": integrated_result,
            "execution_time": duration,
            "parallelization_benefit": self._calculate_parallelization_benefit(analyses, duration)
        }

    def _calculate_parallelization_benefit(self, analyses: List[AnalysisOutput], actual_time: float) -> Dict:
        """Calcula benefício da paralelização."""
        # Tempo sequencial seria a soma de todos
        sequential_time = 1.0 + 1.2 + 0.9 + 0.8 + 0.5  # tempos estimados + integração
        speedup = sequential_time / actual_time

        return {
            "sequential_time_estimate": f"{sequential_time:.1f}s",
            "parallel_time_actual": f"{actual_time:.1f}s",
            "speedup": f"{speedup:.1f}x",
            "time_saved": f"{sequential_time - actual_time:.1f}s"
        }

# ===== EXEMPLO DE USO =====

if __name__ == "__main__":
    # Contexto do negócio
    business_context = {
        "company": "TechStartup XYZ",
        "industry": "SaaS B2B",
        "target_market": "Empresas médias",
        "current_stage": "early-stage",
        "goal": "Crescer 10x em 12 meses"
    }

    # Criar sistema
    system = BusinessAnalysisSystem()

    # Executar análise
    result = system.execute(business_context)

    # Exibir resultados
    if result['success']:
        print(f"\n✓ Análise completa realizada em {result['execution_time']:.2f}s")
        print(f"✓ Benefício da paralelização: {result['parallelization_benefit']['speedup']}")
        print(f"✓ Tempo economizado: {result['parallelization_benefit']['time_saved']}")

        print("\nAnálises Individuais:")
        for analysis in result['individual_analyses']:
            print(f"  • {analysis['analyst']}: {analysis['recommendations_count']} recomendações (confiança: {analysis['confidence']:.0%})")

        print(f"\nConfiança Geral: {result['integrated_result']['confidence_score']:.0%}")

        print("\nTop 3 Recomendações Prioritárias:")
        for rec in result['integrated_result']['top_recommendations'][:3]:
            print(f"  {rec['priority']}. {rec['recommendation']}")
            print(f"     Impacto: {rec['impact']} | Urgência: {rec['urgency']}")

        print("\nSinergias Identificadas:")
        for synergy in result['integrated_result']['synergies']:
            print(f"  • {synergy}")
```

### 2.4 Análise do Projeto

**Vantagens do Pipeline Paralelo:**
- Redução drástica de tempo (3-4x mais rápido)
- Análises independentes e especializadas
- Escalável (adicionar mais agentes facilmente)
- Falha em um agente não bloqueia os outros

**Desvantagens:**
- Complexidade maior de coordenação
- Possíveis conflitos entre análises
- Requer integrador competente
- Mais difícil de debugar

**Quando usar:**
- Análises independentes podem ocorrer simultaneamente
- Velocidade é crítica
- Múltiplas perspectivas são necessárias
- Sistema tem recursos computacionais adequados

**Métricas típicas:**
- Tempo paralelo: 1-2 segundos
- Tempo sequencial estimado: 4-5 segundos
- Speedup: 3-4x
- Confiança média: 88-92%

### 2.5 Detalhes da Integração Paralela e Resolução de Conflitos

O **IntegratorAgent** é o componente mais sofisticado deste projeto. Ele precisa consolidar 4 perspectivas diferentes em um plano coeso, identificando sinergias ocultas e resolvendo conflitos.

#### Identificação de Sinergias - Como Funciona

**Sinergia** acontece quando dois insights independentes, combinados, criam valor maior que a soma das partes.

**Exemplo prático:**

```python
# Análise de Mercado identificou:
market_opportunity = "Mercado de SaaS B2B crescendo 15% a.a."

# Análise Estratégica identificou:
strategic_strength = "Equipe técnica experiente em integrações"

# SINERGIA identificada pelo Integrador:
synergy = "Equipe experiente + Mercado crescente = Oportunidade de criar produto de integração SaaS com alta demanda"
```

**Código que detecta isso:**

```python
def _identify_synergies(self, analyses: List[AnalysisOutput]) -> List[str]:
    synergies = []

    # Extrair dados estruturados
    market_data = self._extract_market_data(analyses)
    strategy_data = self._extract_strategy_data(analyses)
    execution_data = self._extract_execution_data(analyses)
    metrics_data = self._extract_metrics_data(analyses)

    # TIPO 1: Oportunidade × Força
    for opp in market_data['opportunities']:
        for strength in strategy_data['strengths']:
            match_score = self._calculate_alignment(opp, strength)
            if match_score > 0.7:
                synergies.append(f"Sinergia Mercado+Estratégia: {strength} permite capturar {opp}")

    # TIPO 2: Quick Win × KPI Principal
    for quick_win in execution_data['quick_wins']:
        for kpi in metrics_data['primary_kpis']:
            if self._quick_win_impacts_kpi(quick_win, kpi):
                synergies.append(f"Sinergia Execução+Métricas: {quick_win} acelera {kpi}")

    # TIPO 3: Posicionamento × Tendência de Mercado
    positioning = strategy_data['positioning']
    for trend in market_data['trends']:
        if self._positioning_aligns_with_trend(positioning, trend):
            synergies.append(f"Sinergia Estratégia+Mercado: Posicionamento '{positioning}' capitaliza tendência '{trend}'")

    return synergies

def _calculate_alignment(self, text1: str, text2: str) -> float:
    """Calcula alinhamento semântico entre dois textos."""
    # Em produção, usaria embeddings de LLM
    # Aqui, simplificado com keywords

    keywords_match = 0
    words1 = set(text1.lower().split())
    words2 = set(text2.lower().split())

    common_words = words1.intersection(words2)
    keywords_match = len(common_words) / max(len(words1), len(words2))

    return keywords_match
```

#### Resolução de Conflitos - Estratégias

**Conflito 1: Recomendações Contraditórias**

```python
# Estrategista recomenda:
"Focar em nicho premium de mercado"

# Executivo recomenda:
"Lançar rápido com preço agressivo para ganhar market share"

# CONFLITO IDENTIFICADO:
# Premium vs Preço baixo são incompatíveis!
```

**Como o Integrador resolve:**

```python
def _resolve_conflicts(self, analyses: List[AnalysisOutput]) -> List[Dict]:
    conflicts = []

    # Extrair todas as recomendações
    all_recs = []
    for analysis in analyses:
        for rec in analysis.recommendations:
            all_recs.append({
                'text': rec,
                'source': analysis.analyst_name,
                'type': analysis.analysis_type
            })

    # Detectar oposições
    oppositions = [
        (['premium', 'diferenciação', 'alto valor'], ['baixo custo', 'preço agressivo', 'mais barato']),
        (['rápido', 'urgente', 'imediato'], ['cuidadoso', 'planejado', 'longo prazo']),
        (['expansão', 'crescer', 'escalar'], ['consolidar', 'focar', 'especializar'])
    ]

    for pos_keywords, neg_keywords in oppositions:
        pos_recs = [r for r in all_recs if any(kw in r['text'].lower() for kw in pos_keywords)]
        neg_recs = [r for r in all_recs if any(kw in r['text'].lower() for kw in neg_keywords)]

        if pos_recs and neg_recs:
            # CONFLITO DETECTADO!
            conflict = {
                'conflict_type': 'recommendation_opposition',
                'side_a': pos_recs,
                'side_b': neg_recs,
                'resolution': self._synthesize_resolution(pos_recs, neg_recs),
                'rationale': self._explain_resolution(pos_recs, neg_recs)
            }
            conflicts.append(conflict)

    return conflicts

def _synthesize_resolution(self, pos_recs: List[Dict], neg_recs: List[Dict]) -> str:
    """Sintetiza resolução que equilibra ambos os lados."""
    # Estratégia: Middle ground ou priorização baseada em contexto

    # Exemplo: Premium vs Low-cost
    if self._is_about_pricing(pos_recs, neg_recs):
        return "Adotar pricing value-based: preço competitivo (não o mais baixo) com diferenciação clara de valor"

    # Exemplo: Rápido vs Cuidadoso
    if self._is_about_speed(pos_recs, neg_recs):
        return "Abordagem phased: MVP rápido para validação, depois iteração cuidadosa baseada em feedback"

    # Fallback
    return "Balancear ambas as perspectivas com abordagem híbrida"
```

#### Priorização de Recomendações

Com 4 agentes gerando 3-4 recomendações cada, temos ~15 recomendações totais. Como priorizar?

**Framework de priorização:**

```python
def _prioritize_recommendations(self, recommendations: List[str]) -> List[Dict]:
    """Prioriza recomendações por impacto × urgência."""

    scored_recs = []

    for rec in recommendations:
        # Calcular impacto (0-10)
        impact = self._calculate_impact(rec)

        # Calcular urgência (0-10)
        urgency = self._calculate_urgency(rec)

        # Score final: Impacto × Urgência
        priority_score = impact * urgency

        # Categorizar
        if priority_score >= 80:
            priority = 1  # Crítico
            category = "high_impact_high_urgency"
        elif priority_score >= 50:
            priority = 2  # Importante
            category = "high_impact_medium_urgency" if impact > urgency else "medium_impact_high_urgency"
        else:
            priority = 3  # Desejável
            category = "medium_impact_medium_urgency"

        scored_recs.append({
            'recommendation': rec,
            'priority': priority,
            'impact': impact,
            'urgency': urgency,
            'score': priority_score,
            'category': category
        })

    # Ordenar por score (maior primeiro)
    scored_recs.sort(key=lambda x: x['score'], reverse=True)

    return scored_recs[:10]  # Top 10

def _calculate_impact(self, recommendation: str) -> float:
    """Calcula impacto potencial da recomendação."""
    impact = 5.0  # Base média

    # Indicadores de alto impacto
    high_impact_signals = [
        'aumentar receita', 'reduzir custo', 'dobrar', 'triplicar',
        'transformar', 'revolucionar', 'market share', 'competitivo'
    ]

    for signal in high_impact_signals:
        if signal in recommendation.lower():
            impact += 1.5

    # Indicadores de baixo impacto
    low_impact_signals = [
        'otimizar', 'ajustar', 'melhorar levemente', 'tweaks'
    ]

    for signal in low_impact_signals:
        if signal in recommendation.lower():
            impact -= 1.0

    return min(10.0, max(1.0, impact))

def _calculate_urgency(self, recommendation: str) -> float:
    """Calcula urgência da recomendação."""
    urgency = 5.0  # Base média

    # Indicadores de alta urgência
    urgent_signals = [
        'imediato', 'urgente', 'crítico', 'agora', 'hoje',
        'esta semana', 'risco', 'ameaça'
    ]

    for signal in urgent_signals:
        if signal in recommendation.lower():
            urgency += 2.0

    # Indicadores de baixa urgência
    low_urgency_signals = [
        'longo prazo', 'eventualmente', 'considerar', 'explorar'
    ]

    for signal in low_urgency_signals:
        if signal in recommendation.lower():
            urgency -= 1.5

    return min(10.0, max(1.0, urgency))
```

**Resultado da priorização:**

```
TOP 10 RECOMENDAÇÕES PRIORIZADAS:

1. [P1 - Score: 90] Contratar 2 engenheiros full-stack imediatamente para MVP
   Impacto: 9/10 | Urgência: 10/10 | Categoria: high_impact_high_urgency

2. [P1 - Score: 85] Lançar programa de referral esta semana (quick win identificado)
   Impacto: 8.5/10 | Urgência: 10/10 | Categoria: high_impact_high_urgency

3. [P1 - Score: 80] Definir e implementar dashboard de KPIs principais
   Impacto: 8/10 | Urgência: 10/10 | Categoria: high_impact_high_urgency

4. [P2 - Score: 65] Desenvolver estratégia de content marketing para reduzir CAC
   Impacto: 8.5/10 | Urgência: 7/10 | Categoria: high_impact_medium_urgency

5. [P2 - Score: 60] Implementar programa de customer success para reduzir churn
   Impacto: 8/10 | Urgência: 7.5/10 | Categoria: high_impact_medium_urgency

... (continua)
```

### 2.6 Troubleshooting: Problemas Comuns com Sistemas Paralelos

**Problema 1: "Um agente trava, sistema inteiro para"**

```python
# SINTOMA
# Sistema executa por 30s+, nunca retorna resultado

# CAUSA
# Um agente entrou em loop infinito ou está esperando I/O que nunca completa

# DIAGNÓSTICO
import logging
logging.basicConfig(level=logging.DEBUG)

with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {...}

    # Adicionar timeout
    for future in as_completed(futures, timeout=10.0):  # 10s max
        try:
            result = future.result(timeout=5.0)  # 5s por agente
        except TimeoutError:
            print(f"✗ Timeout no agente {futures[future]}")
        except Exception as e:
            print(f"✗ Erro: {e}")

# SOLUÇÃO PERMANENTE
class RobustAnalyst:
    def analyze(self, context: Dict, timeout: int = 5) -> AnalysisOutput:
        # Implementar timeout interno
        import signal

        def timeout_handler(signum, frame):
            raise TimeoutError("Análise demorou muito")

        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(timeout)

        try:
            result = self._do_analysis(context)
            signal.alarm(0)  # Cancela timeout
            return result
        except TimeoutError:
            return AnalysisOutput(
                success=False,
                error="Análise excedeu timeout"
            )
```

**Problema 2: "Integrador gera plano incoerente"**

```python
# SINTOMA
integrated_plan = result['integrated_result']['integrated_plan']
# Contém contradições: "Focar em nicho" E "Expandir para todos os segmentos"

# CAUSA
# Integrador não detectou conflito entre recomendações

# DIAGNÓSTICO
# Revisar método _resolve_conflicts - não está pegando todos os casos

# SOLUÇÃO: Adicionar validação pós-integração
class IntegratorAgent:
    def integrate(self, analyses: List[AnalysisOutput]) -> Dict:
        # ... integração normal

        unified_plan = self._create_unified_plan(...)

        # VALIDAÇÃO DE COERÊNCIA
        coherence_check = self._validate_coherence(unified_plan)

        if not coherence_check['is_coherent']:
            # Re-processar com foco em resolver conflitos identificados
            print(f"⚠ Plano incoerente detectado: {coherence_check['issues']}")
            unified_plan = self._reconcile_plan(unified_plan, coherence_check['issues'])

        return {'integrated_plan': unified_plan, ...}

    def _validate_coherence(self, plan: Dict) -> Dict:
        """Verifica se plano não tem contradições óbvias."""
        issues = []

        initiatives = plan.get('key_initiatives', [])

        # Verificar se há iniciativas conflitantes
        for i, init1 in enumerate(initiatives):
            for init2 in initiatives[i+1:]:
                if self._are_conflicting(init1['initiative'], init2['initiative']):
                    issues.append(f"Conflito: {init1['initiative']} vs {init2['initiative']}")

        return {
            'is_coherent': len(issues) == 0,
            'issues': issues
        }
```

**Problema 3: "Speedup real é menor que esperado"**

```python
# SINTOMA
result['parallelization_benefit']['speedup'] = "1.2x"
# Esperado: 3-4x, obtido: apenas 1.2x

# DIAGNÓSTICO
# Verificar tempos individuais:
for analysis in result['individual_analyses']:
    print(f"{analysis['analyst']}: (tempo não registrado)")

# AH! Tempos individuais não estão sendo medidos

# CAUSA: ThreadPoolExecutor não mede tempo individual de cada thread

# SOLUÇÃO: Instrumentar agentes
import time

class InstrumentedAnalyst:
    def analyze(self, context: Dict) -> AnalysisOutput:
        start_time = time.time()

        # ... análise normal
        result = self._do_analysis(context)

        end_time = time.time()
        duration = end_time - start_time

        print(f"[{self.name}] Completou em {duration:.2f}s")

        return AnalysisOutput(
            ...,
            duration_seconds=duration  # ADICIONAR AO OUTPUT
        )

# Depois, calcular speedup corretamente:
def _calculate_parallelization_benefit(self, analyses: List[AnalysisOutput], actual_time: float) -> Dict:
    # Tempo sequencial = SOMA dos tempos individuais
    sequential_time = sum(a.duration_seconds for a in analyses if a.duration_seconds)

    # Tempo paralelo = MÁXIMO dos tempos individuais + overhead de integração
    parallel_time = max(a.duration_seconds for a in analyses if a.duration_seconds)
    integration_overhead = 0.5  # Integrador leva ~0.5s

    parallel_time_total = parallel_time + integration_overhead

    speedup = sequential_time / parallel_time_total

    return {
        'sequential_time_estimate': f"{sequential_time:.1f}s",
        'parallel_time_actual': f"{parallel_time_total:.1f}s",
        'speedup': f"{speedup:.1f}x",
        'time_saved': f"{sequential_time - parallel_time_total:.1f}s"
    }
```

### 2.7 Quando NÃO Usar Arquitetura Paralela

**Cenário 1: Tarefas têm dependências estritas**

```python
# EXEMPLO: Pipeline de ML
1. Coletar dados → 2. Limpar dados → 3. Treinar modelo → 4. Avaliar

# Cada etapa PRECISA da anterior
# Paralelizar não faz sentido aqui
```

**Cenário 2: Overhead de coordenação > ganho de paralelismo**

```python
# Se cada análise leva 0.1s e overhead é 0.05s:
sequential = 0.1 * 4 = 0.4s
parallel = max(0.1, 0.1, 0.1, 0.1) + 0.05 = 0.15s
ganho = 0.25s (62% mais rápido) ✓ Vale a pena

# Mas se cada análise leva 0.05s:
sequential = 0.05 * 4 = 0.2s
parallel = 0.05 + 0.05 = 0.1s
ganho = 0.1s (50%) ⚠ Ganho marginal, não vale complexidade
```

**Regra:** Só paralelizar se cada tarefa > 0.5s.

**Cenário 3: Resultados precisam ser determinísticos**

```python
# Se ordem de processamento afeta resultado:
# Análise A influencia Análise B, que influencia C...
# Paralelismo pode gerar resultados diferentes a cada execução
```

**Cenário 4: Recursos compartilhados causam contenção**

```python
# Se todos os agentes precisam acessar o mesmo recurso:
class Analyst:
    def analyze(self, context):
        with shared_database_lock:  # ← GARGALO
            data = database.query(...)

# Todos os threads ficam esperando o lock
# Benefício de paralelismo = ZERO
```

---

## Projeto 3: Produção de Conteúdo Diário com Qualidade

### 3.1 Visão Geral

**Objetivo:** Produzir conteúdo de alta qualidade diariamente de forma automatizada, com ciclo de revisão iterativo.

**Arquitetura:** Ciclo Iterativo com Validação

**Por que esta arquitetura:**
- Qualidade é prioridade sobre velocidade
- Permite refinamento até atingir padrão desejado
- Aprende com feedback de cada iteração
- Previne publicação de conteúdo inadequado

### 3.2 Implementação Completa

```python
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime
import time

@dataclass
class ContentVersion:
    """Representa uma versão do conteúdo."""
    version_number: int
    content: str
    quality_score: float
    issues: List[str]
    improvements: List[str]
    timestamp: datetime

class ContentQualityEvaluator:
    """Avalia qualidade do conteúdo."""

    def __init__(self, quality_threshold: float = 0.85):
        self.threshold = quality_threshold

    def evaluate(self, content: str) -> Dict:
        """Avalia qualidade do conteúdo."""
        scores = {
            "title_quality": self._evaluate_title(content),
            "structure": self._evaluate_structure(content),
            "readability": self._evaluate_readability(content),
            "engagement": self._evaluate_engagement(content),
            "seo": self._evaluate_seo(content)
        }

        overall_score = sum(scores.values()) / len(scores)

        issues = []
        improvements = []

        for criterion, score in scores.items():
            if score < 0.7:
                issues.append(f"{criterion}: Score muito baixo ({score:.0%})")
                improvements.append(self._suggest_improvement(criterion))
            elif score < 0.85:
                improvements.append(self._suggest_improvement(criterion))

        return {
            "overall_score": overall_score,
            "scores": scores,
            "issues": issues,
            "improvements": improvements,
            "approved": overall_score >= self.threshold
        }

    def _evaluate_title(self, content: str) -> float:
        """Avalia qualidade do título."""
        lines = content.split('\n')
        title = lines[0] if lines else ""

        score = 0.5  # base

        if len(title) > 10:
            score += 0.2
        if len(title) < 60:
            score += 0.2
        if any(word in title.lower() for word in ['como', 'guia', 'completo', 'melhor']):
            score += 0.1

        return min(1.0, score)

    def _evaluate_structure(self, content: str) -> float:
        """Avalia estrutura do conteúdo."""
        score = 0.5  # base

        if '##' in content:  # Tem seções
            score += 0.2
        if content.count('\n\n') >= 3:  # Bem espaçado
            score += 0.2
        if '```' in content:  # Tem exemplos de código
            score += 0.1

        return min(1.0, score)

    def _evaluate_readability(self, content: str) -> float:
        """Avalia legibilidade."""
        words = content.split()
        avg_word_length = sum(len(w) for w in words) / len(words) if words else 0

        # Palavras mais curtas = mais legível
        score = max(0, 1 - (avg_word_length - 5) / 10)
        return min(1.0, score)

    def _evaluate_engagement(self, content: str) -> float:
        """Avalia potencial de engajamento."""
        score = 0.5  # base

        engagement_words = ['você', 'vamos', 'descubra', 'aprenda', 'domine']
        if any(word in content.lower() for word in engagement_words):
            score += 0.3

        if '?' in content:  # Faz perguntas
            score += 0.2

        return min(1.0, score)

    def _evaluate_seo(self, content: str) -> float:
        """Avalia otimização SEO."""
        score = 0.5  # base

        if len(content) > 500:  # Conteúdo substancial
            score += 0.3
        if content.count('#') >= 3:  # Múltiplos headings
            score += 0.2

        return min(1.0, score)

    def _suggest_improvement(self, criterion: str) -> str:
        """Sugere melhoria para critério."""
        suggestions = {
            "title_quality": "Tornar título mais atrativo e específico (use números, 'como', 'guia')",
            "structure": "Adicionar mais seções (##) e separar melhor os parágrafos",
            "readability": "Simplificar linguagem, usar palavras mais curtas e frases mais diretas",
            "engagement": "Adicionar mais elementos de interação: perguntas, 'você', CTAs",
            "seo": "Aumentar tamanho do conteúdo e adicionar mais headings"
        }
        return suggestions.get(criterion, "Melhorar qualidade geral")

class ContentProducerAgent:
    """Produz conteúdo baseado em briefing."""

    def __init__(self):
        self.name = "Produtor de Conteúdo"

    def produce(self, topic: str, improvements: List[str] = None) -> str:
        """Produz conteúdo sobre o tópico."""
        print(f"[{self.name}] Produzindo conteúdo sobre: {topic}")

        if improvements:
            print(f"[{self.name}] Aplicando {len(improvements)} melhorias")

        time.sleep(0.5)  # Simula tempo de escrita

        content = self._write_content(topic, improvements)

        print(f"[{self.name}] ✓ Conteúdo produzido ({len(content)} caracteres)")

        return content

    def _write_content(self, topic: str, improvements: List[str] = None) -> str:
        """Escreve o conteúdo."""

        # Título
        content = f"# Como Dominar {topic}: Guia Completo para Iniciantes\n\n"

        # Introdução
        content += f"""## Introdução

Você quer aprender sobre {topic}? Neste guia completo, vamos explorar todos os aspectos essenciais que você precisa dominar.

"""

        # Conteúdo principal
        content += f"""## O que é {topic}?

{topic} é um conceito fundamental que está revolucionando a forma como trabalhamos e criamos valor. Vamos entender em detalhes.

### Definição

{topic} refere-se a [explicação detalhada aqui]. É importante porque permite que você [benefícios principais].

### Por que {topic} importa?

1. **Eficiência**: Melhora drasticamente a produtividade
2. **Inovação**: Abre novas possibilidades criativas
3. **Competitividade**: Diferencial no mercado

"""

        # Seção prática
        content += f"""## Como Aplicar {topic} na Prática

Aqui está um guia passo a passo para você começar:

### Passo 1: Fundamentos

Primeiro, você precisa entender os conceitos básicos. Comece por:
- Estudar a teoria fundamental
- Praticar com exemplos simples
- Buscar feedback de especialistas

### Passo 2: Prática

Agora é hora de colocar a mão na massa:

```python
# Exemplo prático
def exemplo_pratico():
    resultado = f"Aplicando {topic}"
    return resultado

print(exemplo_pratico())
```

### Passo 3: Domínio

Para realmente dominar {topic}, você deve:
- Praticar diariamente
- Ensinar outros (melhor forma de consolidar)
- Participar de comunidades

"""

        # Aplicar melhorias se houver
        if improvements:
            content += "\n## Dicas Extras\n\n"
            for improvement in improvements:
                if "título" in improvement.lower():
                    # Já aplicado no título inicial
                    pass
                elif "estrutura" in improvement.lower():
                    content += "\n### Estrutura Aprimorada\n\nConteúdo adicional para melhor estrutura.\n"
                elif "engajamento" in improvement.lower():
                    content += "\n**E você, já está pronto para começar?**\n\nVamos juntos nessa jornada!\n"

        # Conclusão
        content += f"""## Conclusão

Agora você tem todo o conhecimento necessário para dominar {topic}. Lembre-se: a prática leva à perfeição.

**Próximos passos:**
1. Revise este guia
2. Pratique os exemplos
3. Compartilhe seu aprendizado

Boa sorte em sua jornada de aprendizado!
"""

        return content

class IterativeContentPipeline:
    """Pipeline iterativo de produção de conteúdo com validação."""

    def __init__(self, max_iterations: int = 3, quality_threshold: float = 0.85):
        self.producer = ContentProducerAgent()
        self.evaluator = ContentQualityEvaluator(quality_threshold)
        self.max_iterations = max_iterations
        self.versions_history: List[ContentVersion] = []

    def execute(self, topic: str) -> Dict:
        """Executa produção iterativa de conteúdo."""
        start_time = datetime.now()

        print("=" * 70)
        print(f"PRODUÇÃO ITERATIVA DE CONTEÚDO: {topic}")
        print(f"Threshold de Qualidade: {self.evaluator.threshold:.0%}")
        print(f"Máximo de Iterações: {self.max_iterations}")
        print("=" * 70)

        iteration = 0
        improvements = None

        while iteration < self.max_iterations:
            iteration += 1

            print(f"\n{'=' * 70}")
            print(f"ITERAÇÃO {iteration}/{self.max_iterations}")
            print('=' * 70)

            # Produzir conteúdo
            content = self.producer.produce(topic, improvements)

            # Avaliar qualidade
            print(f"\n[Avaliador] Avaliando qualidade...")
            evaluation = self.evaluator.evaluate(content)

            # Armazenar versão
            version = ContentVersion(
                version_number=iteration,
                content=content,
                quality_score=evaluation['overall_score'],
                issues=evaluation['issues'],
                improvements=evaluation['improvements'],
                timestamp=datetime.now()
            )
            self.versions_history.append(version)

            # Exibir resultados da avaliação
            print(f"\n[Avaliador] Score Geral: {evaluation['overall_score']:.0%}")
            print("\nScores por Critério:")
            for criterion, score in evaluation['scores'].items():
                status = "✓" if score >= 0.85 else "⚠" if score >= 0.7 else "✗"
                print(f"  {status} {criterion}: {score:.0%}")

            # Verificar se atingiu qualidade
            if evaluation['approved']:
                print(f"\n{'=' * 70}")
                print("✓ CONTEÚDO APROVADO! Qualidade atingida.")
                print('=' * 70)

                duration = (datetime.now() - start_time).total_seconds()

                return {
                    "success": True,
                    "final_content": content,
                    "iterations": iteration,
                    "final_quality_score": evaluation['overall_score'],
                    "versions_history": self.versions_history,
                    "duration": duration
                }

            # Se não atingiu, preparar melhorias para próxima iteração
            if iteration < self.max_iterations:
                print(f"\n[Avaliador] Qualidade insuficiente. Sugerindo melhorias:")
                for i, improvement in enumerate(evaluation['improvements'], 1):
                    print(f"  {i}. {improvement}")

                improvements = evaluation['improvements']
            else:
                print(f"\n{'=' * 70}")
                print("⚠ MÁXIMO DE ITERAÇÕES ATINGIDO")
                print(f"Melhor versão: Iteração {max(self.versions_history, key=lambda v: v.quality_score).version_number}")
                print('=' * 70)

        # Se chegou aqui, não atingiu qualidade desejada
        best_version = max(self.versions_history, key=lambda v: v.quality_score)
        duration = (datetime.now() - start_time).total_seconds()

        return {
            "success": False,
            "final_content": best_version.content,
            "iterations": self.max_iterations,
            "final_quality_score": best_version.quality_score,
            "versions_history": self.versions_history,
            "duration": duration,
            "note": "Qualidade desejada não atingida, retornando melhor versão"
        }

# ===== EXEMPLO DE USO =====

if __name__ == "__main__":
    # Criar pipeline
    pipeline = IterativeContentPipeline(
        max_iterations=3,
        quality_threshold=0.85
    )

    # Executar
    result = pipeline.execute("Inteligência Artificial")

    # Exibir resultados
    print("\n" + "=" * 70)
    print("RESULTADO FINAL")
    print("=" * 70)

    print(f"\nSucesso: {'SIM' if result['success'] else 'NÃO'}")
    print(f"Iterações necessárias: {result['iterations']}")
    print(f"Score final: {result['final_quality_score']:.0%}")
    print(f"Duração total: {result['duration']:.2f}s")

    print("\nHistórico de Versões:")
    for version in result['versions_history']:
        print(f"  v{version.version_number}: {version.quality_score:.0%} - {len(version.issues)} problemas")

    print("\n" + "=" * 70)
    print("PREVIEW DO CONTEÚDO FINAL (primeiros 300 caracteres):")
    print("=" * 70)
    print(result['final_content'][:300] + "...")

    # Salvar
    with open("/tmp/conteudo_final.md", "w", encoding="utf-8") as f:
        f.write(result['final_content'])

    print(f"\n✓ Conteúdo salvo em: /tmp/conteudo_final.md")
```

### 3.3 Análise do Projeto

**Vantagens do Ciclo Iterativo:**
- Garante qualidade mínima
- Aprende e melhora a cada iteração
- Flexível (ajusta-se a diferentes padrões)
- Previne conteúdo ruim

**Desvantagens:**
- Tempo variável (imprevisível)
- Pode não atingir qualidade desejada
- Requer critérios de qualidade bem definidos
- Consome mais recursos

**Quando usar:**
- Qualidade > velocidade
- Padrões de qualidade são críticos
- Feedback iterativo melhora resultado
- Tempo de entrega é flexível

**Métricas típicas:**
- Iterações médias: 1-3
- Taxa de aprovação na 1ª iteração: 40-60%
- Qualidade final média: 88-95%
- Tempo por iteração: 0.5-1s

### 3.4 Deep Dive: Loop de Feedback e Validação

O que torna este sistema diferente de um simples "gera → publica" é o **loop de feedback iterativo**. Vamos entender como funciona em detalhe.

#### Anatomia de Uma Iteração

Cada iteração passa por 4 fases:

```
ITERAÇÃO N:
1. PRODUZIR → Gera conteúdo (aplicando melhorias da iteração anterior)
2. AVALIAR → Avalia qualidade usando múltiplos critérios
3. DECIDIR → Aprovado? SIM → Fim | NÃO → Fase 4
4. MELHORAR → Identifica gaps e planeja melhorias para próxima iteração
   └─→ Volta para Fase 1 (ITERAÇÃO N+1)
```

**Por que 4 fases são necessárias:**

- **Fase 1 (Produzir)** não pode avaliar a si mesma durante produção (viés)
- **Fase 2 (Avaliar)** precisa ser independente e objetiva
- **Fase 3 (Decidir)** usa threshold claro para evitar iterações desnecessárias
- **Fase 4 (Melhorar)** traduz gaps em ações concretas

#### Como o Avaliador Detecta Qualidade

O **ContentQualityEvaluator** usa 5 critérios independentes:

```python
def evaluate(self, content: str) -> Dict:
    scores = {
        "title_quality": self._evaluate_title(content),     # 0.0-1.0
        "structure": self._evaluate_structure(content),      # 0.0-1.0
        "readability": self._evaluate_readability(content),  # 0.0-1.0
        "engagement": self._evaluate_engagement(content),    # 0.0-1.0
        "seo": self._evaluate_seo(content)                   # 0.0-1.0
    }

    overall_score = sum(scores.values()) / len(scores)

    return {
        "overall_score": overall_score,
        "scores": scores,
        "approved": overall_score >= self.threshold  # ex: 0.85
    }
```

**Por que 5 critérios específicos:**

1. **title_quality**: Primeiro contato do leitor - crítico para CTR
2. **structure**: Determina se conteúdo é escaneável/navegável
3. **readability**: Afeta compreensão e tempo no página
4. **engagement**: Influencia shares e comentários
5. **seo**: Impacta descobribilidade orgânica

**Cada critério tem heurísticas específicas:**

```python
def _evaluate_title(self, content: str) -> float:
    title = content.split('\n')[0]  # Primeira linha
    score = 0.5  # Base

    # HEURÍSTICA 1: Tamanho ideal
    if 10 < len(title) < 60:  # Google trunca em ~60 caracteres
        score += 0.3

    # HEURÍSTICA 2: Palavras poderosas
    power_words = ['como', 'guia', 'completo', 'melhor', 'definitivo']
    if any(word in title.lower() for word in power_words):
        score += 0.2

    # HEURÍSTICA 3: Tem números? (listas performam bem)
    if any(char.isdigit() for char in title):
        score += 0.1

    return min(1.0, score)
```

**Por que heurísticas em vez de LLM:**

- **Velocidade**: Heurísticas são instantâneas (~0.001s), LLM leva ~1s
- **Determinismo**: Mesmo input → mesmo output sempre
- **Custo**: Gratuitas, LLM custa por token
- **Explicabilidade**: Você sabe exatamente por que score é X

**Trade-off:** Heurísticas são menos sofisticadas que LLM, mas 80% da qualidade com 1% do custo.

#### Feedback Loop: Como Melhorias São Aplicadas

**Iteração 1:** Conteúdo inicial

```python
# Produção inicial (sem melhorias prévias)
content_v1 = producer.produce("Machine Learning")

# Resultado:
"""
# Machine Learning

Machine Learning é importante...
"""

# Avaliação:
{
    "title_quality": 0.5,  # ✗ Título genérico
    "structure": 0.6,      # ⚠ Pouca estrutura
    "readability": 0.7,    # ✓ OK
    "engagement": 0.5,     # ✗ Sem elementos de engajamento
    "seo": 0.6             # ⚠ Conteúdo curto
}
overall = 0.58 < 0.85 ✗ REPROVADO

# Melhorias identificadas:
improvements = [
    "Tornar título mais específico e atrativo",
    "Adicionar mais seções (##)",
    "Incluir elementos de engajamento (perguntas, 'você')"
]
```

**Iteração 2:** Aplicando melhorias

```python
# Produção com melhorias
content_v2 = producer.produce("Machine Learning", improvements)

# Resultado:
"""
# Como Dominar Machine Learning: Guia Completo para Iniciantes

Você quer aprender Machine Learning? Neste guia completo...

## O que é Machine Learning?

## Por que Machine Learning importa?

## Como começar com Machine Learning?
"""

# Avaliação:
{
    "title_quality": 0.9,  # ✓ Título melhor ("Como", "Guia", "Completo")
    "structure": 0.85,     # ✓ Múltiplas seções
    "readability": 0.7,    # ✓ Manteve
    "engagement": 0.8,     # ✓ Adicionou "você", "Neste guia"
    "seo": 0.7             # ⚠ Ainda um pouco curto
}
overall = 0.79 < 0.85 ✗ AINDA REPROVADO (mas melhorou de 0.58 → 0.79)

# Melhorias identificadas:
improvements = [
    "Aumentar tamanho do conteúdo (SEO)"
]
```

**Iteração 3:** Refinamento final

```python
# Produção com nova melhoria
content_v3 = producer.produce("Machine Learning", improvements)

# Resultado: Conteúdo expandido com mais exemplos e explicações

# Avaliação:
{
    "title_quality": 0.9,  # ✓ Manteve
    "structure": 0.85,     # ✓ Manteve
    "readability": 0.7,    # ✓ Manteve
    "engagement": 0.8,     # ✓ Manteve
    "seo": 0.9             # ✓ Agora substancial
}
overall = 0.83 < 0.85 ✗ QUASE! (0.83 vs 0.85)

# Mas... vamos aprovar?
# NÃO! Threshold é firme. Próxima iteração...

# Iteração 4: Pequenos ajustes finais
overall = 0.87 >= 0.85 ✓ APROVADO!
```

#### Convergência ou Divergência?

**Pergunta crítica:** O loop sempre converge para qualidade desejada?

**Resposta:** Nem sempre! Por isso temos `max_iterations`.

**Cenários de convergência:**

```python
# CENÁRIO 1: Convergência rápida
Iteração 1: 0.70 → Melhorias claras
Iteração 2: 0.88 ✓ Aprovado

# CENÁRIO 2: Convergência lenta
Iteração 1: 0.75 → Melhorias
Iteração 2: 0.78 → Mais melhorias
Iteração 3: 0.82 → Ainda mais
Iteração 4: 0.86 ✓ Aprovado

# CENÁRIO 3: Divergência (PROBLEMA!)
Iteração 1: 0.70 → Melhorias
Iteração 2: 0.68 ✗ Piorou!
Iteração 3: 0.72 → Recuperou um pouco
Iteração 4: 0.70 → Oscilando
MAX_ITERATIONS atingido ⚠

# CENÁRIO 4: Platô
Iteração 1: 0.75 → Melhorias
Iteração 2: 0.80 → Melhorias
Iteração 3: 0.81 → Melhoria marginal
Iteração 4: 0.81 → Não mudou (PLATÔ)
```

**Por que divergência acontece:**

1. **Melhorias contraditórias**: "Seja mais conciso" + "Adicione mais conteúdo"
2. **Heurísticas ruins**: Critério de avaliação não captura qualidade real
3. **Producer bugado**: Não aplica melhorias corretamente

**Como detectar platô:**

```python
def _detect_plateau(self, versions_history: List[ContentVersion]) -> bool:
    """Detecta se qualidade estabilizou (não melhora mais)."""
    if len(versions_history) < 3:
        return False

    # Pegar últimas 3 iterações
    last_3_scores = [v.quality_score for v in versions_history[-3:]]

    # Calcular variação
    max_score = max(last_3_scores)
    min_score = min(last_3_scores)
    variation = max_score - min_score

    # Se variação < 2%, considera platô
    return variation < 0.02
```

**Ação quando platô detectado:**

```python
if self._detect_plateau(self.versions_history):
    print("⚠ Platô detectado - qualidade não melhora mais")

    # OPÇÃO 1: Aceitar melhor versão até agora
    best_version = max(self.versions_history, key=lambda v: v.quality_score)
    return best_version

    # OPÇÃO 2: Tentar abordagem radical diferente
    improvements = ["Reescrever completamente com novo ângulo"]
    # ... continua iterando
```

### 3.5 Comparação: Iterativo vs Auto-melhorante (Projeto 4)

Projetos 3 e 4 são parecidos, mas têm diferenças cruciais:

| Aspecto | Projeto 3: Iterativo | Projeto 4: Auto-melhorante |
|---------|---------------------|----------------------------|
| **Avaliação** | Avaliador externo | Agente se auto-avalia |
| **Melhorias** | Sugeridas por avaliador | Agente identifica próprios gaps |
| **Aprendizado** | Não há (cada execução independente) | Aprende padrões ao longo do tempo |
| **Objetivo** | Atingir threshold fixo | Maximizar qualidade continuamente |
| **Termina quando** | Threshold atingido ou max iterations | Meta atingida ou max cycles |

**Quando usar cada um:**

**Projeto 3 (Iterativo)** quando:
- Você tem critérios de qualidade claros e objetivos
- Avaliação pode ser automatizada com heurísticas
- Não precisa de aprendizado entre execuções
- Exemplo: Produção de conteúdo padronizado

**Projeto 4 (Auto-melhorante)** quando:
- Agente precisa aprender com experiência
- Critérios de qualidade são subjetivos/complexos
- Tarefa se beneficia de refinamento constante
- Exemplo: Escrita de emails de vendas (aprende o que funciona)

### 3.6 Otimizações e Variações do Loop Iterativo

**Variação 1: Iterativo com Early Stop Inteligente**

```python
class SmartIterativeContentPipeline:
    def execute(self, topic: str) -> Dict:
        iteration = 0
        improvements = None

        while iteration < self.max_iterations:
            iteration += 1

            content = self.producer.produce(topic, improvements)
            evaluation = self.evaluator.evaluate(content)

            # EARLY STOP 1: Qualidade excepcional (>= 0.95)
            if evaluation['overall_score'] >= 0.95:
                print(f"✓ Qualidade excepcional atingida em {iteration} iterações!")
                return {"success": True, "iterations": iteration, ...}

            # EARLY STOP 2: Melhoria marginal (< 1% vs iteração anterior)
            if iteration > 1:
                prev_score = self.versions_history[-1].quality_score
                current_score = evaluation['overall_score']
                improvement = current_score - prev_score

                if improvement < 0.01:  # Menos de 1% de melhoria
                    print(f"⚠ Melhoria marginal ({improvement:.1%}), parando")
                    return {"success": True, "iterations": iteration, ...}

            # EARLY STOP 3: Regressão (piorou)
            if iteration > 1:
                if current_score < prev_score:
                    print(f"⚠ Qualidade regrediu, revertendo para versão anterior")
                    return {"success": True, "content": self.versions_history[-1].content, ...}

            # Continua normalmente...
            improvements = evaluation['improvements']

        return {...}  # Max iterations atingido
```

**Variação 2: Iterativo com Múltiplos Avaliadores**

```python
class MultiEvaluatorPipeline:
    def __init__(self):
        self.producer = ContentProducerAgent()

        # 3 avaliadores com perspectivas diferentes
        self.evaluators = [
            ContentQualityEvaluator(focus="seo"),        # Foco em SEO
            ContentQualityEvaluator(focus="readability"), # Foco em legibilidade
            ContentQualityEvaluator(focus="engagement")   # Foco em engajamento
        ]

    def execute(self, topic: str) -> Dict:
        iteration = 0

        while iteration < self.max_iterations:
            iteration += 1

            content = self.producer.produce(topic, improvements)

            # Avaliar com TODOS os avaliadores
            evaluations = []
            for evaluator in self.evaluators:
                eval_result = evaluator.evaluate(content)
                evaluations.append(eval_result)

            # Score final = MÉDIA dos 3 avaliadores
            overall_score = sum(e['overall_score'] for e in evaluations) / len(evaluations)

            # APROVAÇÃO: Todos os 3 avaliadores devem aprovar (>= 0.80)
            all_approved = all(e['overall_score'] >= 0.80 for e in evaluations)

            if all_approved:
                print(f"✓ Aprovado por todos os {len(self.evaluators)} avaliadores!")
                return {"success": True, ...}

            # Agregar melhorias de TODOS os avaliadores
            all_improvements = []
            for eval_result in evaluations:
                all_improvements.extend(eval_result['improvements'])

            # Deduplica e priorizar melhorias mais sugeridas
            improvements = self._prioritize_improvements(all_improvements)

        return {...}
```

**Benefício:** Avaliação mais robusta, menos chance de aprovação falsa positiva.

**Trade-off:** 3x mais lento (3 avaliações por iteração).

---

## Projeto 4: Agente de Melhoria Contínua Autônomo

### 4.1 Visão Geral

**Objetivo:** Criar um agente que melhora autonomamente seu próprio output através de auto-avaliação e refinamento.

**Arquitetura:** Loop Autônomo (Self-Improving)

**Por que esta arquitetura:**
- Maximiza qualidade sem supervisão humana
- Aprende com próprios erros
- Escalável (não depende de revisão externa)
- Ideal para tarefas repetitivas que exigem excelência

### 4.2 Implementação Completa

```python
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime
import time

@dataclass
class ImprovementCycle:
    """Registra um ciclo de melhoria."""
    cycle_number: int
    action: str
    output: str
    self_evaluation: Dict
    improvements_made: List[str]
    quality_progression: float
    timestamp: datetime

class SelfImprovingAgent:
    """Agente que se auto-avalia e melhora continuamente."""

    def __init__(self, quality_target: float = 0.95, max_cycles: int = 5):
        self.name = "Agente Auto-Melhorante"
        self.quality_target = quality_target
        self.max_cycles = max_cycles
        self.improvement_history: List[ImprovementCycle] = []
        self.learned_patterns: List[str] = []

    def execute_task(self, task_description: str) -> Dict:
        """Executa tarefa com ciclo de auto-melhoria."""
        start_time = datetime.now()

        print("=" * 70)
        print(f"AGENTE AUTO-MELHORANTE")
        print(f"Tarefa: {task_description}")
        print(f"Meta de Qualidade: {self.quality_target:.0%}")
        print("=" * 70)

        cycle = 0
        current_output = None
        improvements = []

        while cycle < self.max_cycles:
            cycle += 1

            print(f"\n{'=' * 70}")
            print(f"CICLO {cycle}/{self.max_cycles}")
            print('=' * 70)

            # Fase 1: Executar ação
            print(f"\n[Ciclo {cycle}] Fase 1: Executar")
            current_output = self._perform_action(task_description, improvements)

            # Fase 2: Auto-avaliar
            print(f"[Ciclo {cycle}] Fase 2: Auto-Avaliar")
            evaluation = self._self_evaluate(current_output, task_description)

            # Exibir avaliação
            print(f"\nScore de Qualidade: {evaluation['quality_score']:.0%}")
            print("\nAvaliação Detalhada:")
            for criterion, score in evaluation['detailed_scores'].items():
                status = "✓" if score >= 0.9 else "⚠" if score >= 0.7 else "✗"
                print(f"  {status} {criterion}: {score:.0%}")

            # Fase 3: Identificar melhorias
            print(f"\n[Ciclo {cycle}] Fase 3: Identificar Gaps")
            gaps = self._identify_gaps(evaluation, self.quality_target)

            if gaps:
                print(f"Gaps identificados: {len(gaps)}")
                for i, gap in enumerate(gaps, 1):
                    print(f"  {i}. {gap}")
            else:
                print("Nenhum gap identificado")

            # Registrar ciclo
            cycle_record = ImprovementCycle(
                cycle_number=cycle,
                action=task_description,
                output=current_output,
                self_evaluation=evaluation,
                improvements_made=improvements,
                quality_progression=evaluation['quality_score'],
                timestamp=datetime.now()
            )
            self.improvement_history.append(cycle_record)

            # Verificar se atingiu meta
            if evaluation['quality_score'] >= self.quality_target:
                print(f"\n{'=' * 70}")
                print(f"✓ META ATINGIDA no ciclo {cycle}!")
                print(f"Qualidade final: {evaluation['quality_score']:.0%}")
                print('=' * 70)

                # Aprender padrões de sucesso
                self._learn_from_success(cycle_record)

                duration = (datetime.now() - start_time).total_seconds()

                return {
                    "success": True,
                    "final_output": current_output,
                    "cycles_needed": cycle,
                    "final_quality": evaluation['quality_score'],
                    "improvement_history": self.improvement_history,
                    "learned_patterns": self.learned_patterns,
                    "duration": duration
                }

            # Fase 4: Planejar melhorias para próximo ciclo
            if cycle < self.max_cycles:
                print(f"\n[Ciclo {cycle}] Fase 4: Planejar Melhorias")
                improvements = self._plan_improvements(gaps, evaluation)

                print(f"Melhorias planejadas: {len(improvements)}")
                for i, improvement in enumerate(improvements, 1):
                    print(f"  {i}. {improvement}")

        # Se chegou aqui, não atingiu meta
        best_cycle = max(self.improvement_history, key=lambda c: c.quality_progression)
        duration = (datetime.now() - start_time).total_seconds()

        print(f"\n{'=' * 70}")
        print(f"⚠ Máximo de ciclos atingido")
        print(f"Melhor resultado: Ciclo {best_cycle.cycle_number} ({best_cycle.quality_progression:.0%})")
        print('=' * 70)

        return {
            "success": False,
            "final_output": best_cycle.output,
            "cycles_needed": self.max_cycles,
            "final_quality": best_cycle.quality_progression,
            "improvement_history": self.improvement_history,
            "duration": duration,
            "note": "Meta não atingida, retornando melhor resultado"
        }

    def _perform_action(self, task: str, improvements: List[str] = None) -> str:
        """Executa a ação (ex: escrever email, criar código, etc)."""
        time.sleep(0.3)  # Simula execução

        # Exemplo: escrevendo email de vendas
        if "email" in task.lower():
            output = self._write_sales_email(improvements)
        else:
            output = f"Resultado da tarefa: {task}"

            if improvements:
                output += "\n\nMelhorias aplicadas:\n"
                for improvement in improvements:
                    output += f"- {improvement}\n"

        return output

    def _write_sales_email(self, improvements: List[str] = None) -> str:
        """Escreve email de vendas (exemplo)."""

        # Versão base
        email = """Assunto: Proposta de Solução

Olá,

Gostaríamos de apresentar nossa solução para sua empresa.

Nossa plataforma oferece recursos avançados que podem ajudar seu negócio.

Ficamos à disposição para uma reunião.

Atenciosamente,
Equipe de Vendas"""

        # Aplicar melhorias se houver
        if improvements:
            for improvement in improvements:
                if "personalização" in improvement.lower():
                    email = email.replace("sua empresa", "sua empresa [NOME]")
                    email = email.replace("Olá", "Olá [NOME_PROSPECT]")

                if "benefícios" in improvement.lower():
                    email = email.replace(
                        "recursos avançados",
                        "recursos que aumentam produtividade em 40% e reduzem custos em 30%"
                    )

                if "urgência" in improvement.lower():
                    email = email.replace(
                        "Ficamos à disposição",
                        "Esta semana temos uma promoção especial de 20% off. Podemos agendar uma call ainda esta semana?"
                    )

                if "social proof" in improvement.lower():
                    email += "\n\nJá ajudamos empresas como XYZ Corp e ABC Inc a atingir seus objetivos."

                if "cta" in improvement.lower():
                    email = email.replace(
                        "Ficamos à disposição para uma reunião",
                        "Clique aqui para agendar 15min na minha agenda: [LINK]"
                    )

        return email

    def _self_evaluate(self, output: str, task: str) -> Dict:
        """Auto-avalia a qualidade do output."""

        # Critérios de avaliação (exemplo para email de vendas)
        scores = {
            "clareza": self._eval_clarity(output),
            "personalização": self._eval_personalization(output),
            "persuasão": self._eval_persuasion(output),
            "call_to_action": self._eval_cta(output),
            "profissionalismo": self._eval_professionalism(output)
        }

        overall = sum(scores.values()) / len(scores)

        return {
            "quality_score": overall,
            "detailed_scores": scores,
            "strengths": [k for k, v in scores.items() if v >= 0.9],
            "weaknesses": [k for k, v in scores.items() if v < 0.7]
        }

    def _eval_clarity(self, text: str) -> float:
        """Avalia clareza."""
        score = 0.5

        if len(text.split('\n\n')) >= 3:  # Parágrafos separados
            score += 0.3

        words = text.split()
        avg_word_length = sum(len(w) for w in words) / len(words) if words else 0
        if avg_word_length < 6:  # Palavras simples
            score += 0.2

        return min(1.0, score)

    def _eval_personalization(self, text: str) -> float:
        """Avalia personalização."""
        score = 0.3  # base baixo

        if "[NOME" in text:  # Tem placeholder de nome
            score += 0.4
        if "você" in text.lower() or "sua" in text.lower():
            score += 0.3

        return min(1.0, score)

    def _eval_persuasion(self, text: str) -> float:
        """Avalia poder de persuasão."""
        score = 0.4  # base

        # Tem números/estatísticas?
        if any(char.isdigit() for char in text):
            score += 0.2

        # Tem benefícios claros?
        benefit_words = ['aumenta', 'reduz', 'melhora', 'economiza', 'garante']
        if any(word in text.lower() for word in benefit_words):
            score += 0.2

        # Tem social proof?
        if 'empresa' in text.lower() or 'cliente' in text.lower():
            score += 0.2

        return min(1.0, score)

    def _eval_cta(self, text: str) -> float:
        """Avalia call-to-action."""
        score = 0.3  # base baixo

        cta_words = ['clique', 'agende', 'responda', 'acesse', 'cadastre']
        if any(word in text.lower() for word in cta_words):
            score += 0.5

        if '[LINK]' in text or 'http' in text:  # Tem link
            score += 0.2

        return min(1.0, score)

    def _eval_professionalism(self, text: str) -> float:
        """Avalia profissionalismo."""
        score = 0.6  # base média

        if text.startswith('Assunto:'):  # Tem assunto
            score += 0.2

        if 'Atenciosamente' in text or 'Cordialmente' in text:
            score += 0.2

        return min(1.0, score)

    def _identify_gaps(self, evaluation: Dict, target: float) -> List[str]:
        """Identifica gaps de qualidade."""
        gaps = []

        for criterion, score in evaluation['detailed_scores'].items():
            if score < target:
                gap_size = target - score
                gaps.append(f"{criterion}: gap de {gap_size:.0%}")

        return gaps

    def _plan_improvements(self, gaps: List[str], evaluation: Dict) -> List[str]:
        """Planeja melhorias baseado nos gaps."""
        improvements = []

        for gap in gaps:
            if "personalização" in gap.lower():
                improvements.append("Adicionar mais elementos de personalização ([NOME], contexto específico)")

            if "persuasão" in gap.lower():
                improvements.append("Incluir dados quantitativos e benefícios específicos")
                improvements.append("Adicionar social proof (clientes, cases)")

            if "call_to_action" in gap.lower():
                improvements.append("Criar CTA mais direto e específico com link")

            if "urgência" in gap.lower():
                improvements.append("Adicionar elemento de urgência/escassez")

        return improvements

    def _learn_from_success(self, successful_cycle: ImprovementCycle):
        """Aprende padrões de sucesso."""
        # Identifica o que funcionou
        for criterion, score in successful_cycle.self_evaluation['detailed_scores'].items():
            if score >= 0.9:
                pattern = f"Manter {criterion} em nível alto (score: {score:.0%})"
                if pattern not in self.learned_patterns:
                    self.learned_patterns.append(pattern)

        # Aprende com melhorias que funcionaram
        if successful_cycle.improvements_made:
            for improvement in successful_cycle.improvements_made:
                pattern = f"Aplicar '{improvement}' sistematicamente"
                if pattern not in self.learned_patterns:
                    self.learned_patterns.append(pattern)

# ===== EXEMPLO DE USO =====

if __name__ == "__main__":
    # Criar agente
    agent = SelfImprovingAgent(
        quality_target=0.90,
        max_cycles=5
    )

    # Executar tarefa
    result = agent.execute_task("Escrever email de vendas persuasivo")

    # Exibir resultados
    print("\n" + "=" * 70)
    print("RESULTADO FINAL")
    print("=" * 70)

    print(f"\nSucesso: {'SIM' if result['success'] else 'NÃO'}")
    print(f"Ciclos necessários: {result['cycles_needed']}")
    print(f"Qualidade final: {result['final_quality']:.0%}")
    print(f"Duração: {result['duration']:.2f}s")

    print("\nProgressão de Qualidade:")
    for cycle in result['improvement_history']:
        print(f"  Ciclo {cycle.cycle_number}: {cycle.quality_progression:.0%}")

    if result['learned_patterns']:
        print("\nPadrões Aprendidos:")
        for pattern in result['learned_patterns']:
            print(f"  • {pattern}")

    print("\n" + "=" * 70)
    print("OUTPUT FINAL:")
    print("=" * 70)
    print(result['final_output'])

    print("\n" + "=" * 70)
    print(f"Análise: Melhoria de {result['improvement_history'][0].quality_progression:.0%} "
          f"para {result['final_quality']:.0%} "
          f"(+{(result['final_quality'] - result['improvement_history'][0].quality_progression):.0%})")
    print("=" * 70)
```

### 4.3 Análise do Projeto

**Vantagens do Loop Autônomo:**
- Não requer supervisão humana contínua
- Aprende com própria experiência
- Melhoria incremental garantida
- Escalável para múltiplas tarefas

**Desvantagens:**
- Pode entrar em loops sem convergência
- Requer critérios de auto-avaliação muito bons
- Risco de overfitting em métricas erradas
- Difícil debugar quando falha

**Quando usar:**
- Tarefas repetitivas que exigem qualidade
- Quando supervisão humana é custosa/lenta
- Critérios de qualidade são objetivos
- Volume alto de execuções

**Métricas típicas:**
- Ciclos médios: 2-4
- Melhoria média: +20-30% em qualidade
- Taxa de convergência: 85-90%
- Padrões aprendidos: 3-7 por execução bem-sucedida

---

## Comparação dos 4 Projetos

### Tabela Comparativa

| Aspecto | Pipeline Linear | Paralelo + Integrador | Ciclo Iterativo | Loop Autônomo |
|---------|----------------|----------------------|-----------------|---------------|
| **Velocidade** | Média | Muito Alta (3-4x) | Variável | Variável |
| **Qualidade** | Alta | Alta | Muito Alta | Muito Alta |
| **Complexidade** | Baixa | Média-Alta | Média | Alta |
| **Previsibilidade** | Alta | Média | Baixa | Baixa |
| **Escalabilidade** | Média | Alta | Média | Alta |
| **Custo** | Baixo | Médio | Médio-Alto | Médio |
| **Supervisão Necessária** | Média | Alta (integração) | Média | Baixa |
| **Casos de Uso** | Processos sequenciais | Análises multi-perspectiva | Conteúdo de qualidade | Tarefas repetitivas |

### Quando Usar Cada Arquitetura

**Pipeline Linear:**
- ✓ Processo tem ordem natural clara
- ✓ Cada etapa depende da anterior
- ✓ Auditoria completa é importante
- ✓ Sistema mais simples de manter
- ✗ Quando velocidade é crítica

**Paralelo + Integrador:**
- ✓ Análises independentes possíveis
- ✓ Velocidade é prioridade
- ✓ Múltiplas perspectivas necessárias
- ✓ Recursos computacionais disponíveis
- ✗ Quando integração é muito complexa

**Ciclo Iterativo:**
- ✓ Qualidade > velocidade
- ✓ Padrões de qualidade bem definidos
- ✓ Feedback melhora resultado
- ✓ Tempo de entrega flexível
- ✗ Quando deadline é rígido

**Loop Autônomo:**
- ✓ Tarefas repetitivas
- ✓ Supervisão humana custosa
- ✓ Critérios objetivos de qualidade
- ✓ Volume alto de execuções
- ✗ Quando julgamento humano é essencial

---

## Conclusão do Módulo

### O Que Você Dominou

Neste módulo, você implementou 4 sistemas multiagentes completos, cada um demonstrando uma arquitetura diferente e aplicável a cenários reais:

1. **Pipeline Linear** - Para processos sequenciais estruturados
2. **Paralelo + Integrador** - Para análises rápidas multi-perspectiva
3. **Ciclo Iterativo** - Para garantir qualidade através de refinamento
4. **Loop Autônomo** - Para melhoria contínua sem supervisão

### Habilidades Desenvolvidas

- Projetar arquiteturas multiagentes
- Implementar coordenação entre agentes
- Gerenciar estado e comunicação
- Avaliar qualidade e convergência
- Otimizar para velocidade ou qualidade
- Debugging de sistemas complexos

### Código Completo

Todos os 4 projetos incluem:
- ~10KB+ de código Python cada
- Implementação completa e funcional
- Exemplos de execução
- Métricas e análise de resultados

**Total:** ~40KB de código e documentação prática.

### Próximos Passos

No Módulo 7, você aprenderá **Boas Práticas e Segurança** para colocar esses sistemas em produção com confiança.

---

**FEI - Formação em Engenharia de Intenção**
*Nível 3A - Agentes e Sistemas Autônomos*
