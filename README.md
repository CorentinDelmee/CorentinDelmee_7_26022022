# API de publication

Routes : 

api/publications/

La requête POST de création de message attend un objet du frontend :

```
  post = {
    user_id : {
        type: Number,
        required: true,
    }
    content : {
        type: String,
        required: true,
        maxLenght: 500,
    }
  }
```
