import { mount } from '@vue/test-utils'
import cRadios from "~/components/Inputs/cRadios.vue";


test("should render default type", async () => {
	const radiosValues = [
		{title: "Option 1", value: "option1"},
		{title: "Option 2", value: "option2"},
		{title: "Option 3", value: "option3"}
	]
	const wrapper = mount(cRadios, {
		props: {
			id: "demo",
			data: radiosValues,
			modelValue: "option1"
		}
	});
	
	expect(wrapper.exists()).toBe(true);
	const radios = wrapper.findAll(".c-radio");
	expect(radios).toHaveLength(3);

	for (let [index, radio] of radios.entries()) {
		const input = radio.find('input[type="radio"]');
		await input.setChecked();
		expect(radio.text()).toContain( radiosValues[index].title );
		expect(input.element.checked).toBeTruthy();
	};
})