# Módulo 4: Loops Evolutivos de Agentes

## Nível 3S - Sistemas Intencionais 2026

---

## O Coração da ESIA

**Loops Evolutivos** são o que separa sistemas estáticos de sistemas verdadeiramente inteligentes. Agentes modernos não apenas executam - eles **aprendem, analisam e melhoram continuamente**.

Este é o coração da **ESIA - Engenharia de Sistemas Intencionais Autônomos**: sistemas que evoluem autonomamente baseado em resultados.

---

## O Que Agentes Evoluem

### 1. Analisam Suas Próprias Falhas

O agente registra quando comete erros, analisa causas e ajusta estratégias futuras.

**Implementação:**

```python
from dataclasses import dataclass
from typing import List, Dict
from datetime import datetime
from enum import Enum

class TipoFalha(Enum):
    TIMEOUT = "timeout"
    QUALIDADE_BAIXA = "qualidade_baixa"
    ERRO_VALIDACAO = "erro_validacao"
    RECURSO_INSUFICIENTE = "recurso_insuficiente"

@dataclass
class Falha:
    tipo: TipoFalha
    contexto: Dict
    impacto: float  # 0-1
    timestamp: str

class SistemaAnaliseFalhas:
    """Sistema que aprende com os próprios erros"""

    def __init__(self):
        self.falhas_historicas: List[Falha] = []
        self.padroes_identificados: List[Dict] = []
        self.correcoes_aplicadas: List[Dict] = []

    def registrar_falha(self, tipo: TipoFalha, contexto: Dict, impacto: float):
        """Registra falha para análise"""
        falha = Falha(
            tipo=tipo,
            contexto=contexto,
            impacto=impacto,
            timestamp=datetime.now().isoformat()
        )

        self.falhas_historicas.append(falha)

        # Analisa imediatamente se há padrão
        if len(self.falhas_historicas) >= 3:
            self._analisar_padroes()

    def _analisar_padroes(self):
        """Identifica padrões nas falhas"""
        # Agrupa falhas por tipo
        falhas_por_tipo: Dict[TipoFalha, List[Falha]] = {}

        for falha in self.falhas_historicas[-10:]:  # Últimas 10
            if falha.tipo not in falhas_por_tipo:
                falhas_por_tipo[falha.tipo] = []
            falhas_por_tipo[falha.tipo].append(falha)

        # Identifica padrões recorrentes
        for tipo, falhas in falhas_por_tipo.items():
            if len(falhas) >= 3:  # 3+ ocorrências = padrão
                # Analisa contexto comum
                contextos = [f.contexto for f in falhas]
                chaves_comuns = set.intersection(*[set(c.keys()) for c in contextos])

                if chaves_comuns:
                    padrao = {
                        "tipo_falha": tipo,
                        "frequencia": len(falhas),
                        "contexto_comum": {
                            k: [c.get(k) for c in contextos]
                            for k in chaves_comuns
                        },
                        "impacto_medio": sum(f.impacto for f in falhas) / len(falhas),
                        "identificado_em": datetime.now().isoformat()
                    }

                    # Adiciona apenas se não existe
                    if not any(p["tipo_falha"] == tipo for p in self.padroes_identificados):
                        self.padroes_identificados.append(padrao)

    def propor_correcoes(self) -> List[Dict]:
        """Propõe correções baseado nos padrões"""
        correcoes = []

        for padrao in self.padroes_identificados:
            tipo_falha = padrao["tipo_falha"]

            if tipo_falha == TipoFalha.TIMEOUT:
                correcoes.append({
                    "padrao": tipo_falha.value,
                    "acao": "Aumentar timeout em 50%",
                    "justificativa": f"Falha recorrente {padrao['frequencia']}x",
                    "impacto_esperado": 0.7
                })

            elif tipo_falha == TipoFalha.QUALIDADE_BAIXA:
                correcoes.append({
                    "padrao": tipo_falha.value,
                    "acao": "Adicionar validação extra antes da saída",
                    "justificativa": f"Qualidade consistentemente baixa",
                    "impacto_esperado": 0.8
                })

            elif tipo_falha == TipoFalha.ERRO_VALIDACAO:
                correcoes.append({
                    "padrao": tipo_falha.value,
                    "acao": "Reforçar validação de entrada",
                    "justificativa": f"Erros de validação recorrentes",
                    "impacto_esperado": 0.9
                })

        return correcoes

    def aplicar_correcao(self, correcao: Dict) -> Dict:
        """Aplica correção e monitora resultado"""
        resultado = {
            "correcao": correcao,
            "aplicada_em": datetime.now().isoformat(),
            "status": "ativa",
            "falhas_antes": len([
                f for f in self.falhas_historicas
                if f.tipo.value == correcao["padrao"]
            ])
        }

        self.correcoes_aplicadas.append(resultado)
        return resultado

    def relatorio_aprendizado(self) -> Dict:
        """Gera relatório de aprendizado com falhas"""
        if not self.falhas_historicas:
            return {"mensagem": "Sem falhas registradas"}

        total_falhas = len(self.falhas_historicas)
        padroes_identificados = len(self.padroes_identificados)
        correcoes_aplicadas = len(self.correcoes_aplicadas)

        # Calcula taxa de melhoria
        falhas_recentes = self.falhas_historicas[-5:]
        falhas_antigas = self.falhas_historicas[:5] if len(self.falhas_historicas) > 10 else []

        if falhas_antigas:
            impacto_antigo = sum(f.impacto for f in falhas_antigas) / len(falhas_antigas)
            impacto_recente = sum(f.impacto for f in falhas_recentes) / len(falhas_recentes)
            melhoria = ((impacto_antigo - impacto_recente) / impacto_antigo) * 100
        else:
            melhoria = 0

        return {
            "total_falhas": total_falhas,
            "padroes_identificados": padroes_identificados,
            "correcoes_aplicadas": correcoes_aplicadas,
            "taxa_melhoria": f"{melhoria:.1f}%",
            "status": "melhorando" if melhoria > 0 else "estável"
        }


# Exemplo de uso
sistema = SistemaAnaliseFalhas()

# Simula falhas ao longo do tempo
print("=== SIMULAÇÃO DE APRENDIZADO COM FALHAS ===\n")

# Fase 1: Múltiplos timeouts
for i in range(4):
    sistema.registrar_falha(
        TipoFalha.TIMEOUT,
        {"operacao": "busca_dados", "tempo_limite": 5},
        impacto=0.6
    )

print(f"✅ Registradas 4 falhas de timeout")
print(f"   Padrões identificados: {len(sistema.padroes_identificados)}\n")

# Sistema propõe correções
correcoes = sistema.propor_correcoes()
print("Correções propostas:")
for corr in correcoes:
    print(f"  • {corr['acao']}")
    print(f"    Justificativa: {corr['justificativa']}")
    print(f"    Impacto esperado: {corr['impacto_esperado']:.1%}\n")

# Aplica correção
if correcoes:
    resultado = sistema.aplicar_correcao(correcoes[0])
    print(f"✅ Correção aplicada: {resultado['correcao']['acao']}\n")

# Relatório
print("="*60)
relatorio = sistema.relatorio_aprendizado()
print("RELATÓRIO DE APRENDIZADO:")
for chave, valor in relatorio.items():
    print(f"  {chave}: {valor}")
print("="*60)
```

