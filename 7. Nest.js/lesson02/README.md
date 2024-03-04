*First run the docker daemon* 


- If you want to migrate `npx prisma migrate dev`


```bash

yarn db:dev:restart

npx prisma studio

yarn start:dev

yarn test:e2e  
```

- Run `yarn db:dev:restart` to restart the database and migrate the database to our dev database.

- Run `npx prisma studio` to check the database.

- Run `yarn start:dev` to start the server.

- Run `yarn test:e2e` to run the tests. 
