# Node.js test application
To run the application, you have to create .env file at the **same level as the src directory** with such structure:  
```
host=localhost  
database_port=5432  
user=postgres  
password=12345  
database=testdb  
app_port=4000 
```
After that run **npm start** or **nodemon src/app.js**.
## Provided api for vendor, category and product:
* create
* get by id
* get all
* put
* delete
## Database visualisation:
![db](https://user-images.githubusercontent.com/46875481/96768673-c006a980-13e6-11eb-80f8-d11a44465928.PNG)

