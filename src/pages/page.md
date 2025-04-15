
# Bem vindo ao Webview-docs-mdx

---

## Como utilizar

Clique em alguma tag a sua esquerda para mostrar todas as notas
relacionadas a esta tag.

## O que eu preciso para utilizar?

Ter um backend que irá armazenar suas anotações no formato MDX (Veja mais sobre segurança).
Não há nenhuma tecnologia específica, contanto que você crie os endpoints corretamente e 
entre o conteúdo, ele será convertido para algo legível (texto).

No futuro irei disponibilizar um backend genérico para tornar mais fácil a implementação do 
seu próprio backend. De antemão, será um backend utilizando Bun como runtime e SQLite

## Segurança:

Se você não confia no banco de dados que está armazenando suas anotações, não utilize ele.
As notas aqui são apenas lidas no formato MDX, que é uma mistura de Markdown com JSX. 

Como é possível utilizar JSX dentro do MDX, é possível que contenha código malicioso de 
terceiros. O mas recomendado é você ter seu próprio banco de dados em sua Máquina, e 
controlar suas notas você mesmo para não haver problemas de segurança.

## Estou com problemas, o que posso fazer? 

Você pode se dirigir ao Github do projeto e abrir uma issue sobre o seu problema.