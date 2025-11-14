# Módulo 2: O Conceito de Sistemas Intencionais

## Nível 4S - Sistemas Intencionais 2026
**Estado da Arte 2026**

---

## Da Tarefa ao Sistema

Em 2026, não lidamos mais apenas com **prompts, tarefas ou objetivos curtos**. Lidamos com **sistemas completos** que operam de forma contínua, adaptativa e intencional.

### Definição de Sistema Intencional

Um conjunto coordenado de agentes que possuem **missão de longo prazo**, **capacidade de evolução própria**, **monitoramento de qualidade interno** e **autonomia supervisionada** para tomar decisões complexas.

---

## Os 8 Pilares de um Sistema Intencional

### 1. Missão

Todo sistema possui um **propósito claro e duradouro** que guia todas as suas ações.

**Exemplo:** "Manter minha presença digital profissional consistente e relevante, gerando autoridade no setor de tecnologia educacional."

**Implementação:**

```python
from dataclasses import dataclass
from typing import List, Dict
from datetime import datetime

@dataclass
class Missao:
    """Define a missão de um sistema intencional"""
    proposito_principal: str
    objetivos_longo_prazo: List[str]
    valores_fundamentais: List[str]
    limites_operacionais: List[str]
    metricas_sucesso: Dict[str, float]

class SistemaComMissao:
    """Sistema que opera baseado em missão"""

    def __init__(self, missao: Missao):
        self.missao = missao
        self.decisoes_historicas: List[Dict] = []

    def validar_acao_contra_missao(self, acao: str, impacto: Dict) -> bool:
        """Valida se uma ação está alinhada com a missão"""
        validacoes = []

        # 1. Valida contra propósito principal
        alinhada_proposito = any(
            palavra.lower() in acao.lower()
            for palavra in self.missao.proposito_principal.split()
        )
        validacoes.append(alinhada_proposito)

        # 2. Verifica limites operacionais
        dentro_limites = all(
            limite.lower() not in acao.lower()
            for limite in self.missao.limites_operacionais
        )
        validacoes.append(dentro_limites)

        # 3. Avalia impacto esperado contra métricas
        impacto_positivo = sum(
            impacto.get(metrica, 0) for metrica in self.missao.metricas_sucesso.keys()
        ) > 0
        validacoes.append(impacto_positivo)

        resultado = all(validacoes)

        # Registra decisão
        self.decisoes_historicas.append({
            "acao": acao,
            "alinhada": resultado,
            "timestamp": datetime.now().isoformat(),
            "validacoes": {
                "proposito": alinhada_proposito,
                "limites": dentro_limites,
                "impacto": impacto_positivo
            }
        })

        return resultado

    def sugerir_acoes_alinhadas(self) -> List[str]:
        """Sugere ações baseadas na missão"""
        sugestoes = []

        # Baseado em objetivos de longo prazo
        for objetivo in self.missao.objetivos_longo_prazo:
            sugestoes.append(f"Iniciar projeto: {objetivo}")

        # Baseado em valores fundamentais
        for valor in self.missao.valores_fundamentais:
            sugestoes.append(f"Promover: {valor}")

        return sugestoes[:5]  # Top 5 sugestões


# Exemplo de uso
missao = Missao(
    proposito_principal="Educar profissionais sobre IA moderna",
    objetivos_longo_prazo=[
        "Treinar 10.000 profissionais em 2026",
        "Criar biblioteca de 100 casos práticos",
        "Estabelecer comunidade ativa"
    ],
    valores_fundamentais=[
        "Qualidade técnica",
        "Aplicação prática",
        "Atualização constante"
    ],
    limites_operacionais=[
        "Sem conteúdo superficial",
        "Sem promessas irreais",
        "Sem copiar conteúdo de terceiros"
    ],
    metricas_sucesso={
        "satisfacao_alunos": 0.9,
        "aplicacao_pratica": 0.8,
        "engajamento": 0.75
    }
)

sistema = SistemaComMissao(missao)

# Testa validação de ações
acao1 = "Criar curso rápido sobre IA com conteúdo básico"
acao2 = "Desenvolver programa profundo sobre sistemas autônomos com casos reais"

print(f"Ação 1 alinhada: {sistema.validar_acao_contra_missao(acao1, {'satisfacao_alunos': 0.3})}")
print(f"Ação 2 alinhada: {sistema.validar_acao_contra_missao(acao2, {'satisfacao_alunos': 0.95, 'aplicacao_pratica': 0.9})}")

print("\nSugestões alinhadas com missão:")
for sugestao in sistema.sugerir_acoes_alinhadas():
    print(f"  • {sugestao}")
```

