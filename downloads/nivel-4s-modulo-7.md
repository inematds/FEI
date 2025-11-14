# Módulo 7: Criação de Agentes com ESIA

## Os 8 Componentes Essenciais de um Agente Avançado

**A diferença entre agente básico e agente profissional está na completude dos componentes.**

### 1. Missão Funcional

**Propósito claro e específico do agente.**

```python
from dataclasses import dataclass
from typing import Dict, List
from enum import Enum

class TipoImpacto(Enum):
    CRIACAO = "criação"
    TRANSFORMACAO = "transformação"
    ANALISE = "análise"
    COORDENACAO = "coordenação"
    VALIDACAO = "validação"

@dataclass
class MissaoFuncional:
    """Define o propósito existencial do agente"""
    nome_agente: str
    verbo_principal: str  # criar, analisar, coordenar, etc
    objeto_trabalho: str  # o que manipula
    resultado_esperado: str  # output desejado
    tipo_impacto: TipoImpacto
    metricas_sucesso: List[str]
    contexto_atuacao: Dict

    def validar_missao(self) -> Dict:
        """Valida se a missão está bem definida"""
        return {
            "missao_clara": len(self.verbo_principal) > 0 and len(self.objeto_trabalho) > 0,
            "resultado_mensuravel": len(self.metricas_sucesso) >= 2,
            "contexto_definido": len(self.contexto_atuacao) >= 3,
            "especificidade": self._calcular_especificidade()
        }

    def _calcular_especificidade(self) -> float:
        """Quanto mais específico, melhor o agente"""
        score = 0.0
        if len(self.resultado_esperado.split()) > 5:
            score += 0.3
        if len(self.metricas_sucesso) >= 3:
            score += 0.4
        if len(self.contexto_atuacao) >= 5:
            score += 0.3
        return score

# Exemplo prático
missao_copywriter = MissaoFuncional(
    nome_agente="Copywriter de Alta Conversão",
    verbo_principal="criar",
    objeto_trabalho="textos persuasivos para produtos digitais",
    resultado_esperado="copy que converte mínimo 3% do tráfego em vendas",
    tipo_impacto=TipoImpacto.CRIACAO,
    metricas_sucesso=[
        "taxa_conversao >= 3%",
        "taxa_leitura >= 60%",
        "clareza_mensagem >= 8/10"
    ],
    contexto_atuacao={
        "industria": "infoprodutos",
        "publico": "empreendedores digitais 25-45 anos",
        "plataforma": "páginas de vendas",
        "tom": "profissional e inspirador",
        "restricoes": "sem promessas falsas"
    }
)

print(f"Validação: {missao_copywriter.validar_missao()}")
```

### 2. Intenção Estratégica

**Objetivos de médio prazo alinhados com missão macro.**

```python
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime, timedelta

@dataclass
class IntencaoEstrategica:
    """Define o que o agente quer alcançar em 30-90 dias"""
    objetivo_principal: str
    horizonte_temporal: int  # dias
    sub_objetivos: List[str]
    kpis: Dict[str, float]
    alinhamento_missao: str
    restricoes: List[str]
    checkpoints: List[Dict] = field(default_factory=list)

    def __post_init__(self):
        """Cria checkpoints automáticos"""
        if not self.checkpoints:
            self.checkpoints = self._gerar_checkpoints()

    def _gerar_checkpoints(self) -> List[Dict]:
        """Divide objetivo em marcos de progresso"""
        total_dias = self.horizonte_temporal
        num_checkpoints = max(3, total_dias // 30)

        checkpoints = []
        for i in range(num_checkpoints):
            dia_checkpoint = (total_dias // num_checkpoints) * (i + 1)
            checkpoints.append({
                "dia": dia_checkpoint,
                "meta": f"{((i+1)/num_checkpoints)*100:.0f}% do objetivo principal",
                "validacao": f"checkpoint_{i+1}",
                "status": "pendente"
            })
        return checkpoints

    def avaliar_progresso(self, dia_atual: int, kpis_atuais: Dict[str, float]) -> Dict:
        """Avalia se está no caminho certo"""
        checkpoint_atual = None
        for cp in self.checkpoints:
            if dia_atual >= cp["dia"] and cp["status"] == "pendente":
                checkpoint_atual = cp
                break

        if not checkpoint_atual:
            return {"status": "sem_checkpoint_ativo"}

        # Compara KPIs esperados vs reais
        progresso_esperado = (dia_atual / self.horizonte_temporal)
        progresso_real = sum(
            kpis_atuais.get(k, 0) / v
            for k, v in self.kpis.items()
        ) / len(self.kpis)

        return {
            "checkpoint": checkpoint_atual,
            "progresso_esperado": f"{progresso_esperado*100:.1f}%",
            "progresso_real": f"{progresso_real*100:.1f}%",
            "status": "no_caminho" if progresso_real >= progresso_esperado * 0.8 else "atrasado",
            "ajuste_necessario": progresso_real < progresso_esperado * 0.8
        }

# Exemplo prático
intencao_crescimento = IntencaoEstrategica(
    objetivo_principal="Tornar-se referência em copy de lançamentos digitais",
    horizonte_temporal=90,
    sub_objetivos=[
        "Criar 15 páginas de vendas de alta conversão",
        "Alcançar taxa média de conversão de 4%",
        "Desenvolver 3 templates reutilizáveis",
        "Documentar padrões de sucesso"
    ],
    kpis={
        "paginas_criadas": 15,
        "conversao_media": 0.04,
        "templates_prontos": 3,
        "documentacao_completa": 1.0
    },
    alinhamento_missao="Cada página criada aprimora a capacidade de conversão",
    restricoes=[
        "Manter ética em todas as páginas",
        "Não usar gatilhos manipulativos",
        "Validar claims com dados reais"
    ]
)

# Simula progresso no dia 45
progresso = intencao_crescimento.avaliar_progresso(
    dia_atual=45,
    kpis_atuais={
        "paginas_criadas": 6,
        "conversao_media": 0.035,
        "templates_prontos": 1,
        "documentacao_completa": 0.4
    }
)
print(f"Avaliação dia 45: {progresso}")
```

