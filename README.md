# Laravel-Vue
### Coding Language: Laravel, Vue.js

- Laravel is backend
- Vue is fronted

### Instructions:
#### 1. Basic Laravel Authentication:
   - Implemented a login system for administrators.
#### 2. Database Seeding: 
   - Used Laravel's database seeders to create the initial administrator user with the
        following credentials:

        ■ Email: admin@admin.com 
        
        ■ Password: "password"
#### 3. CRUD Functionality:
   - Implemented CRUD operations (Create/Read/Update/Delete) for two menu items:
      Companies and Employees.
#### 4. Companies Table:
   - Created a "Companies" database table with the following fields:
      - Name (required)
      - Email
      - Logo (minimum size of 100x100)
      - Website
#### 5. Employees Table:
   - Created an "Employees" database table with the following fields:
      - First name (required)
      - Last name (required)
      - Company (foreign key referencing the "Companies" table)
      - Email
      - Phone
#### 6. Database Migrations:
   - Used Laravel's database migrations to create the schema for the "Companies" and
   "Employees" tables.
#### 7. Logo Storage:
   - Store the company logos in the storage/app/public folder.
   - Make the logos accessible from the public directory.
#### 8. Resource Controllers:
   - Utilized Laravel's resource controllers with default methods (index, create, store, etc.)
   for Companies and Employees.
#### 9. Validation:
   - Used Laravel's validation functions, preferably by utilizing Request classes.
#### 10. Pagination:
   - Implemented Laravel's pagination feature to display the Companies/Employees list with
    10 entries per page.
#### 11. Email Notification:
   -  Sent an email notification whenever a new company is entered.
    -  I have used Mailtrap for email testing.
#### 12. Front-end Implementation:
   - Build the front-end using Vue.js.
   - Utilize APIs to connect the backend with the frontend.