---

### 2. Ajustam Estratégias

Baseado em resultados, o agente modifica sua abordagem sem precisar de instrução humana.

```python
import statistics

class SistemaAjusteEstrategico:
    """Sistema que ajusta estratégias automaticamente"""

    def __init__(self):
        self.estrategias: Dict[str, Dict] = {}
        self.experimentos: List[Dict] = []

    def registrar_estrategia(self, nome: str, parametros: Dict):
        """Registra estratégia com parâmetros"""
        self.estrategias[nome] = {
            "parametros": parametros,
            "resultados": [],
            "ajustes_historicos": [],
            "performance_atual": 0
        }

    def executar_com_monitoramento(self, estrategia: str, contexto: Dict) -> Dict:
        """Executa e monitora resultado"""
        if estrategia not in self.estrategias:
            raise ValueError(f"Estratégia {estrategia} não existe")

        params = self.estrategias[estrategia]["parametros"]

        # Simula execução com parâmetros atuais
        resultado = {
            "performance": 0.5 + (params.get("qualidade_minima", 0.5) * 0.4),
            "tempo": 10 / params.get("agressividade", 0.5),
            "custo": params.get("agressividade", 0.5) * 100,
            "qualidade": params.get("qualidade_minima", 0.5)
        }

        # Calcula score geral
        resultado["score"] = (
            resultado["performance"] * 0.4 +
            (1 / (resultado["tempo"] / 10)) * 0.3 +
            resultado["qualidade"] * 0.3
        )

        self.estrategias[estrategia]["resultados"].append(resultado)

        # Atualiza performance atual
        ultimos = self.estrategias[estrategia]["resultados"][-5:]
        self.estrategias[estrategia]["performance_atual"] = statistics.mean(
            r["score"] for r in ultimos
        )

        return resultado

    def ajustar_automaticamente(self, estrategia: str) -> Dict:
        """Ajusta estratégia baseado nos resultados"""
        if estrategia not in self.estrategias:
            return {"erro": "Estratégia não existe"}

        est = self.estrategias[estrategia]

        if len(est["resultados"]) < 3:
            return {"mensagem": "Dados insuficientes para ajuste"}

        # Analisa tendências
        ultimos_5 = est["resultados"][-5:]
        performance_media = statistics.mean(r["score"] for r in ultimos_5)

        ajustes = {}

        # Ajuste 1: Se performance < 0.6, aumenta qualidade mínima
        if performance_media < 0.6:
            novo_valor = min(0.95, est["parametros"]["qualidade_minima"] * 1.15)
            ajustes["qualidade_minima"] = {
                "anterior": est["parametros"]["qualidade_minima"],
                "novo": novo_valor,
                "motivo": "Performance abaixo do esperado"
            }
            est["parametros"]["qualidade_minima"] = novo_valor

        # Ajuste 2: Se tempo muito alto, aumenta agressividade
        tempo_medio = statistics.mean(r["tempo"] for r in ultimos_5)
        if tempo_medio > 15:
            novo_valor = min(1.0, est["parametros"]["agressividade"] * 1.2)
            ajustes["agressividade"] = {
                "anterior": est["parametros"]["agressividade"],
                "novo": novo_valor,
                "motivo": "Tempo de execução acima do aceitável"
            }
            est["parametros"]["agressividade"] = novo_valor

        # Ajuste 3: Se custo muito alto, reduz agressividade
        custo_medio = statistics.mean(r["custo"] for r in ultimos_5)
        if custo_medio > 70 and "agressividade" not in ajustes:
            novo_valor = max(0.3, est["parametros"]["agressividade"] * 0.85)
            ajustes["agressividade"] = {
                "anterior": est["parametros"]["agressividade"],
                "novo": novo_valor,
                "motivo": "Custo operacional elevado"
            }
            est["parametros"]["agressividade"] = novo_valor

        if ajustes:
            est["ajustes_historicos"].append({
                "ajustes": ajustes,
                "performance_antes": performance_media,
                "timestamp": datetime.now().isoformat()
            })

        return {
            "estrategia": estrategia,
            "ajustes_realizados": len(ajustes),
            "detalhes": ajustes,
            "performance_antes": performance_media
        }


# Exemplo de uso
sistema_ajuste = SistemaAjusteEstrategico()

sistema_ajuste.registrar_estrategia("producao_conteudo", {
    "agressividade": 0.5,
    "qualidade_minima": 0.7
})

print("\n=== AJUSTE AUTOMÁTICO DE ESTRATÉGIAS ===\n")

# Simula múltiplas execuções
print("Executando estratégia 10x...")
for i in range(10):
    resultado = sistema_ajuste.executar_com_monitoramento("producao_conteudo", {})

print(f"Performance atual: {sistema_ajuste.estrategias['producao_conteudo']['performance_atual']:.2f}\n")

# Sistema ajusta automaticamente
ajuste = sistema_ajuste.ajustar_automaticamente("producao_conteudo")

if "detalhes" in ajuste and ajuste["detalhes"]:
    print(f"✅ {ajuste['ajustes_realizados']} ajustes realizados:\n")
    for param, info in ajuste["detalhes"].items():
        print(f"  • {param}:")
        print(f"    De: {info['anterior']:.2f} → Para: {info['novo']:.2f}")
        print(f"    Motivo: {info['motivo']}\n")

# Testa com novos parâmetros
print("Testando com parâmetros ajustados...")
for i in range(5):
    resultado = sistema_ajuste.executar_com_monitoramento("producao_conteudo", {})

print(f"Nova performance: {sistema_ajuste.estrategias['producao_conteudo']['performance_atual']:.2f}")
```

