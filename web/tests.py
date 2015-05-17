# -*- coding: utf-8 -*-

# Django Modules
from django.test import TestCase
from django.test.client import Client
from django.core.urlresolvers import reverse

# App Modules


class RankerTest(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = 'andres-root'

    def test_get_user_data(self):
        response = self.client.get(reverse('', kwargs={'pk': self.project.id}))

