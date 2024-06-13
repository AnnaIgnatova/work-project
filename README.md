# Практика по ИПР - GitHub Users

## Запуск приложения
1. Склонируйте проект командой `git clone https://github.com/AnnaIgnatova/work-project.git`
2. Создайте токен для работы GitHub API
   для этого нужно перейти в настройки профиля, далее выбрать Developer Settings -> Personal access tokens -> Fine-grained tokens
   здесь нужно создать токен для дальнейшей работы с GitHub API.
3. Добавьте токен в проект
   после создания токена, необходимо добавить его в проект `src\api\octokit`

   `export const octokit = new Octokit({
     auth: "your token",
   });`
4. Установите необходимые зависимости с помощью команды `npm install`
5. Запустите проект с помощью команды `npm run dev`

## Сборка приложения

для сборки проекта необходимо запустить команду `npm run build`

## Покрытие тестами

для проверки покрытия тестами необходимо запустить команду `npm run coverage`

## Демо приложения
1. страница пользователей
![image](https://github.com/AnnaIgnatova/work-project/assets/61065956/a3815c1e-f566-4c2b-b215-86b2d58e3cb0)

2. страница пользователя
![image](https://github.com/AnnaIgnatova/work-project/assets/61065956/b8a619d3-ac3b-474c-9b8b-b8a0a644011e)
