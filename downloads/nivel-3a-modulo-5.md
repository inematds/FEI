# Módulo 5: Como Criar um Agente com Engenharia de Intenção

**Nível 3A - Agentes e Sistemas Autônomos**

---

## Introdução

Criar um agente eficaz não é apenas escrever "você é um assistente que...". É um processo estruturado que define **identidade, missão, limites e comportamentos** do agente.

Neste módulo, você aprenderá a **estrutura completa de 9 componentes** para criar agentes profissionais usando Engenharia de Intenção.

---

## Os 9 Componentes Essenciais de um Agente

1. Nome do Agente
2. Missão
3. Intenção
4. Limites
5. Processo Interno de Raciocínio
6. Protocolos de Validação
7. Ações Possíveis
8. Comunicação com o Usuário
9. Comunicação com Outros Agentes

---

## 1. Nome do Agente

O nome define a **identidade** e o **papel** do agente no sistema.

### Boas Práticas para Nomes
- **Seja descritivo:** O nome deve indicar a função (ex: "Agente Pesquisador de Mercado")
- **Use substantivos claros:** Evite nomes genéricos como "Helper" ou "Assistant"
- **Inclua especialidade:** "Agente Analista de SEO" é melhor que "Agente de Análise"
- **Mantenha consistência:** Use padrões em sistemas multiagentes

### Bons Exemplos
- Agente Pesquisador de Tendências de IA
- Agente Escritor de Conteúdo Educacional
- Agente Otimizador de Performance Web
- Agente Coordenador de Projetos

### Exemplos Ruins
- Helper Bot
- Assistant 1
- Agent X
- Smart AI

---

## 2. Missão

A missão define **o que o agente faz** e **qual problema ele resolve**.

### Estrutura de uma Boa Missão
```
[Verbo de ação] + [Objeto] + [Para quem/onde] + [Resultado esperado]
```

### Exemplos

**Agente Escritor:**
"Criar conteúdo escrito de alta qualidade sobre marketing digital para pequenas empresas, mantendo tom acessível e incluindo exemplos práticos acionáveis."

**Agente Analista:**
"Analisar dados de vendas e comportamento de usuários para identificar padrões, gerar insights acionáveis e recomendar estratégias de crescimento baseadas em evidência."

---

## 3. Intenção

A intenção define **por que o agente existe** e **qual valor ele entrega**.

### Missão vs Intenção

**Missão (O QUE):** Descreve a ação concreta que o agente realiza.

**Intenção (POR QUE):** Explica o propósito e o impacto desejado.

### Exemplos

**Agente Pesquisador:**
- **Missão:** "Buscar e sintetizar informações relevantes sobre tópicos específicos."
- **Intenção:** "Economizar tempo do usuário, fornecendo informação curada e confiável que permita tomar decisões informadas rapidamente, eliminando a necessidade de pesquisa manual extensa."

**Agente Otimizador:**
- **Missão:** "Analisar sistemas existentes e identificar oportunidades de melhoria."
- **Intenção:** "Maximizar eficiência e resultados dos processos do usuário, reduzindo desperdício de recursos e aumentando ROI através de ajustes baseados em dados."

---

## 4. Limites

Limites definem **o que o agente NÃO deve fazer** e **onde para sua responsabilidade**.

### Por que Limites são Críticos

Sem limites claros, agentes podem:
- Tentar resolver problemas fora de sua especialidade
- Fornecer informações incorretas com confiança
- Gastar recursos desnecessariamente
- Criar conflitos com outros agentes

### Tipos de Limites

**1. Limites de Escopo**
"Você analisa APENAS métricas de marketing digital. Não forneça análises financeiras ou operacionais."

**2. Limites de Ação**
"Você pode SUGERIR mudanças de código, mas nunca execute alterações sem aprovação explícita."

**3. Limites de Conhecimento**
"Se você não tem certeza sobre uma informação, SEMPRE indique incerteza e sugira fontes adicionais."

**4. Limites Éticos**
"Nunca sugira estratégias que envolvam desinformação, manipulação ou práticas antiéticas."

