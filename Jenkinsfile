pipeline {
	agent any
	
	stages {
		stage('Checkout'){
			steps {
				echo 'Pulling from Git'
				checkout scm
			}
		}
		stage('Build & Test')
			steps {
				echo 'Build & Test'
			}
		}
		stage('Deploy')
			steps {
				echo 'Deploying'
			}
		}
	}
}