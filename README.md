# HW2

## Framework
- Frontend: React (dir: react_frontend)
- Backend: Django (dir: `hw_project` for backend router, `ntulost` for data model)
- Database: PostgreSQL 

## Backend Key File
- `ntulost/models.py` Data model design
- `ntulost/serializers.py` convert data model to JSON
- `ntulost/view.py` display JSON api: http://localhost:8000/api/orders/

## Frontend Key File
- `react_frontend/src/index.js` root page
- Components structure
    - first_page (OrderListContainer)
        - OrderList
            - OrderRow
    - second_page (OrderDetail)

## Migrate model to your PostgreSQL
```
(cd to NTU_Lost)
python manage.py makemigrations ntulost
python manage.py migrate
```

## Referance
- [django-and-react tutorial](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)

- [React.js tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-create-react-app)

- [Django tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Generic_views)



