import { mount } from '@vue/test-utils'
import cToast from "~/components/Misc/cToast.vue";


test("should render default type", () => {
	const wrapper = mount(cToast, {
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
	const wrapper = mount(cToast, {
		props: {
			id: "1"
		}
	})

	const toasts = [
		{ title: "Info Toast", message: "Info Message", type: "info" },
		{ title: "Success Toast", message: "Success Message", type: "success" },
		{ title: "Warning Toast", message: "Warningnfo Message", type: "warning" },
		{ title: "Error Toast", message: "Error Message", type: "error" },
	]

	for (const toast of toasts) {
		await wrapper.setProps(toast);
		expect(wrapper.props("type")).toBe( toast.type );
		expect(wrapper.props( "title" )).toBe( toast.title );
		expect(wrapper.props( "message" )).toBe( toast.message );

		const statusIcon = wrapper.find(".status-icon");
		const title = wrapper.find(".title");
		const message = wrapper.find(".message");

		expect(wrapper.classes(toast.type)).toBe(true);
		expect(statusIcon.classes(`icon-${toast.type}`)).toBe(true);
		expect(title.text()).toContain(toast.title);
		expect(message.text()).toContain(toast.message);
	}
})
