# Dev log

1. We created the react app called frontend with `npx create-react-app frontend` which is how you create a react app I guess.
2. The way react works is basically your index.html is as basic as possible and then you write react apps that render in the index.js file which then renders in the index.html via a DOM repaint
3. Then we cleaned up our stuff by deleting App.css and cleaning up App.js and deleting all the test file and css in index.css

## Creating react components

1. To create react components we create a file called components in frontend/src
2. It is in here we we can create components like headers and footers. We will be storing our pages in a file called screens later

## Adding bootstrap

1. We then `npm install react-boostrap` which is bascially bootstrap that react can use and then went onto bootswatch.com and downloaded some nice bootstrap css and put that in the public folder
2. Then we import the bootstrap things into the js files with `import { <components> } from 'react-bootstrap'`
3. We went to cdnjs.com and added the rel link for font awesome to our index.html which allows us to use cool icons in our text by using the class attribute in the tags