---

### 2. Evolução Própria

O sistema **aprende e se adapta ao longo do tempo**, melhorando suas estratégias baseado em resultados.

```python
from typing import Any
import statistics

class SistemaEvolutivo:
    """Sistema que evolui baseado em resultados"""

    def __init__(self):
        self.estrategias: Dict[str, Dict] = {}
        self.experimentos: List[Dict] = []

    def registrar_estrategia(self, nome: str, parametros: Dict):
        """Registra uma nova estratégia"""
        self.estrategias[nome] = {
            "parametros": parametros,
            "execucoes": [],
            "performance_media": 0,
            "taxa_sucesso": 0
        }

    def executar_com_aprendizado(self, estrategia: str, contexto: Dict) -> Dict:
        """Executa estratégia e aprende com resultado"""
        if estrategia not in self.estrategias:
            raise ValueError(f"Estratégia {estrategia} não existe")

        # Simula execução
        resultado = {
            "sucesso": True,
            "performance": 0.85,
            "metricas": {
                "velocidade": 0.9,
                "qualidade": 0.8,
                "custo": 0.85
            }
        }

        # Registra execução
        self.estrategias[estrategia]["execucoes"].append(resultado)

        # Atualiza estatísticas
        execucoes = self.estrategias[estrategia]["execucoes"]
        performances = [e["performance"] for e in execucoes]

        self.estrategias[estrategia]["performance_media"] = statistics.mean(performances)
        self.estrategias[estrategia]["taxa_sucesso"] = sum(
            1 for e in execucoes if e["sucesso"]
        ) / len(execucoes)

        return resultado

    def evoluir_automaticamente(self):
        """Sistema evolui suas estratégias automaticamente"""
        evolucoes = []

        for nome, estrategia in self.estrategias.items():
            if len(estrategia["execucoes"]) < 5:
                continue  # Dados insuficientes

            # Analisa performance
            if estrategia["performance_media"] < 0.7:
                # Performance ruim - ajusta parâmetros
                parametros_antigos = estrategia["parametros"].copy()

                # Exemplo de ajuste automático
                if "agressividade" in estrategia["parametros"]:
                    estrategia["parametros"]["agressividade"] *= 0.8

                if "qualidade_minima" in estrategia["parametros"]:
                    estrategia["parametros"]["qualidade_minima"] *= 1.1

                evolucoes.append({
                    "estrategia": nome,
                    "motivo": f"Performance baixa ({estrategia['performance_media']:.2f})",
                    "ajuste": "Parâmetros otimizados",
                    "antes": parametros_antigos,
                    "depois": estrategia["parametros"]
                })

            elif estrategia["performance_media"] > 0.9:
                # Performance excelente - essa vira padrão
                evolucoes.append({
                    "estrategia": nome,
                    "motivo": f"Performance excelente ({estrategia['performance_media']:.2f})",
                    "ajuste": "Promovida a estratégia padrão"
                })

        return evolucoes

    def comparar_estrategias(self) -> List[tuple]:
        """Compara todas as estratégias e ranqueia"""
        ranking = []

        for nome, dados in self.estrategias.items():
            if len(dados["execucoes"]) > 0:
                score = (
                    dados["performance_media"] * 0.7 +
                    dados["taxa_sucesso"] * 0.3
                )
                ranking.append((nome, score, dados))

        return sorted(ranking, key=lambda x: x[1], reverse=True)


# Exemplo de uso
sistema_evo = SistemaEvolutivo()

# Registra estratégias
sistema_evo.registrar_estrategia("rapida", {
    "agressividade": 0.9,
    "qualidade_minima": 0.6
})

sistema_evo.registrar_estrategia("equilibrada", {
    "agressividade": 0.6,
    "qualidade_minima": 0.8
})

sistema_evo.registrar_estrategia("perfeccionista", {
    "agressividade": 0.3,
    "qualidade_minima": 0.95
})

# Simula múltiplas execuções
for _ in range(10):
    sistema_evo.executar_com_aprendizado("rapida", {})
    sistema_evo.executar_com_aprendizado("equilibrada", {})
    sistema_evo.executar_com_aprendizado("perfeccionista", {})

# Sistema evolui automaticamente
evolucoes = sistema_evo.evoluir_automaticamente()

print("EVOLUÇÕES AUTOMÁTICAS:")
for evo in evolucoes:
    print(f"\n• Estratégia: {evo['estrategia']}")
    print(f"  Motivo: {evo['motivo']}")
    print(f"  Ajuste: {evo['ajuste']}")

# Ranking de estratégias
print("\n\nRANKING DE ESTRATÉGIAS:")
for nome, score, dados in sistema_evo.comparar_estrategias():
    print(f"{nome}: {score:.2f} (performance: {dados['performance_media']:.2f}, sucesso: {dados['taxa_sucesso']:.1%})")
```

