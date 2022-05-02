<template lang="pug">
c-table(v-bind="{columns, documents, filters}")
</template>


<script>
import { computed, onMounted, onUnmounted } from "vue";
import UseData from "~/store/Data.js";
import useProfile from "~/store/Profile.js";
export default {
	setup () {
		const proposals = new UseData( "proposals" );
		const jobs = new UseData( "jobs" );
		const { profile } = useProfile();
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"cell": "CellTitle",
				"meta": { "link": "ProjectDetail" }
			},
			{
				"title": "Client",
				"key": "client",
				"cell": "CellUser"
			},
			{
				"title": "Payment",
				"key": "payment",
				"cell": "CellPrice",
				"align": "right"
			},
			{
				"title": "Status",
				"key": "status",
				"cell": "CellStatus",
				"align": "right"
			},
			{
				"title": "Start Date",
				"key": "startsAt",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"title": "End Date",
				"key": "endsAt",
				"cell": "CellDate",
				"align": "right",
				"meta": { "overdueWarning": true }
			}
		];

		const filters = [{
			"title": "Filter by:",
			"field": "status",
			"keys": [
				{
					"title": "All",
					"key": ""
				},
				{
					"title": "Not Started",
					"key": "notStarted"
				},
				{
					"title": "Draft",
					"key": "draft"
				},
				{
					"title": "In Progress",
					"key": "inprogress"
				},
				{
					"title": "Pending",
					"key": "pending"
				},
				{
					"title": "Complete",
					"key": "complete"
				},
				{
					"title": "Overdue",
					"key": "overdue"
				}
			]
		}];

		const documents = computed( () => {
			const proposalArray = proposals.getDocuments().value;
			const returnArray = [];
			for ( let i = 0; i < proposalArray.length; i++ ) {
				const selectedJob = jobs.getDocuments().value.find( job => job._id === proposalArray[i].job_id );
				if ( selectedJob ) {
					const returnObj = {
						"_id": proposalArray[i].status === "accepted" || proposalArray[i].status === "complete" ? "61fb29f8d39177aad786604e" : "",
						"name": selectedJob.name,
						"client": { "firstName": "Hanh", "lastName": "Client" },
						"payment": proposalArray[i].priceType === "hourly" ? proposalArray[i].hourlyRate * 100 : proposalArray[i].budget,
						"status": proposalArray[i].status,
						"startDate": proposalArray.startedJob,
						"endDate": proposalArray[i].endDate
					};
					returnArray.push( returnObj );
				}
			}
			return returnArray;
		});

		onMounted( () => {
			proposals.readDocuments( "", { "owner_id": profile.value._id });
			jobs.readDocuments();
		});
		onUnmounted( () => proposals.clearStore() );

		return {
			columns,
			documents,
			filters
		};
	}
};
</script>