### 3. Domínio de Responsabilidade

**Escopo claro de atuação e autoridade.**

```python
from dataclasses import dataclass
from typing import List, Dict, Set
from enum import Enum

class NivelAutoridade(Enum):
    EXECUCAO = "pode executar sem aprovação"
    SUGESTAO = "sugere, mas requer aprovação"
    CONSULTA = "apenas fornece informação"
    VETO = "pode bloquear ações"

@dataclass
class DominioResponsabilidade:
    """Define fronteiras claras do que o agente controla"""
    areas_autoridade: Dict[str, NivelAutoridade]
    recursos_controlados: List[str]
    decisoes_autonomas: Set[str]
    decisoes_requerem_aprovacao: Set[str]
    areas_proibidas: Set[str]
    interfaces_externas: Dict[str, str]

    def pode_executar(self, acao: str) -> Dict:
        """Verifica se pode executar determinada ação"""
        # Verifica se está em área proibida
        if acao in self.areas_proibidas:
            return {
                "permitido": False,
                "razao": "ação em área proibida",
                "nivel": None
            }

        # Verifica nível de autoridade
        if acao in self.decisoes_autonomas:
            return {
                "permitido": True,
                "razao": "decisão autônoma",
                "nivel": NivelAutoridade.EXECUCAO
            }

        if acao in self.decisoes_requerem_aprovacao:
            return {
                "permitido": False,
                "razao": "requer aprovação externa",
                "nivel": NivelAutoridade.SUGESTAO,
                "proximo_passo": "solicitar aprovação do supervisor"
            }

        # Se não está definido, assume consulta
        return {
            "permitido": False,
            "razao": "ação não mapeada no domínio",
            "nivel": NivelAutoridade.CONSULTA,
            "proximo_passo": "consultar supervisor sobre escopo"
        }

    def gerar_relatorio_fronteiras(self) -> Dict:
        """Documenta claramente as fronteiras do agente"""
        return {
            "total_areas": len(self.areas_autoridade),
            "autonomia_completa": len(self.decisoes_autonomas),
            "requer_aprovacao": len(self.decisoes_requerem_aprovacao),
            "areas_proibidas": len(self.areas_proibidas),
            "recursos_controlados": len(self.recursos_controlados),
            "indice_autonomia": len(self.decisoes_autonomas) /
                (len(self.decisoes_autonomas) + len(self.decisoes_requerem_aprovacao))
        }

# Exemplo prático
dominio_copywriter = DominioResponsabilidade(
    areas_autoridade={
        "escrita_copy": NivelAutoridade.EXECUCAO,
        "escolha_headlines": NivelAutoridade.EXECUCAO,
        "estrutura_pagina": NivelAutoridade.EXECUCAO,
        "precificacao": NivelAutoridade.SUGESTAO,
        "aprovacao_final": NivelAutoridade.CONSULTA,
        "publicacao": NivelAutoridade.CONSULTA
    },
    recursos_controlados=[
        "banco_headlines",
        "templates_copy",
        "biblioteca_gatilhos",
        "historico_testes"
    ],
    decisoes_autonomas={
        "criar_variacao_headline",
        "ajustar_tom_texto",
        "reorganizar_secoes",
        "adicionar_prova_social",
        "revisar_gramatica"
    },
    decisoes_requerem_aprovacao={
        "mudar_preco_produto",
        "alterar_oferta_principal",
        "publicar_pagina",
        "fazer_claims_especificos",
        "usar_imagem_cliente"
    },
    areas_proibidas={
        "acesso_dados_pessoais",
        "envio_emails",
        "modificar_codigo_backend",
        "acessar_meios_pagamento"
    },
    interfaces_externas={
        "supervisor": "aprovar decisões críticas",
        "designer": "solicitar assets visuais",
        "analista": "obter dados de conversão"
    }
)

# Testa permissões
teste1 = dominio_copywriter.pode_executar("criar_variacao_headline")
teste2 = dominio_copywriter.pode_executar("publicar_pagina")
teste3 = dominio_copywriter.pode_executar("acesso_dados_pessoais")

print(f"Criar headline: {teste1}")
print(f"Publicar: {teste2}")
print(f"Acessar dados: {teste3}")
print(f"\nRelatório: {dominio_copywriter.gerar_relatorio_fronteiras()}")
```

### 4. Limites Claros

**O que pode e não pode fazer autonomamente.**

