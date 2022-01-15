import { mount } from '@vue/test-utils'
import cNotification from "~/components/Misc/cNotification.vue";


test("should render default type", () => {
	const wrapper = mount(cNotification, {
		props: {
			id: "1"
		}
	})

	const statusIcon = wrapper.find(".status-icon");
	const title = wrapper.find(".title");
	const message = wrapper.find(".message");
	const closeButton = wrapper.find(".close-button");
	const actions = wrapper.find(".actions");
	
	expect(message.exists()).toBe(false);
	expect(actions.exists()).toBe(false);
	expect(closeButton.exists()).toBe(true);

	expect(statusIcon.classes("icon-info")).toBe(true);
	expect(wrapper.classes("info")).toBe(true);
	expect(title.text()).toContain("info");
	
	expect(wrapper.props("type")).toBe("info");
	expect(wrapper.props("autoClose")).toEqual(true);
	expect(wrapper.props("duration")).toEqual(5);
	expect(wrapper.props("actions")).toEqual([]);
})

test("should render custom types", async () => {
	const wrapper = mount(cNotification, {
		props: {
			id: "1"
		}
	})

	const notifications = [
		{ title: "Info Toast", message: "Info Message", type: "info" },
		{ title: "Success Toast", message: "Success Message", type: "success" },
		{ title: "Warning Toast", message: "Warningnfo Message", type: "warning" },
		{ title: "Error Toast", message: "Error Message", type: "error" },
	]

	for (const notification of notifications) {
		await wrapper.setProps(notification);
		expect(wrapper.props("type")).toBe( notification.type );
		expect(wrapper.props( "title" )).toBe( notification.title );
		expect(wrapper.props( "message" )).toBe( notification.message );

		const statusIcon = wrapper.find(".status-icon");
		const title = wrapper.find(".title");
		const message = wrapper.find(".message");

		expect(wrapper.classes(notification.type)).toBe(true);
		expect(statusIcon.classes(`icon-${notification.type}`)).toBe(true);
		expect(title.text()).toContain(notification.title);
		expect(message.text()).toContain(notification.message);
	}
})