---

### 3. Monitoramento de Qualidade

Agentes internos **verificam a própria saída** antes de entregar, garantindo padrões de excelência.

```python
from enum import Enum
from typing import Callable

class NivelQualidade(Enum):
    EXCELENTE = "excelente"
    BOA = "boa"
    ACEITAVEL = "aceitavel"
    INSUFICIENTE = "insuficiente"

class MonitorQualidade:
    """Sistema de monitoramento de qualidade interno"""

    def __init__(self, criterios_minimos: Dict[str, float]):
        self.criterios_minimos = criterios_minimos
        self.historico_avaliacoes: List[Dict] = []

    def avaliar_qualidade(self, saida: Dict) -> tuple[NivelQualidade, Dict]:
        """Avalia qualidade de uma saída"""
        scores = {}

        # Avalia cada critério
        for criterio, minimo in self.criterios_minimos.items():
            valor_atual = saida.get(criterio, 0)
            scores[criterio] = {
                "valor": valor_atual,
                "minimo": minimo,
                "aprovado": valor_atual >= minimo,
                "gap": valor_atual - minimo
            }

        # Calcula score geral
        score_geral = sum(s["valor"] for s in scores.values()) / len(scores)

        # Determina nível
        if score_geral >= 0.9:
            nivel = NivelQualidade.EXCELENTE
        elif score_geral >= 0.75:
            nivel = NivelQualidade.BOA
        elif score_geral >= 0.6:
            nivel = NivelQualidade.ACEITAVEL
        else:
            nivel = NivelQualidade.INSUFICIENTE

        avaliacao = {
            "nivel": nivel,
            "score_geral": score_geral,
            "scores_detalhados": scores,
            "timestamp": datetime.now().isoformat()
        }

        self.historico_avaliacoes.append(avaliacao)

        return nivel, avaliacao

    def sugerir_melhorias(self, avaliacao: Dict) -> List[str]:
        """Sugere melhorias baseado na avaliação"""
        sugestoes = []

        for criterio, dados in avaliacao["scores_detalhados"].items():
            if not dados["aprovado"]:
                sugestoes.append(
                    f"Melhorar {criterio}: atual {dados['valor']:.2f}, "
                    f"mínimo {dados['minimo']:.2f} (gap: {abs(dados['gap']):.2f})"
                )

        return sugestoes

    def gerar_relatorio_qualidade(self) -> Dict:
        """Gera relatório de qualidade ao longo do tempo"""
        if not self.historico_avaliacoes:
            return {"mensagem": "Sem dados suficientes"}

        scores = [a["score_geral"] for a in self.historico_avaliacoes]

        return {
            "total_avaliacoes": len(self.historico_avaliacoes),
            "score_medio": statistics.mean(scores),
            "score_atual": scores[-1],
            "tendencia": "melhorando" if scores[-1] > scores[0] else "piorando",
            "distribuicao_niveis": {
                nivel.value: sum(
                    1 for a in self.historico_avaliacoes
                    if a["nivel"] == nivel
                )
                for nivel in NivelQualidade
            }
        }


# Exemplo de uso
monitor = MonitorQualidade({
    "completude": 0.8,
    "clareza": 0.75,
    "precisao": 0.85,
    "relevancia": 0.8
})

# Simula várias saídas
saidas = [
    {"completude": 0.9, "clareza": 0.85, "precisao": 0.9, "relevancia": 0.88},
    {"completude": 0.7, "clareza": 0.65, "precisao": 0.75, "relevancia": 0.7},
    {"completude": 0.95, "clareza": 0.92, "precisao": 0.94, "relevancia": 0.93},
]

for i, saida in enumerate(saidas, 1):
    nivel, avaliacao = monitor.avaliar_qualidade(saida)

    print(f"\nSAÍDA {i}:")
    print(f"Nível: {nivel.value.upper()}")
    print(f"Score: {avaliacao['score_geral']:.2f}")

    sugestoes = monitor.sugerir_melhorias(avaliacao)
    if sugestoes:
        print("Melhorias necessárias:")
        for sugestao in sugestoes:
            print(f"  • {sugestao}")

print("\nRELATÓRIO DE QUALIDADE:")
relatorio = monitor.gerar_relatorio_qualidade()
print(f"Total de avaliações: {relatorio['total_avaliacoes']}")
print(f"Score médio: {relatorio['score_medio']:.2f}")
print(f"Tendência: {relatorio['tendencia']}")
```