---

### 3. Aprendem Preferências

O sistema identifica padrões nas escolhas do usuário e adapta seu comportamento.

```python
class SistemaAprendizadoPreferencias:
    """Aprende preferências do usuário ao longo do tempo"""

    def __init__(self):
        self.interacoes: List[Dict] = []
        self.preferencias_inferidas: Dict[str, Any] = {}

    def registrar_escolha(self, opcoes: List[Dict], escolhida: int, contexto: Dict):
        """Registra escolha do usuário"""
        interacao = {
            "opcoes": opcoes,
            "escolhida": escolhida,
            "opcao_detalhes": opcoes[escolhida],
            "contexto": contexto,
            "timestamp": datetime.now().isoformat()
        }

        self.interacoes.append(interacao)

        # Aprende após cada interação
        self._inferir_preferencias()

    def _inferir_preferencias(self):
        """Infere preferências baseado nas escolhas"""
        if len(self.interacoes) < 3:
            return

        # Analisa características das escolhas
        escolhas = [i["opcao_detalhes"] for i in self.interacoes]

        # Preferência por complexidade
        if "complexidade" in escolhas[0]:
            complexidades = [e.get("complexidade") for e in escolhas]
            mais_comum = max(set(complexidades), key=complexidades.count)
            self.preferencias_inferidas["complexidade_preferida"] = mais_comum

        # Preferência por velocidade vs qualidade
        if all("velocidade" in e and "qualidade" in e for e in escolhas):
            ratio_velocidade = sum(
                1 for e in escolhas if e["velocidade"] > e["qualidade"]
            ) / len(escolhas)

            if ratio_velocidade > 0.7:
                self.preferencias_inferidas["prioridade"] = "velocidade"
            elif ratio_velocidade < 0.3:
                self.preferencias_inferidas["prioridade"] = "qualidade"
            else:
                self.preferencias_inferidas["prioridade"] = "balanceado"

        # Preferência por estilo
        if "estilo" in escolhas[0]:
            estilos = [e.get("estilo") for e in escolhas]
            mais_comum = max(set(estilos), key=estilos.count)
            self.preferencias_inferidas["estilo_preferido"] = mais_comum

    def recomendar_opcao(self, opcoes: List[Dict]) -> Dict:
        """Recomenda opção baseado em preferências aprendidas"""
        if not self.preferencias_inferidas:
            return {
                "recomendacao": 0,
                "confianca": 0,
                "motivo": "Sem preferências aprendidas"
            }

        # Pontua cada opção
        scores = []

        for opcao in opcoes:
            score = 0

            # Aplica preferências
            if "complexidade_preferida" in self.preferencias_inferidas:
                if opcao.get("complexidade") == self.preferencias_inferidas["complexidade_preferida"]:
                    score += 3

            if "prioridade" in self.preferencias_inferidas:
                pref = self.preferencias_inferidas["prioridade"]
                if pref == "velocidade" and opcao.get("velocidade", 0) > 0.7:
                    score += 2
                elif pref == "qualidade" and opcao.get("qualidade", 0) > 0.7:
                    score += 2

            if "estilo_preferido" in self.preferencias_inferidas:
                if opcao.get("estilo") == self.preferencias_inferidas["estilo_preferido"]:
                    score += 2

            scores.append(score)

        melhor_idx = scores.index(max(scores))
        confianca = max(scores) / (len(self.preferencias_inferidas) * 3)

        return {
            "recomendacao": melhor_idx,
            "opcao": opcoes[melhor_idx],
            "confianca": min(1.0, confianca),
            "motivo": f"Baseado em {len(self.interacoes)} interações anteriores",
            "preferencias_aplicadas": list(self.preferencias_inferidas.keys())
        }


# Exemplo de uso
sistema_pref = SistemaAprendizadoPreferencias()

print("\n=== APRENDIZADO DE PREFERÊNCIAS ===\n")

# Simula escolhas do usuário
escolhas_usuario = [
    {
        "opcoes": [
            {"nome": "Rápido", "velocidade": 0.9, "qualidade": 0.6, "estilo": "direto"},
            {"nome": "Equilibrado", "velocidade": 0.7, "qualidade": 0.7, "estilo": "balanceado"},
            {"nome": "Perfeito", "velocidade": 0.5, "qualidade": 0.95, "estilo": "detalhado"}
        ],
        "escolhida": 2  # Usuário prefere qualidade
    },
    {
        "opcoes": [
            {"nome": "Simples", "complexidade": "baixa", "qualidade": 0.9, "estilo": "detalhado"},
            {"nome": "Completo", "complexidade": "alta", "qualidade": 0.95, "estilo": "detalhado"}
        ],
        "escolhida": 1  # Prefere completo
    },
    {
        "opcoes": [
            {"nome": "Casual", "velocidade": 0.8, "qualidade": 0.6, "estilo": "casual"},
            {"nome": "Técnico", "velocidade": 0.6, "qualidade": 0.9, "estilo": "detalhado"}
        ],
        "escolhida": 1  # Prefere técnico
    }
]

for i, escolha in enumerate(escolhas_usuario, 1):
    sistema_pref.registrar_escolha(
        escolha["opcoes"],
        escolha["escolhida"],
        {"sessao": i}
    )
    print(f"Escolha {i} registrada: {escolha['opcoes'][escolha['escolhida']]['nome']}")

print(f"\n✅ Preferências inferidas:")
for pref, valor in sistema_pref.preferencias_inferidas.items():
    print(f"   • {pref}: {valor}")

# Sistema recomenda automaticamente
print("\n--- Nova solicitação ---")
novas_opcoes = [
    {"nome": "Opção A", "velocidade": 0.8, "qualidade": 0.6, "estilo": "casual"},
    {"nome": "Opção B", "velocidade": 0.6, "qualidade": 0.95, "estilo": "detalhado"},
    {"nome": "Opção C", "velocidade": 0.7, "qualidade": 0.7, "estilo": "balanceado"}
]

recomendacao = sistema_pref.recomendar_opcao(novas_opcoes)

print(f"Recomendação: {recomendacao['opcao']['nome']}")
print(f"Confiança: {recomendacao['confianca']:.1%}")
print(f"Motivo: {recomendacao['motivo']}")
print(f"Preferências aplicadas: {', '.join(recomendacao['preferencias_aplicadas'])}")
```