```python
from dataclasses import dataclass
from typing import Dict, List, Callable, Any
from enum import Enum

class TipoLimite(Enum):
    FINANCEIRO = "limite de valor monetário"
    TEMPORAL = "limite de tempo de execução"
    QUALITATIVO = "limite de qualidade mínima"
    VOLUMETRICO = "limite de quantidade"
    SEGURANCA = "limite de segurança e privacidade"

@dataclass
class SistemaLimites:
    """Define cercas de segurança para autonomia"""
    limites_quantitativos: Dict[str, float]
    limites_qualitativos: Dict[str, Callable]
    acoes_criticas: List[str]
    validacoes_obrigatorias: Dict[str, List[str]]
    escalation_rules: Dict[str, str]

    def validar_acao(self, acao: str, parametros: Dict[str, Any]) -> Dict:
        """Valida se ação respeita todos os limites"""
        violacoes = []
        warnings = []

        # Valida limites quantitativos
        for limite, valor_max in self.limites_quantitativos.items():
            if limite in parametros:
                if parametros[limite] > valor_max:
                    violacoes.append(f"{limite} excede limite de {valor_max}")
                elif parametros[limite] > valor_max * 0.8:
                    warnings.append(f"{limite} próximo do limite ({valor_max})")

        # Valida limites qualitativos
        for criterio, funcao_validacao in self.limites_qualitativos.items():
            if not funcao_validacao(parametros):
                violacoes.append(f"Falha no critério qualitativo: {criterio}")

        # Verifica se é ação crítica
        if acao in self.acoes_criticas:
            warnings.append(f"Ação '{acao}' é crítica - requer atenção extra")

        # Verifica validações obrigatórias
        if acao in self.validacoes_obrigatorias:
            for validacao in self.validacoes_obrigatorias[acao]:
                if validacao not in parametros:
                    violacoes.append(f"Validação obrigatória ausente: {validacao}")

        return {
            "permitido": len(violacoes) == 0,
            "violacoes": violacoes,
            "warnings": warnings,
            "requer_escalation": len(violacoes) > 0 and acao in self.escalation_rules,
            "escalar_para": self.escalation_rules.get(acao, None)
        }

    def registrar_violacao(self, acao: str, violacao: Dict) -> Dict:
        """Registra tentativa de violação de limite"""
        return {
            "timestamp": "2025-11-13T10:30:00",
            "acao_bloqueada": acao,
            "motivo": violacao["violacoes"],
            "acao_tomada": "bloqueio automático",
            "notificacao_enviada": violacao.get("escalar_para", "supervisor")
        }

# Funções de validação qualitativa
def validar_qualidade_texto(params: Dict) -> bool:
    """Texto deve ter qualidade mínima"""
    texto = params.get("texto", "")
    return len(texto) >= 100 and len(texto.split()) >= 20

def validar_conversao_minima(params: Dict) -> bool:
    """Histórico de conversão deve ser positivo"""
    return params.get("conversao_esperada", 0) >= 0.02

# Exemplo prático
limites_copywriter = SistemaLimites(
    limites_quantitativos={
        "palavras_headline": 15,
        "secoes_pagina": 12,
        "tempo_producao_horas": 8,
        "revisoes_maximas": 5
    },
    limites_qualitativos={
        "qualidade_texto": validar_qualidade_texto,
        "conversao_minima": validar_conversao_minima
    },
    acoes_criticas=[
        "publicar_pagina",
        "alterar_oferta",
        "modificar_preco"
    ],
    validacoes_obrigatorias={
        "publicar_pagina": ["revisao_gramatical", "validacao_claims", "aprovacao_legal"],
        "alterar_oferta": ["analise_impacto", "aprovacao_comercial"],
        "usar_testemunho": ["autorizacao_cliente", "validacao_veracidade"]
    },
    escalation_rules={
        "publicar_pagina": "gerente_marketing",
        "alterar_oferta": "diretor_comercial",
        "usar_testemunho": "juridico"
    }
)

# Testa validações
teste_ok = limites_copywriter.validar_acao(
    "criar_copy",
    {
        "palavras_headline": 12,
        "texto": "Este é um texto de exemplo com mais de cem caracteres e pelo menos vinte palavras para passar na validação de qualidade mínima estabelecida.",
        "conversao_esperada": 0.03
    }
)

teste_violacao = limites_copywriter.validar_acao(
    "publicar_pagina",
    {
        "palavras_headline": 20,  # Excede limite
        "texto": "Texto curto"  # Não passa validação qualitativa
    }
)

print(f"Teste OK: {teste_ok}")
print(f"\nTeste Violação: {teste_violacao}")
```

### 5. Plano de Raciocínio Interno

**Como o agente pensa e toma decisões.**