---

### 4. Múltiplos Agentes Internos

O sistema opera com **agentes especializados** que colaboram para resolver problemas complexos.

```python
class SistemaMultiagente:
    """Sistema com múltiplos agentes especializados"""

    def __init__(self, nome: str):
        self.nome = nome
        self.agentes: Dict[str, Any] = {}
        self.comunicacao_inter_agentes: List[Dict] = []

    def adicionar_agente(self, tipo: str, agente: Any):
        """Adiciona agente especializado ao sistema"""
        self.agentes[tipo] = agente

    def coordenar_tarefa_complexa(self, tarefa: Dict) -> Dict:
        """Coordena múltiplos agentes para resolver tarefa complexa"""
        resultados_parciais = {}

        # 1. Agente Pesquisador coleta dados
        if "pesquisador" in self.agentes:
            resultado_pesquisa = self.agentes["pesquisador"].executar(tarefa)
            resultados_parciais["pesquisa"] = resultado_pesquisa

            self.comunicacao_inter_agentes.append({
                "de": "pesquisador",
                "para": "estrategista",
                "dados": resultado_pesquisa,
                "timestamp": datetime.now().isoformat()
            })

        # 2. Agente Estrategista cria plano
        if "estrategista" in self.agentes:
            input_estrategia = {
                **tarefa,
                "pesquisa": resultados_parciais.get("pesquisa")
            }
            resultado_estrategia = self.agentes["estrategista"].executar(input_estrategia)
            resultados_parciais["estrategia"] = resultado_estrategia

            self.comunicacao_inter_agentes.append({
                "de": "estrategista",
                "para": "executor",
                "dados": resultado_estrategia,
                "timestamp": datetime.now().isoformat()
            })

        # 3. Agente Executor implementa
        if "executor" in self.agentes:
            input_execucao = {
                **tarefa,
                "plano": resultados_parciais.get("estrategia")
            }
            resultado_execucao = self.agentes["executor"].executar(input_execucao)
            resultados_parciais["execucao"] = resultado_execucao

            self.comunicacao_inter_agentes.append({
                "de": "executor",
                "para": "auditor",
                "dados": resultado_execucao,
                "timestamp": datetime.now().isoformat()
            })

        # 4. Agente Auditor valida
        if "auditor" in self.agentes:
            input_auditoria = {
                **tarefa,
                "resultado": resultados_parciais.get("execucao")
            }
            resultado_auditoria = self.agentes["auditor"].executar(input_auditoria)
            resultados_parciais["auditoria"] = resultado_auditoria

        return {
            "status": "completo",
            "resultado_final": resultados_parciais,
            "comunicacoes": len(self.comunicacao_inter_agentes),
            "agentes_utilizados": list(resultados_parciais.keys())
        }

    def analisar_colaboracao(self) -> Dict:
        """Analisa eficiência da colaboração entre agentes"""
        if not self.comunicacao_inter_agentes:
            return {"mensagem": "Sem dados de comunicação"}

        # Analisa fluxo de comunicação
        fluxos = {}
        for comm in self.comunicacao_inter_agentes:
            chave = f"{comm['de']} → {comm['para']}"
            fluxos[chave] = fluxos.get(chave, 0) + 1

        return {
            "total_comunicacoes": len(self.comunicacao_inter_agentes),
            "agentes_ativos": len(self.agentes),
            "fluxos_comunicacao": fluxos,
            "eficiencia": "alta" if len(self.comunicacao_inter_agentes) / len(self.agentes) < 3 else "media"
        }
```

