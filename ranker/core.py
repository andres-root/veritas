# -*- coding: utf-8 -*-

from __future__ import unicode_literals
import json
import requests
import os
import math

git_user = os.environ.get('GIT_USER', '')
git_pass = os.environ.get('GIT_PASS', '')


def get_repo_by_name(user_name):
    # list_user_repos = []
    repos_url = "https://api.github.com/users/{0}/repos".format(user_name)

    response = requests.get(repos_url)
    repos_content = response.contents
    dictionary = json.loads(repos_content)

    url_repo = dictionary[1]["html_url"]
    repo_name = os.path.basename(url_repo)

    result = "https://api.github.com/repos/{0}/{1}/contents".format(
        user_name, repo_name)

    return result


def get_js_files(url):
    js_files_result = []

    response = requests.get(url)
    repo_content = response.content
    dictionary = json.loads(repo_content)

    for x in range(0, len(dictionary)-1):
        temp_file = dictionary[x]["download_url"]
    ext = os.path.splitext(temp_file)[1]

    if ext == '.js':
        js_files_result.append(temp_file)

    return js_files_result


def get_content_js_files(js_files_list):
    code_dictionary = {}

    for x in range(0, len(js_files_list)-1):
        url = js_files_list[x]
        response = requests.get(url)
        repo_content = response.content

        code_dictionary[url] = repo_content

    return code_dictionary


def popularity(user_name):
    # list_user_repos = []
    stars = ''
    repos_url = "https://api.github.com/users/{0}/repos".format(user_name)

    response = requests.get(repos_url)
    repos_content = response.contents
    dictionary = json.loads(repos_content)

    num_repos = len(dictionary)

    for x in range(0, num_repos - 1):
        stars += dictionary[x]["stargazers_count"]

    return stars + (1.0 - 1.0/num_repos)


def user_data(username):
    url = 'https://api.github.com/users/{0}'.format(username, auth=(git_user, git_pass))
    data = requests.get(url)
    return json.loads(data.content)


def user_repos(username):
    repos_url = "https://api.github.com/users/{0}/repos".format(username)
    data = requests.get(repos_url, auth=(git_user, git_pass))
    return json.loads(data.content)


def rank_repo(username):
    data = {}
    repo_url = "https://api.github.com/repos/{0}/{1}/contents".format(
        username, "jstest")

    repo_content = requests.get(repo_url, auth=(git_user, git_pass))
    parsed = json.loads(repo_content.content)
    errors = []
    a = []
    linesCount = 0
    for f in parsed:
        ext = os.path.splitext(f['name'])[1]
        if ext == '.js':                          
            errors.append(json.loads(requests.get('http://192.168.1.211:3000/code/', params={'code': requests.get( f['download_url'] ).content}).content))
            linesCount += len(requests.get( f['download_url'] ).content.splitlines())
    error_types = {}
    error_count = 0    
    for l in errors:
        for obj in l:
            error_count += 1

            if obj['ruleId'] not in error_types.keys():
                error_types[obj['ruleId']] = 1
            else:
                error_types[obj['ruleId']] += 1
    data['errorCount'] = error_count
    data['errorTypes'] = error_types    
    data['linesCount'] = linesCount    

    return data



def user_rank(username):
    
    languages_list = []
    languages = {}
    data = {}
    repos = user_repos(username)
    total_repos = len(repos)
    stargazers_count = 0

    for r in repos:
        stargazers_count += r["stargazers_count"]
        languages_list.append(json.loads(requests.get(r["languages_url"], auth=(git_user, git_pass)).content))

    for l in languages_list:
        if len(l) > 0:
            if l.keys()[0] not in languages.keys():
                languages[l.keys()[0]] = l.values()[0]
            else:
                languages[l.keys()[0]] += l.values()[0]

    data["stargazers_count"] = stargazers_count + (1.0 - 1.0/total_repos)
    data["languages"] = languages
    data['codeMetrics'] = rank_repo(username)    
    
    per_error = data['codeMetrics']['errorCount'] * 100 / data['codeMetrics']['linesCount']

    data['percentageBad'] = per_error

    return data

