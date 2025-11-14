# Módulo 5: Intenção Composta e Persistente

## Nível 4S - Sistemas Intencionais 2026

---

## Introdução

Em 2026, sistemas inteligentes não lidam com **tarefas simples** - eles gerenciam **intenções complexas** que possuem **múltiplas camadas de objetivos** e **se estendem por meses**.

### Dois conceitos cruciais para 2026:

1. **Intenção Composta:** Objetivos que contêm sub-objetivos, critérios múltiplos, contextos paralelos e dependências.
2. **Intenção Persistente:** Visão de longo prazo que o sistema mantém ao longo de semanas ou meses.

---

## 1. Intenção Composta

Uma **Intenção Composta** é uma instrução que contém múltiplos níveis de complexidade simultaneamente.

### Implementação Completa:

```python
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from enum import Enum

class NivelIntencao(Enum):
    MACRO = "macro"
    INTERMEDIARIA = "intermediaria"
    MICRO = "micro"

class TipoCriterio(Enum):
    QUALIDADE = "qualidade"
    VELOCIDADE = "velocidade"
    CUSTO = "custo"
    IMPACTO = "impacto"
    RISCO = "risco"

@dataclass
class ObjetivoComposto:
    """Representa um objetivo com múltiplas camadas"""
    nivel: NivelIntencao
    descricao: str
    prazo: datetime
    criterios: Dict[TipoCriterio, float]  # Peso de cada critério (0-1)
    dependencias: List[str] = field(default_factory=list)
    contextos: List[str] = field(default_factory=list)
    sub_objetivos: List['ObjetivoComposto'] = field(default_factory=list)
    progresso: int = 0  # 0-100

class IntencaoComposta:
    """Sistema que gerencia intenções compostas"""

    def __init__(self, objetivo_macro: str):
        self.objetivo_macro = objetivo_macro
        self.objetivos: Dict[str, ObjetivoComposto] = {}
        self.arvore_dependencias: Dict[str, List[str]] = {}

    def adicionar_objetivo(
        self,
        id_objetivo: str,
        nivel: NivelIntencao,
        descricao: str,
        prazo_dias: int,
        criterios: Dict[TipoCriterio, float],
        dependencias: List[str] = None,
        contextos: List[str] = None
    ):
        """Adiciona objetivo à intenção composta"""
        objetivo = ObjetivoComposto(
            nivel=nivel,
            descricao=descricao,
            prazo=datetime.now() + timedelta(days=prazo_dias),
            criterios=criterios,
            dependencias=dependencias or [],
            contextos=contextos or []
        )

        self.objetivos[id_objetivo] = objetivo

        # Atualiza árvore de dependências
        for dep in objetivo.dependencias:
            if dep not in self.arvore_dependencias:
                self.arvore_dependencias[dep] = []
            self.arvore_dependencias[dep].append(id_objetivo)

    def validar_consistencia(self) -> Dict:
        """Valida consistência da intenção composta"""
        problemas = []

        # 1. Verifica dependências circulares
        for obj_id in self.objetivos:
            if self._tem_dependencia_circular(obj_id, set()):
                problemas.append(f"Dependência circular detectada em {obj_id}")

        # 2. Verifica dependências inexistentes
        for obj_id, obj in self.objetivos.items():
            for dep in obj.dependencias:
                if dep not in self.objetivos:
                    problemas.append(f"{obj_id} depende de {dep} que não existe")

        # 3. Verifica balanceamento de critérios
        for obj_id, obj in self.objetivos.items():
            soma_criterios = sum(obj.criterios.values())
            if abs(soma_criterios - 1.0) > 0.01:  # Tolerância de 1%
                problemas.append(f"{obj_id}: critérios somam {soma_criterios:.2f}, devem somar 1.0")

        return {
            "valido": len(problemas) == 0,
            "total_problemas": len(problemas),
            "problemas": problemas
        }

    def _tem_dependencia_circular(self, obj_id: str, visitados: set) -> bool:
        """Detecta dependências circulares"""
        if obj_id in visitados:
            return True

        visitados.add(obj_id)

        if obj_id in self.objetivos:
            for dep in self.objetivos[obj_id].dependencias:
                if self._tem_dependencia_circular(dep, visitados.copy()):
                    return True

        return False

    def calcular_ordem_execucao(self) -> List[str]:
        """Calcula ordem de execução respeitando dependências"""
        # Topological sort
        grau_entrada = {obj_id: 0 for obj_id in self.objetivos}

        for obj_id, obj in self.objetivos.items():
            for dep in obj.dependencias:
                if dep in grau_entrada:
                    grau_entrada[obj_id] += 1

        fila = [obj_id for obj_id, grau in grau_entrada.items() if grau == 0]
        ordem = []

        while fila:
            atual = fila.pop(0)
            ordem.append(atual)

            if atual in self.arvore_dependencias:
                for dependente in self.arvore_dependencias[atual]:
                    grau_entrada[dependente] -= 1
                    if grau_entrada[dependente] == 0:
                        fila.append(dependente)

        return ordem

    def priorizar_objetivos(self) -> List[tuple]:
        """Prioriza objetivos baseado em múltiplos critérios"""
        scores = []

        for obj_id, obj in self.objetivos.items():
            # Calcula score baseado em critérios, prazo e progresso
            prazo_score = 1 / ((obj.prazo - datetime.now()).days + 1)
            progresso_score = (100 - obj.progresso) / 100

            # Peso dos critérios
            criterios_score = sum(
                peso * (1 if crit in [TipoCriterio.IMPACTO, TipoCriterio.QUALIDADE] else 0.5)
                for crit, peso in obj.criterios.items()
            )

            score_final = (
                prazo_score * 0.3 +
                progresso_score * 0.4 +
                criterios_score * 0.3
            )

            scores.append((obj_id, score_final, obj.descricao))

        return sorted(scores, key=lambda x: x[1], reverse=True)

    def analisar_contextos_paralelos(self) -> Dict:
        """Analisa objetivos que requerem contextos diferentes"""
        contextos_unicos = set()
        objetivos_por_contexto = {}

        for obj_id, obj in self.objetivos.items():
            for contexto in obj.contextos:
                contextos_unicos.add(contexto)

                if contexto not in objetivos_por_contexto:
                    objetivos_por_contexto[contexto] = []

                objetivos_por_contexto[contexto].append(obj_id)

        return {
            "total_contextos": len(contextos_unicos),
            "contextos": list(contextos_unicos),
            "objetivos_por_contexto": objetivos_por_contexto,
            "complexidade": "alta" if len(contextos_unicos) > 3 else "media"
        }

    def gerar_plano_execucao(self) -> Dict:
        """Gera plano completo de execução"""
        validacao = self.validar_consistencia()

        if not validacao["valido"]:
            return {
                "status": "invalido",
                "problemas": validacao["problemas"]
            }

        ordem = self.calcular_ordem_execucao()
        prioridades = self.priorizar_objetivos()
        contextos = self.analisar_contextos_paralelos()

        return {
            "status": "valido",
            "objetivo_macro": self.objetivo_macro,
            "total_objetivos": len(self.objetivos),
            "ordem_execucao": ordem,
            "top_prioridades": prioridades[:5],
            "analise_contextos": contextos,
            "prazo_final": max(obj.prazo for obj in self.objetivos.values())
        }


# Exemplo completo de uso
intencao = IntencaoComposta("Construir autoridade em IA Educacional")

# Objetivos Macro
intencao.adicionar_objetivo(
    "macro_1",
    NivelIntencao.MACRO,
    "Ser referência reconhecida em IA + Educação",
    365,
    {
        TipoCriterio.IMPACTO: 0.5,
        TipoCriterio.QUALIDADE: 0.3,
        TipoCriterio.VELOCIDADE: 0.2
    },
    contextos=["profissionais", "academicos", "empresas"]
)

# Objetivos Intermediários
intencao.adicionar_objetivo(
    "int_1",
    NivelIntencao.INTERMEDIARIA,
    "Crescer audiência para 100k",
    180,
    {
        TipoCriterio.IMPACTO: 0.4,
        TipoCriterio.VELOCIDADE: 0.4,
        TipoCriterio.CUSTO: 0.2
    },
    dependencias=["macro_1"],
    contextos=["iniciantes", "profissionais"]
)

intencao.adicionar_objetivo(
    "int_2",
    NivelIntencao.INTERMEDIARIA,
    "Publicar em 3 revistas especializadas",
    120,
    {
        TipoCriterio.QUALIDADE: 0.6,
        TipoCriterio.IMPACTO: 0.4
    },
    dependencias=["macro_1"],
    contextos=["academicos"]
)

# Microtarefas
intencao.adicionar_objetivo(
    "micro_1",
    NivelIntencao.MICRO,
    "Publicar 3 posts/semana sobre IA",
    30,
    {
        TipoCriterio.QUALIDADE: 0.5,
        TipoCriterio.VELOCIDADE: 0.5
    },
    dependencias=["int_1"],
    contextos=["iniciantes", "profissionais"]
)

intencao.adicionar_objetivo(
    "micro_2",
    NivelIntencao.MICRO,
    "Produzir artigo científico sobre LLMs na educação",
    60,
    {
        TipoCriterio.QUALIDADE: 0.8,
        TipoCriterio.IMPACTO: 0.2
    },
    dependencias=["int_2"],
    contextos=["academicos"]
)

print("=== INTENÇÃO COMPOSTA ===\n")
print(f"Objetivo Macro: {intencao.objetivo_macro}")
print(f"Total de objetivos: {len(intencao.objetivos)}\n")

# Valida consistência
print("Validação:")
validacao = intencao.validar_consistencia()
print(f"  Status: {'✅ Válido' if validacao['valido'] else '❌ Inválido'}")
if not validacao['valido']:
    for problema in validacao['problemas']:
        print(f"  • {problema}")
print()

# Gera plano de execução
plano = intencao.gerar_plano_execucao()

if plano["status"] == "valido":
    print("Ordem de execução:")
    for i, obj_id in enumerate(plano["ordem_execucao"], 1):
        obj = intencao.objetivos[obj_id]
        print(f"  {i}. [{obj.nivel.value.upper()}] {obj.descricao}")

    print("\nTop 3 Prioridades:")
    for obj_id, score, desc in plano["top_prioridades"][:3]:
        print(f"  • {desc} (score: {score:.2f})")

    print(f"\nContextos Paralelos:")
    print(f"  Total: {plano['analise_contextos']['total_contextos']}")
    print(f"  Complexidade: {plano['analise_contextos']['complexidade']}")
    for contexto in plano['analise_contextos']['contextos']:
        objs = plano['analise_contextos']['objetivos_por_contexto'][contexto]
        print(f"  • {contexto}: {len(objs)} objetivos")
```

