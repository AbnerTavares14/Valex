<p align="center">

  <h3 align="center">
    Valex
  </h3>
</p>


API:

```
- POST /card/:apiKey
    - Rota para criar um cartão de benefício
    - headers: {}
    - body: {
        "type": "health",
        employeeID: 1
    }
- POST /card/activate
    - Rota para ativar o cartão
    - headers: {}
    - body: {
    "id": "1",
    "password": "1234",
    "cvv": "123"
    }
- POST /payment
    - Rota para fazer um pagamento com o cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "1234",
        "businessId": 1,
        "amount": 100
    }
- POST /recharge
    - Rota para fazer uma recarga no cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "amount": 100,
        "apiKey": "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0"
    }
- GET /card/:id
    - Rota para mostrar o saldo, as transações e as recargas feitas no cartão
    - headers: {}
    - body: {}
- PUT /block
    - Rota para bloquear um cartão
    - headers: 
    - body: {
        "id": 1,
        "password":"1234"
    }
- PUT /unlock
    - Rota para desbloquear um cartão
    - headers: 
    - body: {
        "id": 1,
        "password":"1234"
    }    
```
