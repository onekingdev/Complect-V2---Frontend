import { shallowMount } from '@vue/test-utils';
import cIcon from "~/components/Icons/cIcon.vue";


test("should render default state", async () => {
	const wrapper = shallowMount(cIcon)
	expect(wrapper.classes("icon")).toBe(true);
	expect(wrapper.classes("icon-blank")).toBe(true);
	// const use = wrapper.get("use")
	// expect(use.attributes("xlink")).toBe("#icon_blank");
})

test("should render diferent sizes", async () => {
	const wrapper = shallowMount(cIcon);
	const sizes = [
		{ class: "tiny", width: "0.6em" },
		{ class: "small", width: "0.8em" },
		{ class: "big", width: "1.5em" },
		{ class: "huge", width: "2em" }
	]
	for (const size of sizes) {
		await wrapper.setProps({ size: size.width });
		expect(wrapper.props( "size" )).toBe( size.width );
		expect(wrapper.classes( size.width )).toBe(true);
	}
})