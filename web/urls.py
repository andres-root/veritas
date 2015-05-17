from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^user/(?P<username>.*)/$', views.get_user_data, name='get_user_data'),
    url(r'^user/(?P<username>.*)/repos/$', views.get_user_repos, name='get_user_repos'),    
]
