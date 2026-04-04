pipeline {
    agent any

    tools {
        nodejs 'NodeJS20'
    }

    environment {
        DOCKERHUB_USER = 'amanverma100'
        IMAGE_FRONTEND = "${DOCKERHUB_USER}/ecommerce-frontend"
        IMAGE_BACKEND  = "${DOCKERHUB_USER}/ecommerce-backend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/amanverma100/ecommerce.git'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend Install') {
                    steps {
                        dir('frontend') { sh 'npm install' }
                    }
                }
                stage('Backend Install') {
                    steps {
                        dir('backend') { sh 'npm install' }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') { sh 'npm test' }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') { sh 'npm run test' }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${IMAGE_FRONTEND}:${BUILD_NUMBER} ./frontend"
                sh "docker build -t ${IMAGE_BACKEND}:${BUILD_NUMBER} ./backend"
                sh "docker tag ${IMAGE_FRONTEND}:${BUILD_NUMBER} ${IMAGE_FRONTEND}:latest"
                sh "docker tag ${IMAGE_BACKEND}:${BUILD_NUMBER} ${IMAGE_BACKEND}:latest"
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${IMAGE_FRONTEND}:${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_FRONTEND}:latest"
                    sh "docker push ${IMAGE_BACKEND}:${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_BACKEND}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh "kubectl set image deployment/frontend frontend=${IMAGE_FRONTEND}:${BUILD_NUMBER}"
                sh "kubectl set image deployment/backend  backend=${IMAGE_BACKEND}:${BUILD_NUMBER}"
                sh 'kubectl rollout status deployment/frontend'
                sh 'kubectl rollout status deployment/backend'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! App is live.'
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}