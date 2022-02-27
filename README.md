# API de publication

## Routes : 

### api/publications/

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
La requête GET récupère toutes les publications de la base de donnée

La requête PUT attend un objet post_modification :

```
  post_modify = {
    post_id : {
      type: Number,
      required: true,
    }
    content: {
      type: String,
      required: true,
      maxLenght: 500
    }
   }
```

La requête DELETE attend un objet post_delete :

```
  post_delete = {
    post_id : {
      type: Number,
      required: true
    }
  }
```
      
