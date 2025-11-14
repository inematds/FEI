# Módulo 6: Sistemas Multiagentes (2026)

## Nível 4S - Sistemas Intencionais 2026

---

## Os Quatro Modelos que Dominam 2026

Em 2026, existem **4 arquiteturas fundamentais** para coordenar múltiplos agentes. Cada uma tem vantagens específicas e casos de uso ideais.

---

## Modelo 1: Pipeline Inteligente

**Conceito:** Cada agente passa para o próximo com validação interna. Processo sequencial otimizado.

**Quando usar:** Tarefas que têm dependências claras e sequenciais

**Implementação:**

```python
from dataclasses import dataclass
from typing import List, Dict, Callable
from datetime import datetime

@dataclass
class ResultadoPipeline:
    sucesso: bool
    dados: Dict
    validado: bool
    etapa: str
    timestamp: str

class AgentePipeline:
    """Agente base para pipelines"""

    def __init__(self, nome: str):
        self.nome = nome

    def executar(self, entrada: Dict) -> Result adoPipeline:
        # Processa entrada
        resultado = self._processar(entrada)

        # Valida saída
        validado = self._validar(resultado)

        return ResultadoPipeline(
            sucesso=validado,
            dados=resultado,
            validado=validado,
            etapa=self.nome,
            timestamp=datetime.now().isoformat()
        )

    def _processar(self, entrada: Dict) -> Dict:
        raise NotImplementedError

    def _validar(self, resultado: Dict) -> bool:
        raise NotImplementedError

class PipelineInteligente:
    """Orquestra agentes em sequência"""

    def __init__(self, nome: str):
        self.nome = nome
        self.agentes: List[AgentePipeline] = []
        self.historico_execucoes: List[Dict] = []

    def adicionar_agente(self, agente: AgentePipeline):
        """Adiciona agente ao pipeline"""
        self.agentes.append(agente)

    def executar(self, entrada_inicial: Dict) -> Dict:
        """Executa pipeline completo"""
        resultado_atual = entrada_inicial
        resultados_etapas = []

        for i, agente in enumerate(self.agentes):
            resultado = agente.executar(resultado_atual)
            resultados_etapas.append(resultado)

            if not resultado.sucesso:
                return {
                    "status": "falhou",
                    "etapa_falha": agente.nome,
                    "etapa_numero": i + 1,
                    "resultados_parciais": resultados_etapas
                }

            # Próximo agente recebe saída do anterior
            resultado_atual = resultado.dados

        self.historico_execucoes.append({
            "entrada": entrada_inicial,
            "saida": resultado_atual,
            "etapas": len(self.agentes),
            "timestamp": datetime.now().isoformat()
        })

        return {
            "status": "sucesso",
            "resultado_final": resultado_atual,
            "total_etapas": len(self.agentes),
            "resultados_detalhados": resultados_etapas
        }

# Agentes concretos
class AgentePesquisador(AgentePipeline):
    def _processar(self, entrada: Dict) -> Dict:
        return {
            **entrada,
            "fontes": ["fonte1", "fonte2", "fonte3"],
            "dados_pesquisados": "Dados sobre " + entrada.get("topico", "")
        }

    def _validar(self, resultado: Dict) -> bool:
        return "fontes" in resultado and len(resultado["fontes"]) > 0

class AgenteAnalisador(AgentePipeline):
    def _processar(self, entrada: Dict) -> Dict:
        return {
            **entrada,
            "insights": ["insight1", "insight2"],
            "analise_completa": True
        }

    def _validar(self, resultado: Dict) -> bool:
        return resultado.get("analise_completa", False)

class AgenteRedator(AgentePipeline):
    def _processar(self, entrada: Dict) -> Dict:
        return {
            **entrada,
            "conteudo": f"Artigo sobre {entrada.get('topico', '')} baseado em {len(entrada.get('insights', []))} insights"
        }

    def _validar(self, resultado: Dict) -> bool:
        return "conteudo" in resultado and len(resultado["conteudo"]) > 50

# Exemplo de uso
pipeline = PipelineInteligente("Criação de Conteúdo")
pipeline.adicionar_agente(AgentePesquisador("Pesquisa"))
pipeline.adicionar_agente(AgenteAnalisador("Análise"))
pipeline.adicionar_agente(AgenteRedator("Redação"))

resultado = pipeline.executar({"topico": "IA em 2026"})
print(f"Pipeline: {resultado['status']}")
print(f"Etapas: {resultado['total_etapas']}")
```

