# Módulo 2: Engenharia de Intenção Aplicada a Agentes

**Nível 3A - Agentes e Sistemas Autônomos**

---

## Introdução

Criar um agente não é simplesmente dizer "você é um pesquisador" ou "atue como analista". Agentes modernos precisam de uma **estrutura clara de intenção** que define:

- **O que** ele deve alcançar
- **Como** ele deve pensar
- **Quando** deve agir ou perguntar
- **Onde** estão seus limites

**O que você vai dominar neste módulo:**
- Os 8 elementos fundamentais para criar agentes orientados por intenção
- Como definir o papel, missão, critérios de qualidade e limites de cada agente
- Como garantir que agentes ajam de forma previsível e confiável

---

## Os 8 Elementos que Cada Agente Precisa

### 1. Objetivo Primário

**O que é:** A razão de existir do agente. O resultado final que ele deve entregar.

**Exemplos:**
- **Agente Pesquisador:** "Encontrar informações relevantes, confiáveis e atualizadas sobre um tópico específico."
- **Agente Escritor:** "Transformar informações em conteúdo claro, engajante e estruturado."
- **Agente Analista:** "Processar dados e identificar insights acionáveis."

**Por que importa:** Sem objetivo claro, o agente não sabe o que priorizar e pode produzir resultados irrelevantes.

---

### 2. Intenção (Papel Funcional no Sistema)

**O que é:** O papel que o agente desempenha dentro de um sistema maior. Como ele contribui para o objetivo geral.

**Exemplos:**
- **Agente Pesquisador:** "Você é o responsável por alimentar o sistema com dados de qualidade. Outros agentes dependem da precisão da sua pesquisa."
- **Agente Revisor:** "Você é o filtro de qualidade. Valide se o conteúdo está alinhado aos critérios antes de prosseguir."
- **Agente Coordenador:** "Você organiza o trabalho dos outros agentes e garante que tudo flua de forma eficiente."

**Por que importa:** A intenção define como o agente colabora com outros agentes e toma decisões contextuais.

---

### 3. Critérios de Qualidade

**O que é:** Padrões mensuráveis que definem quando o trabalho do agente está completo e correto.

**Exemplos:**

**Para Agente Pesquisador:**
- Fontes devem ser de 2023-2025
- Mínimo 5 fontes confiáveis
- Incluir dados quantitativos quando possível

**Para Agente Escritor:**
- Parágrafos com 3-5 frases
- Tom profissional e acessível
- Exemplos práticos em cada seção

**Para Agente Analista:**
- Insights devem ser acionáveis
- Apresentar dados em gráficos quando relevante
- Conclusões baseadas em evidências

**Por que importa:** Critérios objetivos impedem que o agente entregue trabalho incompleto ou fora do padrão.

---

### 4. Contexto Funcional

**O que é:** Informações que o agente precisa saber sobre o ambiente, usuário ou projeto para tomar decisões corretas.

**Exemplos:**
- **Contexto de Usuário:** "O usuário é um empreendedor que prefere comunicação direta e objetiva."
- **Contexto de Projeto:** "Este projeto é urgente - priorize velocidade sobre detalhes secundários."
- **Contexto de Indústria:** "O público-alvo é da área de tecnologia - use termos técnicos sem medo."

**Por que importa:** Sem contexto, o agente pode fazer suposições erradas e entregar resultados que não se encaixam na necessidade real.

---

### 5. Responsabilidades Claras

**O que é:** Lista explícita do que o agente DEVE fazer e o que está FORA do seu escopo.

**Exemplo - Agente Pesquisador:**

**RESPONSÁVEL POR:**
- Buscar fontes confiáveis
- Validar atualidade dos dados
- Organizar informações por relevância
- Citar fontes corretamente

**NÃO É RESPONSÁVEL POR:**
- Escrever o conteúdo final
- Formatar documentos
- Decidir estrutura do projeto
- Validar com o cliente final

**Por que importa:** Evita que agentes tentem fazer mais do que devem, ou que deixem lacunas por achar que "não é comigo".

---

### 6. Limites de Atuação

**O que é:** Restrições explícitas que impedem o agente de sair do controle ou tomar decisões arriscadas.

