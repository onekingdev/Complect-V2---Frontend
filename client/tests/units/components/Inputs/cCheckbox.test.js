import { mount } from '@vue/test-utils'
import cCheckbox from "~/components/Inputs/cCheckbox.vue";


test("should render default type", () => {
	const wrapper = mount(cCheckbox);
	
	const title = wrapper.find(".title");
	expect(title.exists()).toBe(false);

	expect(wrapper.props("label")).toBe("");
	expect(wrapper.props("type")).toBe("default");
	expect(wrapper.props("value")).toBe("");
	// expect(wrapper.props("modelValue")).toEqual(false);
	expect(wrapper.props("multiple")).toEqual(false);

	expect(wrapper.classes("c-input")).toBe(true);
	expect(wrapper.classes("c-checkbox")).toBe(true);
	expect(wrapper.classes("default")).toBe(true);
	// expect(wrapper.classes("checked")).toBe(false);
})

test("should render custom types", async () => {
	const wrapper = mount(cCheckbox);

	const checkboxes = [
		{ label: "Default type", type: "default" },
		{ label: "Round type", type: "round" },
		{ label: "Toggle type", type: "toggle" }
	]

	for (const checkbox of checkboxes) {
		await wrapper.setProps(checkbox);
		
		const title = wrapper.find(".title");
		expect(title.exists()).toBe(true);
		expect(title.text()).toContain( checkbox.label );

		expect(wrapper.props( "type" )).toBe( checkbox.type );
		expect(wrapper.props( "label" )).toBe( checkbox.label );
		expect(wrapper.classes( checkbox.type )).toBe( true );
	}
})

test("should render single value Checkbox", async () => {
	const wrapper = mount(cCheckbox);
	const checkbox = wrapper.find('input[type="checkbox"]')
	await checkbox.setChecked();
	expect(checkbox.element.checked).toBeTruthy();
	await checkbox.setChecked(false);
	expect(checkbox.element.checked).toBeFalsy();
})