from django.db import models
from django.utils import timezone
from usersapp.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=100)
    users = models.ManyToManyField(CustomUser, related_name='projects', default=1)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.name


class ToDoList(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True)
    created = models.DateField(default=timezone.now().strftime("%Y-%m-%d"))
    due_date = models.DateField(default=timezone.now().strftime("%Y-%m-%d"))
    project = models.ForeignKey(Project, on_delete=models.CASCADE, default=1)
    completed = models.BooleanField(default=False)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title
