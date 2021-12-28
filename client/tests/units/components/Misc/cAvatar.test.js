import { mount } from '@vue/test-utils'
import cAvatar from "~/components/Misc/cAvatar.vue";

test("should render default state", async () => {
	const wrapper = mount(cAvatar, {
		props: {
			firstName: "John",
			lastName: "Smith"
		}
	})
	const img = wrapper.find(".c-avatar-photo")
	expect(img.attributes("alt")).toBe("John Smith");
	expect(img.element.style.display).toBe("none")
	await wrapper.setProps({ avatar: "https://example.com/avatar.jpg" });
	expect(img.attributes("src")).toBe("https://example.com/avatar.jpg");
	expect(wrapper.text()).toContain("JS");	
	expect(wrapper.props("size")).toBe("regular");
	expect(wrapper.classes("regular")).toBe(true);
	expect(wrapper.props("shape")).toBe("circle");
	expect(wrapper.classes("circle")).toBe(true);
})

test("should render diferent sizes", async () => {
	const wrapper = mount(cAvatar, {
		props: {
			firstName: "John",
			lastName: "Smith"
		}
	})
	const sizes = [
		{ class: "tiny", style: "0.8em" },
		{ class: "small", style: "1em" },
		{ class: "regular", style: "1.5em" },
		{ class: "big", style: "2em" },
		{ class: "huge", style: "3em" }
	]
	for (const size of sizes) {
		await wrapper.setProps({ size: size.class });
		expect(wrapper.props( "size" )).toBe( size.class );
		expect(wrapper.classes( size.class )).toBe(true);
		// expect(wrapper.element.style.fontSize).toBe(size.style)
	}
})

test("should render diferent shapes", async () => {
	const wrapper = mount(cAvatar, {
		props: {
			firstName: "John",
			lastName: "Smith"
		}
	})
	const shapes = [
		{ class: "circle", style: "50%" },
		{ class: "rounded", style: "0.3em" },
		{ class: "square", style: "0" }
	]
	for (const shape of shapes) {
		await wrapper.setProps({ shape: shape.class });
		expect(wrapper.props( "shape" )).toBe( shape.class );
		expect(wrapper.classes( shape.class )).toBe(true);
		// expect(wrapper.element.style.borderRadius).toBe(shape.style)
	}
})