import { mount } from '@vue/test-utils'
import cCheckers from "~/components/Inputs/cCheckers.vue";

const checkersOptions = [
	{title: "Option 1", value: "option1"},
	{title: "Option 2", value: "option2"},
	{title: "Option 3", value: "option3"}
]


test("should render default component", () => {
	const wrapper = mount(cCheckers, {
		props: {
			options: checkersOptions,
			modelValue: []
		}
	});
	
	const label = wrapper.find(".c-checkers-label");
	expect(label.exists()).toBe(false);
	expect(wrapper.props("label")).toBe("");
	expect(wrapper.props("fullwidth")).toBe(false);

	const checkers = wrapper.findAll(".c-checker");
	expect(checkers).toHaveLength(3);
	for (let [index, checker] of checkers.entries()) {
		const input = wrapper.find('input[type="checkbox"]')
		expect(input.element.checked).toBeFalsy();
		expect(checker.text()).toContain( checkersOptions[index].title );
		expect(checker.classes( "checked" )).toBe( false );
	};
});

test("should work with custom params", () => {
	const wrapper = mount(cCheckers, {
		props: {
			label: "Checkers",
			fullwidth: true,
			options: checkersOptions,
			modelValue: []
		}
	});
	
	const label = wrapper.find(".c-checkers-label");
	expect(label.exists()).toBe(true);
	expect(label.text()).toContain( "Checkers" );
	expect(wrapper.props("label")).toBe("Checkers");
	expect(wrapper.props("fullwidth")).toBe(true);
	expect(wrapper.classes("fullwidth")).toBe( true );
});


// test("should change modelValue", async () => {
// 	const checkersOptions = [
// 		{title: "Option 1", value: "option1"},
// 		{title: "Option 2", value: "option2"},
// 		{title: "Option 3", value: "option3"}
// 	]
// 	const wrapper = mount(cCheckers, {
// 		props: {
// 			options: checkersOptions,
// 			modelValue: []
// 		}
// 	});
	
// 	const checkers = wrapper.findAll(".c-checker");
// 	for (let [index, checker] of checkers.entries()) {
// 		const input = checker.find('input[type="checkbox"]');
// 		await input.setChecked();
// 		expect(wrapper.props( "modelValue" )).toPartiallyContain( checkersOptions[index].value );
// 	};
// });