apipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                chmod +x dockerize.sh
                ./dockerize.sh init
                ./dockerize.sh build
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