---

### 4-7. Capacidades Evolutivas Adicionais

```python
class SistemaEvolutivoCompleto:
    """Sistema com todas as capacidades evolutivas"""

    def __init__(self):
        self.metodos_criados: List[Dict] = []
        self.otimizacoes_aplicadas: List[Dict] = []
        self.automacoes_criadas: List[Dict] = []
        self.processos_substituidos: List[Dict] = []

    def criar_novo_metodo(self, problema: str, tentativas: List[Dict]) -> Dict:
        """Cria novo método baseado em experimentos"""
        # Analisa tentativas anteriores
        melhores = sorted(tentativas, key=lambda x: x["resultado"], reverse=True)[:3]

        # Combina melhores práticas
        novo_metodo = {
            "nome": f"Metodo_{len(self.metodos_criados) + 1}",
            "problema": problema,
            "baseado_em": [t["abordagem"] for t in melhores],
            "performance_esperada": sum(t["resultado"] for t in melhores) / len(melhores),
            "criado_em": datetime.now().isoformat()
        }

        self.metodos_criados.append(novo_metodo)
        return novo_metodo

    def otimizar_sem_permissao(self, processo: str, metricas: Dict) -> Dict:
        """Otimiza processo automaticamente dentro dos limites"""
        otimizacao = {
            "processo": processo,
            "tipo": "paralelizacao" if metricas.get("tempo", 0) > 10 else "cache",
            "ganho_estimado": "60% mais rápido",
            "aplicada_automaticamente": True,
            "timestamp": datetime.now().isoformat()
        }

        self.otimizacoes_aplicadas.append(otimizacao)
        return otimizacao

    def automatizar_repeticao(self, tarefas_recentes: List[Dict]) -> Dict:
        """Identifica e automatiza padrões repetitivos"""
        # Identifica sequências repetidas
        if len(tarefas_recentes) < 5:
            return {"mensagem": "Dados insuficientes"}

        # Simula detecção de padrão
        padrao_detectado = {
            "tipo": "revisao_pos_geracao",
            "frequencia": "sempre após geração de relatório",
            "acao_automatizada": "Adicionar revisão automática",
            "criado_em": datetime.now().isoformat()
        }

        self.automacoes_criadas.append(padrao_detectado)
        return padrao_detectado

    def substituir_processo_fraco(self, processo_atual: Dict, alternativas: List[Dict]) -> Dict:
        """Substitui processo ineficiente por melhor alternativa"""
        # Seleciona melhor alternativa
        melhor = max(alternativas, key=lambda x: x["eficiencia"])

        substituicao = {
            "processo_anterior": processo_atual["nome"],
            "performance_anterior": processo_atual["performance"],
            "processo_novo": melhor["nome"],
            "performance_nova": melhor["eficiencia"],
            "ganho": (melhor["eficiencia"] - processo_atual["performance"]) / processo_atual["performance"],
            "substituido_em": datetime.now().isoformat()
        }

        self.processos_substituidos.append(substituicao)
        return substituicao


# Exemplo completo
sistema_evo = SistemaEvolutivoCompleto()

print("\n=== SISTEMA EVOLUTIVO COMPLETO ===\n")

# 1. Cria novo método
tentativas = [
    {"abordagem": "A", "resultado": 0.7},
    {"abordagem": "B", "resultado": 0.9},
    {"abordagem": "C", "resultado": 0.85}
]

novo_metodo = sistema_evo.criar_novo_metodo("Otimização de busca", tentativas)
print(f"✅ Novo método criado: {novo_metodo['nome']}")
print(f"   Performance esperada: {novo_metodo['performance_esperada']:.2f}\n")

# 2. Otimiza automaticamente
otim = sistema_evo.otimizar_sem_permissao("processamento_dados", {"tempo": 15})
print(f"✅ Otimização aplicada: {otim['tipo']}")
print(f"   Ganho: {otim['ganho_estimado']}\n")

# 3. Automatiza repetição
auto = sistema_evo.automatizar_repeticao([{} for _ in range(10)])
print(f"✅ Automação criada: {auto['acao_automatizada']}")
print(f"   Trigger: {auto['frequencia']}\n")

# 4. Substitui processo
subst = sistema_evo.substituir_processo_fraco(
    {"nome": "Busca linear", "performance": 0.5},
    [
        {"nome": "Busca binária", "eficiencia": 0.85},
        {"nome": "Hash table", "eficiencia": 0.95}
    ]
)

print(f"✅ Processo substituído:")
print(f"   {subst['processo_anterior']} → {subst['processo_novo']}")
print(f"   Ganho: {subst['ganho']:.1%}")
```