```python
from dataclasses import dataclass
from typing import List, Dict, Callable, Any
from enum import Enum

class TipoRaciocinio(Enum):
    ANALITICO = "quebra problema em partes"
    CRIATIVO = "gera múltiplas alternativas"
    AVALIATIVO = "compara opções com critérios"
    DEDUTIVO = "aplica regras conhecidas"
    INDUTIVO = "identifica padrões"

@dataclass
class PlanoRaciocinio:
    """Define como o agente pensa internamente"""
    etapas_pensamento: List[Dict[str, Any]]
    criterios_decisao: Dict[str, float]
    heuristicas: List[Callable]
    padroes_conhecidos: Dict[str, Any]

    def executar_raciocinio(self, problema: Dict) -> Dict:
        """Executa cadeia de raciocínio completa"""
        historico_pensamento = []
        estado_atual = problema

        for etapa in self.etapas_pensamento:
            resultado_etapa = self._executar_etapa(etapa, estado_atual)
            historico_pensamento.append({
                "etapa": etapa["nome"],
                "tipo": etapa["tipo"],
                "entrada": estado_atual,
                "saida": resultado_etapa,
                "confianca": resultado_etapa.get("confianca", 1.0)
            })
            estado_atual = resultado_etapa

        # Decisão final
        decisao = self._tomar_decisao(estado_atual)

        return {
            "decisao_final": decisao,
            "raciocinio_completo": historico_pensamento,
            "confianca_final": self._calcular_confianca_geral(historico_pensamento),
            "explicacao": self._gerar_explicacao(historico_pensamento, decisao)
        }

    def _executar_etapa(self, etapa: Dict, entrada: Any) -> Dict:
        """Executa uma etapa do raciocínio"""
        tipo = etapa["tipo"]
        funcao = etapa["funcao"]

        if tipo == TipoRaciocinio.ANALITICO:
            return funcao(entrada, self.padroes_conhecidos)
        elif tipo == TipoRaciocinio.CRIATIVO:
            return funcao(entrada, num_alternativas=5)
        elif tipo == TipoRaciocinio.AVALIATIVO:
            return funcao(entrada, self.criterios_decisao)
        else:
            return funcao(entrada)

    def _tomar_decisao(self, estado_final: Dict) -> Dict:
        """Toma decisão baseada no raciocínio completo"""
        opcoes = estado_final.get("opcoes", [])
        if not opcoes:
            return {"erro": "nenhuma opção gerada"}

        # Aplica critérios de decisão
        scores = []
        for opcao in opcoes:
            score = sum(
                opcao.get(criterio, 0) * peso
                for criterio, peso in self.criterios_decisao.items()
            )
            scores.append((score, opcao))

        melhor_score, melhor_opcao = max(scores, key=lambda x: x[0])

        return {
            "opcao_escolhida": melhor_opcao,
            "score": melhor_score,
            "alternativas": [opt for _, opt in sorted(scores, reverse=True)[1:3]]
        }

    def _calcular_confianca_geral(self, historico: List[Dict]) -> float:
        """Calcula confiança geral do raciocínio"""
        if not historico:
            return 0.0
        confiancas = [etapa["confianca"] for etapa in historico]
        return sum(confiancas) / len(confiancas)

    def _gerar_explicacao(self, historico: List[Dict], decisao: Dict) -> str:
        """Gera explicação textual do raciocínio"""
        partes = ["Raciocínio completo:"]
        for i, etapa in enumerate(historico, 1):
            partes.append(f"{i}. {etapa['etapa']} ({etapa['tipo'].value})")
        partes.append(f"\nDecisão: {decisao['opcao_escolhida'].get('nome', 'N/A')}")
        return "\n".join(partes)

# Funções de raciocínio
def analisar_requisitos(entrada: Dict, padroes: Dict) -> Dict:
    """Etapa analítica"""
    return {
        "objetivo": entrada.get("objetivo"),
        "restricoes": entrada.get("restricoes", []),
        "padroes_aplicaveis": [p for p in padroes if p in str(entrada)],
        "confianca": 0.9
    }

def gerar_alternativas(entrada: Dict, num_alternativas: int) -> Dict:
    """Etapa criativa"""
    return {
        "opcoes": [
            {"nome": f"Alternativa {i}", "viabilidade": 0.8, "impacto": 0.7}
            for i in range(num_alternativas)
        ],
        "confianca": 0.85
    }

def avaliar_opcoes(entrada: Dict, criterios: Dict) -> Dict:
    """Etapa avaliativa"""
    return entrada  # Simplificado para exemplo

# Exemplo prático
plano_copywriter = PlanoRaciocinio(
    etapas_pensamento=[
        {
            "nome": "Analisar brief do cliente",
            "tipo": TipoRaciocinio.ANALITICO,
            "funcao": analisar_requisitos
        },
        {
            "nome": "Gerar headlines alternativas",
            "tipo": TipoRaciocinio.CRIATIVO,
            "funcao": gerar_alternativas
        },
        {
            "nome": "Avaliar headlines por critérios",
            "tipo": TipoRaciocinio.AVALIATIVO,
            "funcao": avaliar_opcoes
        }
    ],
    criterios_decisao={
        "clareza": 0.3,
        "urgencia": 0.2,
        "especificidade": 0.25,
        "beneficio": 0.25
    },
    heuristicas=[],
    padroes_conhecidos={
        "numeros_funcionam": True,
        "beneficio_antes_feature": True,
        "urgencia_aumenta_conversao": True
    }
)

# Executa raciocínio
resultado = plano_copywriter.executar_raciocinio({
    "objetivo": "criar headline para curso de Python",
    "restricoes": ["máximo 12 palavras", "incluir benefício claro"]
})

print(f"Resultado: {resultado['decisao_final']}")
print(f"\nConfiança: {resultado['confianca_final']:.2f}")
print(f"\n{resultado['explicacao']}")
```

### 6. Protocolos de Comunicação

**Como interage com outros agentes e usuários.**

