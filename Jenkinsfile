node('master') {
	stage 'Checkout' {
		checkout scm
	}
	stage 'Build & Test' {
		sh "docker build -t Self-Regulated-Learning-CI:B${BUILD_NUMBER} -f Dockerfile ."
		sh "docker build -t Self-Regulated-Learning-CI:test-B${BUILD_NUMBER} -f Dockerfile.Integration ."
	}	
	stage 'Integration Test' {
		sh "docker-compose -f docker-compose.integration.yml up --force-recreate --abort-on-container-exit"
        sh "docker-compose -f docker-compose.integration.yml down -v"
	}
}