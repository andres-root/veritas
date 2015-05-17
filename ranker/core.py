import json
import request
import os
      

def  get_repo_by_name(user_name):
   	   list_user_repos = []
       repos_url 	   = "https://api.github.com/users/{0}/repos".format(user_name)

       response        = requests.get(repos_url)
       repos_content   = response.contents
       dictionary      = json.loads(repos_content)

       url_repo		   = dictionary[1]["html_url"]
       repo_name 	   = os.path.basename(url_repo)

       result  		   = "https://api.github.com/repos/{0}/{1}/contents".format(user_name, repos_name)

       return result

 def  get_js_files(url='https://api.github.com/repos/andres-root/galleryjs/contents/js'):
      js_files_result = []

      response 	    = requests.get(url)
      repo_content  = response.content
      dictionary    = json.loads(repo_content)      

      for x in range(0, len(dictionary)-1):  
           temp_file = dictionary[x]["download_url"]
		   ext = os.path.splitext(temp_file)[1]

		     if ext == '.js'
		         js_files_result.append(temp_file)  

	  return js_files_result 


def  get_content_js_files(js_files_list):
	  code_dictionary = {}
      
      for x in range(0, len(js_files_list)-1):
      		url 			= js_files_list[x]
      		response 	    = requests.get(url)
      		repo_content    = response.content

      		code_dictionary[url] =  repo_content

      return code_dictionary

def popularity():
	list_user_repos = []
    repos_url 	    = "https://api.github.com/users/{0}/repos".format(user_name)

    response        = requests.get(repos_url)
    repos_content   = response.contents
    dictionary      = json.loads(repos_content)    

    num_repos 		= len(dictionary)

    for x in range(0, num_repos - 1):
    	stars		+= dictionary[x]["stargazers_count"]

    return stars + (1.0 - 1.0/num_repos)