```python
from dataclasses import dataclass
from typing import Dict, List, Optional, Callable
from enum import Enum
from datetime import datetime

class TipoMensagem(Enum):
    SOLICITACAO = "pede ação ou informação"
    RESPOSTA = "responde solicitação"
    NOTIFICACAO = "informa evento"
    VALIDACAO = "pede confirmação"
    ERRO = "reporta problema"

class FormatoSaida(Enum):
    JSON = "json estruturado"
    MARKDOWN = "markdown formatado"
    TEXTO = "texto puro"
    RELATORIO = "relatório executivo"

@dataclass
class ProtocoloComunicacao:
    """Define como agente se comunica"""
    formato_entrada: FormatoSaida
    formato_saida: FormatoSaida
    canais_comunicacao: Dict[str, str]
    templates_mensagem: Dict[TipoMensagem, str]
    regras_escalacao: List[Dict]
    frequencia_updates: Dict[str, int]  # em minutos

    def enviar_mensagem(
        self,
        destinatario: str,
        tipo: TipoMensagem,
        conteudo: Dict,
        prioridade: str = "normal"
    ) -> Dict:
        """Envia mensagem seguindo protocolo"""

        # Seleciona canal baseado em destinatário
        canal = self.canais_comunicacao.get(destinatario, "default")

        # Formata mensagem usando template
        mensagem_formatada = self._formatar_mensagem(tipo, conteudo)

        # Verifica se precisa escalar
        precisa_escalar = self._verificar_escalacao(tipo, conteudo, prioridade)

        return {
            "destinatario": destinatario,
            "canal": canal,
            "tipo": tipo.value,
            "mensagem": mensagem_formatada,
            "prioridade": prioridade,
            "timestamp": datetime.now().isoformat(),
            "escalado": precisa_escalar,
            "formato": self.formato_saida.value
        }

    def _formatar_mensagem(self, tipo: TipoMensagem, conteudo: Dict) -> str:
        """Formata mensagem usando template apropriado"""
        template = self.templates_mensagem.get(tipo, "{conteudo}")

        if self.formato_saida == FormatoSaida.JSON:
            return str(conteudo)
        elif self.formato_saida == FormatoSaida.MARKDOWN:
            return self._formatar_markdown(tipo, conteudo)
        else:
            return template.format(**conteudo)

    def _formatar_markdown(self, tipo: TipoMensagem, conteudo: Dict) -> str:
        """Formata em markdown profissional"""
        if tipo == TipoMensagem.SOLICITACAO:
            return f"### Solicitação\n\n{conteudo.get('descricao', '')}\n\n**Prazo:** {conteudo.get('prazo', 'não especificado')}"
        elif tipo == TipoMensagem.ERRO:
            return f"⚠️ **Erro Detectado**\n\n```\n{conteudo.get('erro', '')}\n```\n\n**Ação:** {conteudo.get('acao', '')}"
        else:
            return str(conteudo)

    def _verificar_escalacao(self, tipo: TipoMensagem, conteudo: Dict, prioridade: str) -> bool:
        """Verifica se mensagem deve ser escalada"""
        for regra in self.regras_escalacao:
            if (regra["tipo"] == tipo and
                regra.get("prioridade", "normal") == prioridade):
                return True
        return False

    def gerar_relatorio_status(self, atividades: List[Dict]) -> Dict:
        """Gera relatório de status automático"""
        return {
            "periodo": "últimas 24h",
            "total_atividades": len(atividades),
            "completadas": len([a for a in atividades if a.get("status") == "completo"]),
            "em_andamento": len([a for a in atividades if a.get("status") == "andamento"]),
            "bloqueadas": len([a for a in atividades if a.get("status") == "bloqueado"]),
            "proximos_passos": self._identificar_proximos_passos(atividades),
            "formato": self.formato_saida.value
        }

    def _identificar_proximos_passos(self, atividades: List[Dict]) -> List[str]:
        """Identifica próximas ações necessárias"""
        passos = []
        for ativ in atividades:
            if ativ.get("status") == "bloqueado":
                passos.append(f"Resolver bloqueio: {ativ.get('nome')}")
            elif ativ.get("status") == "andamento" and ativ.get("progresso", 0) > 0.8:
                passos.append(f"Finalizar: {ativ.get('nome')}")
        return passos[:5]  # Top 5

# Exemplo prático
protocolo_copywriter = ProtocoloComunicacao(
    formato_entrada=FormatoSaida.JSON,
    formato_saida=FormatoSaida.MARKDOWN,
    canais_comunicacao={
        "supervisor": "slack_dm",
        "designer": "slack_canal_projetos",
        "analista": "email",
        "cliente": "plataforma_gestao"
    },
    templates_mensagem={
        TipoMensagem.SOLICITACAO: "Preciso de: {recurso}\nPara: {finalidade}\nAté: {prazo}",
        TipoMensagem.RESPOSTA: "Concluído: {tarefa}\nResultado: {resultado}",
        TipoMensagem.NOTIFICACAO: "Atualização: {evento}",
        TipoMensagem.ERRO: "Problema: {descricao}\nAção tomada: {acao}"
    },
    regras_escalacao=[
        {"tipo": TipoMensagem.ERRO, "prioridade": "alta", "escalar_para": "supervisor"},
        {"tipo": TipoMensagem.VALIDACAO, "conteudo_critico": True, "escalar_para": "cliente"}
    ],
    frequencia_updates={
        "supervisor": 1440,  # 1x por dia
        "cliente": 10080  # 1x por semana
    }
)

# Testa comunicação
msg1 = protocolo_copywriter.enviar_mensagem(
    destinatario="designer",
    tipo=TipoMensagem.SOLICITACAO,
    conteudo={
        "descricao": "Preciso de imagem hero para página de vendas",
        "prazo": "2 dias",
        "especificacoes": "1200x600px, tom profissional"
    }
)

msg2 = protocolo_copywriter.enviar_mensagem(
    destinatario="supervisor",
    tipo=TipoMensagem.ERRO,
    conteudo={
        "erro": "Taxa de conversão abaixo de 2% em teste A/B",
        "acao": "Revisei headline e CTA, nova versão em análise"
    },
    prioridade="alta"
)

print(f"Mensagem Designer:\n{msg1['mensagem']}\n")
print(f"\nMensagem Supervisor:\n{msg2['mensagem']}\n")
print(f"Escalado: {msg2['escalado']}")
```

### 7. Critérios de Auditoria Interna

**Como valida qualidade da própria saída.**

