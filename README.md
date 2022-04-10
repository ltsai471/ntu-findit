# NTU LOST

## Function
- 功能A: SSOLogin
- 功能B: 註冊帳號 + ntu mail驗證
- 功能C-1: 主頁面搜尋功能_Map View
- 功能C-2: 主頁面搜尋功能_Board View
- 功能D: 個人資訊一覽
- 功能E: 遺失物申報
- 功能F: 拾獲案件刊登
- 功能G: 後台瀏覽失物面板
- 功能H: 學生證OCR辨識
- 功能I: 自動發信提醒領取
- 功能J: 聊天室
- 功能K: "你的遺失物"
- 功能L: "你的拾獲案件"

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


## Referance
- [django-and-react tutorial](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)

- [React.js tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-create-react-app)

- [Django tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Generic_views)



