from django.apps import AppConfig
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class NtuLostConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ntulost'
