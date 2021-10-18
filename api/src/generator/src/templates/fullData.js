import { randomBusinesses } from "../organisms/randomBusinesses.js"
import { randomEmployees } from "../organisms/randomEmployees.js"
import { randomSpecialists } from "../organisms/randomSpecialists.js"
import { randomProjects } from "../organisms/randomProjects.js"
import { randomTasks } from "../organisms/randomTasks.js"
import { randomReviews } from "../organisms/randomReviews.js"
import { randomPolicies } from "../organisms/randomPolicies.js"
import { randomRisks } from "../organisms/randomRisks.js"
import { shuffleArray, randomNumber, randomElement } from "../atoms/utils.js"

const quantity = {
	businesses: 1,
	specialists: 1,
	projects: 1,
	tasks: 1,
	reviews: 1,
	policies: 1,
	risks: 1
}



export default function full() {
	try {
		const businesses = randomBusinesses({q:quantity.businesses}) // option: ({byPlans: true}) - generate only 3 businesses with different plans

		// Generate employees accounts for businesses
		const generateEmployees = () => {
			const maxEmployees = {
				basic: 0,
				team: 2,
				business: 9
			}
			const employees = []
			businesses.forEach(business => employees.push(...randomEmployees({ q:[0,maxEmployees[business.plan]], id:business.business_id })))
			return employees
		}

		const employees = generateEmployees()
		const specialists = randomSpecialists({q:quantity.specialists})

		// Get all users ID
		const users = [...businesses, ...employees, ...specialists]
		const usersId = users.map(user => user.user_id)
		const businessesId = businesses.map(business => business.business_id)

		

		// Generate Projects and assign creator and collaborators
		const projects = randomProjects({q:quantity.projects})
		projects.forEach(project => {
			let users = shuffleArray(usersId)
			project.creator = users[0]
			let collaboratorsCount = randomNumber(0,10)
			for (var i = 1; i < collaboratorsCount; i++) {
				project.collaborators.push({"user_id": users[i], "user_role": randomElement(["basic", "trusted", "admin"])})
			}
		});


		// Generate Tasks, assign it to User and link to Projects, Polisies, Reviews or Exam
		const tasks = randomTasks({q:quantity.tasks})
		tasks.forEach(task => {
			let business = shuffleArray(businessesId)
			let users = shuffleArray(usersId)
			let links = shuffleArray(projects)
			task.business_id = business[0]
			task.linked_to = links[0].project_id
			task.assignee_to = users[0][0]
		});

		
		return {
			businesses,
			employees,
			specialists,
			projects,
			tasks,
			reviews: randomReviews({q:quantity.reviews}),
			policies: randomPolicies({q:quantity.policies}),
			risks: randomRisks({q:quantity.risks})
		}

	} catch(error) {
		console.error(error)
	}
}