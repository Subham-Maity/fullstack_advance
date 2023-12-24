- `npm start` or `yarn start`: Starts the server using `nodemon` which will automatically restart your server whenever changes are made to your `src/server.ts` file. This is typically used for local development.



- `npm run dev` or `yarn dev`: Deletes the `dist` directory and concurrently runs the `build:watch` and `start` scripts. This is used for development. It will recompile your TypeScript files into JavaScript whenever they change and restart your server to reflect these changes.



- `npm run start:dev` or `yarn start:dev`: Starts the server in development mode using `nodemon`. This will automatically restart your server whenever changes are made to your `src/server.ts` file.



- `npm run build` or `yarn build`: Deletes the `dist` directory and compiles your TypeScript files into JavaScript. This is typically run before starting your server in production.



- `npm run build:watch` or `yarn build:watch`: Runs the TypeScript compiler in watch mode. This means it will recompile your TypeScript files into JavaScript whenever they change.



- `npm run preserve` or `yarn preserve`: Runs the `build` script. This is a pre-hook for the `prod` script and ensures that your application is built before starting it in production.



- `npm run prod` or `yarn prod`: Concurrently runs the `build` and `start` scripts. This is typically used to start your server in a production environment.



- `npm run compile` or `yarn compile`: Compiles your TypeScript files into JavaScript using the TypeScript compiler.



- `npm run deploy` or `yarn deploy`: Starts your server using `nodemon`. This will automatically restart your server whenever changes are made to your `src/server.ts` file. This is typically used for local development.

