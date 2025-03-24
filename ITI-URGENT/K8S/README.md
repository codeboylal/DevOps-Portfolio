# Installation

## SSH into your VPS

```bash
ssh ubuntu@your-vps-ip
```

## Install MicroK8s

```bash
sudo snap install microk8s --classic
```

## Add your user to the microk8s group to avoid using sudo with MicroK8s commands

```bash
sudo usermod -a -G microk8s $USER
newgrp microk8s
```

## Verify the installation

```bash
microk8s status --wait-ready
```

# Enable Necessary Add-ons

MicroK8s includes many features as add-ons. Enable the required ones:

```bash
microk8s enable dns ingress storage cert-manager
```

## Optional Monitoring

For monitoring, enable Prometheus and Grafana:

```bash
microk8s enable prometheus
```

# Prepare Kubernetes Manifests

## Directory Structure

Organize your manifests as follows:

```
microk8s-deployment/
├── client-deployment.yaml
├── server-deployment.yaml
├── client-service.yaml
├── server-service.yaml
├── ingress.yaml
```

## Kubernetes YAML Files

### Client Deployment (client-deployment.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: iti-client
spec:
    replicas: 2
    selector:
        matchLabels:
            app: iti-client
    template:
        metadata:
            labels:
                app: iti-client
        spec:
            containers:
            - name: iti-client
                image: your-registry/iti-client:latest
                ports:
                - containerPort: 80
```

### Server Deployment (server-deployment.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: iti-server
spec:
    replicas: 2
    selector:
        matchLabels:
            app: iti-server
    template:
        metadata:
            labels:
                app: iti-server
        spec:
            containers:
            - name: iti-server
                image: your-registry/iti-server:latest
                ports:
                - containerPort: 8000
                env:
                - name: Mongo_URL
                    value: "mongodb+srv://annantd64:r8nAyBUTqe6ES1Yj@codroidhub.loybnfu.mongodb.net/ITI-Buildings"
```

### Client Service (client-service.yaml)

```yaml
apiVersion: v1
kind: Service
metadata:
    name: iti-client-service
spec:
    selector:
        app: iti-client
    ports:
        - protocol: TCP
            port: 80
            targetPort: 80
    type: ClusterIP
```

### Server Service (server-service.yaml)

```yaml
apiVersion: v1
kind: Service
metadata:
    name: iti-server-service
spec:
    selector:
        app: iti-server
    ports:
        - protocol: TCP
            port: 8000
            targetPort: 8000
    type: ClusterIP
```

### Ingress Configuration (ingress.yaml)

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: iti-ingress
    annotations:
        nginx.ingress.kubernetes.io/rewrite-target: /
        cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
    rules:
        - host: "your-domain.com"
            http:
                paths:
                - path: /client
                    pathType: Prefix
                    backend:
                        service:
                            name: iti-client-service
                            port:
                                number: 80
                - path: /server
                    pathType: Prefix
                    backend:
                        service:
                            name: iti-server-service
                            port:
                                number: 8000
    tls:
    - hosts:
        - "your-domain.com"
        secretName: tls-secret
```

# Deploy to MicroK8s

Apply the manifests to deploy your application:

```bash
microk8s kubectl apply -f microk8s-deployment/
```

## Verify deployments

```bash
microk8s kubectl get pods
microk8s kubectl get svc
microk8s kubectl get ingress
```

# Configure SSL

Use Cert-Manager to automatically manage SSL certificates.

## Create a Cluster Issuer

Create a file `cluster-issuer.yaml`:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
    name: letsencrypt-prod
spec:
    acme:
        server: https://acme-v02.api.letsencrypt.org/directory
        email: your-email@example.com
        privateKeySecretRef:
            name: letsencrypt-prod-key
        solvers:
        - http01:
                ingress:
                    class: nginx
```

## Apply the issuer

```bash
microk8s kubectl apply -f cluster-issuer.yaml
```

# Test Your Setup

Map your domain to the VPS public IP using your DNS provider.
Access the application via:
- http://your-domain.com/client
- http://your-domain.com/server

## Verify SSL

Access the application using https://your-domain.com.

# (Optional) Monitoring and Logging

Enable Prometheus and Grafana:

```bash
microk8s enable prometheus
```

## Access Grafana dashboard

```bash
microk8s kubectl -n monitoring port-forward svc/grafana 3000:80
```