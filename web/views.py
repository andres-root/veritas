# -*- coding: utf-8 -*-

# Django Modules
from django.shortcuts import render
from custom.decorators import json_response

# App Modules
from ranker.core import user_data, user_repos, user_rank



def index(request):
    context = {}
    return render(request, 'web/index.html', context)


@json_response
def get_user_data(request, username):
    data = user_data(username)
    return data


@json_response
def get_user_repos(request, username):
	data = user_repos(username)
	return data


@json_response
def rank_user(request, username):
	return user_rank(username)
    
