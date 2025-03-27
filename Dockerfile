FROM node:22

# working directory in a container 
WORKDIR /app

#copy package.json to image  
COPY package.json .

#install dependencies 
# RUN npm install 

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi  


#copy all files 
COPY . ./

#environment variable
ENV PORT 3000

#documentation purpose
#shows server is running at port 3000 
EXPOSE 3000

#run command during container start
CMD ["npm", "run", "dev"]
