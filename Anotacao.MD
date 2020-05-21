# Testes automatizados

Procuram fazer com que a nossa aplicadação continue funcionando independente do número de novas funcionalidades e do número de devs no time.

1. Testes unitários (TDD)
Testam funcionalidades específicas da nossa aplicação (precisam ser funções puras).
Jamais podem ter chamadas à API e não produzem efeito colateral.
Sempre retornam o mesmo resultado quando são passados os mesmos parametros.

2. Testes de integração
Testam uma funcionalidade completa, passando por várias camadas da aplicação.
Route -> Controller -> Serviço -> Repositório -> ...

3. Testes E2E
Testes que simulam a ação do usuário dentro da aplicação (Mais voltado ao frontend)
Seguem o fluxo da aplicação (Exemplo Selinum Driver do Java)
1.Clique no input de email
2.Preencha xxxx@yyy.com.br
3.Clique no input de senha
4.Preencha 2sswwsss
5.Clique no botão "Logar"
6.Espero que seja carregada a página dashboard

==================

# TDD (Test Driven Development)

- Quando usuário se cadastra na aplicação, ele deve receber um email de boas vindas