---

## O Ciclo de Evolução

O ciclo completo de evolução de um sistema intencional:

```python
class CicloEvolutivo:
    """Implementação completa do ciclo evolutivo"""

    def __init__(self):
        self.ciclos_completos = 0
        self.metricas_historicas: List[Dict] = []

    def executar_ciclo_completo(self, tarefa: Dict) -> Dict:
        """Executa um ciclo completo de evolução"""
        print(f"\n{'='*60}")
        print(f"CICLO EVOLUTIVO #{self.ciclos_completos + 1}")
        print(f"{'='*60}\n")

        # 1. EXECUTAR
        print("1️⃣ EXECUTAR")
        resultado_execucao = self._executar(tarefa)
        print(f"   Status: {resultado_execucao['status']}")
        print(f"   Performance: {resultado_execucao['performance']:.2f}\n")

        # 2. MEDIR RESULTADOS
        print("2️⃣ MEDIR RESULTADOS")
        metricas = self._medir_resultados(resultado_execucao)
        print(f"   Qualidade: {metricas['qualidade']:.2f}")
        print(f"   Velocidade: {metricas['velocidade']:.2f}")
        print(f"   Eficiência: {metricas['eficiencia']:.2f}\n")

        # 3. ANALISAR DESVIOS
        print("3️⃣ ANALISAR DESVIOS")
        analise = self._analisar_desvios(metricas, tarefa.get("metas", {}))
        print(f"   Desvios encontrados: {analise['total_desvios']}")
        if analise['desvios']:
            for desvio in analise['desvios']:
                print(f"   • {desvio}")
        print()

        # 4. AJUSTAR ESTRATÉGIA
        print("4️⃣ AJUSTAR ESTRATÉGIA")
        ajustes = self._ajustar_estrategia(analise)
        print(f"   Ajustes aplicados: {len(ajustes)}")
        for ajuste in ajustes:
            print(f"   • {ajuste}")
        print()

        # 5. REPETIR COM MELHORIAS
        print("5️⃣ PREPARAR PRÓXIMO CICLO")
        print(f"   Melhorias prontas para aplicação no próximo ciclo\n")

        # Registra ciclo
        self.ciclos_completos += 1
        self.metricas_historicas.append(metricas)

        return {
            "ciclo": self.ciclos_completos,
            "resultado": resultado_execucao,
            "metricas": metricas,
            "analise": analise,
            "ajustes": ajustes
        }

    def _executar(self, tarefa: Dict) -> Dict:
        """Executa a tarefa"""
        return {
            "status": "completo",
            "performance": 0.75,
            "saida": "Resultado da execução"
        }

    def _medir_resultados(self, resultado: Dict) -> Dict:
        """Mede resultados da execução"""
        return {
            "qualidade": resultado["performance"] * 0.9,
            "velocidade": 0.8,
            "eficiencia": resultado["performance"] * 0.85
        }

    def _analisar_desvios(self, metricas: Dict, metas: Dict) -> Dict:
        """Analisa desvios em relação às metas"""
        metas_padrao = {"qualidade": 0.8, "velocidade": 0.75, "eficiencia": 0.8}
        metas_finais = {**metas_padrao, **metas}

        desvios = []
        for metrica, valor in metricas.items():
            meta = metas_finais.get(metrica)
            if meta and valor < meta:
                desvios.append(f"{metrica}: {valor:.2f} < meta {meta:.2f}")

        return {
            "total_desvios": len(desvios),
            "desvios": desvios,
            "metas_atingidas": len(metricas) - len(desvios)
        }

    def _ajustar_estrategia(self, analise: Dict) -> List[str]:
        """Ajusta estratégia baseado na análise"""
        ajustes = []

        for desvio in analise["desvios"]:
            if "qualidade" in desvio.lower():
                ajustes.append("Aumentar validações de qualidade")
            elif "velocidade" in desvio.lower():
                ajustes.append("Otimizar pipeline de execução")
            elif "eficiencia" in desvio.lower():
                ajustes.append("Reduzir desperdício de recursos")

        return ajustes

    def relatorio_evolucao(self) -> Dict:
        """Gera relatório de evolução ao longo dos ciclos"""
        if not self.metricas_historicas:
            return {"mensagem": "Sem dados de evolução"}

        # Analisa tendência
        primeira = self.metricas_historicas[0]
        ultima = self.metricas_historicas[-1]

        evolucao = {}
        for metrica in primeira.keys():
            evolucao[metrica] = {
                "inicial": primeira[metrica],
                "atual": ultima[metrica],
                "melhoria": ((ultima[metrica] - primeira[metrica]) / primeira[metrica]) * 100
            }

        return {
            "total_ciclos": self.ciclos_completos,
            "evolucao_metricas": evolucao,
            "tendencia_geral": "positiva" if all(e["melhoria"] > 0 for e in evolucao.values()) else "mista"
        }


# Demonstração do ciclo evolutivo
ciclo = CicloEvolutivo()

# Executa 3 ciclos
for i in range(3):
    resultado = ciclo.executar_ciclo_completo({
        "tarefa": f"Processamento batch #{i+1}",
        "metas": {"qualidade": 0.85, "velocidade": 0.8}
    })

# Relatório final
print("\n" + "="*60)
print("RELATÓRIO DE EVOLUÇÃO")
print("="*60 + "\n")

relatorio = ciclo.relatorio_evolucao()
print(f"Total de ciclos: {relatorio['total_ciclos']}")
print(f"Tendência geral: {relatorio['tendencia_geral'].upper()}\n")

print("Evolução por métrica:")
for metrica, dados in relatorio['evolucao_metricas'].items():
    print(f"  • {metrica}:")
    print(f"    {dados['inicial']:.2f} → {dados['atual']:.2f} ({dados['melhoria']:+.1f}%)")
```

---

## Conclusão

Você entendeu Loops Evolutivos - a capacidade que transforma agentes simples em sistemas verdadeiramente inteligentes.

### O que você dominou:

✅ 7 formas que agentes evoluem autonomamente (falhas, estratégias, preferências, métodos, otimizações, automações, substituições)
✅ Sistema completo de análise de falhas com identificação de padrões
✅ Ajuste automático de estratégias baseado em performance
✅ Aprendizado de preferências do usuário
✅ Criação de novos métodos por experimentação
✅ Otimizações automáticas dentro de limites
✅ Automação de tarefas repetitivas
✅ Substituição de processos fracos
✅ O ciclo completo de evolução (Executar → Medir → Analisar → Ajustar → Repetir)
✅ Implementação prática de cada capacidade evolutiva
✅ Como sistemas aprendem sem intervenção humana
✅ Por que loops evolutivos são o coração da ESIA

### Próximo módulo:

No Módulo 5, você vai aprender sobre **Intenção Composta e Intenção Persistente**: conceitos avançados que permitem sistemas manterem objetivos complexos ao longo de semanas ou meses.

---

**© 2025 FEI - Formação em Engenharia de Intenção**
