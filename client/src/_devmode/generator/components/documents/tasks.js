// modules
import { randomMongoId, randomNumber, quantityRange, randomElement, randomBool } from "../atoms/utils.js";
import { randomTitles, randomParagraphs } from "../molecules/randomTexts.js";
import { randomDatesInRange } from "../molecules/randomDate.js";
import { randomGenders } from "../molecules/randomGenders.js";
import { randomFirstNames, randomLastNames } from "../molecules/randomName.js";


// generate Random Tasks
const randomTasks = ({ q }) => {
	try {
		const tasks = [];
		const quantity = quantityRange( q );
		for ( let i = 0; i < quantity; i++ ) {
			const gender = randomGenders({ q: 1 })[0];
			const firstName = randomFirstNames({q: 1, gender})[0];
			const lastName = randomLastNames({ q: 1 })[0];
			let startsAt = randomDatesInRange({q: 1, shift: [-20, 50]})[0]
			let endsAt = startsAt + randomNumber(864e5, 864e5 * 30)
			const completedAt = () => {
				if(randomBool(20)) {
					return startsAt + randomNumber(864e5, 864e5 * 30)
				} else {
					return null
				}
			}
			const task = {
				_id: randomMongoId(),
				business: "1",
				name: randomTitles({
					q: 1,
					w: [1, 5]
				})[0],
				description: randomParagraphs({
					q: 1,
					s: [1, 3],
					w: [3, 7]
				})[0],
				creator: `${firstName} ${lastName}`,
				completedAt: completedAt(),
				startsAt: startsAt,
				endsAt: endsAt,
				status: randomElement(["draft", "inprogress", "complete"]),
				linkedTo: null,
				assigned: null
			};

			// repeats tasks
			if(randomBool(30)) {
				let repeats = randomElement([1,7,30,365])
				if(randomBool(80)) task.repeatsUntil = startsAt + randomNumber(864e5*30, 864e6)
				task.repeats = repeats
				task.seriesId = randomMongoId()
				switch ( repeats ) {
					case 1:
						task.repeatsEvery = randomNumber(1,30);
						break;
					case 7:
						task.repeatsEvery = randomNumber(1, 4);
						task.repeatsOn = randomNumber(1, 7);
						break;
					case 30:
						task.repeatsEvery = randomNumber(1,12);
						task.repeatsOn = randomNumber(1, 30);
						break;
					case 365:
						task.repeatsEvery = randomNumber(0,11);
						task.repeatsOn = randomNumber(1, 30);
				}
			}
			tasks.push( task );
		}
		return tasks;
	} catch ( error ) {
		console.error( error );
		return ["!Error"];
	}
};


export { randomTasks };
