from django.shortcuts import render
from custom.decorators import json_response


def index(request):
    context = {}
    return render(request, 'web/index.html', context)


@json_response
def rank_user(request):
    context = {}
    return context