---

## 2. Intenção Persistente

**Intenção Persistente** significa que a IA **mantém objetivos de longo prazo** mesmo após dias, semanas ou meses de interação.

```python
import json
from collections import defaultdict

class IntencaoPersistente:
    """Sistema que mantém intenção ao longo do tempo"""

    def __init__(self, usuario_id: str, missao: str):
        self.usuario_id = usuario_id
        self.missao = missao
        self.criado_em = datetime.now()

        # Estado persistente
        self.preferencias: Dict[str, Any] = {}
        self.estilo: Dict[str, Any] = {}
        self.padroes_validados: List[Dict] = []
        self.visao_longo_prazo: Dict = {}
        self.contexto_acumulado: List[Dict] = []
        self.marcos_atingidos: List[Dict] = []

    def atualizar_preferencia(self, categoria: str, valor: Any, confianca: float):
        """Atualiza preferência do usuário"""
        if categoria not in self.preferencias:
            self.preferencias[categoria] = {
                "valor_atual": valor,
                "historico": [],
                "confianca": confianca,
                "atualizado_em": datetime.now().isoformat()
            }
        else:
            # Adiciona ao histórico
            self.preferencias[categoria]["historico"].append({
                "valor": self.preferencias[categoria]["valor_atual"],
                "timestamp": self.preferencias[categoria]["atualizado_em"]
            })

            # Atualiza valor atual
            self.preferencias[categoria]["valor_atual"] = valor
            self.preferencias[categoria]["confianca"] = confianca
            self.preferencias[categoria]["atualizado_em"] = datetime.now().isoformat()

    def definir_estilo(self, aspecto: str, caracteristicas: Dict):
        """Define aspecto do estilo do usuário"""
        self.estilo[aspecto] = {
            "caracteristicas": caracteristicas,
            "exemplos": [],
            "definido_em": datetime.now().isoformat()
        }

    def validar_padrao(self, nome: str, descricao: str, taxa_sucesso: float):
        """Registra padrão que funciona bem"""
        padrao = {
            "nome": nome,
            "descricao": descricao,
            "taxa_sucesso": taxa_sucesso,
            "validado_em": datetime.now().isoformat(),
            "usos": 1
        }

        # Verifica se já existe
        existente = next((p for p in self.padroes_validados if p["nome"] == nome), None)

        if existente:
            existente["usos"] += 1
            existente["taxa_sucesso"] = (existente["taxa_sucesso"] + taxa_sucesso) / 2
        else:
            self.padroes_validados.append(padrao)

    def adicionar_contexto(self, evento: str, dados: Dict, aprendizado: str):
        """Adiciona ao contexto acumulado"""
        contexto = {
            "evento": evento,
            "dados": dados,
            "aprendizado": aprendizado,
            "timestamp": datetime.now().isoformat()
        }

        self.contexto_acumulado.append(contexto)

        # Mantém apenas últimos 100 contextos
        if len(self.contexto_acumulado) > 100:
            self.contexto_acumulado = self.contexto_acumulado[-100:]

    def registrar_marco(self, descricao: str, impacto: str):
        """Registra marco importante"""
        marco = {
            "descricao": descricao,
            "impacto": impacto,
            "atingido_em": datetime.now().isoformat()
        }

        self.marcos_atingidos.append(marco)

    def recuperar_contexto_relevante(self, query: str, limite: int = 5) -> List[Dict]:
        """Recupera contexto relevante da história"""
        # Busca nos últimos contextos
        relevantes = []

        query_lower = query.lower()

        for ctx in reversed(self.contexto_acumulado):
            if any(palavra in ctx["evento"].lower() or palavra in ctx["aprendizado"].lower()
                   for palavra in query_lower.split()):
                relevantes.append(ctx)

                if len(relevantes) >= limite:
                    break

        return relevantes

    def gerar_relatorio_trimestral(self) -> Dict:
        """Gera relatório trimestral de progresso"""
        dias_ativo = (datetime.now() - self.criado_em).days

        return {
            "missao": self.missao,
            "dias_ativo": dias_ativo,
            "preferencias_identificadas": len(self.preferencias),
            "aspectos_estilo_definidos": len(self.estilo),
            "padroes_validados": len(self.padroes_validados),
            "marcos_atingidos": len(self.marcos_atingidos),
            "contexto_acumulado": len(self.contexto_acumulado),
            "top_padroes": sorted(
                self.padroes_validados,
                key=lambda p: p["taxa_sucesso"],
                reverse=True
            )[:3],
            "proximos_passos": self._sugerir_proximos_passos()
        }

    def _sugerir_proximos_passos(self) -> List[str]:
        """Sugere próximos passos baseado no histórico"""
        sugestoes = []

        # Baseado em preferências
        if len(self.preferencias) < 5:
            sugestoes.append("Continuar identificando preferências do usuário")

        # Baseado em padrões
        padroes_sucesso = [p for p in self.padroes_validados if p["taxa_sucesso"] > 0.8]
        if padroes_sucesso:
            sugestoes.append(f"Aplicar padrão '{padroes_sucesso[0]['nome']}' com {padroes_sucesso[0]['taxa_sucesso']:.1%} de sucesso")

        # Baseado em marcos
        if len(self.marcos_atingidos) < 3:
            sugestoes.append("Focar em atingir próximo marco importante")

        return sugestoes[:3]

    def manter_alinhamento_missao(self, acao_proposta: str) -> Dict:
        """Verifica se ação está alinhada com missão"""
        # Análise simples de palavras-chave
        missao_palavras = set(self.missao.lower().split())
        acao_palavras = set(acao_proposta.lower().split())

        sobreposicao = len(missao_palavras & acao_palavras)
        alinhamento = sobreposicao / len(missao_palavras) if missao_palavras else 0

        return {
            "alinhado": alinhamento > 0.3,
            "score_alinhamento": alinhamento,
            "justificativa": (
                f"Ação tem {alinhamento:.1%} de alinhamento com missão" if alinhamento > 0.3
                else "Ação não parece alinhada com missão principal"
            )
        }


# Exemplo de uso completo
print("\n=== INTENÇÃO PERSISTENTE ===\n")

persistencia = IntencaoPersistente(
    "usuario_123",
    "Construir autoridade em IA educacional ao longo de 2026"
)

# Semana 1: Define preferências iniciais
persistencia.atualizar_preferencia("tom_comunicacao", "tecnico_acessivel", 0.8)
persistencia.atualizar_preferencia("formato_conteudo", "artigos_longos", 0.9)

persistencia.definir_estilo("escrita", {
    "usa_exemplos_praticos": True,
    "evita_jargao_excessivo": True,
    "inclui_codigo_funcional": True
})

print("Semana 1: Preferências e estilo definidos")
print(f"  • Tom: {persistencia.preferencias['tom_comunicacao']['valor_atual']}")
print(f"  • Formato: {persistencia.preferencias['formato_conteudo']['valor_atual']}\n")

# Semana 4: Valida padrão que funciona
persistencia.validar_padrao(
    "casos_praticos",
    "Posts com casos práticos têm 3x mais engajamento",
    0.85
)

persistencia.adicionar_contexto(
    "analise_performance",
    {"posts_publicados": 12, "engajamento_medio": 450},
    "Casos práticos têm melhor performance"
)

print("Semana 4: Padrão validado")
print(f"  • Casos práticos: {persistencia.padroes_validados[0]['taxa_sucesso']:.1%} sucesso\n")

# Semana 8: Novo projeto
nova_acao = "Criar série de vídeos sobre transformers em educação"
alinhamento = persistencia.manter_alinhamento_missao(nova_acao)

print("Semana 8: Nova ação proposta")
print(f"  • Ação: {nova_acao}")
print(f"  • Alinhada: {'✅' if alinhamento['alinhado'] else '❌'}")
print(f"  • Score: {alinhamento['score_alinhamento']:.1%}")
print(f"  • {alinhamento['justificativa']}\n")

# Semana 12: Marco atingido
persistencia.registrar_marco(
    "Atingiu 50k seguidores",
    "Aumento significativo de alcance"
)

# Relatório trimestral
print("=" * 60)
relatorio = persistencia.gerar_relatorio_trimestral()

print("RELATÓRIO TRIMESTRAL:")
print(f"Missão: {relatorio['missao']}")
print(f"Dias ativo: {relatorio['dias_ativo']}")
print(f"Preferências identificadas: {relatorio['preferencias_identificadas']}")
print(f"Padrões validados: {relatorio['padroes_validados']}")
print(f"Marcos atingidos: {relatorio['marcos_atingidos']}")

print("\nPróximos passos sugeridos:")
for i, passo in enumerate(relatorio['proximos_passos'], 1):
    print(f"  {i}. {passo}")
```

---

## Conclusão

Você dominou os conceitos de Intenção Composta e Intenção Persistente - as capacidades que permitem sistemas manterem objetivos complexos ao longo de meses.

### O que você dominou:

✅ 7 componentes de uma Intenção Composta (macro, intermediárias, micro, critérios, contextos, dependências, camadas)
✅ Implementação completa de sistema de intenção composta com validação
✅ Cálculo automático de ordem de execução respeitando dependências
✅ Priorização de objetivos com múltiplos critérios
✅ Análise de contextos paralelos
✅ Intenção Persistente com preferências, estilo, padrões validados
✅ Contexto acumulado ao longo do tempo
✅ Alinhamento automático de novas ações com missão
✅ Relatórios trimestrais de progresso
✅ Como sistemas mantêm objetivos por meses
✅ Diferença entre comando pontual e intenção persistente
✅ Por que intenção composta e persistente revolucionam IA

### Próximo módulo:

No Módulo 6, você vai aprender sobre **Sistemas Multiagentes (2026)**: os 4 modelos que dominam a coordenação de agentes em 2026, com implementações completas de cada arquitetura.

---

**© 2025 FEI - Formação em Engenharia de Intenção**
