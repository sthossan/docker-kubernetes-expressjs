# Create Docker image

There are two method for create docker image.

## First method (default)

Create a file into the project root directory and given the file name **_Dockerfile_** without extension. Open dockerfile and write bellow the code.

```doc
WORKDIR /src/app
COPY package*.json ./
EXPOSE 3000

RUN npm ci
COPY . /src/app
CMD ["npm", "start"]
```

**Note :** copy destination must be same with **workdir**(**e.g.** COPY . <WORKDIR>)\
Now run bellow command step by step by using `docker CLI`

- buid with docker

```doc
docker build . -t <your docker username>/<app-name>:<tag>
```

OR

```doc
docker build . -t <app-name>:<tag>
```

- image run\
  -p flag redirects a public port to a private port inside the container\
  -d runs the container in detached mode, leaving the container running in the background

```doc
docker run -p 3001:3000 -d  <your docker username>/<app-name>:<tag>
```

OR

```doc
docker run --name <new image name> -d -p 3001:3000 <your docker username>/<app-name>:<tag>
```

OR

```doc
docker run --name <new image name> -d -p 3001:3000 <app-name>
```

## Second method (docker-compose)

Create a file into the project root directory and given the file name **_Dockerfile_** without extension. Open dockerfile and write bellow the code.

```doc
FROM node:14-alpine as base

WORKDIR /src/app
COPY package*.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "bin/www"]
```

Now create a file into the project root directory and given the file name **_docker-compose.yml_**. Open dockerfile and write bellow the code.

```doc
version: '3.8'
services:
  web:
    build:
      context: ./
      target: production
    volumes:
      - .:/src/app
    command: npm run start
    ports:
      - '3000:3000'
    environment:
      NODE_ENV: production
      DEBUG: nodejs-docker-express:*
```

Now run bellow command step by step by using `docker CLI` for method second.

- docker compose command\
  `docker-compose build`\
  `docker-compose up`
- doing frequent changes to Dockerfile for testing then use\
  `docker-compose up --build`
- This removes all volumes before starting the containers again with (docker-compose up).\
  `docker-compose down -v`

**Note :** Both method are need add .dockerignore file and open .dockerignore and write bellow the code.

```doc
.dockerignore
node_modules
npm-debug.log
Dockerfile
.git
.gitignore
.npmrc
```

#### Docker other command

- show docker image list\
  `docker images`
- get container ID\
  `docker ps`
- Remove the stopped container and all of the images including unused or dangling images, with the following command:\
  `docker system prune -a`
- print app output\
  `docker logs <container id>`

# kubernetes

There are many way for deploy docker image in the kubernetes container. But here I'm show you two method.

#### First method

- Create a deployment:\
  `kubectl create deployment --image <docker-username/docker-image-name> <new-alias-name>`

- Scale up to 3 replicas: \
  `kubectl scale deployment <new-alias-name> --replicas 3`

- Expose the deployment as a NodePort replica:\
  `kubectl expose deployment <new-alias-name> --type=NodePort --port 3001`

- Look at the newly created service (and the assigned port):\
  `kubectl get services`

- Grab the public IP of one of the worker nodes: \
  `kubectl get nodes -o wide`

- Edit the service:\
  `kubectl edit service <new-alias-name>`

- Replace \ type and port `kubectl expose deployment <new-alias-name> --type=LoadBalancer --port 3001`

- Verify that the service was updated:\
  `kubectl get service`

#### Second method

First Create `<FileName>.yaml` file in your app root directory. then write below code into the file.

```doc
apiVersion: v1
kind: Pod
metadata:
  name: <pod-name> // chose your k8 pod name like : node-pod
  labels:
    run: <app-name> // chose your k8 app name like : node-app
    app: web
spec:
  containers:
  - name: <container name> // chose your k8 container name
    image: <docker-username/docker-image-name> // chose your docker img
    ports:
      - containerPort: 800
  dnsPolicy: ClusterFirst
  restartPolicy: Never
status: {}
```

```doc
kubectl apply -f <pod-fileName>.yaml
```

```doc
kubectl exec -t <pod-name>
```

```doc
kubectl expose pod <pod-name> --type=LoadBalancer --port 3000 --name <new-service-name>
```

```doc
kubectl expose deployment <new-service-name> --type=LoadBalancer --port 3001
```

#### Docker other command

Delete all resources from Kubernetes.\

- **_Method 1:_** To delete everything from the current namespace (which is normally the default namespace) using kubectl delete:\
  `kubectl delete all --all`\
  all refers to all resource types such as pods, deployments, services, etc. --all is used to delete every object of that resource type instead of specifying it using its name or label. To delete everything from a certain namespace you use the `-n` flag:\
  `kubectl delete all --all -n {namespace}`

- **_Method 2:_** You can also delete a namespace and re-create it. This will delete everything that belongs to it:\
  `kubectl delete namespace {namespace}`\
  `kubectl create namespace {namespace}`\
  all in kubernetes does not refers to every kubernetes object, such as admin level resources (limits, quota, policy, authorization rules). If you really want to make sure to delete eveything, it's better to delete the namespace and re-create it. Another way to do that is to use kubectl api-resources to get all resource types, as seen here:\
  `kubectl delete "$(kubectl api-resources --namespaced=true --verbs=delete -o name | tr "\n" "," | sed -e 's/,$//')" --all`

## License

[MIT](https://choosealicense.com/licenses/mit/)

https://docs.chocolatey.org/en-us/choco/setup