---

## Modelo 2: Força-Tarefa Paralela

**Conceito:** Agentes trabalham simultaneamente e depois integram resultados. Maximiza velocidade.

**Quando usar:** Tarefas independentes que podem ser paralelizadas

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Callable

class AgenteParalelo:
    """Agente que pode executar em paralelo"""

    def __init__(self, nome: str, funcao: Callable):
        self.nome = nome
        self.funcao = funcao

    def executar(self, entrada: Dict) -> Dict:
        resultado = self.funcao(entrada)
        return {
            "agente": self.nome,
            "resultado": resultado,
            "timestamp": datetime.now().isoformat()
        }

class ForcaTarefaParalela:
    """Executa múltiplos agentes em paralelo"""

    def __init__(self, max_workers: int = 5):
        self.agentes: List[AgenteParalelo] = []
        self.max_workers = max_workers

    def adicionar_agente(self, agente: AgenteParalelo):
        self.agentes.append(agente)

    def executar_paralelo(self, entrada: Dict) -> Dict:
        """Executa todos os agentes em paralelo"""
        resultados = []

        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submete todas as tarefas
            futures = {
                executor.submit(agente.executar, entrada): agente
                for agente in self.agentes
            }

            # Coleta resultados conforme completam
            for future in as_completed(futures):
                agente = futures[future]
                try:
                    resultado = future.result()
                    resultados.append(resultado)
                except Exception as e:
                    resultados.append({
                        "agente": agente.nome,
                        "erro": str(e),
                        "sucesso": False
                    })

        return {
            "status": "completo",
            "total_agentes": len(self.agentes),
            "resultados_individuais": resultados,
            "resultado_integrado": self._integrar_resultados(resultados)
        }

    def _integrar_resultados(self, resultados: List[Dict]) -> Dict:
        """Integra resultados de múltiplos agentes"""
        integrado = {
            "total_contribuicoes": len(resultados),
            "dados_consolidados": {}
        }

        for r in resultados:
            if "resultado" in r:
                integrado["dados_consolidados"][r["agente"]] = r["resultado"]

        return integrado

# Exemplo
forcaTarefa = ForcaTarefaParalela()

# Adiciona agentes que pesquisam tópicos diferentes
forcaTarefa.adicionar_agente(AgenteParalelo(
    "Pesquisador Tech",
    lambda x: {"topico": "Tecnologia", "fontes": 15}
))

forcaTarefa.adicionar_agente(AgenteParalelo(
    "Pesquisador Mercado",
    lambda x: {"topico": "Mercado", "tendencias": 8}
))

forcaTarefa.adicionar_agente(AgenteParalelo(
    "Pesquisador Educação",
    lambda x: {"topico": "Educação", "casos": 12}
))

resultado = forcaTarefa.executar_paralelo({"contexto": "IA 2026"})
print(f"Força-Tarefa: {resultado['total_agentes']} agentes executados em paralelo")
```

---

## Modelo 3: Hierarquia

**Conceito:** Agente "chefão" gerencia sub-agentes. Coordenação centralizada.

**Quando usar:** Projetos complexos que precisam de coordenação central

```python
class AgenteSubordinado:
    """Agente que responde a um supervisor"""

    def __init__(self, nome: str, especialidade: str):
        self.nome = nome
        self.especialidade = especialidade
        self.tarefas_completas = 0

    def executar_tarefa(self, tarefa: Dict) -> Dict:
        self.tarefas_completas += 1
        return {
            "agente": self.nome,
            "tarefa": tarefa,
            "status": "completo",
            "especialidade_utilizada": self.especialidade
        }