**Exemplos:**
- **Limite de Autonomia:** "Se encontrar informações conflitantes, SEMPRE pergunte ao usuário qual fonte priorizar."
- **Limite de Tempo:** "Pesquise por no máximo 15 minutos. Se não encontrar dados suficientes, informe ao usuário."
- **Limite de Custo:** "Use apenas ferramentas gratuitas. Nunca sugira serviços pagos sem autorização."
- **Limite de Privacidade:** "Nunca busque ou armazene informações pessoais de terceiros sem consentimento."

**Por que importa:** Limites garantem que o agente opere de forma segura e previsível, sem causar problemas inesperados.

---

### 7. Formatos de Saída Padrão

**O que é:** Estrutura padronizada para as entregas do agente, facilitando integração com outros agentes ou sistemas.

**Exemplo - Agente Pesquisador:**

```markdown
## Resultado da Pesquisa

**Tópico:** [nome do tópico]
**Data da Pesquisa:** [data]

### Principais Descobertas
1. [Descoberta 1]
2. [Descoberta 2]
3. [Descoberta 3]

### Fontes Consultadas
- [Fonte 1 - Link - Data]
- [Fonte 2 - Link - Data]
- [Fonte 3 - Link - Data]

### Insights Chave
- [Insight 1]
- [Insight 2]

### Próximos Passos Sugeridos
[O que fazer com essas informações]
```

**Por que importa:** Formatos padronizados tornam as saídas previsíveis, facilitando automação e integração entre agentes.

---

### 8. Protocolos de Colaboração com Outros Agentes

**O que é:** Regras de como o agente interage com outros agentes em um sistema multiagente.

**Exemplos:**
- **Delegação:** "Ao finalizar a pesquisa, passe o resultado para o Agente Escritor usando o formato padrão."
- **Validação:** "Antes de entregar ao usuário, envie o conteúdo para o Agente Revisor validar."
- **Escalação:** "Se encontrar um problema que não pode resolver, notifique o Agente Coordenador imediatamente."
- **Feedback:** "Após receber feedback do Agente Revisor, ajuste o trabalho e reenvie."

**Por que importa:** Em sistemas multiagentes, a colaboração eficiente é crucial. Protocolos claros evitam gargalos e retrabalho.

---

## Template Completo: Criando um Agente com Engenharia de Intenção

Use este template como base para criar qualquer agente. Preencha cada seção com informações específicas do seu projeto:

```markdown
# AGENTE: [Nome do Agente]

## 1. OBJETIVO PRIMÁRIO
[Defina claramente o resultado final que este agente deve entregar]

## 2. INTENÇÃO (Papel Funcional)
[Explique qual o papel deste agente no sistema maior e como ele contribui]

## 3. CRITÉRIOS DE QUALIDADE
[Liste padrões mensuráveis que definem um trabalho bem feito]
- Critério 1: [descrição]
- Critério 2: [descrição]
- Critério 3: [descrição]

## 4. CONTEXTO FUNCIONAL
[Forneça informações importantes sobre o usuário, projeto ou ambiente]
- Usuário: [perfil do usuário]
- Projeto: [características do projeto]
- Restrições: [limitações a considerar]

## 5. RESPONSABILIDADES
### Você é RESPONSÁVEL por:
- [Responsabilidade 1]
- [Responsabilidade 2]
- [Responsabilidade 3]

### Você NÃO é responsável por:
- [Não-responsabilidade 1]
- [Não-responsabilidade 2]

## 6. LIMITES DE ATUAÇÃO
- Autonomia: [até onde pode decidir sozinho]
- Tempo: [limites de tempo]
- Recursos: [limites de ferramentas/custos]
- Privacidade: [restrições de dados]

## 7. FORMATO DE SAÍDA PADRÃO
[Estrutura que você SEMPRE deve usar nas entregas]

## 8. PROTOCOLOS DE COLABORAÇÃO
- Próxima etapa: [para qual agente passar o trabalho]
- Validação: [quem valida seu trabalho]
- Escalação: [quando e como pedir ajuda]
- Feedback: [como receber e aplicar feedback]

---

## INSTRUÇÕES DE OPERAÇÃO
[Passos que o agente deve seguir ao executar uma tarefa]

1. [Passo 1]
2. [Passo 2]
3. [Passo 3]
4. [Validar critérios de qualidade]
5. [Entregar no formato padrão]
```

---

## Exemplo Prático: Agente Pesquisador Completo

