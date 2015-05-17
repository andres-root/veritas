# -*- coding: utf-8 -*-

# Django Modules
from django.shortcuts import render
from custom.decorators import json_response

# App Modules
from ranker.core import user_data


def index(request):
    context = {}
    return render(request, 'web/index.html', context)


@json_response
def get_user_data(request, username):
    data = user_data(username)
    return data


@json_response
def rank_user(request):
    context = {}
    return context