class AgenteSupervisor:
    """Agente supervisor que coordena subordinados"""

    def __init__(self, nome: str):
        self.nome = nome
        self.subordinados: Dict[str, AgenteSubordinado] = {}
        self.tarefas_delegadas = []

    def adicionar_subordinado(self, agente: AgenteSubordinado):
        self.subordinados[agente.nome] = agente

    def delegar_tarefa(self, tarefa: Dict, agente_nome: str) -> Dict:
        """Delega tarefa para subordinado específico"""
        if agente_nome not in self.subordinados:
            return {"erro": f"Agente {agente_nome} não encontrado"}

        agente = self.subordinados[agente_nome]
        resultado = agente.executar_tarefa(tarefa)

        self.tarefas_delegadas.append({
            "tarefa": tarefa,
            "agente": agente_nome,
            "resultado": resultado,
            "timestamp": datetime.now().isoformat()
        })

        return resultado

    def orquestrar_projeto(self, projeto: Dict) -> Dict:
        """Orquestra projeto completo distribuindo tarefas"""
        tarefas = projeto.get("tarefas", [])
        resultados = []

        for tarefa in tarefas:
            # Seleciona agente baseado em especialidade
            agente_selecionado = self._selecionar_agente(tarefa)

            if agente_selecionado:
                resultado = self.delegar_tarefa(tarefa, agente_selecionado.nome)
                resultados.append(resultado)

        return {
            "projeto": projeto.get("nome"),
            "total_tarefas": len(tarefas),
            "resultados": resultados,
            "supervisor": self.nome
        }

    def _selecionar_agente(self, tarefa: Dict) -> AgenteSubordinado:
        """Seleciona melhor agente para tarefa"""
        # Lógica simples: seleciona por especialidade
        especialidade_necessaria = tarefa.get("especialidade")

        for agente in self.subordinados.values():
            if agente.especialidade == especialidade_necessaria:
                return agente

        # Se não encontrar especialista, retorna primeiro disponível
        return list(self.subordinados.values())[0] if self.subordinados else None

# Exemplo
supervisor = AgenteSupervisor("Gerente de Projeto")

# Adiciona subordinados
supervisor.adicionar_subordinado(AgenteSubordinado("Dev Backend", "backend"))
supervisor.adicionar_subordinado(AgenteSubordinado("Dev Frontend", "frontend"))
supervisor.adicionar_subordinado(AgenteSubordinado("QA Engineer", "testes"))

# Executa projeto
projeto = {
    "nome": "Lançamento de App",
    "tarefas": [
        {"descricao": "API REST", "especialidade": "backend"},
        {"descricao": "Interface usuário", "especialidade": "frontend"},
        {"descricao": "Testes automatizados", "especialidade": "testes"}
    ]
}

resultado = supervisor.orquestrar_projeto(projeto)
print(f"Hierarquia: {resultado['total_tarefas']} tarefas delegadas")
```

---

## Modelo 4: Consciência Distribuída

**Conceito:** Todos os agentes acessam memória central e colaboram. Inteligência coletiva.

**Quando usar:** Problemas complexos que requerem colaboração dinâmica

```python
class MemoriaCentral:
    """Memória compartilhada entre agentes"""

    def __init__(self):
        self.conhecimento: Dict[str, Any] = {}
        self.historico_acessos: List[Dict] = []

    def armazenar(self, chave: str, valor: Any, agente: str):
        """Armazena conhecimento na memória central"""
        self.conhecimento[chave] = {
            "valor": valor,
            "atualizado_por": agente,
            "timestamp": datetime.now().isoformat()
        }

        self.historico_acessos.append({
            "acao": "armazenar",
            "chave": chave,
            "agente": agente,
            "timestamp": datetime.now().isoformat()
        })

    def recuperar(self, chave: str, agente: str) -> Any:
        """Recupera conhecimento da memória"""
        self.historico_acessos.append({
            "acao": "recuperar",
            "chave": chave,
            "agente": agente,
            "timestamp": datetime.now().isoformat()
        })

        if chave in self.conhecimento:
            return self.conhecimento[chave]["valor"]
        return None

    def listar_conhecimento_relevante(self, contexto: str) -> List[str]:
        """Lista conhecimento relevante para contexto"""
        relevante = []

        for chave, dados in self.conhecimento.items():
            if contexto.lower() in str(dados["valor"]).lower():
                relevante.append(chave)

        return relevante