```python
from dataclasses import dataclass
from typing import Dict, List, Callable, Any
from enum import Enum

class NivelSeveridade(Enum):
    CRITICO = "bloqueia publicação"
    ALTO = "requer correção"
    MEDIO = "recomenda revisão"
    BAIXO = "sugestão de melhoria"

@dataclass
class CriterioAuditoria:
    """Um critério de qualidade"""
    nome: str
    descricao: str
    funcao_validacao: Callable
    severidade: NivelSeveridade
    score_minimo: float

@dataclass
class SistemaAuditoriaInterna:
    """Sistema de validação de qualidade"""
    criterios: List[CriterioAuditoria]
    score_minimo_publicacao: float
    checklists: Dict[str, List[str]]

    def auditar_saida(self, output: Dict) -> Dict:
        """Executa auditoria completa da saída"""
        resultados = []
        score_total = 0
        problemas_criticos = []
        warnings = []
        sugestoes = []

        for criterio in self.criterios:
            resultado = criterio.funcao_validacao(output)
            score = resultado.get("score", 0)
            passou = score >= criterio.score_minimo

            resultado_criterio = {
                "criterio": criterio.nome,
                "score": score,
                "passou": passou,
                "severidade": criterio.severidade.value,
                "detalhes": resultado.get("detalhes", "")
            }

            resultados.append(resultado_criterio)
            score_total += score

            if not passou:
                if criterio.severidade == NivelSeveridade.CRITICO:
                    problemas_criticos.append(criterio.nome)
                elif criterio.severidade == NivelSeveridade.ALTO:
                    warnings.append(criterio.nome)
                else:
                    sugestoes.append(criterio.nome)

        score_medio = score_total / len(self.criterios) if self.criterios else 0
        aprovado = (score_medio >= self.score_minimo_publicacao and
                   len(problemas_criticos) == 0)

        return {
            "aprovado": aprovado,
            "score_geral": score_medio,
            "score_minimo": self.score_minimo_publicacao,
            "resultados_detalhados": resultados,
            "problemas_criticos": problemas_criticos,
            "warnings": warnings,
            "sugestoes": sugestoes,
            "acao_recomendada": self._recomendar_acao(aprovado, problemas_criticos, score_medio)
        }

    def _recomendar_acao(self, aprovado: bool, criticos: List, score: float) -> str:
        """Recomenda próxima ação"""
        if not aprovado and criticos:
            return f"BLOQUEADO: Corrigir {len(criticos)} problema(s) crítico(s)"
        elif not aprovado:
            return f"Melhorar score de {score:.2f} para {self.score_minimo_publicacao:.2f}"
        elif score < 0.9:
            return "Aprovado, mas há espaço para melhorias"
        else:
            return "Excelente qualidade, aprovado para publicação"

    def executar_checklist(self, tipo_saida: str, output: Dict) -> Dict:
        """Executa checklist específico"""
        checklist = self.checklists.get(tipo_saida, [])
        if not checklist:
            return {"erro": f"Checklist '{tipo_saida}' não encontrado"}

        resultados = []
        for item in checklist:
            # Verifica se item está presente/válido no output
            check_passou = item.lower().replace(" ", "_") in str(output).lower()
            resultados.append({
                "item": item,
                "status": "OK" if check_passou else "PENDENTE"
            })

        total_ok = len([r for r in resultados if r["status"] == "OK"])

        return {
            "tipo": tipo_saida,
            "total_itens": len(checklist),
            "concluidos": total_ok,
            "percentual": (total_ok / len(checklist)) * 100 if checklist else 0,
            "detalhes": resultados
        }

# Funções de validação
def validar_clareza_mensagem(output: Dict) -> Dict:
    """Mensagem deve ser clara"""
    texto = output.get("texto", "")
    palavras = texto.split()

    # Métricas de clareza
    palavras_complexas = len([p for p in palavras if len(p) > 12])
    frases = texto.split(".")
    tamanho_medio_frase = len(palavras) / len(frases) if frases else 0

    # Score: penaliza complexidade excessiva
    score = 1.0
    if palavras_complexas > len(palavras) * 0.2:
        score -= 0.3
    if tamanho_medio_frase > 20:
        score -= 0.2

    return {
        "score": max(0, score),
        "detalhes": f"{palavras_complexas} palavras complexas, média {tamanho_medio_frase:.1f} palavras/frase"
    }

def validar_conversao_esperada(output: Dict) -> Dict:
    """Elementos de conversão presentes"""
    elementos = output.get("elementos", [])
    elementos_essenciais = {"headline", "cta", "beneficios", "prova_social"}
    presentes = set(elementos) & elementos_essenciais

    score = len(presentes) / len(elementos_essenciais)

    return {
        "score": score,
        "detalhes": f"{len(presentes)}/4 elementos essenciais presentes"
    }

def validar_etica(output: Dict) -> Dict:
    """Não usa táticas antiéticas"""
    texto = output.get("texto", "").lower()
    palavras_proibidas = ["garantido", "milagre", "segredo", "hack"]
    violacoes = [p for p in palavras_proibidas if p in texto]

    score = 1.0 if not violacoes else 0.0

    return {
        "score": score,
        "detalhes": f"Violações éticas: {violacoes}" if violacoes else "Ética OK"
    }

# Exemplo prático
auditoria_copywriter = SistemaAuditoriaInterna(
    criterios=[
        CriterioAuditoria(
            nome="Clareza da Mensagem",
            descricao="Texto deve ser claro e direto",
            funcao_validacao=validar_clareza_mensagem,
            severidade=NivelSeveridade.ALTO,
            score_minimo=0.7
        ),
        CriterioAuditoria(
            nome="Elementos de Conversão",
            descricao="Deve ter headline, CTA, benefícios e prova social",
            funcao_validacao=validar_conversao_esperada,
            severidade=NivelSeveridade.CRITICO,
            score_minimo=0.75
        ),
        CriterioAuditoria(
            nome="Ética e Transparência",
            descricao="Não usa promessas falsas ou manipulação",
            funcao_validacao=validar_etica,
            severidade=NivelSeveridade.CRITICO,
            score_minimo=1.0
        )
    ],
    score_minimo_publicacao=0.8,
    checklists={
        "pagina_vendas": [
            "Headline impactante",
            "Subheadline explicativa",
            "Benefícios claros (mínimo 3)",
            "Prova social (depoimentos)",
            "CTA visível e claro",
            "Garantia explícita",
            "FAQ respondendo objeções"
        ]
    }
)

# Testa auditoria
output_teste = {
    "texto": "Aprenda Python em 30 dias. Curso completo com projetos reais. Mais de 1000 alunos aprovam.",
    "elementos": ["headline", "cta", "beneficios", "prova_social"]
}

resultado = auditoria_copywriter.auditar_saida(output_teste)
print(f"Auditoria: {resultado['acao_recomendada']}")
print(f"Score: {resultado['score_geral']:.2f}")
print(f"Problemas críticos: {resultado['problemas_criticos']}")

checklist = auditoria_copywriter.executar_checklist("pagina_vendas", output_teste)
print(f"\nChecklist: {checklist['concluidos']}/{checklist['total_itens']} ({checklist['percentual']:.0f}%)")
```