---

## 5. Processo Interno de Raciocínio

Define **como o agente pensa** antes de agir - seu framework mental.

### Estrutura de Raciocínio (Chain of Thought)

1. **Entender o Pedido:** O que exatamente o usuário quer? Qual é a intenção real?

2. **Identificar o que Falta:** Quais informações/ferramentas preciso para resolver isso?

3. **Planejar a Abordagem:** Qual a melhor sequência de ações para alcançar o resultado?

4. **Executar com Validação:** Realizar ações e validar qualidade em cada etapa.

5. **Revisar e Ajustar:** O resultado atende aos critérios? Se não, o que precisa melhorar?

---

## 6. Protocolos de Validação

Critérios objetivos para avaliar se o trabalho está completo e atende aos padrões de qualidade.

**Exemplo:** "Antes de entregar um artigo, valide: (1) Tem entre 1500-2000 palavras, (2) Inclui exemplos práticos, (3) Tom é consistente, (4) Sem erros gramaticais, (5) CTA claro no final."

---

## 7. Ações Possíveis

Lista clara das ferramentas e ações que o agente pode executar.

**Exemplo:** "Você pode: (1) Buscar na web, (2) Ler documentos PDF, (3) Executar análises de dados em Python, (4) Gerar visualizações, (5) Criar resumos estruturados."

---

## 8. Comunicação com o Usuário

Como o agente deve se comunicar: tom, formato, nível de detalhe.

**Exemplo:** "Use tom profissional mas acessível. Sempre explique seu raciocínio. Formate resultados em tópicos claros. Se houver incerteza, seja explícito sobre isso."

---

## 9. Comunicação com Outros Agentes

Como o agente interage com outros agentes no sistema multiagente.

**Exemplo:** "Ao receber tarefa do Coordenador, confirme entendimento e prazo estimado. Ao entregar para próximo agente, inclua contexto e critérios de qualidade esperados."

---

## Template Completo de Agente

```
# AGENTE: [Nome Descritivo do Agente]

## MISSÃO
[O que o agente faz - ação concreta e resultado esperado]

## INTENÇÃO
[Por que o agente existe - valor e impacto entregue]

## LIMITES
- Escopo: [O que está dentro/fora do escopo]
- Ações: [O que pode/não pode fazer]
- Conhecimento: [Como lidar com incertezas]
- Ética: [Princípios que não podem ser violados]

## PROCESSO DE RACIOCÍNIO
1. Entender o pedido e a intenção real
2. Identificar informações/ferramentas necessárias
3. Planejar sequência de ações
4. Executar com validação contínua
5. Revisar qualidade e ajustar se necessário

## PROTOCOLOS DE VALIDAÇÃO
Antes de entregar, verificar:
- [Critério 1]
- [Critério 2]
- [Critério 3]

## AÇÕES POSSÍVEIS
- [Ferramenta/Ação 1]
- [Ferramenta/Ação 2]
- [Ferramenta/Ação 3]

## COMUNICAÇÃO COM USUÁRIO
- Tom: [profissional/casual/técnico]
- Formato: [estruturado/narrativo/bullet points]
- Nível de detalhe: [resumido/detalhado/adaptativo]
- Transparência: [sempre explicar raciocínio/mostrar incertezas]

## COMUNICAÇÃO COM OUTROS AGENTES
- Ao receber: [Como confirmar entendimento]
- Ao entregar: [Que contexto incluir]
- Formato de dados: [Estrutura padrão de comunicação]
```

---

## Conclusão

Você dominou a estrutura completa de 9 componentes para criar agentes profissionais usando Engenharia de Intenção.

**O que você dominou:**
- Como definir nome e identidade clara
- Estrutura de missão e intenção
- Como estabelecer limites eficazes
- Framework de raciocínio interno
- Protocolos de validação e comunicação
- Template completo reutilizável

**Próximo passo:** No Módulo 6, você aplicará esses conceitos em 4 projetos práticos reais.

---

**FEI - Formação em Engenharia de Intenção**
*Nível 3A - Agentes e Sistemas Autônomos*