class AgenteColaborativo:
    """Agente que colabora via memória compartilhada"""

    def __init__(self, nome: str, memoria_central: MemoriaCentral):
        self.nome = nome
        self.memoria = memoria_central
        self.contribuicoes = 0

    def contribuir(self, topico: str, contribuicao: Any):
        """Contribui conhecimento para memória central"""
        chave = f"{topico}_{self.nome}"
        self.memoria.armazenar(chave, contribuicao, self.nome)
        self.contribuicoes += 1

    def consultar(self, topico: str) -> List[Any]:
        """Consulta conhecimento de outros agentes"""
        chaves_relevantes = self.memoria.listar_conhecimento_relevante(topico)

        conhecimentos = []
        for chave in chaves_relevantes:
            valor = self.memoria.recuperar(chave, self.nome)
            if valor:
                conhecimentos.append(valor)

        return conhecimentos

    def trabalhar_colaborativamente(self, tarefa: str) -> Dict:
        """Trabalha em tarefa consultando conhecimento coletivo"""
        # Consulta o que outros agentes sabem
        conhecimento_existente = self.consultar(tarefa)

        # Processa com base no conhecimento coletivo
        resultado = f"Trabalho em {tarefa} baseado em {len(conhecimento_existente)} contribuições"

        # Contribui de volta
        self.contribuir(tarefa, {
            "agente": self.nome,
            "insight": resultado
        })

        return {
            "agente": self.nome,
            "tarefa": tarefa,
            "conhecimento_utilizado": len(conhecimento_existente),
            "contribuicao_feita": True
        }

class SistemaConscienciaDistribuida:
    """Sistema com consciência distribuída entre agentes"""

    def __init__(self):
        self.memoria = MemoriaCentral()
        self.agentes: List[AgenteColaborativo] = []

    def adicionar_agente(self, nome: str):
        agente = AgenteColaborativo(nome, self.memoria)
        self.agentes.append(agente)
        return agente

    def resolver_colaborativamente(self, problema: str) -> Dict:
        """Todos os agentes trabalham no problema"""
        resultados = []

        for agente in self.agentes:
            resultado = agente.trabalhar_colaborativamente(problema)
            resultados.append(resultado)

        return {
            "problema": problema,
            "agentes_colaboradores": len(self.agentes),
            "total_conhecimento": len(self.memoria.conhecimento),
            "resultados": resultados
        }

# Exemplo
sistema = SistemaConscienciaDistribuida()

# Adiciona agentes
a1 = sistema.adicionar_agente("Especialista IA")
a2 = sistema.adicionar_agente("Especialista Educação")
a3 = sistema.adicionar_agente("Especialista UX")

# Agentes contribuem conhecimento inicial
a1.contribuir("ia_educacao", {"topico": "Transformers", "impacto": "alto"})
a2.contribuir("ia_educacao", {"topico": "Aprendizado Adaptativo", "efetividade": 0.9})
a3.contribuir("ia_educacao", {"topico": "Interface Intuitiva", "importancia": "critica"})

# Sistema resolve problema colaborativamente
resultado = sistema.resolver_colaborativamente("ia_educacao")
print(f"Consciência Distribuída: {resultado['agentes_colaboradores']} agentes")
print(f"Conhecimento coletivo: {resultado['total_conhecimento']} itens")
```

---

## Comparação dos 4 Modelos

| Modelo | Velocidade | Complexidade | Autonomia | Uso Ideal |
|--------|-----------|--------------|-----------|-----------|
| Pipeline | Média | Baixa | Baixa | Processos sequenciais |
| Paralelo | Alta | Média | Média | Tarefas independentes |
| Hierarquia | Média | Alta | Média | Projetos complexos |
| Distribuído | Alta | Alta | Alta | Problemas adaptativos |

---

## Conclusão

Você dominou os 4 modelos fundamentais de sistemas multiagentes de 2026.

### O que você dominou:

✅ Pipeline Inteligente: coordenação sequencial com validação
✅ Força-Tarefa Paralela: execução simultânea e integração
✅ Hierarquia: coordenação centralizada com delegação
✅ Consciência Distribuída: colaboração via memória compartilhada
✅ Implementação completa de cada arquitetura em Python
✅ Quando usar cada modelo
✅ Vantagens e desvantagens de cada abordagem
✅ Como combinar modelos para sistemas híbridos

### Próximo módulo:

No Módulo 7, você vai aprender **Criação de Agentes com ESIA**: os 8 componentes essenciais que todo agente avançado de 2026 deve possuir.

---

**© 2025 FEI - Formação em Engenharia de Intenção**