### 8. Modo de Falha e Recuperação

**Como detecta problemas e se recupera.**

```python
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Callable
from enum import Enum
from datetime import datetime

class TipoFalha(Enum):
    ENTRADA_INVALIDA = "dados de entrada incorretos"
    TIMEOUT = "operação excedeu tempo limite"
    RECURSO_INDISPONIVEL = "dependência não disponível"
    QUALIDADE_BAIXA = "saída abaixo do padrão"
    ERRO_LOGICA = "erro na execução"

class EstrategiaRecuperacao(Enum):
    RETRY = "tentar novamente"
    FALLBACK = "usar alternativa"
    DEGRADACAO = "modo degradado"
    ESCALACAO = "pedir ajuda humana"
    ABORT = "cancelar operação"

@dataclass
class PlanoRecuperacao:
    """Define como lidar com cada tipo de falha"""
    tipo_falha: TipoFalha
    estrategia: EstrategiaRecuperacao
    max_tentativas: int
    timeout_retry: int  # segundos
    acao_fallback: Optional[Callable]
    condicao_escalacao: Callable

@dataclass
class SistemaFalhaRecuperacao:
    """Sistema completo de detecção e recuperação"""
    planos_recuperacao: Dict[TipoFalha, PlanoRecuperacao]
    historico_falhas: List[Dict] = field(default_factory=list)
    modo_degradado: bool = False

    def detectar_e_recuperar(self, operacao: Callable, contexto: Dict) -> Dict:
        """Executa operação com detecção e recuperação automática"""
        tentativas = 0
        max_tentativas = 3
        ultima_falha = None

        while tentativas < max_tentativas:
            try:
                # Tenta executar operação
                resultado = operacao(contexto)

                # Valida qualidade
                if not self._validar_qualidade(resultado):
                    raise Exception("Qualidade abaixo do padrão")

                # Sucesso!
                if tentativas > 0:
                    self._registrar_recuperacao_sucesso(ultima_falha, tentativas)

                return {
                    "sucesso": True,
                    "resultado": resultado,
                    "tentativas": tentativas + 1,
                    "modo_degradado": self.modo_degradado
                }

            except Exception as e:
                tentativas += 1
                tipo_falha = self._classificar_falha(e)
                ultima_falha = tipo_falha

                self._registrar_falha(tipo_falha, contexto, str(e))

                # Tenta recuperar
                if tentativas < max_tentativas:
                    recuperado = self._tentar_recuperacao(tipo_falha, contexto, tentativas)
                    if not recuperado:
                        break
                else:
                    # Esgotou tentativas
                    return self._lidar_com_falha_final(tipo_falha, contexto)

        return {
            "sucesso": False,
            "erro": "Não foi possível recuperar",
            "tentativas": tentativas,
            "ultima_falha": ultima_falha.value if ultima_falha else "desconhecida"
        }

    def _classificar_falha(self, erro: Exception) -> TipoFalha:
        """Classifica tipo de falha"""
        msg_erro = str(erro).lower()
        if "timeout" in msg_erro:
            return TipoFalha.TIMEOUT
        elif "qualidade" in msg_erro:
            return TipoFalha.QUALIDADE_BAIXA
        elif "indisponível" in msg_erro:
            return TipoFalha.RECURSO_INDISPONIVEL
        elif "inválido" in msg_erro:
            return TipoFalha.ENTRADA_INVALIDA
        else:
            return TipoFalha.ERRO_LOGICA

    def _tentar_recuperacao(self, tipo_falha: TipoFalha, contexto: Dict, tentativa: int) -> bool:
        """Tenta recuperar da falha"""
        plano = self.planos_recuperacao.get(tipo_falha)
        if not plano:
            return False

        if plano.estrategia == EstrategiaRecuperacao.RETRY:
            # Aguarda antes de tentar novamente
            return True

        elif plano.estrategia == EstrategiaRecuperacao.FALLBACK:
            if plano.acao_fallback:
                plano.acao_fallback(contexto)
            return True

        elif plano.estrategia == EstrategiaRecuperacao.DEGRADACAO:
            self.modo_degradado = True
            return True

        elif plano.estrategia == EstrategiaRecuperacao.ESCALACAO:
            if plano.condicao_escalacao(contexto, tentativa):
                self._escalar_para_humano(tipo_falha, contexto)
            return False

        else:  # ABORT
            return False

    def _validar_qualidade(self, resultado: Any) -> bool:
        """Valida se resultado tem qualidade mínima"""
        if isinstance(resultado, dict):
            return resultado.get("score", 0) >= 0.7
        return True

    def _registrar_falha(self, tipo: TipoFalha, contexto: Dict, erro: str):
        """Registra falha no histórico"""
        self.historico_falhas.append({
            "timestamp": datetime.now().isoformat(),
            "tipo": tipo.value,
            "contexto": contexto,
            "erro": erro
        })

    def _registrar_recuperacao_sucesso(self, tipo_falha: TipoFalha, tentativas: int):
        """Registra recuperação bem-sucedida"""
        if self.historico_falhas:
            self.historico_falhas[-1]["recuperado"] = True
            self.historico_falhas[-1]["tentativas_ate_sucesso"] = tentativas

    def _lidar_com_falha_final(self, tipo_falha: TipoFalha, contexto: Dict) -> Dict:
        """Lida com falha após esgotar tentativas"""
        plano = self.planos_recuperacao.get(tipo_falha)

        if plano and plano.estrategia == EstrategiaRecuperacao.ESCALACAO:
            return {
                "sucesso": False,
                "acao": "escalado_para_humano",
                "tipo_falha": tipo_falha.value,
                "contexto": contexto
            }

        return {
            "sucesso": False,
            "acao": "operacao_cancelada",
            "tipo_falha": tipo_falha.value
        }

    def _escalar_para_humano(self, tipo_falha: TipoFalha, contexto: Dict):
        """Escala problema para supervisão humana"""
        print(f"🚨 ESCALAÇÃO: {tipo_falha.value}")
        print(f"Contexto: {contexto}")

    def gerar_relatorio_saude(self) -> Dict:
        """Gera relatório de saúde do agente"""
        total_falhas = len(self.historico_falhas)
        recuperadas = len([f for f in self.historico_falhas if f.get("recuperado")])

        falhas_por_tipo = {}
        for falha in self.historico_falhas:
            tipo = falha["tipo"]
            falhas_por_tipo[tipo] = falhas_por_tipo.get(tipo, 0) + 1

        return {
            "total_falhas": total_falhas,
            "recuperacoes_sucesso": recuperadas,
            "taxa_recuperacao": (recuperadas / total_falhas * 100) if total_falhas > 0 else 100,
            "modo_degradado": self.modo_degradado,
            "falhas_por_tipo": falhas_por_tipo,
            "saude_geral": "boa" if total_falhas < 5 else "requer_atencao"
        }

# Exemplo prático
sistema_recuperacao = SistemaFalhaRecuperacao(
    planos_recuperacao={
        TipoFalha.TIMEOUT: PlanoRecuperacao(
            tipo_falha=TipoFalha.TIMEOUT,
            estrategia=EstrategiaRecuperacao.RETRY,
            max_tentativas=3,
            timeout_retry=5,
            acao_fallback=None,
            condicao_escalacao=lambda ctx, t: t > 3
        ),
        TipoFalha.QUALIDADE_BAIXA: PlanoRecuperacao(
            tipo_falha=TipoFalha.QUALIDADE_BAIXA,
            estrategia=EstrategiaRecuperacao.RETRY,
            max_tentativas=2,
            timeout_retry=0,
            acao_fallback=lambda ctx: ctx.update({"modo_simples": True}),
            condicao_escalacao=lambda ctx, t: t > 2
        ),
        TipoFalha.RECURSO_INDISPONIVEL: PlanoRecuperacao(
            tipo_falha=TipoFalha.RECURSO_INDISPONIVEL,
            estrategia=EstrategiaRecuperacao.DEGRADACAO,
            max_tentativas=1,
            timeout_retry=0,
            acao_fallback=None,
            condicao_escalacao=lambda ctx, t: True
        )
    }
)

# Simula operação com falha e recuperação
def operacao_copy_instavel(contexto: Dict) -> Dict:
    """Simula criação de copy que pode falhar"""
    import random
    if random.random() < 0.3:  # 30% chance de sucesso
        return {"texto": "Copy criado", "score": 0.85}
    raise Exception("Qualidade abaixo do padrão")

resultado = sistema_recuperacao.detectar_e_recuperar(
    operacao_copy_instavel,
    {"produto": "Curso Python", "publico": "iniciantes"}
)

print(f"Resultado: {resultado}")
print(f"\nSaúde do sistema: {sistema_recuperacao.gerar_relatorio_saude()}")
```

## Conclusão: O Checklist do Agente Completo

Antes de publicar um agente em produção, valide os 8 componentes:

✅ **Missão Funcional** - Sabe exatamente o que faz e por quê
✅ **Intenção Estratégica** - Tem objetivos de médio prazo claros
✅ **Domínio de Responsabilidade** - Sabe onde atua e onde não atua
✅ **Limites Claros** - Conhece suas cercas de segurança
✅ **Plano de Raciocínio** - Pensa de forma estruturada e explicável
✅ **Protocolos de Comunicação** - Sabe como se comunicar com todos
✅ **Auditoria Interna** - Valida qualidade da própria saída
✅ **Recuperação de Falhas** - Sabe detectar e corrigir problemas

**Isso é padrão 2026.**

---

**© 2025 FEI - Formação em Engenharia de Intenção**
