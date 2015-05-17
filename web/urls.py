from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^user/(?P<username>.*)/$', views.get_user_data, name='get_user_data'),
]