```markdown
# AGENTE: Pesquisador de Conteúdo

## 1. OBJETIVO PRIMÁRIO
Encontrar informações relevantes, atualizadas e confiáveis sobre tópicos específicos,
organizando-as de forma que possam ser facilmente utilizadas por outros agentes ou usuários.

## 2. INTENÇÃO (Papel Funcional)
Você é o primeiro agente no pipeline de criação de conteúdo. Sua pesquisa alimenta
o trabalho de todos os outros agentes. A qualidade do produto final depende diretamente
da precisão e profundidade da sua pesquisa.

## 3. CRITÉRIOS DE QUALIDADE
- Todas as fontes devem ser de 2023-2025 (máximo 2 anos)
- Mínimo de 5 fontes confiáveis e diversas
- Incluir dados quantitativos quando disponíveis
- Citar fontes com link e data de acesso
- Informações devem ser verificáveis

## 4. CONTEXTO FUNCIONAL
- Usuário: Criador de conteúdo educacional
- Projeto: Criar materiais didáticos para profissionais de tecnologia
- Restrições: Apenas fontes gratuitas e públicas

## 5. RESPONSABILIDADES
### Você é RESPONSÁVEL por:
- Buscar fontes confiáveis e atualizadas
- Validar veracidade das informações
- Organizar dados por relevância
- Identificar gaps de informação
- Citar todas as fontes corretamente

### Você NÃO é responsável por:
- Escrever o conteúdo final
- Formatar documentos
- Validar com o cliente final
- Decidir a estrutura do curso

## 6. LIMITES DE ATUAÇÃO
- Autonomia: Pode decidir quais fontes usar, mas deve informar quando encontrar
  informações conflitantes
- Tempo: Máximo 20 minutos por tópico. Se não encontrar dados suficientes,
  informe ao usuário
- Recursos: Apenas ferramentas gratuitas (Google, Wikipedia acadêmica,
  papers públicos)
- Privacidade: Nunca busque informações pessoais de terceiros

## 7. FORMATO DE SAÍDA PADRÃO

## RESULTADO DA PESQUISA

**Tópico:** [nome do tópico]
**Data da Pesquisa:** [data]
**Tempo Investido:** [minutos]

### PRINCIPAIS DESCOBERTAS
1. [Descoberta 1 - com fonte]
2. [Descoberta 2 - com fonte]
3. [Descoberta 3 - com fonte]

### FONTES CONSULTADAS
- [Título] - [URL] - Acessado em [data]

### INSIGHTS CHAVE
- [Insight acionável 1]
- [Insight acionável 2]

### GAPS IDENTIFICADOS
- [Informação que não foi encontrada]

### PRÓXIMOS PASSOS SUGERIDOS
[O que fazer com essas informações]

## 8. PROTOCOLOS DE COLABORAÇÃO
- Próxima etapa: Após finalizar, passe o resultado para o Agente Estruturador
- Validação: Não precisa de validação, mas informe se encontrou informações conflitantes
- Escalação: Se o tópico for muito técnico e não encontrar fontes confiáveis,
  notifique o Agente Coordenador
- Feedback: Se o Agente Escritor pedir mais informações, priorize essa pesquisa adicional

---

## INSTRUÇÕES DE OPERAÇÃO

1. Receba o tópico a ser pesquisado
2. Identifique 3-5 termos-chave relacionados
3. Busque em fontes confiáveis
4. Valide a data das informações (máximo 2 anos)
5. Organize as descobertas por relevância
6. Identifique gaps de informação
7. Formate a saída usando o template padrão
8. Envie para o próximo agente no pipeline
```

---

## Conclusão

Você dominou os 8 elementos fundamentais para criar agentes orientados por intenção. Agora você pode projetar agentes que são previsíveis, confiáveis e trabalham bem em equipe.

**O que você dominou:**
- Os 8 elementos essenciais de cada agente
- Como definir objetivo, intenção e critérios de qualidade
- Como estabelecer limites e responsabilidades claras
- Como criar formatos de saída padronizados
- Como configurar protocolos de colaboração entre agentes
- Template completo para criar qualquer agente

**Próximo passo:** No Módulo 3, você conhecerá 10 tipos de agentes especializados e quando usar cada um.

---

**FEI - Formação em Engenharia de Intenção**
*Nível 3A - Agentes e Sistemas Autônomos*
