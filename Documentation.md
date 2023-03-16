## RUN BACKEND APP

Enter the folder with the application

`$ cd /path/to/app/`

Copy .env.example file to .env

`$ cp .env.example .env`

Install composer packages

`$ composer install`

Generate Application key

`$ php artisan key:generate`

In .env file add DB credentials according to your db setup

`DB_HOST=<HOST_NAME> DB_PORT=<PORT> DB_DATABASE=<DB_NAME> DB_USERNAME=<DB_USERNAME> DB_PASSWORD=<DB_PASSWORD>`

Run migrations and seeders

`$ php artisan migrate`

Run App

`$ php artisan serve`

Your Backend application is ready! - now run your frontend app






## RUN FRONTEND APP

Enter the folder with the application

`$ cd /path/to/app/`

Install node packages

`$ npm install`

Run App

`npm start`

Your Frontend application is ready! - register to login


