import { mount } from '@vue/test-utils'
import cButton from "~/components/Inputs/cButton.vue";


test("should render default type", () => {
	const wrapper = mount(cButton);

	const iconL = wrapper.find(".icon-l");
	const iconR = wrapper.find(".icon-r");
	const primaryTitle = wrapper.find(".primary-title");
	const additionalTitle = wrapper.find(".additional-title");
	
	expect(iconL.exists()).toBe(false);
	expect(iconR.exists()).toBe(false);
	expect(primaryTitle.exists()).toBe(false);
	expect(additionalTitle.exists()).toBe(false);

	expect(wrapper.props("iconL")).toBe("");
	expect(wrapper.props("iconR")).toBe("");
	expect(wrapper.props("title")).toBe("");
	expect(wrapper.props("additionalTitle")).toBe("");
	expect(wrapper.props("type")).toBe("default");
	expect(wrapper.props("size")).toBe("regular");
	expect(wrapper.props("disabled")).toBe(false);
	expect(wrapper.props("fullwidth")).toBe(false);

	expect(wrapper.classes("c-input")).toBe(true);
	expect(wrapper.classes("c-button")).toBe(true);
	expect(wrapper.classes("default")).toBe(true);
	expect(wrapper.classes("regular")).toBe(true);
	expect(wrapper.attributes("tabindex")).toBe("0");
})

test("should render custom types", async () => {
	const wrapper = mount(cButton);

	const buttons = [
		{ title: "Default button", type: "default" },
		{ title: "Primary button", type: "primary" },
		{ title: "Accent button", type: "accent" },
		{ title: "Transparent button", type: "transparent" },
		{ title: "Link button", type: "link" },
		{ title: "Icon button", type: "icon" }
	]

	for (const button of buttons) {
		await wrapper.setProps(button);
		const primaryTitle = wrapper.find(".primary-title");

		expect(wrapper.props( "type" )).toBe( button.type );
		expect(wrapper.props( "title" )).toBe( button.title );
		
		expect(wrapper.classes( button.type )).toBe( true );

		expect(primaryTitle.exists()).toBe(true);
		expect(primaryTitle.text()).toContain( button.title );
	}
})

test("should render diferent sizes", async () => {
	const wrapper = mount(cButton);

	const sizes = ["tiny", "small", "regular", "big", "huge"]
	
	for (const size of sizes) {
		await wrapper.setProps({ size });
		expect(wrapper.props( "size" )).toBe( size );
		expect(wrapper.classes( size )).toBe(true);
	}
})