---

### 5-8. Pilares Restantes (Rotinas, Decisões, Falhas, Autonomia)

```python
class SistemaIntencion alCompleto:
    """Sistema intencional completo com todos os 8 pilares"""

    def __init__(self, missao: Missao):
        self.missao = missao
        self.rotinas: Dict[str, Callable] = {}
        self.decisoes_complexas: List[Dict] = []
        self.falhas_detectadas: List[Dict] = []
        self.limites_autonomia: Dict[str, Any] = {
            "valor_maximo_sem_aprovacao": 1000,
            "topicos_sensiveis": ["financeiro", "legal", "RH"],
            "acoes_criticas": ["deletar", "publicar", "contratar"]
        }

    def adicionar_rotina(self, nome: str, frequencia: str, funcao: Callable):
        """Adiciona rotina recorrente"""
        self.rotinas[nome] = {
            "funcao": funcao,
            "frequencia": frequencia,
            "ultima_execucao": None,
            "proxima_execucao": None
        }

    def tomar_decisao_complexa(self, cenario: Dict, opcoes: List[Dict]) -> Dict:
        """Toma decisão complexa baseada em múltiplos critérios"""
        # Avalia cada opção
        avaliacoes = []

        for opcao in opcoes:
            score_total = 0
            pesos = {
                "alinhamento_missao": 0.4,
                "custo_beneficio": 0.3,
                "risco": 0.2,
                "prazo": 0.1
            }

            for criterio, peso in pesos.items():
                score_total += opcao.get(criterio, 0) * peso

            avaliacoes.append({
                "opcao": opcao["descricao"],
                "score": score_total,
                "detalhes": opcao
            })

        # Seleciona melhor opção
        melhor = max(avaliacoes, key=lambda x: x["score"])

        decisao = {
            "cenario": cenario,
            "opcao_escolhida": melhor["opcao"],
            "score": melhor["score"],
            "timestamp": datetime.now().isoformat(),
            "justificativa": self._gerar_justificativa(melhor, pesos)
        }

        self.decisoes_complexas.append(decisao)
        return decisao

    def _gerar_justificativa(self, opcao: Dict, pesos: Dict) -> str:
        """Gera justificativa para decisão"""
        criterio_principal = max(pesos.items(), key=lambda x: x[1])[0]
        return f"Escolhida por melhor {criterio_principal} (score: {opcao['score']:.2f})"

    def detectar_falhas_automaticamente(self, processo: str, metricas: Dict) -> List[Dict]:
        """Detecta falhas antes que causem impacto"""
        falhas = []

        # Verifica anomalias
        for metrica, valor in metricas.items():
            if valor < 0.5:  # Threshold de alerta
                falhas.append({
                    "tipo": "performance_baixa",
                    "processo": processo,
                    "metrica": metrica,
                    "valor": valor,
                    "severidade": "alta" if valor < 0.3 else "media"
                })

        # Registra falhas
        for falha in falhas:
            self.falhas_detectadas.append({
                **falha,
                "timestamp": datetime.now().isoformat(),
                "acao_corretiva": self._sugerir_correcao(falha)
            })

        return falhas

    def _sugerir_correcao(self, falha: Dict) -> str:
        """Sugere correção automática para falha"""
        if falha["tipo"] == "performance_baixa":
            return f"Otimizar {falha['processo']} - revisar {falha['metrica']}"
        return "Análise manual necessária"

    def verificar_autonomia(self, acao: str, contexto: Dict) -> tuple[bool, str]:
        """Verifica se ação pode ser executada autonomamente"""
        # Verifica valor
        if contexto.get("valor", 0) > self.limites_autonomia["valor_maximo_sem_aprovacao"]:
            return False, "Valor acima do limite - aprovação necessária"

        # Verifica tópicos sensíveis
        for topico in self.limites_autonomia["topicos_sensiveis"]:
            if topico.lower() in acao.lower():
                return False, f"Tópico sensível ({topico}) - aprovação necessária"

        # Verifica ações críticas
        for acao_critica in self.limites_autonomia["acoes_criticas"]:
            if acao_critica.lower() in acao.lower():
                return False, f"Ação crítica ({acao_critica}) - aprovação necessária"

        return True, "Ação autorizada para execução autônoma"


# Exemplo completo
sistema_completo = SistemaIntencion alCompleto(missao)

# Testa decisão complexa
cenario = {"tipo": "expansao_produto"}
opcoes = [
    {
        "descricao": "Lançamento gradual",
        "alinhamento_missao": 0.9,
        "custo_beneficio": 0.8,
        "risco": 0.7,
        "prazo": 0.6
    },
    {
        "descricao": "Lançamento agressivo",
        "alinhamento_missao": 0.7,
        "custo_beneficio": 0.9,
        "risco": 0.4,
        "prazo": 0.9
    }
]

decisao = sistema_completo.tomar_decisao_complexa(cenario, opcoes)
print(f"DECISÃO: {decisao['opcao_escolhida']}")
print(f"Justificativa: {decisao['justificativa']}")

# Testa detecção de falhas
falhas = sistema_completo.detectar_falhas_automaticamente(
    "criacao_conteudo",
    {"qualidade": 0.4, "velocidade": 0.8, "engajamento": 0.2}
)

print(f"\n{len(falhas)} falhas detectadas:")
for falha in sistema_completo.falhas_detectadas:
    print(f"  • {falha['tipo']}: {falha['metrica']} = {falha['valor']}")
    print(f"    Ação: {falha['acao_corretiva']}")

# Testa autonomia
acao1 = "Publicar post sobre IA"
acao2 = "Deletar banco de dados de produção"
acao3 = "Investir R$ 5000 em campanha"

for acao in [acao1, acao2, acao3]:
    autonomo, motivo = sistema_completo.verificar_autonomia(acao, {"valor": 5000})
    print(f"\n{acao}: {'✅ Autônomo' if autonomo else '⚠️ Aprovação'} - {motivo}")
```

---

## Comparação: Agente vs Sistema Intencional

### Agente Individual
- Executa tarefas específicas
- Objetivo de curto prazo
- Trabalha isoladamente
- Precisa de instruções claras
- Não evolui automaticamente

**Analogia:** Um funcionário especializado que executa bem uma função específica.

### Sistema Intencional
- Gerencia processos completos
- Missão de longo prazo
- Coordena múltiplos agentes
- Entende intenção macro
- Aprende e se adapta continuamente

**Analogia:** Um departamento completo com time especializado, processos definidos e capacidade de evolução contínua.

---

## Conclusão

Você entendeu o conceito de Sistemas Intencionais: estruturas complexas que vão muito além de agentes individuais.

### O que você dominou:

✅ Os 8 pilares de um Sistema Intencional (missão, evolução, monitoramento, múltiplos agentes, rotinas, decisões, detecção de falhas, autonomia)
✅ Implementação completa de sistema com missão
✅ Sistema evolutivo que aprende automaticamente
✅ Monitoramento de qualidade interno
✅ Coordenação de múltiplos agentes
✅ Decisões complexas multicriteriais
✅ Detecção automática de falhas
✅ Autonomia supervisionada
✅ Diferença entre agente individual e sistema completo

### Próximo módulo:

No Módulo 3, você vai aprender sobre **Agentes Autônomos 2.0 (versão 2026)**: os 6 tipos de agentes especializados que trabalham como um time de elite, incluindo o revolucionário Agente Meta-IA.

---

**© 2025 FEI - Formação em Engenharia de Intenção**
